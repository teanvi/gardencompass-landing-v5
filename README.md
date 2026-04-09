# Garden Compass V5

## Purpose

Landing UI for paid VK traffic that talks to `traffic-landing` instead of linking directly to Telegram.

The flow is:

`ad provider -> landing page -> POST /api/landing-visits -> CTA click -> POST /api/landing-visits/:landingVisitId/cta-clicks -> tracker redirect -> Telegram invite`

## Runtime Contract

This app expects the following public env vars:

- `NEXT_PUBLIC_TRAFFIC_LANDING_BASE_URL`
- `NEXT_PUBLIC_LANDING_SLUG`
- `NEXT_PUBLIC_LANDING_VARIANT`
- `NEXT_PUBLIC_CHANNEL_ID`
- `NEXT_PUBLIC_PROVIDER`
- `NEXT_PUBLIC_VK_PIXEL_ID`
- optional `NEXT_PUBLIC_CAMPAIGN_ID`
- optional `NEXT_PUBLIC_AD_ID`
- optional `NEXT_PUBLIC_ADSET_ID`
- optional `NEXT_PUBLIC_PROVIDER_CLICK_TOKEN`
- optional `NEXT_PUBLIC_UTM_SOURCE`
- optional `NEXT_PUBLIC_UTM_CAMPAIGN`
- optional `NEXT_PUBLIC_UTM_CONTENT`

The same values may also be supplied without the `NEXT_PUBLIC_` prefix for local smoke and script usage:

- `TRAFFIC_LANDING_BASE_URL`
- `LANDING_SLUG`
- `LANDING_VARIANT`
- `CHANNEL_ID`
- `PROVIDER`
- `VK_PIXEL_ID`
- `CAMPAIGN_ID`
- `AD_ID`
- `ADSET_ID`
- `PROVIDER_CLICK_TOKEN`
- `UTM_SOURCE`
- `UTM_CAMPAIGN`
- `UTM_CONTENT`

The CTA flow is:

1. create a landing visit on page load
2. persist the CTA click on button press
3. navigate to `trackerHandoffUrl` returned by `traffic-landing`

## Production

- target public URL: `https://v5.gardencompass.co`
- target Railway service: `gardencompass-landing-v5`
- this app is prepared for the tracked landing flow and uses `traffic-landing` as the bridge

## Local Checks

- `npm test`
- `npm run complexity`
- `npm run smoke:bridge`

## Smoke

Repeatable live bridge smoke:

```bash
TRAFFIC_LANDING_BASE_URL=https://traffic-landing.example.com \
LANDING_SLUG=gardencompass-landing-v5 \
LANDING_VARIANT=hero-a \
CHANNEL_ID=3779805576 \
PROVIDER=vk \
npm run smoke:bridge
```

The smoke script performs:

1. `GET /ready` on `traffic-landing`
2. `POST /api/landing-visits`
3. `POST /api/landing-visits/:landingVisitId/cta-clicks`
4. `GET` on the returned `trackerHandoffUrl` with manual redirect handling
5. assertion that tracker returns a Telegram `302`

## Scope

- The reference app in `apps/gardencompass-landing-v3` stays untouched.
- This landing stays isolated under `apps/gardencompass-landing-v5`.
- Direct Telegram links are not used by this UI anymore.
