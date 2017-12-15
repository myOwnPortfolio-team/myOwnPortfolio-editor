/* eslint global-require:off */
/* global navigator */

const PLATFORMS = {
  electron: 'electron',
  browser: 'browser',
};

const platformException = (message) => {
  this.message = message;
  this.type = 'Platform';
};

const getPlatform = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  let platform = PLATFORMS.browser;

  if (userAgent.indexOf(` ${PLATFORMS.electron}/`) > -1) {
    platform = PLATFORMS.electron;
  }

  return platform;
};

const getPlatformModule = (platform) => {
  if (platform === PLATFORMS.electron) {
    return require('electron');
  }
  throw platformException(`No module for platform : ${platform}`);
};

const isElectron = () => getPlatform() === PLATFORMS.electron;
const isBrowser = () => getPlatform() === PLATFORMS.browser;

module.exports = {
  getPlatform,
  getPlatformModule,
  isElectron,
  isBrowser,
};
