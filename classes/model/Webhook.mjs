import { Model } from '@lionrockjs/central';

export default class Webhook extends Model{
  service = null;
  type = null;
  value = null;
  entity = null;
  entity_id = null;
  email = null;
  user_key = null;
  user_value = null;

  static joinTablePrefix = 'webhook';
  static tableName = 'webhooks';

  static fields = new Map([
    ["service", "String!"],
    ["type", "String!"],
    ["value", "String!"],
    ["entity", "String"],
    ["entity_id", "String"],
    ["email", "String"],
    ["user_key", "String"],
    ["user_value", "String"]
  ]);
}
