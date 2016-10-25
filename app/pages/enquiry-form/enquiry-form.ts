import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {FormBuilder, Validators} from "@angular/forms";
import {EnquiryService} from "../../providers/enquiry-service/enquiry-service";
import {TabsPage} from "../tabs/tabs";


/*
 Generated class for the EnquiryFormPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/enquiry-form/enquiry-form.html',
})
export class EnquiryFormPage {

  enquiryForm: any;
  name: string;
  comment: string;
  telephone: string;
  email: string;
  enquriesList: any[] = [];

  errorAlert: any;
  noteMessage: string = "Thank You for the posting enquiry; team shall get back to you";

  constructor(private navCtrl: NavController, public fb: FormBuilder, public enquiry: EnquiryService, public alertCrt: AlertController) {

    console.log('Hello Enquiry Page Information');
    this.enquiryForm = fb.group({
      'name': ['', Validators.required],
      'comment': ['', Validators.required],
      'telephone': ['', Validators.required],
      'email': ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });


    this.name = this.enquiryForm.controls['name'];
    this.comment = this.enquiryForm.controls['comment'];
    this.telephone = this.enquiryForm.controls['telephone'];
    this.email = this.enquiryForm.controls['email'];

  }

  enquirySubmit(form) {
    console.log('inside the enquiry form');
    if (form) {
      this.enquiry.send(form).then((res) => {
        console.log(res);
        this.showAlert();
        this.navCtrl.push(TabsPage);
      }).catch((err) => {
        console.log(err);
      })
    }

  }

  removeEnquiry(item, i) {
    console.log(item);
    this.enquiry.removeEnquiry(item, i).then((enquriyRes) => {
      console.log(enquriyRes);
      this.enquriesList = this.retrieveEnquireInfo(enquriyRes);
    }).catch((err) => {
      console.log(err);
    });
  }

  retrieveEnquiries() {
    console.log(' inside the enquiry queries information');
    this.enquiry.retrieveEnquiriesInfo().then((res) => {
      console.log(res);
      this.enquriesList = this.retrieveEnquireInfo(res);

    }).catch((err) => {
      console.log("failed to retrieve DB information" + err);
    });
  }

  private showAlert() {
    this.errorAlert = this.alertCrt.create({
      title: 'Enquiry Form Notification',
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

  private retrieveEnquireInfo(enquriyRes) {
    this.enquriesList = [];
    if (enquriyRes.length > 0) {
      for (let item in enquriyRes) {

        this.enquriesList.push(enquriyRes[item]);
      }
    }
    console.log(this.enquriesList);
    return this.enquriesList;
  }
}
