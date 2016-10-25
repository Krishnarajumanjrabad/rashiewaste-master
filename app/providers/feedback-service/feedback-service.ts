import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ConnectivityService} from "../connectivity-service/connectivity-service";

/*
 Generated class for the FeedbackService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class FeedbackService {

  emailIdFound: boolean = false;
  DB_NAME = 'feedback';
  feedbackList = [];

  db: any;

  constructor(private http: Http) {
    if (this.db == null || this.db == "UNDEFINED") {
      this.db = ConnectivityService.getDatabaseConnection();
    }

  }

  retrieveFeedBackInfo() {
    return new Promise(resolve => {
      this.db.get(this.DB_NAME).then((res) => {
        console.log(res.feedbacks.length);

        resolve(res.feedbacks);
      })
    }).catch((err) => {
      console.log("no record found in the DB" + err);
    })
  }

  saveFeedBackInfo(form) {
    return new Promise(resolve => {
      this.db.get(this.DB_NAME).then((res) => {

        console.log("getting the information of the enquiry" + res);
        if (res) {
          this.feedbackList = res.feedbacks;
          for (let enquiry of res.feedbacks) {
            if (enquiry.email == form.email) {
              console.log("email is already exist");
              this.emailIdFound = true;

            }

          }

          if (this.emailIdFound) {
            resolve();
            return false;
          } else {

            this.feedbackList.push(form);

            return this.db.put({_id: res._id, feedbacks: this.feedbackList, _rev: res._rev}).then((doc) => {
              resolve(doc);
              console.log("insert was successful");
            }).catch((err) => {
              console.log(err);
            });
          }
        }

      }).catch((error) => {
        console.log(" no record retrieved from the Database, creating new record in the DB by system");
        if (!this.emailIdFound) {
          this.db.put({_id: this.DB_NAME, feedbacks: [form]});
          console.log("insert was successful");
        } else {
          console.log("error has happened");
        }
      });
    });
  }


  delete(item) {
    this.db.delete(item);
    console.log("deleted the record successfully");

  }
}

