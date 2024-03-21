import { Central } from '@lionrockjs/central';

export default {
  templateFolder: `${Central.EXE_PATH}/../public/media/edm`,
  databasePath: `${Central.EXE_PATH}/../database`,
  database: 'email.sqlite',
  cache: true,
  webhookKey: 'any-example-key',
};
