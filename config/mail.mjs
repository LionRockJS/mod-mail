import { Central } from '@lionrockjs/central';
import { MailAdapter } from "../index.js";

export default {
  templateFolder: `${Central.EXE_PATH}/../public/media/edm`,
  cache: true,
  webhookKey: 'any-example-key',

  adapter: MailAdapter,
  databaseMap: new Map([
    ['mail', `${Central.APP_PATH}/../database/mail.sqlite`]
  ])
};
