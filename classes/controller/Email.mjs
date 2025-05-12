import { Controller } from '@lionrockjs/mvc';
import { ControllerMixinMultipartForm } from '@lionrockjs/mixin-form';
import { ControllerMixinDatabase, ControllerMixinMime, Central, ORM } from '@lionrockjs/central';
import TemplateMail from '../TemplateMail.mjs';

import DefaultMail from '../model/Mail.mjs';
import DefaultUnsubscribe from '../model/Unsubscribe.mjs';

const MailModel = await ORM.import('Mail', DefaultMail);
const Unsubscribe = await ORM.import('Unsubscribe', DefaultUnsubscribe);

/**
 * Controller Email
 */
export default class ControllerEmail extends Controller {
  static mixins = [...Controller.mixins,
    ControllerMixinMime,
    ControllerMixinDatabase
  ];

  constructor(request) {
    super(request);
    const databasePath = Central.config.mail.databasePath;
    const database = Central.config.mail.database;

    this.state.get(ControllerMixinDatabase.DATABASE_MAP).set('mail', databasePath + '/' + database);
  }

  async action_view() {
    const database = this.state.get(ControllerMixinDatabase.DATABASES).get('mail');
    const {id} = this.state.get(Controller.STATE_PARAMS);

    const mail = await ORM.factory(MailModel, id, { database });
    const m = new TemplateMail();
    this.state.set(Controller.STATE_BODY, m.parse(mail.html_template, JSON.parse(mail.tokens)));
  }

  async action_unsubscribe(){

  }

  async action_unsubscribe_post(){
    const database = this.state.get(ControllerMixinDatabase.DATABASES).get('mail');
    const $_POST = this.state.get(ControllerMixinMultipartForm.POST_DATA);
    const $_GET = this.state.get(ControllerMixinMultipartForm.GET_DATA);
    const language = this.state.get(Controller.STATE_LANGUAGE);

    const mail = await ORM.factory(MailModel, $_POST['message_id'], { database });
    const recipients = new Set(mail.recipient.replaceAll(' ', '').split(','));
    if(recipients.has($_POST['email'])){
      await ORM.create(Unsubscribe, {database});
    }

    if($_POST['destination'] || $_GET['cp']){
      await this.redirect($_POST['destination'] || $_GET['cp']);
    }else{
      await this.redirect(`/${language}/unsubscribe/thank-you`);
    }
  }

  async action_unsubscribe_thankyou(){

  }
}
