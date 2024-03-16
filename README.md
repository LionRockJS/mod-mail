# kohanajs-mod-mail

Module for Transactional email

##install
```npm i @kohanajs/mod-mail```

this will install Mail Object with default adapter for preview

add ```require("@kohanajs/mod-mail");``` to application/require.js to load default config file and default routes.

##usage
```
const {Mail} = require('@kohanajs/mod-mail');

const mail = new Mail({
  domain:'localhost',
  ip:'127.0.0.1'
});
await mail.send('this is subject', 'this is body text', 'sender@kohanajs.com', 'recipient@example.com')
```

###templates
```
const mail = new Mail({
  domain:'localhost',
  ip:'127.0.0.1'
  templateFolder: `${__dirname}/edm`
});

const result = await mail.send('subject', 'test.txt', 'TEST', '20221234', {
  html:'test.html',
  tokens: {'message': 'hello world'},
});

//result.payload.text
//result.payload.html
```

###only html template
```
const mail = new Mail({
  domain:'localhost',
  ip:'127.0.0.1'
  templateFolder: new Map([
    ['html', `${__dirname}/edm`]
  ])
});

const result = await mail.send('subject', 'hello {{@message}}', 'TEST', '20221234', {
  html:'test.html',
  tokens: {'message': 'hello world'},
});

//result.payload.text
//result.payload.html
```

###template use handle (WIP)
```
const mail = new Mail({
  domain:'localhost',
  ip:'127.0.0.1'
  templateFolder: '@edm'
});

const result = await mail.send('subject', 'test::text', 'TEST', '20221234', {
  html:'test::html',
  tokens: {'message': 'hello world'},
});
```