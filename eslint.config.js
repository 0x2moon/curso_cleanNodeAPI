const config = async () => {
  const { default: love } = await import('eslint-config-love')

  return [
    {
      ignores: ['node_modules/**', 'dist/**', '.husky/**', 'coverage/**'], // add coverage também que tinha no eslintignore
    },
    {
      ...love,
      files: ['src/**/*.ts'],
      rules: {
        ...love.rules,
        '@typescript-eslint/class-methods-use-this': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access' : 'off',
        '@typescript-eslint/strict-boolean-expressions' : 'off',
        '@typescript-eslint/method-signature-style' : 'off',
      },
    },
  ]
}

export default config()
