const pug = require('pug');
const htmlToText = require('html-to-text');
const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `James Coolidge <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_FROM,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // Send the actual email

    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours family');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (vaild for only 10 minutes)'
    );
  }
};
