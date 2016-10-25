import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {EventsPublisher} from "../../providers/events-publisher/events-publisher";

/*
 Generated class for the EventBookingPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/event-booking/event-booking.html',
})
export class EventBookingPage {

  eventForm: any = {};
  private noteMessage = "Event is stored to Database";
  private errorAlert: any;
  private eventsList: any[] = [];

  constructor(private navCtrl: NavController, public eventPublished: EventsPublisher, public alertCrt: AlertController) {
    this.retreiveEvents();
  }

  eventSubmit() {
    console.log(this.eventForm);
    if (this.eventForm) {
      this.eventPublished.publishEventBooking(this.eventForm).then((result) => {
        console.log(result);
        this.showAlert();
        this.navCtrl.push(TabsPage);
      }).catch((err) => {
        console.log(err);
      });
    }

  }

  private showAlert() {
    this.errorAlert = this.alertCrt.create({
      title: 'Publish the Events Bookings',
      message: this.noteMessage,
      buttons: [
        {
          text: "Ok",
          handler: data => {
            console.log('Save Clicked');
          }
        }
      ]
    });
    this.errorAlert.present();
  }

  retreiveEvents() {
    console.log("inside the retrieve event");
    this.eventPublished.retrieveEventsBookings().then((result) => {
      if (result != null) {
        for (let eventBooking in result) {
          this.eventsList.push(result[eventBooking]);
        }
      }
    }).catch((error) => {
      console.log(error);
    });

  }

  reset() {
    this.eventForm = {};
  }

}
