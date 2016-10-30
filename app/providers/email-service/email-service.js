"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
/*
 Generated class for the EmailService provider.
 
 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var EmailService = (function () {
    function EmailService(http, zone) {
        this.http = http;
        this.zone = zone;
    }
    EmailService.prototype.sendEmail = function (reciptent, subject, message) {
        var headers = new http_1.Headers({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        });
        // var params = 'email=email@example.com&amp;pwd=xxxxxx';
        var params = 'to=' + reciptent + '&message=' + message + '&subject=' + subject;
        var sendingMessage = { to: reciptent, subject: subject, text: message };
        var options = new http_1.RequestOptions({
            headers: headers,
            body: sendingMessage
        });
        this.socketHost = "http://localhost:3000";
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
        //this.user = JSON.parse(window.localStorage.getItem("user"));
        //console.log("printing the user name" + this.user.name);
        this.http.post("/send", { body: sendingMessage }).subscribe(function (success) {
            var data = success.json();
            console.log(data);
        }, function (error) {
            console.log(JSON.stringify(error));
        });
        var sendingMessage = { to: reciptent, subject: subject, text: message };
        /* console.log( headers );
         //console.log( body );
         //  var headers = new Headers();
         //  console.log(reciptent + "" + message);
         // headers.append('Content-Type', 'application/X-www-form-urlencoded');
         
         this.socketHost = "http://localhost:3000";
        // this.zone = new NgZone({enableLongStackTrace: false});
       
         this.http.post(this.socketHost+'/send', mainbodyContent, options ).subscribe(
             data => console.log(data),
             err => console.log( err ),
             () => console.log( 'Email has successfully sent' )
           );*/
        /*sendEmail("krishnarajumanjrabad@gmail.com",
         "Ganesh12*#",
         "TESTING EMAIL-VIA_GMAIL",
         "HELL YEAH !!!!! THIS IS MY MESSAGE",
         "krishna_mr007@hotmail.com");*/
        /* var server = email.server.connect({
         user: 'krishnarajumanjrabad@gmail.com',
         password: 'Ganesh12*#',
         host: 'smtp.gmail.com',
         port: 465,
         ssl: true,
         tls: true
         });
         console.log(server);
         
         server.send({
         to: 'krishna_mr007@hotmail.com',
         from: 'krishnarajumanjrabad@gmail.com',
         subject: 'Hello this is sample test from ionic',
         text: 'sample example'
         }, (error, data ) =>{
         if (error){
         console.log('some problem in sending the email' + error);
         }
         console.log(data);
         console.log('email has been send to the reciptent');
         });*/
        /* let url = 'http://115.249.199.40/etc/apps/webmail';
         let headers = new Headers();
         let creds = 'name='+ 'Test@rashiewaste.com'+ '&password='+ 'test123';
         
         headers.append('Content-Type', 'application/X-wwww-form-urlencoded');
         this.http.post(url,creds, {headers: headers}).subscribe( (data) =>{
         console.log(data);
         if (data.json().onSuccess){
         this.http.post(url, reciptent, {headers: headers}).subscribe((data) => {
         console.log(data);
         });
         }
         });*/
    };
    EmailService = __decorate([
        core_1.Injectable()
    ], EmailService);
    return EmailService;
}());
exports.EmailService = EmailService;
