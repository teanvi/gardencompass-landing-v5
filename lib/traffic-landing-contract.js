function appendIfPresent(target, key, value) {
  if (value === undefined || value === null || value === "") {
    return;
  }

  target.append(key, value);
}

function buildRequestUrl(baseUrl, path) {
  return new URL(path, baseUrl).toString();
}

function normalizeAttribution(input = {}) {
  const source = input.attribution ?? input;

  return {
    campaignId: source.campaignId ?? null,
    adId: source.adId ?? null,
    adsetId: source.adsetId ?? null,
    providerClickToken: source.providerClickToken ?? null,
    utmSource: source.utmSource ?? null,
    utmCampaign: source.utmCampaign ?? null,
    utmContent: source.utmContent ?? null
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
      "clickToken",
      "providerClickToken",
      "vkclid"
    ]),
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
  appendIfPresent(searchParams, "utm_source", attribution.utmSource);
  appendIfPresent(searchParams, "utm_campaign", attribution.utmCampaign);
  appendIfPresent(searchParams, "utm_content", attribution.utmContent);
}
