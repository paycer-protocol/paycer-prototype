import { addDecorator } from '@storybook/react'
import { setIntlConfig, withIntl } from 'storybook-addon-intl'

const messages = {
  'en': {},
  'de': {}
};

const formats = {
  'en': {},
  'de': {},
};

const getMessages = (locale) => messages[locale];
const getFormats = (locale) => formats[locale];

// Set intl configuration
setIntlConfig({
  locales: ['en', 'de'],
  defaultLocale: 'de',
  getMessages,
  getFormats,
});

// Register decorator
addDecorator(withIntl);
