import { Model } from '@lionrockjs/central';

export default class Mail extends Model{
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
  text = null;
  html = null;
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
    ["text", "String"],
    ["html", "String"],
    ["tokens", "String"],
    ["result", "String"]
  ]);
}
