module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn', // Can be "warn" or "error" to enforce unused variable checks
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/no-explicit-any': 'off', // Disable warnings for the "any" type
      '@typescript-eslint/explicit-module-boundary-types': 'warn', // Ensure functions have explicit return types
      '@typescript-eslint/no-unused-expressions': 'warn', // Disallow unused expressions
      '@typescript-eslint/no-empty-function': 'warn', // Warn on empty functions
    },
  },
]
