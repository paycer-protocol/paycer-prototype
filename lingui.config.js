module.exports = {
  catalogs: [
    {
      path: '<rootDir>/src/locales/messages/{locale}',
      include: ['<rootDir>/src'],
      exclude: ['**/node_modules/**'],
    }
  ],
  compileNamespace: 'cjs',
  extractBabelOptions: {},
  fallbackLocales: {},
  format: 'po',
  sourceLocale: 'en_US',
  locales: [
    'en_US'
  ],
  orderBy: 'messageId',
  pseudoLocale: '',
  rootDir: '.',
  runtimeConfigModule: ['@lingui/core', 'i18n'],
}
