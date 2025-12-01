import meta from './package.json' with { type: 'json' };

export default {
  name: 'fansarr',
  description: meta.description + ' (Fork of Stasharr by enymawse)',
  version: meta.version,
  author: meta.author,
  source: 'https://github.com/brybell/fansarr',
  updateURL:
    'https://github.com/brybell/fansarr/releases/latest/download/fansarr.meta.js',
  downloadURL:
    'https://github.com/brybell/fansarr/releases/latest/download/fansarr.user.js',
  supportURL: 'https://github.com/brybell/fansarr',
  license: meta.license,
  match: ['*://fansdb.cc/*'],
  require: [],
  grant: [
    'GM_registerMenuCommand',
    'GM_xmlhttpRequest',
    'GM.xmlHttpRequest',
    'GM_getValue',
    'GM_setValue',
    'GM_setClipboard',
  ],
};
