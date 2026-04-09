import { loadLandingRuntimeConfig } from "../lib/landing-runtime-config.js";
import { runLandingBridgeSmoke } from "../lib/live-smoke.js";

async function main() {
  const result = await runLandingBridgeSmoke({
    config: loadLandingRuntimeConfig()
  });

  console.log(JSON.stringify(result, null, 2));
}

await main();
