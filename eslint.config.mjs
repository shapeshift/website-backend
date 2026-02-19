import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier/recommended'

export default tseslint.config([
  tseslint.configs.recommended,
  prettier,
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'es5',
          printWidth: 120,
          semi: false,
        },
      ],
    },
  },
  {
    ignores: ['node_modules/', 'dist/', '.tmp/', 'types/'],
  },
])
