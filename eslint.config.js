const config = async () => {
  const { default: love } = await import('eslint-config-love')

  return [
    {
      ...love,
      files: ['**/*.ts'],
      ignores: ['node_modules', 'dist'],
    },
  ]
}

export default config()