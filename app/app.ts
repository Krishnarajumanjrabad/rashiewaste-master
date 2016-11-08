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
  
    /*this.emailService.sendEmail( "krishna_mr007@hotmail.com", "RashiEwate portal Registration",                       "<body>" +
      "Dear "+ "Krishnaraju Manjrabad," +
      " <p> Thanks for the registering to RashiEwaste App. </p>" +
      "<p> Please click the below link for successful activiation process</p>"+
      "<p> <a href='url'> click here for activation</a> </p>"+
      "<p> In future, please use your email id for all the correspondance with RashiEWaste portal</p>"+
      "<p> With Regards, </p>"+
      "<p>RashiEwaste Admin </p>"+
     "</body>" );*/
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
