// create this file at config/staging.env.js
// the name and NODE_ENV (below) must match the env-name you added in build/webpack.prod.conf.js

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"testing"',
  COST_PREDICTOR_API: '"https://costpredictorapi"',
})