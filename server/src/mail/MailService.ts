import * as nodemailer from 'nodemailer';
import MailType from './MailTypes';

const accountInfo = {
    email: '',
    pass: ''
};

export class MailService {
    private transporter: nodemailer.Transporter;
    private email: string;
    private password: string;
    constructor() {
        this.email = accountInfo.email;
        this.password = accountInfo.pass;
        this.transporter = nodemailer.createTransport(`smtps://${this.email}:${this.password}@smtp.gmail.com`);
    }

    public sendMail(mail: MailType) {
        return new Promise<void>((resolve: (msg: any) => void, reject: (err: Error) => void) => {
            this.transporter.sendMail(mail, (error, info) => {
                if (error) {
                    console.log(`error: ${error}`);
                    reject(error);
                } else {
                    console.log(`Message Sent 
                          ${info.response}`);
                    resolve(`Message Sent ${info.response}`);
                }
            });
        });
    }
    public customSendMail(to: string, subject: string, content: string, html: string): Promise<void> {
        const options: MailType = {
            from: this.email,
            html,
            subject,
            text: content,
            to
        };
        console.log('Sending a mail');

        return this.sendMail(options);
    }

    public composeMailWithoutRecipient(html: string, subject: string): MailType {
        const options: MailType = {
            from: this.email,
            html,
            subject
        };

        return options;
    }

    public attachRecipient(mail: MailType, to: string): MailType {
        mail.to = to;
        return mail;
    }

    // pass in a mail object with an undefined recipient field, and a list of recipient emails
    public sendMailBulk(mail: MailType, recipients: string[]): Error {
        if (mail.to) {
            return Error('Mail object specifies sender when it must be undefined');
        } else {
            recipients.forEach(recipient => {
                const finalMail = this.attachRecipient(mail, recipient);
                this.sendMail(finalMail)
                    .then(msg => {
                        console.log(`Message sent to ${recipient}`, msg);
                    })
                    .catch(e => {
                        return Error(`Error sending message to ${recipient}: ${e}`);
                    });
            });
        }
        return null;
    }

    public sendUserMultipleEmails(mails: MailType[], recipient: string): Error {
        mails.forEach(mail => {
            const finalMail = this.attachRecipient(mail, recipient);
            this.sendMail(finalMail)
                .then(msg => {
                    console.log(`Message set to ${recipient}`, msg);
                })
                .catch(e => {
                    return Error(`Error sending message to ${recipient}: ${e}`);
                });
        });
        return null;
    }
}
