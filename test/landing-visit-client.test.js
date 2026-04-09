import assert from "node:assert/strict";
import test from "node:test";

import {
  getOrCreateLandingVisit,
  resetLandingVisitCache
} from "../app/landing-visit-client.js";

test("reuses a single landing visit request for the same page context", async () => {
  global.window = {
    location: {
      href: "https://v5.gardencompass.co/?vkclid=test-1"
    },
    localStorage: {
      getItem() {
        return "pid-1";
      }
    }
  };
  global.document = {
    referrer: "https://vk.com"
  };

  let callCount = 0;
  const fetchImpl = async () => {
    callCount += 1;
    return new Response(JSON.stringify({ landingVisitId: "landing_visit_1" }), {
      status: 201,
      headers: {
        "content-type": "application/json"
      }
    });
  };

  const input = {
    trafficLandingBaseUrl: "https://landing.example.com",
    landingSlug: "gardencompass-landing-v5",
    landingVariant: "hero-a",
    channelId: "3779805576",
    provider: "vk",
    campaignId: null,
    adId: null,
    adsetId: null,
    providerClickToken: null,
    utmSource: null,
    utmCampaign: null,
    utmContent: null
  };

  const [first, second] = await Promise.all([
    getOrCreateLandingVisit(input, { fetchImpl }),
    getOrCreateLandingVisit(input, { fetchImpl })
  ]);

  assert.equal(first.landingVisitId, "landing_visit_1");
  assert.equal(second.landingVisitId, "landing_visit_1");
  assert.equal(callCount, 1);

  resetLandingVisitCache();
  delete global.window;
  delete global.document;
});
