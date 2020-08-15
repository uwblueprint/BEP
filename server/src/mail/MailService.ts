import * as nodemailer from 'nodemailer'
import Mail from './MailTypes'

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
    sendMail(to: string, subject: string, content: string, html: string): Promise<void> { 
        let options: Mail = { 
          from: this.email, 
          to: to, 
          subject: subject, 
          text: content,
          html: html
        } 
        console.log("Sending a mail")

        return new Promise<void> ( 
            (resolve: (msg: any) => void,  
              reject: (err: Error) => void) => { 
                this._transporter.sendMail(  
                  options, (error, info) => { 
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

}