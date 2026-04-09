function appendIfPresent(target, key, value) {
  if (value === undefined || value === null || value === "") {
    return;
  }

  target.append(key, value);
}

function buildRequestUrl(baseUrl, path) {
  return new URL(path, baseUrl).toString();
}

function readAttributionField(source, key) {
  return source[key] ?? null;
}

function getAttributionSource(input = {}) {
  return input.attribution ?? input;
}

function normalizeAttribution(input = {}) {
  const source = getAttributionSource(input);

  return {
    campaignId: readAttributionField(source, "campaignId"),
    adId: readAttributionField(source, "adId"),
    adsetId: readAttributionField(source, "adsetId"),
    providerClickToken: readAttributionField(source, "providerClickToken"),
    pid: readAttributionField(source, "pid"),
    utmSource: readAttributionField(source, "utmSource"),
    utmCampaign: readAttributionField(source, "utmCampaign"),
    utmContent: readAttributionField(source, "utmContent")
  };
}

function normalizeMetadata(rawMetadata = {}) {
  return rawMetadata;
}

function readSearchParam(searchParams, names) {
  for (const name of names) {
    const value = searchParams.get(name);
    if (value !== null) {
      return value;
    }
  }

  return null;
}

function readUtmSource(searchParams) {
  return readSearchParam(searchParams, ["utm_source", "utmSource"]);
}

function readUtmCampaign(searchParams) {
  return readSearchParam(searchParams, ["utm_campaign", "utmCampaign"]);
}

function readUtmContent(searchParams) {
  return readSearchParam(searchParams, ["utm_content", "utmContent"]);
}

export function createLandingVisitRequest(input) {
  const normalizedAttribution = normalizeAttribution(input);

  return {
    url: buildRequestUrl(input.trafficLandingBaseUrl, "/api/landing-visits"),
    body: {
      landingSlug: input.landingSlug,
      landingVariant: input.landingVariant ?? null,
      channelId: input.channelId,
      provider: input.provider,
      ...normalizedAttribution,
      rawMetadata: normalizeMetadata(input.rawMetadata)
    }
  };
}

export function createLandingCtaClickRequest(input) {
  const normalizedAttribution = normalizeAttribution(input);

  return {
    url: buildRequestUrl(
      input.trafficLandingBaseUrl,
      `/api/landing-visits/${input.landingVisitId}/cta-clicks`
    ),
    body: {
      landingVisitId: input.landingVisitId,
      landingSlug: input.landingSlug,
      landingVariant: input.landingVariant ?? null,
      channelId: input.channelId,
      provider: input.provider,
      ...normalizedAttribution,
      rawMetadata: normalizeMetadata(input.rawMetadata)
    }
  };
}

export function readLandingAttributionFromSearchParams(searchParams) {
  return {
    campaignId: readSearchParam(searchParams, ["campaignId", "campaign_id"]),
    adId: readSearchParam(searchParams, ["adId", "ad_id"]),
    adsetId: readSearchParam(searchParams, ["adsetId", "adset_id"]),
    providerClickToken: readSearchParam(searchParams, [
      "rb_clickid",
      "clickToken",
      "providerClickToken",
      "vkclid"
    ]),
    pid: readSearchParam(searchParams, ["pid"]),
    utmSource: readUtmSource(searchParams),
    utmCampaign: readUtmCampaign(searchParams),
    utmContent: readUtmContent(searchParams)
  };
}

export function writeLandingAttributionQuery(searchParams, attribution) {
  appendIfPresent(searchParams, "campaignId", attribution.campaignId);
  appendIfPresent(searchParams, "adId", attribution.adId);
  appendIfPresent(searchParams, "adsetId", attribution.adsetId);
  appendIfPresent(searchParams, "clickToken", attribution.providerClickToken);
  appendIfPresent(searchParams, "pid", attribution.pid);
  appendIfPresent(searchParams, "utm_source", attribution.utmSource);
  appendIfPresent(searchParams, "utm_campaign", attribution.utmCampaign);
  appendIfPresent(searchParams, "utm_content", attribution.utmContent);
}
