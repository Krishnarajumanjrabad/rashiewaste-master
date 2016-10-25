import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {FormBuilder, Validators} from "@angular/forms";
import {FeedbackService} from "../../providers/feedback-service/feedback-service";
import {TabsPage} from "../tabs/tabs";

/*
 Generated class for the FeedbackPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/feedback/feedback.html',
})

export class FeedbackPage {
  feedbackForm: any;
  fname: string;
  lname: string;
  type: string;
  feedback: string;
  email: string;
  errorAlert: any;
  feedBackList = [];
  feebBackHeaderList: any[] = [];
  noteMessage: string = "Thank You for the sharing the Feedback with US";

  constructor(private navCtrl: NavController, public fb: FormBuilder, public feedBackService: FeedbackService, public alertCrt: AlertController) {
    this.feedbackForm = fb.group({
      'fname': ['', Validators.required],
      'lname': ['', Validators.required],
      'type': ['', Validators.required],
      'feedback': ['', Validators.required],
      'email': ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });


    this.fname = this.feedbackForm.controls['fname'];
    this.lname = this.feedbackForm.controls['lname'];
    this.type = this.feedbackForm.controls['type'];
    this.feedback = this.feedbackForm.controls['feedback'];
    this.email = this.feedbackForm.controls['email'];
  }

  retrieveFeedBack() {
    console.log('inside the feedback retreive method');
    this.feedBackService.retrieveFeedBackInfo().then((res) => {


      for (let item in res) {

        let feedbackInfo = res[item];
        console.log(feedbackInfo);
        this.feedBackList.push(feedbackInfo);
      }


      console.log(this.feedBackList);
    }).catch((err) => {
      console.log("failed to retrieve DB information" + err);
    });
  }

  removeFeedBack(item) {
    console.log(item);
    this.feedBackList.slice(item);
    this.feedBackService.delete(item);

  }

  feedbackSubmit(form) {
    console.log('inside the enqiry form submission');
    if (form) {
      this.feedBackService.saveFeedBackInfo(form).then((res) => {
        console.log(res);
        this.showAlert();
      }).catch((err) => {
        console.log("error has occured during insert");
      });

    }
  }

  private showAlert() {
    this.errorAlert = this.alertCrt.create({
      title: 'FeedBack Form Notification',
      message: this.noteMessage,
      buttons: [
        {
          text: "Ok",

          handler: data => {
            console.log('Save Clicked');

            this.navCtrl.push(TabsPage);
          }

        }
      ]
    });
    this.errorAlert.present();
  }
}
