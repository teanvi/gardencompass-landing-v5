import assert from "node:assert/strict";
import test from "node:test";

import { runLandingBridgeSmoke } from "../lib/live-smoke.js";

test("runs the landing bridge smoke path and waits for tracker redirect", async () => {
  const calls = [];
  const fetchImpl = async (url, options = {}) => {
    calls.push({
      url,
      options
    });

    if (url.endsWith("/ready")) {
      return new Response(JSON.stringify({ ok: true, service: "traffic-landing" }), {
        status: 200,
        headers: {
          "content-type": "application/json"
        }
      });
    }

    if (url.endsWith("/api/landing-visits")) {
      return new Response(
        JSON.stringify({
          landingVisitId: "landing_visit_123"
        }),
        {
          status: 201,
          headers: {
            "content-type": "application/json"
          }
        }
      );
    }

    if (url.endsWith("/cta-clicks")) {
      return new Response(
        JSON.stringify({
          trackerHandoffUrl: "https://tracker.example.com/r/click?landing_visit_id=landing_visit_123"
        }),
        {
          status: 201,
          headers: {
            "content-type": "application/json"
          }
        }
      );
    }

    if (url.startsWith("https://tracker.example.com")) {
      const attempt = calls.filter((call) => call.url === url).length;
      if (attempt < 3) {
        return new Response(JSON.stringify({ error: "invite_pool_empty" }), {
          status: 503,
          headers: {
            "content-type": "application/json"
          }
        });
      }

      return new Response(null, {
        status: 302,
        headers: {
          location: "https://t.me/+example-invite"
        }
      });
    }

    throw new Error(`Unexpected request: ${url}`);
  };

  const result = await runLandingBridgeSmoke({
    fetchImpl,
    config: {
      trafficLandingBaseUrl: "https://landing.example.com",
      landingSlug: "gardencompass-landing-v4",
      landingVariant: "hero-a",
      channelId: "3636901853",
      provider: "vk",
      campaignId: "cmp-1",
      adId: "ad-1",
      adsetId: "adset-1",
      providerClickToken: "vkclid-1",
      utmSource: "vk",
      utmCampaign: "spring",
      utmContent: "creative-a"
    },
    runId: "smoke-run-123"
  });

  assert.equal(result.ok, true);
  assert.equal(result.readyStatus, 200);
  assert.equal(result.landingVisitStatus, 201);
  assert.equal(result.ctaClickStatus, 201);
  assert.equal(result.trackerRedirectStatus, 302);
  assert.equal(result.inviteLink, "https://t.me/+example-invite");
  assert.equal(result.landingVisitId, "landing_visit_123");
  assert.equal(result.trackerHandoffUrl, "https://tracker.example.com/r/click?landing_visit_id=landing_visit_123");
});
