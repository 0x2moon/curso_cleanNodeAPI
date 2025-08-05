const config = async () => {
  const { default: love } = await import('eslint-config-love')

  return [
    {
      ...love,
      // files: ['**/*.ts','src/**/*.ts'],
      files: ['src/**/*.ts'],
      ignores: ['node_modules', 'dist', '.husky'],
    },
  ]
}

export default config()