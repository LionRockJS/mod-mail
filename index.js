require('kohanajs').addNodeModule(__dirname);

module.exports = {
  ControllerWebhook: require('./classes/controller/Webhook'),
  MailAdapter: require('./classes/MailAdapter'),
  ModelMail: require('./classes/model/Mail'),
  ModelWebhook: require('./classes/model/Webhook'),
  Mail: require('./classes/Mail'),
  MailData: require('./classes/MailData')
};