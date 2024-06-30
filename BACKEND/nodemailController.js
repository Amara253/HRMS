// emailController.js
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

let emailCount = 0;

const emailCountFilePath = path.join(__dirname, 'emailCount.txt');

// Middleware to read email count from file
const getEmailCountFromFile = () => {
  try {
    const data = fs.readFileSync(emailCountFilePath, 'utf8');
    emailCount = parseInt(data) || 0;
  } catch (err) {
    console.error('Error reading email count from file:', err);
  }
};

// Middleware to save email count to file
const saveEmailCountToFile = () => {
  try {
    fs.writeFileSync(emailCountFilePath, emailCount.toString(), 'utf8');
  } catch (err) {
    console.error('Error saving email count to file:', err);
  }
};

exports. getEmailCount = async (req, res) => {
  getEmailCountFromFile();
  res.json({ count: emailCount });
};


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amarahabib630@gmail.com',
    pass: 'ismy ldlr kgcs mvzi'
  }
});

exports.sendEmail = (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'amarahabib630@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
      emailCount++;
      saveEmailCountToFile();

    }
  });
};
