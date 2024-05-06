import { RouteList, Central } from '@lionrockjs/central';

RouteList.add(`/webhook/${Central.config.mail.webhookKey}/:service/:type`, 'controller/Webhook', 'notification', 'POST');
RouteList.add('/email/view/:id', 'controller/Email', 'view');

RouteList.add('/unsubscribe/:id', 'controller/Email', 'unsubscribe');
RouteList.add(`${Central.config.language?.route || '/:language'}/unsubscribe/:id`, 'controller/Email', 'unsubscribe');

RouteList.add('/unsubscribe/thank-you', 'controller/Email', 'unsubscribe_thankyou');
RouteList.add(`${Central.config.language?.route || '/:language'}/unsubscribe/thank-you`, 'controller/Email', 'unsubscribe_thankyou');