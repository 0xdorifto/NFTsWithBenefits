module.exports = {
  extends: [
    'next/core-web-vitals',
    // Add any other extends you're using
  ],
  rules: {
    // Existing rules
  },
  overrides: [
    {
      // Disable specific rules for generated files
      files: ['src/declarations/**/*.js', 'src/declarations/**/*.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
      }
    }
  ],
  ignorePatterns: [
    // Ignore problematic files if needed
    'src/pages/agents/bytecode.ts'
  ]
};
