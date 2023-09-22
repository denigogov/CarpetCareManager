const mailer = require('./mailer');

mailer.sendMail(
  {
    from: 'dejan-gogov_student2023@wilder.school',
    to: 'denigogov@gmail.com',
    subject: 'This is a test email',
    text: 'Hello world',
    html: '<p>Hello <em>world</em></p>',
  },
  (err, info) => {
    if (err) console.error(err);
    else console.log(info);
  }
);
