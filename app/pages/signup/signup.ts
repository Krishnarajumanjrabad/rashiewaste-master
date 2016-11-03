import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthicationService} from "../../providers/authication-service/authication-service";
import {LoginPage} from "../login/login";
import {EmailService} from "../../providers/email-service/email-service";

/*
 Generated class for the SignupPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {
  signupForm: any;
  name: string;
  companyName: string;
  password: string;
  confirmPassword: string;
  address: string;
  contactNumber: string;
  email: string;
  errorAlert: any;
  errorMessage: string = "User is already Exist in the system";
  signUpMessage: string = "Registration is complete to Activate, please follow the registered email";
  signAlert: any;


  constructor( private navCtrl: NavController, public fb: FormBuilder, public auth: AuthicationService, public alertCrt: AlertController, public emailService: EmailService ) {
    console.log('Hello Sign Up Page');
    this.signupForm = fb.group({
      'password': ['', [Validators.required, Validators.minLength(8)]],
      'confirmPassword': ['', [Validators.required, Validators.minLength(8)]],
      'companyName': ['', Validators.required],
      'name': ['', Validators.required],
      'address': ['', Validators.required],
      'contactNumber': ['', Validators.required],
      'email': ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });


   this.password = this.signupForm.controls['password'];
    this.companyName = this.signupForm.controls['companyName'];
    this.name = this.signupForm.controls['name'];
    this.confirmPassword = this.signupForm.controls['confirmPassword'];
    this.address = this.signupForm.controls['address'];
    this.contactNumber = this.signupForm.controls['contactNumber'];
    this.email = this.signupForm.controls['email'];
  }

 checkConfirmPasswordValidator(password, confirmPassword) {

      if ( password != null && confirmPassword != null) {

        if(JSON.stringify(password) == JSON.stringify(confirmPassword)){
          return true;
        } else {
          return false;
        }
      }

  }

  signUp(formValue) {
    console.log('inside the signup method');
    if (formValue) {
      console.log('Submitted value: ', formValue.password);
      this.auth.signIn(formValue).then(( res ) => {
        if (res) {
          console.log(res);
          window.localStorage.setItem("user", JSON.stringify(res));
          this.signAlert = this.alertCrt.create({
            title: 'Registration is complete check your email',
            message: this.signUpMessage,
            buttons: [
              {
                text: "Ok",
                handler: data => {
                  console.log('Save Clicked');
                  // this.sendingGmailTest();
                  this.emailService.sendEmail( formValue.email, "RashiEwate portal Registration",                       "<body>" +
                  "Dear "+ formValue.username + ","+
                    " <p> Thanks for the registering to RashiEwaste App. </p>" +
                      "<p> Please click the below link for successful activiation process</p>"+
                      "<p> <a href='url'> click here for activation</a> </p>"+
                      "<p> In future, please use your email id for all the correspondance with RashiEWaste portal</p>"+
                    "<p> With Regards, </p>"+
                    "<p>RashiEwaste Admin </p>"+
                    "</body>" );
                }
      
              }
            ]
          });
          this.signAlert.present();
          console.log('insert was successful');
          this.navCtrl.setRoot(LoginPage);
          this.navCtrl.popToRoot();
        } else {
          this.errorAlert = this.alertCrt.create({
            title: 'Sign Up Failure Message',
            message: this.errorMessage,
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
      }).catch(( err ) => {
        this.errorAlert = this.alertCrt.create({
          title: 'Login Failure Message',
          message: this.errorMessage,
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
      });

    }
  }
}
