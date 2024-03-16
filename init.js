const { KohanaJS } = require('kohanajs');
KohanaJS.initConfig(new Map([
  ['mail', require('./config/mail')],
]));