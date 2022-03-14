// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const withPlugins = require('next-compose-plugins')
const withFonts = require('nextjs-fonts')
const langConfig = require('./lingui.config.js')
const { locales, sourceLocale } = langConfig
const path = require('path')
const { withSentryConfig } = require('@sentry/nextjs')

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


const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(withPlugins([[withFonts]], nextConfig),sentryWebpackPluginOptions);