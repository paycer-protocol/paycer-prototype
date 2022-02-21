const withPlugins = require('next-compose-plugins')
const withFonts = require('nextjs-fonts')
const langConfig = require('./lingui.config.js')
const { locales, sourceLocale } = langConfig
const path = require('path')


const nextConfig = {
  poweredByHeader: false,
  locale: 'en',
  i18n: {
    locale: 'en',
    locales,
    defaultLocale: sourceLocale,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'assets')],
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]'
          }
        }
      },
      )
    return config
  },
}

module.exports = withPlugins([
  [withFonts],
], nextConfig)


