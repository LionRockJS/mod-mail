import url from "node:url";
const __dirname = url.fileURLToPath(new URL('.', import.meta.url)).replace(/\/$/, '');

import {build} from '@lionrockjs/start';

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