import * as nodemailer from 'nodemailer'
import Mail from './MailTypes'
import { reject } from 'bluebird';

const accountInfo = {
    email: "",
    pass: ""
}

export class MailService {
    private _transporter: nodemailer.Transporter;
    private email: string;
    private password: string;
    constructor() {
        this.email = accountInfo.email
        this.password = accountInfo.pass
        this._transporter = nodemailer.createTransport(
            `smtps://${this.email}:${this.password}@smtp.gmail.com`
        );
    }
    sendMail(mail: Mail) {
        return new Promise<void> ( 
            (resolve: (msg: any) => void,  
              reject: (err: Error) => void) => { 
                this._transporter.sendMail(  
                  mail, (error, info) => { 
                    if (error) { 
                      console.log(`error: ${error}`); 
                      reject(error); 
                    } else { 
                        console.log(`Message Sent 
                          ${info.response}`); 
                        resolve(`Message Sent ${info.response}`); 
                    } 
                }) 
              } 
          ); 
    }
    generalSendMail(to: string, subject: string, content: string, html: string): Promise<void> { 
        let options: Mail = { 
          from: this.email, 
          to: to, 
          subject: subject, 
          text: content,
          html: html
        } 
        console.log("Sending a mail")

        return this.sendMail(options)
    }

    composeMailWithoutRecipient(html: string, subject: string): Mail {
        let options: Mail = {
            from: this.email,
            subject: subject,
            html: html
        }

        return options
    }

    attachRecipient(mail: Mail, to: string): Mail {
        mail.to = to
        return mail
    }

    sendMailBulk(mail: Mail, recipients: string[]): Promise<void> {
        if (mail.to) {
            return reject("Mail object specifies sender when it must be undefined")
        } else {
            recipients.forEach((recipient) => {
                var mail = this.attachRecipient(mail, recipient)
                this.sendMail(mail).then((msg) => {
                    console.log(`Message sent to ${recipient}`, msg)
                }).catch((e) => {
                    console.log(`Error sending message to ${recipient}:`, e)
                })
            })
        }
    }

    

}