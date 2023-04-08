module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  "overrides": [
    {
        "files": "**/*.js",
        "customSyntax": "postcss-html"
    }
  ]
}
