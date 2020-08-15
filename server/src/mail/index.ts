import { MailService } from './mailservice'

let mailService = new MailService();

//Test command
mailService.sendMail( 
    'fzmadhani@gmail.com',  
    'Hello',  
    'Hello from gmailService',
    'html'
); 