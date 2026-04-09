"use client";

import { useEffect, useState } from "react";
import {
  createLandingCtaClickRequest,
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

export default function TrackedTelegramLink({
  className,
  children,
  trafficLandingBaseUrl,
  landingSlug,
  landingVariant,
  channelId,
  provider,
  campaignId,
  adId,
  adsetId,
  providerClickToken,
  utmSource,
  utmCampaign,
  utmContent
}) {
  const [landingVisit, setLandingVisit] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(trafficLandingBaseUrl));

  useEffect(() => {
    if (!trafficLandingBaseUrl || typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    const attribution = readLandingAttributionFromSearchParams(
      new URL(window.location.href).searchParams
    );
    const request = createLandingVisitRequest({
      trafficLandingBaseUrl,
      landingSlug,
      landingVariant,
      channelId,
      provider,
      attribution: {
        campaignId,
        adId,
        adsetId,
        providerClickToken,
        utmSource,
        utmCampaign,
        utmContent,
        ...attribution
      },
      rawMetadata: buildRawMetadata()
    });

    let cancelled = false;

    async function createLandingVisit() {
      try {
        const response = await fetch(request.url, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(request.body)
        });

        if (!response.ok) {
          throw new Error("landing_visit_failed");
        }

        const landingVisitResponse = await response.json();
        if (!cancelled) {
          setLandingVisit(landingVisitResponse);
        }
      } catch {
        if (!cancelled) {
          setLandingVisit(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    createLandingVisit();

    return () => {
      cancelled = true;
    };
  }, [
    trafficLandingBaseUrl,
    landingSlug,
    landingVariant,
    channelId,
    provider,
    campaignId,
    adId,
    adsetId,
    providerClickToken,
    utmSource,
    utmCampaign,
    utmContent
  ]);

  async function handleClick(event) {
    event.preventDefault();

    if (!trafficLandingBaseUrl || !landingVisit?.landingVisitId) {
      return;
    }

    const attribution = readLandingAttributionFromSearchParams(
      new URL(window.location.href).searchParams
    );
    const request = createLandingCtaClickRequest({
      trafficLandingBaseUrl,
      landingVisitId: landingVisit.landingVisitId,
      landingSlug,
      landingVariant,
      channelId,
      provider,
      attribution: {
        campaignId,
        adId,
        adsetId,
        providerClickToken,
        utmSource,
        utmCampaign,
        utmContent,
        ...attribution
      },
      rawMetadata: buildRawMetadata()
    });

    const response = await fetch(request.url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(request.body)
    });

    if (!response.ok) {
      return;
    }

    const landingCtaClick = await response.json();
    if (landingCtaClick?.trackerHandoffUrl) {
      window.location.assign(landingCtaClick.trackerHandoffUrl);
    }
  }

  const isDisabled = isLoading || !landingVisit?.landingVisitId;

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={isDisabled}
      aria-busy={isLoading ? "true" : "false"}
    >
      {children}
    </button>
  );
}
