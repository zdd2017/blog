const baseEnv = require("./env.example")
const devEnv = require("./dev.env.example")
const prodEnv = require("./prod.env.example")

module.exports =
  process.env.NODE_ENV === "production"
    ? {
        ...baseEnv,
        ...prodEnv,
      }
    : {
        ...baseEnv,
        ...devEnv,
      }
