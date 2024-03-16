const {build} = require('kohanajs-start');
build(
  `${__dirname}/webhook.graphql`,
  ``,
  `${__dirname}/exports/webhook.sql`,
  `${__dirname}/../database/webhook.sqlite`,
  `${__dirname}/../classes/model`
)

build(
  `${__dirname}/mail.graphql`,
  ``,
  `${__dirname}/exports/mail.sql`,
  `${__dirname}/../database/mail.sqlite`,
  `${__dirname}/../classes/model`
)