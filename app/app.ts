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

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [GallaryService, AuthicationService, EnquiryService, FeedbackService, ConnectivityService, EventsPublisher, SendPhotoServices, ProductCatalogService]
})
export class MyApp {

  public rootPage: any;

  db: any;


  constructor(private platform: Platform, public connectivityService: ConnectivityService) {

    this.rootPage = TabsPage;
    this.loadDataFromDB();
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


ionicBootstrap(MyApp, [AuthicationService, GallaryService, EnquiryService, FeedbackService, ConnectivityService, EventsPublisher, SendPhotoServices, ProductCatalogService], {
  backButtonText: 'Go Back',
  iconMode: 'ios',
  modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  tabsPlacement: 'bottom',
  pageTransition: 'ios',
  tabsHighlight: true
});
