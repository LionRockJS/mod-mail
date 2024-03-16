import { ORM } from '@lionrockjs/central';

export default class Mail extends ORM{
  domain = null;
  service = null;
  ip = null;
  entity = null;
  entity_id = null;
  sender = null;
  recipient = null;
  cc = null;
  bcc = null;
  subject = null;
  text_template = null;
  html_template = null;
  tokens = null;
  result = null;

  static joinTablePrefix = 'mail';
  static tableName = 'mail';

  static fields = new Map([
    ["domain", "String"],
    ["service", "String!"],
    ["ip", "String!"],
    ["entity", "String"],
    ["entity_id", "String"],
    ["sender", "String!"],
    ["recipient", "String!"],
    ["cc", "String"],
    ["bcc", "String"],
    ["subject", "String"],
    ["text_template", "String"],
    ["html_template", "String"],
    ["tokens", "String"],
    ["result", "String"]
  ]);
}