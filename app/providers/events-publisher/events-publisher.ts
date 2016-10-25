import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ConnectivityService} from "../connectivity-service/connectivity-service";

/*
 Generated class for the EventsPublisher provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class EventsPublisher {
  db: any;
  firstTime: boolean = false;
  DB_NAME: string = "appointments";
  DB_NAME_EVENT_BOOK: string = "eventBookings";
  appointmentList: any[] = [];
  private eventsBookingList: any[] = [];

  constructor(private http: Http) {
    if (this.db == null || this.db == "UNDEFINED") {
      this.db = ConnectivityService.getDatabaseConnection();
    }
  }

  retrieveEvents() {
    return new Promise(resolve => {
      this.appointmentList = [];

      this.db.get(this.DB_NAME).then((res) => {

        if (res.appointments.length > 0) {
          for (let appointment of res.appointments) {
            this.appointmentList.push(appointment);
          }

        }
        resolve(this.appointmentList);


      }).catch((err) => {
        console.log("no record found in the DB" + err);
      });
    });
  }

  publishEvent(form) {
    return new Promise(resolve => {
      this.db.get(this.DB_NAME).then((res) => {

        console.log("getting the information of the enquiry" + res);
        if (res) {
          this.appointmentList = [];
          if (res.appointments.length > 0) {
            for (let appointment in res.appointments) {
              this.appointmentList.push(res.enquiries[appointment]);
              console.log(this.appointmentList)
            }
            this.appointmentList.push(form);
            return this.db.put({_id: res._id, appointments: this.appointmentList, _rev: res._rev}).then((doc) => {
              console.log("printing the doc response" + doc);
              resolve(doc);
              console.log("Update was successful");
            }).catch((err) => {
              console.log(err);
            });
          } else {
            this.db.put({_id: this.DB_NAME, appointments: form });
            console.log("insert was successful");
          }
        }

      }).catch((error) => {

        console.log(error);
      });
    });
  }

  retrieveEventsBookings(){
    return new Promise(resolve => {
      this.db.get(this.DB_NAME_EVENT_BOOK).then((res) => {

        console.log("getting the information of the enquiry" + res);
        if (res) {
          this.eventsBookingList = [];
          if (res.eventsBookingList.length > 0) {
            for (let eventBooking in res.eventBookings) {
              this.eventsBookingList.push(res.eventBookings[eventBooking]);
              console.log(this.eventsBookingList)
            }
            resolve(this.eventsBookingList);
          }
        }
      });
    });

  }


  publishEventBooking(eventForm) {
    return new Promise(resolve => {
      this.db.get(this.DB_NAME_EVENT_BOOK).then((res) => {

        console.log("getting the information of the enquiry" + res);
        if (res) {
          this.eventsBookingList = [];
          if (res.eventBookings.length > 0) {
            for (let eventBooking in res.eventBookings) {
              this.eventsBookingList.push(res.eventBookings[eventBooking]);
              console.log(this.eventsBookingList)
            }
            this.eventsBookingList.push(eventForm);
            return this.db.put({_id: res._id, eventBookings: this.eventsBookingList, _rev: res._rev}).then((doc) => {
              console.log("printing the doc response" + doc);
              resolve(doc);
              console.log("Update was successful");
            }).catch((err) => {
              console.log(err);
            });
          } else {
            this.db.put({_id: this.DB_NAME_EVENT_BOOK, eventBookings: eventForm });
            console.log("insert was successful");
          }
        }

      }).catch((error) => {
        this.db.put({_id: this.DB_NAME_EVENT_BOOK, eventBookings: eventForm });
        console.log("insert was successful");
        console.log(error);
      });
    });
  }
}

