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


  constructor(private navCtrl: NavController, public imageService: GallaryService, private ngZone: NgZone) {
    this.loadImages();
  }

  loadImages() {
    this.gallaryImages = [];
    this.imageService.loadImage().then((res) => {
      for (let image in res) {
        this.gallaryImages.push(res[image]);
      }

      /* for(let item in res._attachments){
       this.gallaryImages.push(res._attachments[item]);
       console.log(this.gallaryImages);
       }*/

      /* let imagefile = Object.keys(res), fileAttachments, file, fileObjectInfo;
       let images = [];
       imagefile.map(function (f) {
       if (f == '_attachments') {
       let fileAttachments = res[f];

       for (let file in fileAttachments) {
       fileObjectInfo = 'data:' + fileAttachments[file].content_type + ';base64,' + fileAttachments[file].data;
       images.push(fileObjectInfo);
       }
       }
       });

       this.gallaryImages = images;*/
    });

  }


  fileUpload() {
    let files = this.nativeInputBtn.nativeElement.files;
    console.log(files);
    this.imageService.uploadImage(files);

    this.loadImages();
  }

}
