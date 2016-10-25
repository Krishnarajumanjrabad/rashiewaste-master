import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import * as PouchDB from "pouchdb";
import {ConnectivityService} from "../connectivity-service/connectivity-service";
declare var require: Require;
PouchDB.plugin(require('pouchdb-lru-cache'));
/*PouchDB.plugin(require('pouchdb-authentication'));
 PouchDB.plugin(require('pouchdb-upsert'));*/



/*
 Generated class for the GallaryService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class GallaryService {

  images = [];
  firstTime: boolean = false;
  DB_NAME = 'lru__';
  gallaryImages = [];
  file: any;
  private localdb;
  private db;

  constructor(private http: Http) {
    if (this.db == null || this.db == "UNDEFINED") {
      this.db = ConnectivityService.getDatabaseConnection();
    }
  }

  loadImage() {
    this.gallaryImages = [];
    return new Promise(resolve => {

      //this.db.initLru(0);
      this.db.get(this.DB_NAME, {attachments: true}).then((res) => {

        for (let item in res._attachments) {
          this.gallaryImages.push(res._attachments[item]);
        }
        resolve(this.gallaryImages);


      }).catch((err) => {
        console.log(err);
      })
    });
  }

  uploadImage(files) {
    if (files) {
      for (this.file of files) {
        let filename = this.file.name;
        let fileTYpe = this.file.type;

        console.log(this.DB_NAME);

        return new Promise((resolve) => {
          if (this.db == null) {
            this.db = new PouchDB('rashi_db');
          }
          this.db.initLru(0);
          this.db.lru.has(this.DB_NAME).then((hasIt) => {

            console.log(hasIt);
            if (hasIt) {
              // yep, the blob exists
              // var base64 = btoa(this.file);
              this.db.lru.put(this.file.name, this.file, this.file.type).then((result) => {
                // success
                console.log(result);
                console.log('updated the image file');
                return this.db.get(this.DB_NAME, {attachments: true});
              }).then((blob) => {
                console.log(blob);
                return blob;
              }).catch((err) => {
                // failure
                console.log(err);
              });
            } else {

              this.db.lru.put(this.file.name, this.file, this.file.type).then((res) => {
                // success
                console.log(res);
                console.log('insert was successful');
                return this.db.get(this.DB_NAME, {attachments: true});
              }).then(function (blob) {
                return blob;
              }).catch((err) => {
                // failure
                console.log(err);
              });
            }
          });
        });
      }
    }
  }

  private blobEquals(blob, file) {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.onloadend = function () {
        var binary = "";
        var bytes = new Uint8Array(this.result || '');
        var length = bytes.byteLength;

        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        resolve(binary);
      };
      reader.readAsBinaryString(blob);
    });
  }
}
/* this.db.get(this.DB_NAME, {attachments: true}).then( (res) => {
 console.log(res);

 let reader = new FileReader();
 reader.onload = (function ( file ) {
 return function ( e ) {
 var database = new PouchDB('rashi_db');
 database.put('images', filename, res.rev, e.target.result,fileTYpe);
 };
 }) (this.file);
 reader.readAsDataURL(this.file);
 }).catch((err) =>{
 this.db.put({
 _id: this.DB_NAME,
 _attachments: {
 filename: {
 content_type: this.file.type,
 data: this.file
 }
 }
 }).then((res) => {
 console.log(res);
 }).catch( (err) => {
 console.log(err);
 });
 });
 // this.db.putAttachment(this.DB_NAME, this.file.fileName, this.file, this.file.type);

 return new Promise( resolve => {
 this.db.get(this.DB_NAME, {attachments: true}).then( (res) => {

 console.log(res);
 //
 /!*  this.db.putAttachment(this.DB_NAME, filename, this.file, this.file.type).then((res) => {
 //console.log(res +"Attachment added successfully" );
 }).catch( (err) =>{
 return console.log(err);
 });*!/

 this.db.put({
 _id: this.DB_NAME,
 _attachments: {
 filename: {
 content_type: this.file.type,
 data: this.file
 }
 }
 }).then((res) => {
 console.log(res);
 }).catch( (err) => {
 console.log(err);
 });
 });

 }).catch( (err) =>{
 console.log(err);
 this.db.put({
 _id: this.DB_NAME,
 _attachments: {
 filename: {
 content_type: this.file.type,
 data: this.file
 }
 }
 }).then((res) => {
 console.log(res);
 }).catch( (err) => {
 console.log(err);
 });
 });



 }
 }

 }

 }*/

