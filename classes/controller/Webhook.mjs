import { Controller } from '@lionrockjs/mvc';
import { ControllerMixinDatabase, Central, ORM } from '@lionrockjs/central';

const Webhook = await ORM.import('Webhook');

export default class ControllerWebhook extends Controller {
  static mixins = [...Controller.mixins, ControllerMixinDatabase];

  constructor(request) {
    super(request);

    this.state.get(ControllerMixinDatabase.DATABASE_MAP).set('webhook', Central.config.mail.dbWebhook);
  }

  async action_notification() {
    this.headers['Content-Type'] = 'application/json';

    const { service } = this.request.params;
    const { type } = this.request.params;
    const webhook = ORM.create(Webhook, { database: this.state.get('databases').get('webhook') });
    Object.assign(webhook, {
      service,
      type,
      value: ((typeof this.request.body) === 'object') ? JSON.stringify(this.request.body) : this.request.body,
    });

    if (service === 'mailgun') {
      const data = this.request.body;
      const event = data['event-data'];
      const userVariable = event['user-variables'];

      webhook.entity = 'message-id';
      webhook.entity_id = event.message.headers['message-id'];
      webhook.email = event.recipient;
      webhook.user_key = userVariable?.key || '';
      webhook.user_value = userVariable?.value || '';
    }

    await webhook.write();

    this.body = JSON.stringify({ success: true, payload: 'received' });
  }
}