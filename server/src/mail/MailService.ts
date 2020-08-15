import * as nodemailer from 'nodemailer'

const email = "faizaanmadhani@@uwblueprint.org"
const password = ""

export class MailService {
    private _transporter: nodemailer.Transporter;
    constructor() {
        this._transporter = nodemailer.createTransport(
            `smtps://${email}:${password}@smtp.gmail.com`
        );
    }
    sendMail(to: string, subject: string, content: string, html: string) { 
        let options = { 
          from: email, 
          to: to, 
          subject: subject, 
          text: content,
          html: html
        } 
        console.log("Sending a mail")

        this._transporter.sendMail( options, (error, info) => {
            if (error) {
                return console.log("error:", error)
            }
            console.log('Message Sent', info.response)
        });
    }

}