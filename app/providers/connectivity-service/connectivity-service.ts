import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Network} from "ionic-native";
import {Platform} from "ionic-angular";
import * as PouchDB from "pouchdb";
declare var require: Require;
PouchDB.plugin(require('pouchdb-lru-cache'));
PouchDB.plugin(require('relational-pouch'));
declare var Connection;

/*
 Generated class for the ConnectivityService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ConnectivityService {
  private static db: any;
  private static localdb: any;
  onDevice: boolean;
  private static DB_IP_ADD;
  private static DB_PORT;
  private static DB_NAME;
  private static CONNECTION_URL;


  constructor(public platform: Platform, public http: Http) {
    this.onDevice = this.platform.is('cordova');
    console.log('Hello Database connectivity Provider');


  }

  static getDatabaseConnection() {
    this.DB_IP_ADD = "localhost";

    this.DB_PORT = "5984";

    this.DB_NAME = "rashi_db";
    this.CONNECTION_URL = "http://admin:admin@" + this.DB_IP_ADD + ":" + this.DB_PORT + "/" + this.DB_NAME;

    if (this.db == null || this.db == "UNDEFINED") {
      console.log(this.CONNECTION_URL);

      this.db = new PouchDB(this.CONNECTION_URL);
      //this.localdb = new PouchDB(this.DB_NAME);
      console.log("Connected===>" + this.db);
    }
    /* this.localdb.sync(this.db, {live: true});
     this.localdb.replicate.to(this.db).on('complete', function () {
     // yay, we're done!
     }).on('error', function (err) {
     console.log(err);
     });
     this.db.replicate.to(this.localdb, {
     doc_ids: ['lru__', 'users']
     });
     this.localdb.sync(this.db, {live: true});
     console.log("Connected===>" + this.db);*/
    return this.db;
  }

  isOnline(): boolean {
    if (this.onDevice && Network.connection) {
      return Network.connection !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if (this.onDevice && Network.connection) {
      return Network.connection === Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }


}

