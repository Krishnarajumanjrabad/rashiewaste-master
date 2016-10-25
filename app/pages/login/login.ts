import {Component} from "@angular/core";
import {NavController, LoadingController, AlertController} from "ionic-angular";
import {SignupPage} from "../signup/signup";
import {Validators, FormBuilder} from "@angular/common";
import {AuthicationService} from "../../providers/authication-service/authication-service";
import {TabsPage} from "../tabs/tabs";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthicationService]
})
export class LoginPage {
  loginForm: any;
  email: string = "";
  password: string = "";
  users: any;
  errorMessage: string = "Invalid username or password";
  errorAlert: any;
  loading: any;

  constructor(private navCtrl: NavController, public fb: FormBuilder, public auth: AuthicationService, public loadingCrt: LoadingController, public alertCrt: AlertController) {
    console.log('Hello Login Page');
    this.email = window.localStorage.getItem("username");
    if (this.email == null) {
      this.email = " ";
    }
    this.password = window.localStorage.getItem("password");
    if (this.password == null) {
      this.password = " ";
    }


    this.loginForm = fb.group({
      'email': [' ', Validators.required],
      'password': [' ', Validators.required]

    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];

  }


  signIn() {
    console.log('button is clicked');
    this.navCtrl.push(SignupPage);
  }

  reset( form ) {
    form.email = "";
    form.password = "";
  }

  login(form) {
    console.log('it is inside the onsubmit' + form.email);
    if (form) {
      console.log('inside the login submission');
      this.auth.login(form.email, form.password).then((res) => {

        if (res) {
          console.log(res);

          window.localStorage.setItem("user", JSON.stringify(res));
          this.navCtrl.setRoot(TabsPage);
        } else {
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

        }
      }).catch((error) => {
        console.log("inside the else loop");

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
