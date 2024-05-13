const nodemailer = require("nodemailer");

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render("index", {
    page_name: "index",
  });
};
exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};
exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};
exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};
exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};
exports.sendEmail = async (req, res) => {
  try { 
  const outputMessage = `
    <h1> Mail Details </h1>
    <ul>
      <li> Name: ${req.body.name} </li>
      <li> Email: ${req.body.email} </li>
    </ul>
    <h1> Message </h1>
    <p> ${req.body.message} </p>
  `
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "omercanhocaoglu53@gmail.com", // gmail account
      pass: "yaatocrqqfbidazw1111", // gmail password
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Smart EDU Contact Form" <omercanhocaoglu53@gmail.com>', // sender address
    to: "omercanhocaoglu@gmail.com", // list of receivers
    subject: "Smart EDU Contact Form New Message ✔", // Subject line
    html: outputMessage, // html body
  });
    
  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  req.flash("success", "We received your message succesfully");
  res.status(200).redirect('contact');
} catch (err) {
  console.log(err);
  req.flash("error", `Something happened!`);
  res.status(200).redirect('contact');
}
};