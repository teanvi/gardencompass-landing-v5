import assert from "node:assert/strict";
import test from "node:test";

import {
  createLandingCtaClickRequest,
  createLandingVisitRequest,
  readLandingAttributionFromSearchParams
} from "../lib/traffic-landing-contract.js";

test("creates traffic landing visit and cta click requests from landing context", () => {
  const context = {
    trafficLandingBaseUrl: "https://landing.example.com",
    landingSlug: "gardencompass-landing-v5",
    landingVariant: "hero-a",
    channelId: "3779805576",
    provider: "vk",
    campaignId: "cmp-1",
    adId: "ad-1",
    adsetId: "adset-1",
    providerClickToken: "vkclid-123",
    pid: "pid-123",
    utmSource: "vk",
    utmCampaign: "spring-garden",
    utmContent: "creative-a",
    rawMetadata: {
      pageUrl: "https://example.com/?utm_source=vk"
    }
  };

  assert.deepEqual(
    createLandingVisitRequest(context),
    {
      url: "https://landing.example.com/api/landing-visits",
      body: {
        landingSlug: "gardencompass-landing-v5",
        landingVariant: "hero-a",
        channelId: "3779805576",
        provider: "vk",
        campaignId: "cmp-1",
        adId: "ad-1",
        adsetId: "adset-1",
        providerClickToken: "vkclid-123",
        pid: "pid-123",
        utmSource: "vk",
        utmCampaign: "spring-garden",
        utmContent: "creative-a",
        rawMetadata: {
          pageUrl: "https://example.com/?utm_source=vk"
        }
      }
    }
  );

  assert.deepEqual(
    createLandingCtaClickRequest({
      ...context,
      landingVisitId: "landing_visit_123"
    }),
    {
      url: "https://landing.example.com/api/landing-visits/landing_visit_123/cta-clicks",
      body: {
        landingVisitId: "landing_visit_123",
        landingSlug: "gardencompass-landing-v5",
        landingVariant: "hero-a",
        channelId: "3779805576",
        provider: "vk",
        campaignId: "cmp-1",
        adId: "ad-1",
        adsetId: "adset-1",
        providerClickToken: "vkclid-123",
        pid: "pid-123",
        utmSource: "vk",
        utmCampaign: "spring-garden",
        utmContent: "creative-a",
        rawMetadata: {
          pageUrl: "https://example.com/?utm_source=vk"
        }
      }
    }
  );
});

test("reads rb_clickid as provider click token alias", () => {
  const url = new URL(
    "https://v5.gardencompass.co/?rb_clickid=rb-1&utm_source=vk_ads&utm_campaign=cmp-1&utm_content=creative-a"
  );

  assert.deepEqual(readLandingAttributionFromSearchParams(url.searchParams), {
    campaignId: null,
    adId: null,
    adsetId: null,
    providerClickToken: "rb-1",
    pid: null,
    utmSource: "vk_ads",
    utmCampaign: "cmp-1",
    utmContent: "creative-a"
  });
});
