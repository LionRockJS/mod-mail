const { ORM } = require('kohanajs');
const Mail = ORM.require('Mail');

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