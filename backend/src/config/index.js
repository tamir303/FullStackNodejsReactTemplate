import { defaultConfig } from "./default.js";
import { devConfig } from "./development.js"
import { testsConfig } from "./tests.js"

let config;

switch (process.env?.NODE_ENV) {
    case 'test':
        config = testsConfig
    case 'development':
        config = devConfig
    default:
        config = defaultConfig
}

export default config