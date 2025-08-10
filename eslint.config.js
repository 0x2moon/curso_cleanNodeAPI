const config = async () => {
  const { default: love } = await import('eslint-config-love')

  return [
    {
      ...love,
      // files: ['**/*.ts','src/**/*.ts'],
      files: ['src/**/*.ts'],
      ignores: ['node_modules', 'dist', '.husky'],
       rules: {
        ...love.rules, // mantém as regras existentes
        '@typescript-eslint/class-methods-use-this': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
      },
    },
    
  ]
}

export default config()