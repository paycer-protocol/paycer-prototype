const withPlugins = require('next-compose-plugins')
const withSass = require('@zeit/next-sass')
const withFonts = require('nextjs-fonts')
const langConfig = require('./lingui.config.js')
const { locales, sourceLocale } = langConfig


const nextConfig = {
  poweredByHeader: false,
  locale: 'en',
  i18n: {
    locale: 'en',
    locales,
    defaultLocale: sourceLocale,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    })

    return config
  },
}

module.exports = withPlugins([
  [withSass],
  [withFonts],
], nextConfig)
