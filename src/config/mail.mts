import { MailAdapter } from "../index.js";

export default {
  templateFolder: 'public/media/edm',
  cache: true,
  webhookKey: 'any-example-key',

  adapter: MailAdapter,
  databaseMap: new Map([
    ['mail', 'database/mail.sqlite']
  ])
};
