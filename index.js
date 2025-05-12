export default {
  filename: import.meta.url,
  configs: ['mail']
}

import ControllerEmail from './classes/controller/Email.mjs';
import MailAdapter from './classes/MailAdapter.mjs';
import ModelMail from './classes/model/Mail.mjs';
import TemplateMail from './classes/TemplateMail.mjs';
import MailData from './classes/MailData.mjs';

export{
  ControllerEmail,
  MailAdapter,
  ModelMail,
  TemplateMail,
  MailData,
}