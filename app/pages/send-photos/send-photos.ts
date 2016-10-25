import {Component, ViewChild, ElementRef} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {FormBuilder, Validators} from "@angular/forms";
import {SendPhotoServices} from "../../providers/send-photo-services/send-photo-services";
var blobUtil = require('blob-util');
var base64 = require('base-64');
var utf8 = require('utf-8');

/*
 Generated class for the SendPhotosPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/send-photos/send-photos.html',
})
export class SendPhotosPage {
  @ViewChild("input")
  private nativeInputBtn: ElementRef;
  sendPhotoForm: any;
  companyName: string;
  contactPerson: string;
  contactNumber: string;
  uploadFile: any;
  DB_NAME: string = "sendPhotos";
  file: any;
  base64file: string;
  sendPhotos: any[] = [];

  constructor(private navCtrl: NavController, public fb: FormBuilder, public sendPhotoService: SendPhotoServices, public alertCrt: AlertController) {
    this.sendPhotoForm = fb.group({
      'companyName': ['', Validators.required],
      'contactPerson': ['', Validators.required],
      'contactNumber': ['', [Validators.required, Validators.maxLength(10)]]
    });


    this.companyName = this.sendPhotoForm.controls['companyName'];
    this.contactPerson = this.sendPhotoForm.controls['contactPerson'];
    this.contactNumber = this.sendPhotoForm.controls['contactNumber'];
    this.uploadFile = this.sendPhotoForm.controls['uploadFile'];

    this.loadExistingSendPhotos();
  }

  saveSendItems(form) {
    console.log("inside the send Photo information");
    console.log(form);
    let files = this.nativeInputBtn.nativeElement.files;
    console.log(files);
    for (this.file of files) {
      let filename = this.file.name;
      let contentType = this.file.type;
      let customer = form;
      this.sendPhotoService.upload(customer, this.file, this.file.type).then((result) => {
        let sendPhotos = [];
        console.log(result);
        this.loadExistingSendPhotos();

      });

    }
  }

  loadExistingSendPhotos() {
    this.sendPhotos = [];
    let dataArr = [];
    return new Promise((resolve, reject) => {
      this.sendPhotoService.getSendPhotos('companies').then((res) => {
        console.log(res);
        if (res) {

          let keyArr: any[] = Object.keys(res);
          keyArr.forEach((key: any) => {
            console.log(res[key]);
            if (key == "companies") {
              dataArr.push(res[key]);
              console.log(dataArr);

            }
            //dataArr.push(res[key]);
          });

          let retreiveAttObject: any[] = Object.keys(dataArr);
          retreiveAttObject.forEach((key: any) => {
            console.log(dataArr[key]);
            for (let sendPhoto of dataArr[key]) {
              console.log(sendPhoto);
              this.sendPhotoService.getImageAttachments('sendPhoto', sendPhoto.sendPhoto, 'files').then((res) => {

                this.sendPhotos.push({company: sendPhoto, data: res});
              });
            }

            resolve(this.sendPhotos);
          });
        }

      }).catch((err) => {
        console.log(err);
      });

    });
  }

}
