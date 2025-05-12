/**
 * Copyright (c) 2024 Kojin Nakana
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import path from 'node:path';
import fs from 'node:fs';
import { Model, Central } from '@lionrockjs/central';
import MailAdapter from './MailAdapter.mjs';

const cache = new Map();

export default class TemplateMail {
  static defaultMailAdapter = MailAdapter;

  #adapter
  #previewAdapter
  #templateFolder

  constructor(opts = {}) {
    const {
      adapter = TemplateMail.defaultMailAdapter,
      templateFolder = null,
    } = opts;

    // eslint-disable-next-line new-cap
    this.#adapter = new adapter();
    this.#templateFolder = templateFolder;
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
    } = opts;

    tokens.view_id = tokens.view_id || Model.defaultAdapter.defaultID();

    const content = {
      text,
      html,
      subject
    }

    if(typeof this.#templateFolder ==='string'){
      content.text = await this.readTemplate(this.#templateFolder, content.text);
      content.html = await this.readTemplate(this.#templateFolder, content.html);
    }else if(this.#templateFolder instanceof Map){
      await Promise.all([...this.#templateFolder.entries()].map(async v => {
        content[v[0]] = await this.readTemplate(v[1], content[v[0]])
      }))
    }

    content.text = this.parse(content.text, tokens);
    content.html = this.parse(content.html, tokens);
    content.subject = this.parse(content.subject, tokens);

    const adapter = (preview) ? this.#previewAdapter : this.#adapter;
    const options = { cc, bcc, inlines, attachments, metadata, html: content.html };
    const result = await adapter.send(content.subject, content.text, sender, recipient, options);

    if (!Central.config.mail?.cache) this.clearCache();

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

  async readTemplate(templateFolder, templateFile) {
    if(templateFile === '')return null;
    if(/\.\.|\s/.test(templateFile)) throw new Error('Template File Path cannot contain .. or space');

    const templatePath = `${templateFolder}/${templateFile}`;
    if(cache.get(templatePath))return cache.get(templatePath);

    //handler
    if(/^@/i.test(templateFolder))return templatePath;

    let result = null;
    try{
      result = await fs.promises.readFile(path.normalize(templatePath), 'utf8');
    }catch(e){
      //supress error;
    }

    cache.set(templatePath, result);
    return result;
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

  clearCache(){
    cache.clear();
  }
}