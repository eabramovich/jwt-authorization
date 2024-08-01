import nodemailer from 'nodemailer'

class MailService {

  constructor() {
    this.transporter = nodemailer.createTransport({
      
    })
  }

  async sendActivationMail() {}
}

const mailService = new MailService();

export default mailService;