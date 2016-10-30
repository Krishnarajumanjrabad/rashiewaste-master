import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {NavigateToPage} from "../navigate-to/navigate-to";
import {LoginPage} from "../login/login";
import {GallaryPage} from "../gallary/gallary";
import {EnquiryFormPage} from "../enquiry-form/enquiry-form";
import {ContactPage} from "../contact/contact";
import {FeedbackPage} from "../feedback/feedback";
import {WebchatPage} from "../webchat/webchat";
import {AppointmentPage} from "../appointment/appointment";
import {EventBookingPage} from "../event-booking/event-booking";
import {SendPhotosPage} from "../send-photos/send-photos";
import {ProductCatalogPage} from "../product-catalog/product-catalog";
import {AboutPage} from "../about/about";


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  private user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    console.log("printing the user name" + this.user.name);

  }

  mySlideOptions = {
    initialSlide: 1,
    loop: true,
    autoplay: 200,
    speed: 6000,
    pager: true,
    direction: 'horizontal'
  };


  loadMap() {

    this.navCtrl.push(NavigateToPage);

  }

  openEnquiryForm() {
    console.log("OPening the enquiry Form page");
    this.navCtrl.push(EnquiryFormPage);
  }

  openFaceBook() {
    window.open("https://www.facebook.com/krishnaraju.manjrabad", "_system", "location=yes");
    return false;
  }

  openTwitter() {
    window.open("https://twitter.com/krishna_mr", "_system", "location=yes");
    return false;
  }

  openGallery() {
    console.log("opening the Gallary Page");
    this.navCtrl.push(GallaryPage);
  }

  contactUs() {
    console.log("OPening the Contact Us page");
    this.navCtrl.push(ContactPage);
  }

  aboutUS() {
    console.log("OPening the About Us page");
    this.navCtrl.push(AboutPage);
  }

  openFeedback() {
    console.log("OPening the Feed Back page");
    this.navCtrl.push(FeedbackPage);
  }

  openChat() {
    console.log("opening the chatting window");
    this.navCtrl.push(WebchatPage)
  }

  loadAppointment() {
    console.log("opening the appointment window");
    this.navCtrl.push(AppointmentPage);
  }

  openEventsPage() {
    console.log("opening the events Page window");
    this.navCtrl.push(EventBookingPage);
  }

  sendPhotosInformation() {
    console.log("opening the send photos information windows");
    this.navCtrl.push(SendPhotosPage);
  }

  openServicePage(){
    console.log("opening the product Service information windows");
    this.navCtrl.push(ProductCatalogPage);
  }

  logout() {
    console.log("inide the log out");

    window.localStorage.removeItem("user");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");


    this.navCtrl.setRoot(LoginPage);
    // this.navCtrl.popToRoot();


  }
}
