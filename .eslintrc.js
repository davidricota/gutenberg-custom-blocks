module.exports = {
  extends: ["plugin:@wordpress/eslint-plugin/recommended"],
  rules: {
    // Custom rules
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "jsdoc/require-param-type": "off",
    "jsdoc/require-returns-type": "off",
  },
  globals: {
    wp: "readonly",
  },
}
