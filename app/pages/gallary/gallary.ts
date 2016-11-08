import {Component, ViewChild, ElementRef, NgZone} from "@angular/core";
import {NavController} from "ionic-angular";
import {GallaryService} from "../../providers/gallary-service/gallary-service";

/*
 Generated class for the GallaryPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/gallary/gallary.html',
})
export class GallaryPage {
  @ViewChild("input")
  private nativeInputBtn: ElementRef;

  gallaryImages: any[] = [];
  attachments: any;
  private blobUtil;
  private base64Image;
  uploading: boolean = true;
  private user: any;


  constructor(private navCtrl: NavController, public imageService: GallaryService, private ngZone: NgZone) {
    this.loadImages();
    this.user = JSON.parse( window.localStorage.getItem( "user" ) );
    console.log( "printing the user name" + this.user.name );
  }

  loadImages() {
    this.gallaryImages = [];
    this.imageService.loadImage().then((res) => {
      for (let image in res) {
        this.gallaryImages.push(res[image]);
      }
  
  
    });

  }


  fileUpload() {
    let files = this.nativeInputBtn.nativeElement.files;
    console.log(files);
    this.imageService.uploadImage(files);

    this.loadImages();
  }

}
