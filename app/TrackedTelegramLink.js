"use client";

import { useEffect, useState } from "react";
import {
  createLandingCtaClickRequest,
  readLandingAttributionFromSearchParams
} from "../lib/traffic-landing-contract.js";
import { getOrCreateLandingVisit } from "./landing-visit-client.js";

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

    let cancelled = false;

    async function createLandingVisit() {
      try {
        const landingVisitResponse = await getOrCreateLandingVisit({
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
        });

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
        pid: readVkTrackingPid(),
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
