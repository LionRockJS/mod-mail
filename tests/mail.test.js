import { Central } from '@lionrockjs/central';
import MailModel from '../classes/model/Mail.mjs';
Central.classPath.set('model/Mail.mjs', MailModel);

import Mail from '../classes/Mail.mjs';
import MailAdapter from '../classes/MailAdapter.mjs';

describe('mail test', () => {
  test('constructor', async () => {
    const mail = new Mail({domain: 'localhost', ip: '127.0.0.1', adapter : Mail.defaultMailAdapter,});
    const result = await mail.send('subject', 'message', 'test@kohanajs.com', 'hello@kohanajs.com');
    expect(result.id).toBe("00000");
    expect(result.payload.message).toBe("PREVIEW always sent successfully");
    expect(result.status).toBe('success');
    expect(result.payload.text).toBe('message');
    expect(result.payload.html).toBe('');
  });

  test('preview direct text', async () => {
    const mail = new Mail({domain: 'localhost', ip: '127.0.0.1'});

    const result = await mail.send('subject', 'txt', 'TEST', '20221234', {
      preview: true,
    });

    expect(result.payload.text).toBe('txt');
  })

  test('preview direct text, ignore token', async () => {
    const mail = new Mail({domain: 'localhost', ip: '127.0.0.1'});

    const result = await mail.send('subject', 'txt', 'TEST', '20221234', {
      tokens: {'message': 'hello world'},
      preview: true,
    });

    expect(result.payload.text).toBe('txt');
  })

  test('text with placeholder', async () => {
    const mail = new Mail({domain: 'localhost', ip: '127.0.0.1'});

    const result = await mail.send('subject', 'hey {{@message}}', 'TEST', '20221234', {
      tokens: {'message': 'hello world'},
      preview: true,
    });

    expect(result.payload.text).toBe('hey hello world');
    expect(result.payload.html.length).toBe(0);
  })

  test('html with placeholder', async () => {
    const mail = new Mail({domain: 'localhost', ip: '127.0.0.1'});

    const result = await mail.send('subject', 'hey {{@message}}', 'TEST', '20221234', {
      tokens: {'message': 'hello world'},
      html: '<div>{{@message}}</div>',
      preview: true,
    });

    expect(result.payload.text).toBe('hey hello world');
    expect(result.payload.html).toBe('<div>hello world</div>');
  })

  test('preview with all template', async () => {
    const mail = new Mail({
      domain: 'localhost',
      ip: '127.0.0.1',
      templateFolder: `${__dirname}/edm`
    });

    const result = await mail.send('subject', 'test.txt', 'TEST', '20221234', {
      html:'test.html',
      tokens: {'message': 'hello world'},
      preview: true,
    });

    expect(result.payload.text).toBe('this is test message hello world');
    expect(result.payload.html.replaceAll('\n', '').length).toBe(299);
  })

  test('preview with direct text, html template', async () => {
    const mail = new Mail({
      domain: 'localhost',
      ip: '127.0.0.1',
      templateFolder: new Map([
        ['html', `${__dirname}/edm`]
      ])
    });

    const result = await mail.send('subject', 'hello {{@message}}', 'TEST', '20221234', {
      html:'test.html',
      tokens: {'message': 'hello world'},
      preview: true,
    });

    expect(result.payload.text).toBe('hello hello world');
    expect(result.payload.html.replaceAll('\n', '').length).toBe(299);
  })

  test('template not found', async () => {

  })

  test('template use handle', async () => {
    const mail = new Mail({
      domain: 'localhost',
      ip: '127.0.0.1',
      templateFolder: '@edm'
    });

    const result = await mail.send('subject', 'test::text', 'TEST', '20221234', {
      html:'test::html',
      tokens: {'message': 'hello world'},
      preview: true,
    });

    expect(result.payload.text).toBe('@edm/test::text');
    expect(result.payload.html).toBe('@edm/test::html');
  })

  test('read log', async () => {
    const adapter = new MailAdapter();
    const result = await adapter.readLog('test');
    expect(result.get('lorem-id').click).toBe(0)
    expect(result.get('lorem-id').open).toBe(0)
  })
});