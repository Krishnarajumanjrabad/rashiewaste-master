import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
declare var require: Require;
import * as PouchDB from "pouchdb";
PouchDB.plugin(require('pouchdb-authentication'));

/*
  Generated class for the Facebookservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Facebookservice {
  db: any;
  constructor(private http: Http) {
    this.connectDatabase();
  }

  connectDatabase(){
    //noinspection TyPouchDBpeScriptValidateTypes
    this.db = new PouchDB('rashi_db');
    console.log("database connection was successful"+this.db);
  }

}

