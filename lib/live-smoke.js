import {
  createLandingCtaClickRequest,
  createLandingVisitRequest
} from "./traffic-landing-contract.js";

function requireNonEmptyEnv(value, name) {
  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }

  return value;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchJson(fetchImpl, url, { method = "GET", headers = {}, body, redirect = "follow" } = {}) {
  const response = await fetchImpl(url, {
    method,
    headers,
    body,
    redirect
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  return {
    status: response.status,
    payload,
    headers: response.headers
  };
}

async function awaitTrackerRedirect({ fetchImpl, trackerHandoffUrl }) {
  const maxAttempts = Number(process.env.SMOKE_TRACKER_REDIRECT_MAX_ATTEMPTS ?? "6");
  const delayMs = Number(process.env.SMOKE_TRACKER_REDIRECT_RETRY_DELAY_MS ?? "5000");
  let lastResponse = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const response = await fetchJson(fetchImpl, trackerHandoffUrl, {
      redirect: "manual"
    });
    lastResponse = response;

    if (response.status === 302) {
      return response;
    }

    if (
      response.status !== 503 ||
      response.payload?.error !== "invite_pool_empty" ||
      attempt === maxAttempts
    ) {
      return response;
    }

    await sleep(delayMs);
  }

  return lastResponse;
}

function buildSmokeMetadata(runId) {
  return {
    source: "landing-live-smoke",
    runId,
    pageUrl: typeof window === "undefined" ? null : window.location.href,
    referrer: typeof document === "undefined" ? null : document.referrer || null
  };
}

function assertReadyResponse(response) {
  if (response.status !== 200) {
    throw new Error(`Traffic landing readiness failed: ${response.status}`);
  }
}

function assertLandingVisitResponse(response) {
  if (response.status !== 201 || !response.payload?.landingVisitId) {
    throw new Error(
      `Landing visit intake failed: ${response.status} ${JSON.stringify(response.payload)}`
    );
  }
}

function assertCtaClickResponse(response) {
  if (response.status !== 201 || !response.payload?.trackerHandoffUrl) {
    throw new Error(
      `CTA click handoff failed: ${response.status} ${JSON.stringify(response.payload)}`
    );
  }
}

function assertTrackerRedirectResponse(response) {
  if (response.status !== 302) {
    throw new Error(
      `Tracker redirect failed: ${response.status} ${JSON.stringify(response.payload)}`
    );
  }
}

async function createLandingVisit(fetchImpl, visitRequest) {
  const response = await fetchJson(fetchImpl, visitRequest.url, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(visitRequest.body)
  });

  assertLandingVisitResponse(response);
  return response;
}

async function createLandingCtaClick(fetchImpl, ctaRequest) {
  const response = await fetchJson(fetchImpl, ctaRequest.url, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(ctaRequest.body)
  });

  assertCtaClickResponse(response);
  return response;
}

export async function runLandingBridgeSmoke({
  fetchImpl = fetch,
  config,
  runId = `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`
}) {
  const trafficLandingBaseUrl = requireNonEmptyEnv(
    config.trafficLandingBaseUrl,
    "TRAFFIC_LANDING_BASE_URL"
  );

  const ready = await fetchJson(fetchImpl, `${trafficLandingBaseUrl}/ready`);
  assertReadyResponse(ready);

  const visitRequest = createLandingVisitRequest({
    trafficLandingBaseUrl,
    landingSlug: config.landingSlug,
    landingVariant: config.landingVariant,
    channelId: config.channelId,
    provider: config.provider,
    campaignId: config.campaignId,
    adId: config.adId,
    adsetId: config.adsetId,
    providerClickToken: config.providerClickToken,
    utmSource: config.utmSource,
    utmCampaign: config.utmCampaign,
    utmContent: config.utmContent,
    rawMetadata: buildSmokeMetadata(runId)
  });
  const visitResponse = await createLandingVisit(fetchImpl, visitRequest);

  const ctaRequest = createLandingCtaClickRequest({
    trafficLandingBaseUrl,
    landingVisitId: visitResponse.payload.landingVisitId,
    landingSlug: config.landingSlug,
    landingVariant: config.landingVariant,
    channelId: config.channelId,
    provider: config.provider,
    campaignId: config.campaignId,
    adId: config.adId,
    adsetId: config.adsetId,
    providerClickToken: config.providerClickToken,
    utmSource: config.utmSource,
    utmCampaign: config.utmCampaign,
    utmContent: config.utmContent,
    rawMetadata: buildSmokeMetadata(runId)
  });
  const ctaResponse = await createLandingCtaClick(fetchImpl, ctaRequest);

  const trackerResponse = await awaitTrackerRedirect({
    fetchImpl,
    trackerHandoffUrl: ctaResponse.payload.trackerHandoffUrl
  });

  assertTrackerRedirectResponse(trackerResponse);

  const inviteLink = trackerResponse.headers.get("location");
  if (!inviteLink) {
    throw new Error("Tracker redirect does not include a Telegram invite link");
  }

  return {
    ok: true,
    runId,
    readyStatus: ready.status,
    landingVisitStatus: visitResponse.status,
    ctaClickStatus: ctaResponse.status,
    trackerRedirectStatus: trackerResponse.status,
    inviteLink,
    landingVisitId: visitResponse.payload.landingVisitId,
    trackerHandoffUrl: ctaResponse.payload.trackerHandoffUrl
  };
}
