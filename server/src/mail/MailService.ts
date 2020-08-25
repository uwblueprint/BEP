import * as nodemailer from 'nodemailer'
import MailType from './MailTypes'

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
    sendMail(mail: MailType) {
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
    customSendMail(to: string, subject: string, content: string, html: string): Promise<void> { 
        let options: MailType = { 
          from: this.email, 
          to: to, 
          subject: subject, 
          text: content,
          html: html
        } 
        console.log("Sending a mail")

        return this.sendMail(options)
    }

    composeMailWithoutRecipient(html: string, subject: string): MailType {
        let options: MailType = {
            from: this.email,
            subject: subject,
            html: html
        }

        return options
    }

    attachRecipient(mail: MailType, to: string): MailType {
        mail.to = to
        return mail
    }
    //Pass in a mail object with an undefined recipient field, and a list of recipient emails
    sendMailBulk(mail: MailType, recipients: string[]): Error {
        if (mail.to) {
            return Error("Mail object specifies sender when it must be undefined")
        } else {
            recipients.forEach((recipient) => {
                var finalMail = this.attachRecipient(mail, recipient)
                this.sendMail(finalMail).then((msg) => {
                    console.log(`Message sent to ${recipient}`, msg)
                }).catch((e) => {
                    return Error(`Error sending message to ${recipient}: ${e}`)
                })
            })
        }
        return null
    }

    sendUserMultipleEmails(mails: MailType[], recipient: string): Error {
        mails.forEach((mail) => {
            var finalMail = this.attachRecipient(mail, recipient)
            this.sendMail(finalMail).then((msg) => {
                console.log(`Message set to ${recipient}`, msg)
            }).catch((e) => {
                return Error(`Error sending message to ${recipient}: ${e}`)
            });
        })
        return null
    }  

}