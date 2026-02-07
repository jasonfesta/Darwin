// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";
import { webpackOverride } from "./src/remotion/webpack-override.mjs";

Config.setVideoImageFormat("jpeg");

// Increase timeout for .mov files which are slower to decode
Config.setDelayRenderTimeoutInMilliseconds(120000);

// Render one frame at a time to prevent video decode issues (fixes jumpy exports)
Config.setConcurrency(1);

Config.overrideWebpackConfig(webpackOverride);
