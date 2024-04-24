import { ORM } from '@lionrockjs/central';
import DefaultMail from './model/Mail.mjs';
const Mail = await ORM.import('Mail', DefaultMail);

export default class MailData {
  static async write(mailResult, opts){

    const mail = ORM.create(Mail, {...opts, insertID: tokens.view_id });
    Object.assign(mail, data, {
      entity,
      entity_id: entityId,
      text_template: textTemplate,
      html_template: htmlTemplate,
      result: JSON.stringify(result),
    });

    await mail.write();
    result.mail = mail;
  }
}