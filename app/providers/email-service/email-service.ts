///<reference path="../../../node_modules/rxjs/Observable.d.ts"/>
import {Injectable, NgZone} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";


/*
 Generated class for the EmailService provider.
 
 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class EmailService {
  private socketHost;
  private body: any;
  private text: string;
  private to: string;
  private subject: string;
  
  
  constructor( private http: Http, public zone: NgZone ) {
  }
  
  sendEmail( reciptent, subject, message ) {
    /*let headers = new Headers( {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'cache-control': 'no-cache',
     /!*'content-type': 'application/json'*!/
      'content-type': 'application/x-www-form-urlencoded'
     } );*/
    let contentHeaders = new Headers();
    contentHeaders.append( 'Content-Type', 'application/x-www-form-urlencoded' );
    //contentHeaders.append( 'Content-Type', 'application/json' );
  
  
    let body = 'to=' + reciptent + '&subject=' + subject + '&text=' + message;
    // let body = JSON.stringify({ to: reciptent, text: message, subject: subject });
    console.log( body );
    // let body = JSON.stringify(requestParam);
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions( {headers: contentHeaders, method: "post", body: body} );
   // var params = 'email=email@example.com&amp;pwd=xxxxxx';
  
  
    // let sendingMessage = { to: reciptent, subject: subject, text: message };
    //console.log(sendingMessage);
  
    // var params = 'body=' + requestParam;
  
    /*let options = new RequestOptions( {
     headers: headers
     } );*/
    // this.socketHost = "http://localhost:3000";
    this.zone = new NgZone({enableLongStackTrace: false});
    //this.user = JSON.parse(window.localStorage.getItem("user"));
    //console.log("printing the user name" + this.user.name);
  
    return this.http.post( "http://localhost:3000/send", body, options ).map( response => response.json() )
      .subscribe(
        response => console.log( response.id_token ),
        () => console.log( 'send email is Complete' )
      );
    //var sendingMessage = { to: reciptent, subject: subject, text: message };
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
  }
  
  
}

