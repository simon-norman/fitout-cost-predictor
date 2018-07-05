'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  COST_PREDICTOR_API: '"https://test-api-fitout-cost-predictor.herokuapp.com"',
})
