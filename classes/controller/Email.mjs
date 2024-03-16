import { Controller } from '@lionrockjs/mvc';
import { ControllerMixinMultipartForm } from '@lionrockjs/mod-form';
import { ControllerMixinDatabase, ControllerMixinMime, Central, ORM } from '@lionrockjs/central';

const Mail = await ORM.import('Mail');
const Unsubscribe = await ORM.import('Unsubscribe');
const HelperMail = await Central.import('helper/Mail');

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

    this.state.get(ControllerMixinDatabase.DATABASE_MAP).set('mail', Central.config.mail.dbMail);
  }

  async action_view() {
    const database = this.state.get(ControllerMixinDatabase.DATABASES).get('mail');
    const mail = await ORM.factory(Mail, this.request.params.id, { database });
    this.body = await new HelperMail().read(mail.html_template, JSON.parse(mail.tokens));
  }

  async action_unsubscribe(){

  }

  async action_unsubscribe_post(){
    const database = this.state.get(ControllerMixinDatabase.DATABASES).get('mail');
    const $_POST = this.state.get(ControllerMixinMultipartForm.POST_DATA);
    const $_GET = this.state.get(ControllerMixinMultipartForm.GET_DATA);

    const mail = await ORM.factory(Mail, $_POST['message_id'], { database });
    const recipients = new Set(mail.recipient.replaceAll(' ', '').split(','));
    if(recipients.has($_POST['email'])){
      await ORM.create(Unsubscribe, {database});
    }

    if($_POST['destination'] || $_GET['cp']){
      await this.redirect($_POST['destination'] || $_GET['cp']);
    }else{
      await this.redirect(`/${this.language}/unsubscribe/thank-you`);
    }
  }

  async action_unsubscribe_thankyou(){

  }
}
