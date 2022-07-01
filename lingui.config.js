module.exports = {
  catalogs: [
    {
      path: '<rootDir>/src/locales/messages/{locale}',
      include: ['<rootDir>/src'],
      exclude: ['**/node_modules/**'],
    },
  ],
  compileNamespace: 'cjs',
  extractBabelOptions: {},
  fallbackLocales: {},
  format: 'po',
  sourceLocale: 'en',
  locales: [
    'en',
    // 'de'
  ],
  orderBy: 'messageId',
  pseudoLocale: '',
  rootDir: '.',
  runtimeConfigModule: ['@lingui/core', 'i18n'],
}
