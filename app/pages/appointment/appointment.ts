import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {EventsPublisher} from "../../providers/events-publisher/events-publisher";
import {TabsPage} from "../tabs/tabs";

/*
 Generated class for the AppointmentPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/appointment/appointment.html',
})
export class AppointmentPage {
  appointmentForm: any = {};
  private noteMessage = "Event is stored to Database";
  private errorAlert: any;
  private appointmentsList: any[] = [];


  constructor(private navCtrl: NavController, public eventPublished: EventsPublisher, public alertCrt: AlertController) {

    this.retreiveEvents();
  }

  appointmentSubmit() {
    console.log(this.appointmentForm);
    if (this.appointmentForm) {
      this.eventPublished.publishEvent(this.appointmentForm).then((result) => {
        console.log(result);
        console.log("Database was successfully updated");
        this.showAlert();
        this.navCtrl.push(TabsPage);
      }).catch((err) => {
        console.log(err);
      });
    }

  }

  private showAlert() {
    this.errorAlert = this.alertCrt.create({
      title: 'Publish the Notification',
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
    this.eventPublished.retrieveEvents().then((result) => {
      if (result != null) {
        for (let appointment in result) {
          this.appointmentsList.push(result[appointment]);
        }
      }
    }).catch((error) => {
      console.log(error);
    });

  }

  reset() {
    this.appointmentForm = {};
  }
}


/*title: string = "";
 location: string = "";
 startDate: string = "Jun 24 2016";
 timestarts: string;
 timeEnds: string = "Dec 25 2017";
 travel: string = "Immediate";
 alerts: string = "Event Occurrence";*/
