import next from 'eslint-config-next/core-web-vitals'
import tsPlugin from '@typescript-eslint/eslint-plugin'

// eslint-config-next 16 ships a native flat config (it already bundles
// next/typescript), so FlatCompat is neither needed nor safe here — routing it
// through @eslint/eslintrc crashes the config loader with a circular-structure
// TypeError before a single file is read.
//
// Flat config scopes plugins per config object, so the house rules below have to
// re-declare @typescript-eslint even though next/typescript already loaded it.
const config = [
  ...next,
  { ignores: ['.next/**', 'node_modules/**', 'drizzle/**', 'public/**', 'next-env.d.ts'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
]

export default config
