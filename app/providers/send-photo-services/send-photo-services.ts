import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ConnectivityService} from "../connectivity-service/connectivity-service";
var blobUtil = require('blob-util');
/*
 Generated class for the SendPhotoServices provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SendPhotoServices {
  db: any;
  DB_NAME: string = "sendPhotos";
  private showPageList: any[] = [];
  private file: any;
  matchFound: boolean = false;
  sendPhotos: any[] = [];
  companyId: any;
  sendPhotoId: any;
  base64StringInfo: string;

  constructor(private http: Http) {
    if (this.db == null || this.db == "UNDEFINED") {
      this.db = ConnectivityService.getDatabaseConnection();
    }
    this.db.setSchema([
      {
        singular: 'company',
        plural: 'companies',
        relations: {
          'sendPhoto': {belongsTo: 'sendPhoto'}
        }
      },
      {
        singular: 'sendPhoto',
        plural: 'sendPhotos',
        relations: {
          'company': {belongsTo: 'company'}
        }
      }
    ]);
  }

  upload(form, file, type) {
    if (form && file) {
      return new Promise((resolve, reject)=> {
        this.db.rel.find('company').then((result) => {
          console.log(result);
          if (result) {
            for (let company of result.companies) {
              this.companyId = company.id;
              this.sendPhotoId = company.sendPhoto;
              if (JSON.stringify(company) == JSON.stringify(form)) {
                console.log("match found record already exist");
                this.matchFound = true;
              }
            }
            if (!this.matchFound) {
              resolve(this.extracted(form, file, this.companyId, this.sendPhotoId));
            }
          }
        }).catch((error) => {
          this.extracted(form, file, null, null);
          reject(error);
        });
      });
    }
  }

  private extracted(form, file, companyid, sendPhotoId) {

    if (companyid) {
      companyid++;
    } else {
      companyid = 1;
    }
    if (sendPhotoId) {
      sendPhotoId++;
    } else {
      sendPhotoId = 2;
    }
    return this.db.rel.save('company', {
      companyName: form.companyName,
      contactName: form.contactPerson,
      contactNumber: form.contactNumber,
      id: companyid,
      sendPhoto: sendPhotoId

    }).then((res) => {
      console.log(res);
      this.db.rel.save('sendPhoto', {
        id: sendPhotoId,
        company: companyid,
        attachments: {
          files: {
            content_type: file.type,
            data: file
          }
        }
      });
    }).then((result) => {
      console.log(result);
      return result;
    });
  }

  getSendPhotos(id) {

    return new Promise((resolve) => {

      this.db.rel.find(id).then((finalResult) => {
        console.log(finalResult);
        resolve(finalResult);
      });
    });
  }

  getImageAttachments(sendPhoto, sendPhotoId, files) {
    let sendPhotosList = [];
    return new Promise((resolve) => {
      this.db.rel.getAttachment(sendPhoto, sendPhotoId, files).then((attachment) => {
        console.log(attachment);
        //  console.log(window.btoa(attachment));
        blobUtil.blobToBase64String(attachment).then(function (base64String) {
          sendPhotosList.push(base64String);
          resolve(sendPhotosList);
        }).catch((err) => {
          console.log(err);
        });

      });
    });

  }
}
/*




 if (finalResult) {
 for (let company of finalResult.companies) {
 this.db.rel.getAttachment('sendPhoto', company.sendPhoto, 'files').then((attachment) => {
 console.log(attachment);
 //  console.log(window.btoa(attachment));
 blobUtil.blobToBase64String(attachment).then(function (base64String) {
 sendPhotosList.push({company: company, data: base64String});

 resolve(finalResult);
 }).catch((err) => {
 console.log(err);
 });

 }).catch((error) => {
 console.log(error);
 });
 }
 */

