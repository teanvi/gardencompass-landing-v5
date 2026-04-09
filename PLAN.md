# TDD Plan: Garden Compass Landing V5

| # | Unit | Goal |
|---|------|------|
| 1 | Traffic Landing Contract Helpers | `done` - build the local UI contract layer for `traffic-landing` requests and responses. |
| 2 | CTA Bridge Component | `done` - replace the direct Telegram CTA with a backend-backed bridge that creates a visit and resolves a tracker handoff. |
| 3 | Landing Page Wiring | `done` - connect the Garden Compass v4 copy/layout to the new backend-backed CTA flow without modifying the reference app. |
| 4 | Docs and Smoke Notes | `done` - document env vars, request contract, and local smoke steps for the landing runtime. |
| 5 | Repeatable Live Smoke | `done` - add runnable bridge smoke script that verifies `landing -> traffic-landing -> tracker -> Telegram redirect` up to tracker `302`. |

## Locked Scope

- This app stays isolated under `apps/gardencompass-landing-v5`.
- The reference app `apps/gardencompass-landing-v3` remains untouched.
- `traffic-landing` owns visit and CTA persistence; this app only calls its public contract.
- The CTA must no longer point directly at Telegram.
- The planned public domain is `https://v5.gardencompass.co`.

## Quality Gates

- Keep UI modules presentation-focused and small.
- Keep helper modules thin and testable.
- Complexity target is `<= 10` per function.
- Add any environment-driven behavior as documented config, not hardcoded URLs.
- The smoke script should be runnable with explicit env overrides and should not depend on hidden local state.
