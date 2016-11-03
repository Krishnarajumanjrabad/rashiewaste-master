import {Component} from "@angular/core";
import {Platform, ionicBootstrap} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {TabsPage} from "./pages/tabs/tabs";
import {LoginPage} from "./pages/login/login";
import {AuthicationService} from "./providers/authication-service/authication-service";
import {GallaryService} from "./providers/gallary-service/gallary-service";
import {EnquiryService} from "./providers/enquiry-service/enquiry-service";
import {FeedbackService} from "./providers/feedback-service/feedback-service";
import {ConnectivityService} from "./providers/connectivity-service/connectivity-service";
import {EventsPublisher} from "./providers/events-publisher/events-publisher";
import {SendPhotoServices} from "./providers/send-photo-services/send-photo-services";
import {ProductCatalogService} from "./providers/product-catalog-service/product-catalog-service";
import {HTTP_PROVIDERS} from "@angular/http";
import {EmailService} from "./providers/email-service/email-service";
/*import * as fs from "fs";
import * as path from "path";*/





@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [GallaryService, AuthicationService, EnquiryService, FeedbackService, ConnectivityService, EventsPublisher, SendPhotoServices, ProductCatalogService, EmailService, HTTP_PROVIDERS]
})
export class MyApp {

  public rootPage: any;

  db: any;


  constructor(private platform: Platform, public connectivityService: ConnectivityService, public emailService: EmailService) {

    this.rootPage = TabsPage;
    this.loadDataFromDB();
  
    this.emailService.sendEmail( "krishna_mr007@hotmail.com", "RashiEwate portal Registration",                       "<body>" +
      "Dear "+ "Krishnaraju Manjrabad," +
      " <p> Thanks for the registering to RashiEwaste App. </p>" +
      "<p> Please click the below link for successful activiation process</p>"+
      "<p> <a href='url'> click here for activation</a> </p>"+
      "<p> In future, please use your email id for all the correspondance with RashiEWaste portal</p>"+
      "<p> With Regards, </p>"+
      "<p>RashiEwaste Admin </p>"+
      "</body>" );
    this.checkPreviousAuthorization();
    console.log("printing the db connection" + this.db);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  private checkPreviousAuthorization() {
    if ((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null) &&
      (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null)) {
      this.rootPage = LoginPage;
    } else {
      this.rootPage = TabsPage;
    }
  }

  private loadDataFromDB() {


    if (this.db == null || this.db == "undefined") {
      this.db = ConnectivityService.getDatabaseConnection();
    }
    console.log("iniating the process of db sync and replication from remoter db server to phone");

  }

/*
  private sendingGmailTest3(){
    /!*const smtpConfiguration = {
      host: 'localhost',
      port: 25,
      secure: false, // use TLS
      //ignoreTLS: true,
     // tls: { rejectUnauthorized: true},
      auth: {
        user: 'krishnarajumanjrabad@gmail.com',
        pass: 'Ganesh12*#'
      }
    };*!/




// any options can be set here...
 /!*   Gmailer.options({
      smtp: {
        service: "Gmail",
        user: "krishnarajumanjrabad@gmail.com",
        pass: "Ganesh12*#"
      }
    });*!/

   /!* var transporter = nodemailer.createTransport("SMTP",{
     service: "Gmail", // sets automatically host, port and connection security settings
     auth: {
     user: "krishnarajumanjrabad@gmail.com",
     pass: "Ganesh12*#"
     }
     });*!/
    // listen for token updates (if refreshToken is set)
// you probably want to store these to a db
  /!*  generator.on('token', function(token){
      console.log('New token for %s: %s', token.user, token.accessToken);
    });*!/

// login
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
          user: 'krishnarajumanjrabad@gmail.com',
          clientId: '148975543440-p0s2ch84t3iopnatthhtpkm64896bgui.apps.googleusercontent.com',
          clientSecret: 'MpqEcyNU3OmhaAGdtyWEhfzx',
          refreshToken: '1/wjndQLP2ZC7ElUc5xoV2Ep1pd42uabHXTnitCHJAIVE',
          accessToken: 'ya29.Ci-HAyd7TYUlDqePUvfnuam2gb-gWak6Pkw7eKgxifgk2yxe5B5bIfR0L0eLTqFFXg'
        })
      }
    });
    const emailOptions = {
      from: 'krishnarajumanjrabad@gmail.com',
      to: 'krishna_mr007@hotmail.com',
      subject: 'Hi this is sample subject',
      text: 'testing',
      html: "<html><head>This is example</head><body>this is sample testing</body></html>"
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(emailOptions, (err, data) => {
        if (err) {
          return reject(err);
        } else {
          console.log('email was sent successfuly');
          return resolve(data);
        }
      });
    });

    /!*const emailOptions = {
      from: from,
      to: to.join(','),
      subject: subject,
      text: text,
      html: html
    };

// any options set here, will overwrite options from above...
    Gmailer.send({
      subject: "Demo Mail",
      template: "./assets/templates/demo.html",
      from: "krishnarajumanjrabad@gmail.com",
      to: {
        email: "krishna_mr007@hotmail.com",
        name: "Five",
        surname: "Johnny"
      },
      data: {
        name: "Five",
        surname: "Johnny",
        id: "28329m82198j"
      }/!*,
      attachments: [
        {
          fileName: "html5.png",
          filePath: "./assets/attachments/html5.png",
          cid: "html5@demo"
        }
      ]*!/
    });*!/



  }
*/
  
  
  /*private sendingGmailTest() {
   var transport = nodemailer
   .createTransport({
   service : 'gmail',
   auth : {
   xoauth2 : xoauth2
   .createXOAuth2Generator({
   user : 'krishnarajumanjrabad@gmail.com',
   clientId : '148975543440-eou44kajvveb9il1pdg9dudlm9lck48m.apps.googleusercontent.com',
   clientSecret : 'SNJ9sjKwgKapTzOyZZ8jwrDc',
   refreshToken : '1/Bwjgej448bqB1SXs7MEIifB5Q0SxJ4m3TxCZ2cyH02g',
   accessToken : 'ya29.Ci-KAw_lmoC0h8eTDaiN3hnkavEp92_AtbRWCl4G6g8oOFkK4rOKKlpnDe4cBDeB9g'
   })
   }
   });
   
   var mailOptions = {
   from : "krishnarajumanjrabad@gmail.com",
   to : "krishna_mr007@hotmail.com",
   subject : "Sample example",
   text : "This is the example email testing"
   };
   
   console.log(mailOptions);
   transport.sendMail(mailOptions, function(error, data) {
   if (error) {
   console.log(error);
   //res.end(error);
   } else {
   console.log("Message is sent" + data.message);
   //res.end("sent");
   return data;
   }
   
   });
   
   
   }*/
}


ionicBootstrap(MyApp, [AuthicationService, GallaryService, EnquiryService, FeedbackService, ConnectivityService, EventsPublisher, SendPhotoServices, ProductCatalogService, EmailService, HTTP_PROVIDERS], {
  backButtonText: 'Go Back',
  iconMode: 'ios',
  modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  tabsPlacement: 'bottom',
  pageTransition: 'ios',
  tabsHighlight: true
});
