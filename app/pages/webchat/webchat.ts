import {Component, NgZone} from "@angular/core";
import {Http} from "@angular/http";
declare var require: Require;
var io = require('socket.io-client');

/*
 Generated class for the WebchatPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/webchat/webchat.html',
})
export class WebchatPage {
  private socketHost;
  private messages: any[] = [];
  private zone;
  private chatBox;
  private socket;
  private user: any;


  constructor(http: Http, zone: NgZone) {
    //this.messages = [];
    this.socketHost = "http://localhost:3000";
    this.zone = new NgZone({enableLongStackTrace: false});
    this.user = JSON.parse(window.localStorage.getItem("user"));
    console.log("printing the user name" + this.user.name);

    http.get(this.socketHost + "/chat").subscribe((success) => {
      var data = success.json();
      console.log(data);
      for (let messageInfo in data) {
        console.log(data[messageInfo].id + " " + data[messageInfo].message);
        this.messages.push(data[messageInfo]);
      }
    }, (error) => {
      console.log(JSON.stringify(error));
    });

    this.chatBox = "";
    this.socket = io(this.socketHost);
    this.socket.on("chat_message", (msg) => {
      this.zone.run(() => {
        this.messages.push({id: msg.id, message: msg.message});
      });
    });
  }

  send(message) {
    if (message && message != "") {
      let msg = {
        id: this.user.name,
        message: message
      };


      this.socket.emit("chat_message",msg);
        this.chatBox = "";

    }

  }

}
