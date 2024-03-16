export default class MailAdapter {
  service = 'PREVIEW';

  /**
   *
   * @param subject
   * @param text
   * @param sender
   * @param recipient
   * @param opts
   * @param opts.cc
   * @param opts.bcc
   * @param opts.html
   * @param opts.inlines
   * @param opts.attachments
   * @param opts.metadata
   * @returns {Promise<{payload: *, status: string}>}
   */
  async send(subject, text, sender, recipient, opts = {}) {
    console.log(`${this.service} send email to ${recipient} using preview mail adapter`);
    return {
      status: 'success',
      payload: {
        message: `${this.service} always sent successfully`,
        text: text,
        html: opts.html,
      },
      id : '00000',
    };
  }

  async readLog(email) {
    console.log(`${this.service} read email log using mail adapter: ${email}`);
    return new Map([
      ['lorem-id', { open: 0, click: 0 }],
    ]);
  }
}
