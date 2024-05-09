import { Model } from '@lionrockjs/central';

export default class Unsubscribe extends Model{
  message_id = null;
  recipient = null;

  static joinTablePrefix = 'unsubscribe';
  static tableName = 'unsubscribes';

  static fields = new Map([
    ["message_id", "String!"],
    ["recipient", "String!"]
  ]);
}
