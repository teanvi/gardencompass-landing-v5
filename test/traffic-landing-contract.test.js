import assert from "node:assert/strict";
import test from "node:test";

import {
  createLandingCtaClickRequest,
  createLandingVisitRequest
} from "../lib/traffic-landing-contract.js";

test("creates traffic landing visit and cta click requests from landing context", () => {
  const context = {
    trafficLandingBaseUrl: "https://landing.example.com",
    landingSlug: "gardencompass-landing-v4",
    landingVariant: "hero-a",
    channelId: "3636901853",
    provider: "vk",
    campaignId: "cmp-1",
    adId: "ad-1",
    adsetId: "adset-1",
    providerClickToken: "vkclid-123",
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
        landingSlug: "gardencompass-landing-v4",
        landingVariant: "hero-a",
        channelId: "3636901853",
        provider: "vk",
        campaignId: "cmp-1",
        adId: "ad-1",
        adsetId: "adset-1",
        providerClickToken: "vkclid-123",
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
        landingSlug: "gardencompass-landing-v4",
        landingVariant: "hero-a",
        channelId: "3636901853",
        provider: "vk",
        campaignId: "cmp-1",
        adId: "ad-1",
        adsetId: "adset-1",
        providerClickToken: "vkclid-123",
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
