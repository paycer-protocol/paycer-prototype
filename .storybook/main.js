const path = require('path')

module.exports = {
  stories: [
    '../src/components/**/*.stories.mdx',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-intl/register',
  ],
  presets: [
    path.resolve(__dirname, './next-preset.js')
  ],
}
