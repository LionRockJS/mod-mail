const { KohanaJS } = require('kohanajs');
const { RouteList } = require('@kohanajs/mod-route');

RouteList.add(`/webhook/${KohanaJS.config.mail.webhookKey}/:service/:type`, 'controller/Webhook', 'notification', 'POST');
RouteList.add('/email/view/:id', 'controller/Email', 'view');

RouteList.add('/unsubscribe/:id', 'controller/Email', 'unsubscribe');
RouteList.add(`${KohanaJS.config.language?.route || '/:language'}/unsubscribe/:id`, 'controller/Email', 'unsubscribe');

RouteList.add('/unsubscribe/thank-you', 'controller/Email', 'unsubscribe_thankyou');
RouteList.add(`${KohanaJS.config.language?.route || '/:language'}/unsubscribe/thank-you`, 'controller/Email', 'unsubscribe_thankyou');