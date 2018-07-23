// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
    ecmaVersion: 2017
  },
  env: {
    browser: true,
    "jest": true
  },
 
  "extends": [
    "airbnb-base",
    "plugin:vue/recommended"
  ],
  // required to lint *.vue files
  "plugins": [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-trailing-spaces': 0, // set it to 1 to get a warning.,
    'linebreak-style': 0,
    "import/no-unresolved": "off",
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
    "no-underscore-dangle": 0,
    "import/prefer-default-export": 0,
    "no-param-reassign": 0,
    "import/no-extraneous-dependencies": 0,
    "prefer-destructuring": ["error", {
      "AssignmentExpression": {
        "array": false,
        "object": true
      }
    }, 
    {
      "enforceForRenamedProperties": false
    }]
  }
}
