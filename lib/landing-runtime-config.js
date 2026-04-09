const DEFAULTS = {
  landingSlug: "gardencompass-landing-v4",
  landingVariant: "hero-a",
  channelId: "3636901853",
  provider: "vk"
};

function readEnvValue(env, publicName, privateName, fallback = null) {
  const value = env[publicName] ?? env[privateName];

  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  return value;
}

export function loadLandingRuntimeConfig(env = process.env) {
  return {
    trafficLandingBaseUrl: readEnvValue(
      env,
      "NEXT_PUBLIC_TRAFFIC_LANDING_BASE_URL",
      "TRAFFIC_LANDING_BASE_URL",
      ""
    ),
    landingSlug: readEnvValue(
      env,
      "NEXT_PUBLIC_LANDING_SLUG",
      "LANDING_SLUG",
      DEFAULTS.landingSlug
    ),
    landingVariant: readEnvValue(
      env,
      "NEXT_PUBLIC_LANDING_VARIANT",
      "LANDING_VARIANT",
      DEFAULTS.landingVariant
    ),
    channelId: readEnvValue(
      env,
      "NEXT_PUBLIC_CHANNEL_ID",
      "CHANNEL_ID",
      DEFAULTS.channelId
    ),
    provider: readEnvValue(
      env,
      "NEXT_PUBLIC_PROVIDER",
      "PROVIDER",
      DEFAULTS.provider
    ),
    campaignId: readEnvValue(env, "NEXT_PUBLIC_CAMPAIGN_ID", "CAMPAIGN_ID"),
    adId: readEnvValue(env, "NEXT_PUBLIC_AD_ID", "AD_ID"),
    adsetId: readEnvValue(env, "NEXT_PUBLIC_ADSET_ID", "ADSET_ID"),
    providerClickToken: readEnvValue(
      env,
      "NEXT_PUBLIC_PROVIDER_CLICK_TOKEN",
      "PROVIDER_CLICK_TOKEN"
    ),
    utmSource: readEnvValue(env, "NEXT_PUBLIC_UTM_SOURCE", "UTM_SOURCE"),
    utmCampaign: readEnvValue(env, "NEXT_PUBLIC_UTM_CAMPAIGN", "UTM_CAMPAIGN"),
    utmContent: readEnvValue(env, "NEXT_PUBLIC_UTM_CONTENT", "UTM_CONTENT")
  };
}
