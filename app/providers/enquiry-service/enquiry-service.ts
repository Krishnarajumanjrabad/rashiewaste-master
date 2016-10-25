import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ConnectivityService} from "../connectivity-service/connectivity-service";

/*
 Generated class for the EnquiryService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class EnquiryService {
  db: any;

  firstTime: boolean = false;
  DB_NAME: string = "enquiry";
  emailIdFound: boolean = false;
  enquiryList = [];
  enquiresLists = [];
  private matchFound: boolean = false;

  constructor(private http: Http) {
    if (this.db == null || this.db == "UNDEFINED") {
      this.db = ConnectivityService.getDatabaseConnection();
    }
  }

  retrieveEnquiriesInfo() {
    return new Promise(resolve => {
      this.enquiresLists = [];

      this.db.get(this.DB_NAME).then((res) => {

        if (res.enquiries.length > 0) {
          for (let enquiry of res.enquiries) {
            this.enquiresLists.push(enquiry);
          }

        }
        resolve(this.enquiresLists);


      }).catch((err) => {
        console.log("no record found in the DB" + err);
      });
    });
  }

  removeEnquiry(item, i) {
    return new Promise(resolve => {
      this.enquiresLists = [];
      this.db.get(this.DB_NAME).then((res) => {

        //this.enquiresLists.push(res.enquiries);

        if (res.enquiries.length > 0) {
          for (let enquiry of res.enquiries) {


            if (JSON.stringify(enquiry) == JSON.stringify(item)) {
              this.matchFound = true;
              var index = res.enquiries.indexOf(enquiry);
              console.log(index);
              res.enquiries.splice(index, 1);
              console.log(res.enquiries);

              console.log("match found");

            }

          }

          if (this.matchFound) {

            this.enquiresLists = res.enquiries;

            console.log(this.enquiresLists);

            this.db.put({_id: this.DB_NAME, enquiries: this.enquiresLists, _rev: res._rev}).then((result) => {
              console.log(result);
            }).catch((err) => {
              console.log(err);
            });


            resolve(this.enquiresLists);
          }
        }

      }).catch((err) => {
        this.enquiresLists.push(item);
        console.log("his is first time entries has been made");
        this.db.put({id: this.DB_NAME, enquires: [this.enquiresLists]});
      });


    });
  }

  send(enquiryForm) {
    return new Promise(resolve => {
      this.db.get(this.DB_NAME).then((res) => {

        console.log("getting the information of the enquiry" + res);
        if (res) {
          this.enquiryList = [];
          for (let enquiry in res.enquiries) {
            this.enquiryList.push(res.enquiries[enquiry]);
            console.log(this.enquiresLists)
          }
          this.enquiryList.push(enquiryForm);

          return this.db.put({_id: res._id, enquiries: this.enquiryList, _rev: res._rev}).then((doc) => {
            console.log("printing the doc response" + doc);
            resolve(doc);
            console.log("Update was successful");
          }).catch((err) => {
            console.log(err);
          });

        }

      }).catch((error) => {

        this.db.put({_id: this.DB_NAME, enquiries: [enquiryForm]});
        console.log("insert was successful");

      });
    });
  }

}

