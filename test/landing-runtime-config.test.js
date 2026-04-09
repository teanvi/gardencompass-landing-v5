import assert from "node:assert/strict";
import test from "node:test";

import { loadLandingRuntimeConfig } from "../lib/landing-runtime-config.js";

test("loads landing runtime config from public env and supports smoke overrides", () => {
  const config = loadLandingRuntimeConfig({
    NEXT_PUBLIC_TRAFFIC_LANDING_BASE_URL: "https://landing.example.com",
    NEXT_PUBLIC_LANDING_SLUG: "gardencompass-landing-v4",
    NEXT_PUBLIC_LANDING_VARIANT: "hero-b",
    NEXT_PUBLIC_CHANNEL_ID: "3636901853",
    NEXT_PUBLIC_PROVIDER: "vk",
    NEXT_PUBLIC_CAMPAIGN_ID: "cmp-1",
    NEXT_PUBLIC_AD_ID: "ad-1",
    NEXT_PUBLIC_ADSET_ID: "adset-1",
    NEXT_PUBLIC_PROVIDER_CLICK_TOKEN: "vkclid-1",
    NEXT_PUBLIC_UTM_SOURCE: "vk",
    NEXT_PUBLIC_UTM_CAMPAIGN: "spring",
    NEXT_PUBLIC_UTM_CONTENT: "creative-a"
  });

  assert.deepEqual(config, {
    trafficLandingBaseUrl: "https://landing.example.com",
    landingSlug: "gardencompass-landing-v4",
    landingVariant: "hero-b",
    channelId: "3636901853",
    provider: "vk",
    campaignId: "cmp-1",
    adId: "ad-1",
    adsetId: "adset-1",
    providerClickToken: "vkclid-1",
    utmSource: "vk",
    utmCampaign: "spring",
    utmContent: "creative-a"
  });
});

test("falls back to plain env names for smoke scripts", () => {
  const config = loadLandingRuntimeConfig({
    TRAFFIC_LANDING_BASE_URL: "https://landing.example.com",
    LANDING_SLUG: "gardencompass-landing-v4",
    LANDING_VARIANT: "plain-variant",
    CHANNEL_ID: "3636901853",
    PROVIDER: "vk"
  });

  assert.equal(config.trafficLandingBaseUrl, "https://landing.example.com");
  assert.equal(config.landingSlug, "gardencompass-landing-v4");
  assert.equal(config.landingVariant, "plain-variant");
  assert.equal(config.channelId, "3636901853");
  assert.equal(config.provider, "vk");
});
