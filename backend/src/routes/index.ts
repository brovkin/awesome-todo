import express from 'express';
import nodeMailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import path from 'path';

const hbs = require('nodemailer-express-handlebars');

const router = express.Router();

// mail

router.post('/api/v1/send-email', async (req, res) => {
  const { YANDEX_LOGIN, YANDEX_PASSWORD } = process.env;
  const { name, email, message } = req.body;
  const transporter = nodeMailer.createTransport(
    smtpTransport({
      service: 'yandex',
      host: 'smtp.yandex.ru',
      auth: {
        user: YANDEX_LOGIN,
        pass: YANDEX_PASSWORD,
      },
    })
  );

  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve(__dirname, '../views/partials'),
      layoutsDir: path.resolve(__dirname, '../views/layouts'),
      extname: '.hbs',
      defaultLayout: 'main',
    },
    viewPath: path.resolve(__dirname, '../views/'),
    extName: '.hbs',
  };

  transporter.use('compile', hbs(handlebarOptions));

  const mailOptions = {
    from: 'frontend-bro@yandex.ru',
    to: 'frontend-bro@yandex.ru',
    subject: 'Сообщение с сайта Awesome Todo App',
    template: 'index',
    context: {
      name,
      email,
      message,
    },
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).json({ ok: false });
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });

  return res.status(200).json({
    ok: true,
  });
});

router.get('/privacy-policy', (req, res, next) => {
  res.render('privacy-policy', { layout: 'main' });
});

export default router;
