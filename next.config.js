const withSass = require('@zeit/next-sass')
const langConfig = require('./lingui.config.js')
const { locales, sourceLocale } = langConfig

module.exports = withSass({
  locale: 'en_US',
  i18n: {
    locale: 'en_US',
    locales,
    defaultLocale: sourceLocale,
  },
})
