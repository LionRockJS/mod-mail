/**
 * Copyright (c) 2025 Kojin Nakana
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * this is base on mod-mail/Mail without template loading
 */

import { Model } from '@lionrockjs/central';
import { MailAdapter } from '@lionrockjs/mod-mail';

export default class Mail {
  static defaultMailAdapter = MailAdapter;

  #adapter
  #previewAdapter

  constructor(opts = {}) {
    const {
      adapter = Mail.defaultMailAdapter,
    } = opts;

    // eslint-disable-next-line new-cap
    this.#adapter = new adapter();
    this.#previewAdapter = new MailAdapter();
  }

  /**
   *
   * @param {string} subject
   * @param {string} text
   * @param {string} sender
   * @param {string} recipient
   * @param {object=} opts
   * @param {string=} opts.cc
   * @param {string=} opts.bcc
   * @param {string=} opts.html
   * @param {string[]=} opts.inlines
   * @param {string[][]=} opts.attachments ['filename', 'data-path']
   * @param {object=} opts.tokens
   * @param {string[][]=} opts.metadata ['user', '12345']
   * @param {boolean=} opts.preview
   * @returns {Promise<unknown>}
   */

  async send(subject, text, sender, recipient, opts = {}) {
    const {
      cc = '',
      bcc = '',
      html='',
      inlines = [],
      attachments = [],
      tokens = {},
      metadata = '',
      preview = false,
      project = undefined,
      dynamoDB = undefined,
    } = opts;

    tokens.view_id = tokens.view_id || Model.defaultAdapter.defaultID();

    const content = {
      text,
      html,
      subject
    }

    content.text = this.parse(content.text, tokens);
    content.html = this.parse(content.html, tokens);
    content.subject = this.parse(content.subject, tokens);

    const adapter = (preview) ? this.#previewAdapter : this.#adapter;
    const options = { cc, bcc, inlines, attachments, metadata, html: content.html, project, dynamoDB};

    const result = await adapter.send(content.subject, content.text, sender, recipient, options);
    return {
      ...result,
      args:{
        service: this.#adapter.service,
        sender,
        recipient,
        cc,
        bcc,
        subject,
        tokens: JSON.stringify(tokens),
      }
    };
  }

  parse(rawText, tokens={}){
    if(!rawText)return "";

    let result = rawText;
    Object.keys(tokens).forEach(key => {
      const regExp = new RegExp(`{{@?${key}}}`, 'gi');
      result = result.replace(regExp, tokens[key]);
    });

    return result;
  }
}