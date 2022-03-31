const nodemailer = require('nodemailer');

exports.getIndexpPage = (req, res) => {
    console.log(req.session.userID);
    res.status(200).render('index',{page_name:"index"});
};


exports.getAboutPage = (req, res) => {
    res.status(200).render('about',{page_name:"about"});
};


exports.getRegisterPage = (req, res) => {
    res.status(200).render('register',{page_name:"register"});
};

exports.getLoginPage = (req, res) => {
    res.status(200).render('login',{page_name:"login"});
};

//getContactPage
exports.getContactPage =  async(req, res) => {
    res.status(200).render('contact',{page_name:"contact"});
}

exports.sendEmail = async (req, res) => {
    try{
    console.log(req.body);
    //html template
    let html = `
        <h1>Contact Form</h1>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>   
            <li>Message: ${req.body.message}</li>
        </ul>
    `;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "aniltpuz@gmail.com", // generated ethereal user
          pass: "htvtdhydoulanxuh", // generated ethereal password
        },
      });
    

      let info = await transporter.sendMail({
        from: '"Smart Edu contact from 👻" <aniltpuz@gmail.com>', // sender address
        to: "bopika5435@sartess.com", // list of receivers
        subject: "Hello ✔", // Subject line
        html: html, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      req.flash('success','Email sent successfully');
      res.status(200).redirect('contact');
    }catch(err){

       req.flash("error", `Something happened!`);
         res.status(200).redirect('contact');
    }


}





