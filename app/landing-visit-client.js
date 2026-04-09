import {
  createLandingVisitRequest,
  readLandingAttributionFromSearchParams
} from "../lib/traffic-landing-contract.js";

function buildRawMetadata() {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    pageUrl: window.location.href,
    referrer: document.referrer || null
  };
}

function readVkTrackingPid() {
  if (typeof window === "undefined") {
    return null;
  }

  if (typeof window.__vkTrackingPid === "string" && window.__vkTrackingPid.length > 0) {
    return window.__vkTrackingPid;
  }

  try {
    return window.localStorage.getItem("vk_tracking_pid");
  } catch {
    return null;
  }
}

function buildCacheKey(input) {
  return JSON.stringify({
    trafficLandingBaseUrl: input.trafficLandingBaseUrl,
    landingSlug: input.landingSlug,
    landingVariant: input.landingVariant ?? null,
    channelId: input.channelId,
    provider: input.provider,
    campaignId: input.campaignId ?? null,
    adId: input.adId ?? null,
    adsetId: input.adsetId ?? null,
    providerClickToken: input.providerClickToken ?? null,
    utmSource: input.utmSource ?? null,
    utmCampaign: input.utmCampaign ?? null,
    utmContent: input.utmContent ?? null,
    pageUrl: typeof window === "undefined" ? null : window.location.href
  });
}

function readLandingVisitCache() {
  if (typeof window === "undefined") {
    return new Map();
  }

  if (!(window.__trafficLandingVisitCache instanceof Map)) {
    window.__trafficLandingVisitCache = new Map();
  }

  return window.__trafficLandingVisitCache;
}

function buildAttribution(input) {
  const searchParams =
    typeof window === "undefined" ? new URLSearchParams() : new URL(window.location.href).searchParams;

  return {
    campaignId: input.campaignId,
    adId: input.adId,
    adsetId: input.adsetId,
    providerClickToken: input.providerClickToken,
    pid: readVkTrackingPid(),
    utmSource: input.utmSource,
    utmCampaign: input.utmCampaign,
    utmContent: input.utmContent,
    ...readLandingAttributionFromSearchParams(searchParams)
  };
}

export async function getOrCreateLandingVisit(input, { fetchImpl = fetch } = {}) {
  const cache = readLandingVisitCache();
  const cacheKey = buildCacheKey(input);
  const cached = cache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const request = createLandingVisitRequest({
    trafficLandingBaseUrl: input.trafficLandingBaseUrl,
    landingSlug: input.landingSlug,
    landingVariant: input.landingVariant,
    channelId: input.channelId,
    provider: input.provider,
    attribution: buildAttribution(input),
    rawMetadata: buildRawMetadata()
  });

  const promise = (async () => {
    const response = await fetchImpl(request.url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(request.body)
    });

    if (!response.ok) {
      throw new Error("landing_visit_failed");
    }

    return response.json();
  })();

  cache.set(cacheKey, promise);

  try {
    return await promise;
  } catch (error) {
    cache.delete(cacheKey);
    throw error;
  }
}

export function resetLandingVisitCache() {
  readLandingVisitCache().clear();
}
