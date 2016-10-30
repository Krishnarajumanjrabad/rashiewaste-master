import {Component, ViewChild, ElementRef} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {FormBuilder, Validators} from "@angular/forms";
import {ProductCatalogService} from "../../providers/product-catalog-service/product-catalog-service";

/*
 Generated class for the ProductCatalogPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/product-catalog/product-catalog.html',
})
export class ProductCatalogPage {
  @ViewChild( "input" )
  private nativeInputBtn: ElementRef;
  
  file: any;
  
  productCatalogForm: any;
  catalogName: string;
  categoryName: string;
  subCategoryName: string;
  productName: string;
  productShortDesc: string;
  productLongDesc: string;
  productBrand: string;
  productType: string;
  productPrice: number;
  inventoryName: string;
  inventoryROL: number;
  inventoryQty: number;
  inventoryCurrentDate: string;
  productImagePhotos: any[] = [];

  constructor(private navCtrl: NavController, public fb: FormBuilder, public productCatalogService: ProductCatalogService, public alertCrt: AlertController) {
    console.log('inside the prductCatalogPage');
    this.productCatalogForm = fb.group({
      'catalogName': ['', Validators.required],
      'categoryName': ['', Validators.required],
      'subCategoryName': ['', Validators.required],
      'productName': ['', Validators.required],
      'productShortDesc': ['', Validators.required],
      'productLongDesc': ['', Validators.required],
      'productBrand': ['', Validators.required],
      'productType': ['', Validators.required],
      'productPrice': ['', Validators.required],
      /*'email': ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]*/

      'inventoryName': ['', Validators.required],
    'inventoryROL': ['', Validators.required],
    'inventoryQty': ['', Validators.required],
    'inventoryCurrentDate': ['', Validators.required]
    });


    this.catalogName = this.productCatalogForm.controls['catalogName'];
    this.categoryName = this.productCatalogForm.controls['categoryName'];
    this.subCategoryName = this.productCatalogForm.controls['subCategoryName'];
    this.productName = this.productCatalogForm.controls['productName'];
    this.productShortDesc = this.productCatalogForm.controls['productShortDesc'];
    this.productLongDesc = this.productCatalogForm.controls['productLongDesc'];
    this.productBrand = this.productCatalogForm.controls['productBrand'];
    this.productType = this.productCatalogForm.controls['productType'];
    this.productPrice = this.productCatalogForm.controls['productPrice'];

    this.inventoryName = this.productCatalogForm.controls['inventoryName'];
    this.inventoryROL = this.productCatalogForm.controls['inventoryROL'];
    this.inventoryQty = this.productCatalogForm.controls['inventoryQty'];
    this.inventoryCurrentDate = this.productCatalogForm.controls['inventoryCurrentDate'];
    /*this.feedback = this.feedbackForm.controls['productName'];




     this.email = this.feedbackForm.controls['email'];*/


  }
  
  public saveSendItems( form ) {
    let files = this.nativeInputBtn.nativeElement.files;
    console.log( files );
    if (form) {
    
      for (let file of files) {
        let filename = file.name;
        let contentType = file.type;
        let productCatalog = form;
        
        this.productCatalogService.store( productCatalog, file, file.type ).then( ( result ) => {
          let sendPhotos = [];
          console.log( result );
          this.loadExistingProducts();
          
        } );
        
      }
    }
  }
  
loadExistingProducts() {
    console.log('inside the load products');
    this.productImagePhotos = [];
    let dataArr = [];
    return new Promise((resolve, reject) => {
      this.productCatalogService.getProductImagePhotos('productImage').then((res) => {
        console.log(res);
        if (res) {
        
          let keyArr: any[] = Object.keys(res);
          keyArr.forEach((key: any) => {
            console.log(res[key]);
            if (key == "productImages") {
              dataArr.push(res[key]);
              console.log(dataArr);
            
            }
            //dataArr.push(res[key]);
          });
        
          let retreiveAttObject: any[] = Object.keys(dataArr);
          retreiveAttObject.forEach((key: any) => {
            console.log(dataArr[key]);
            for (let productImage of dataArr[key]) {
              console.log(productImage);
              this.productCatalogService.getImageAttachments('productImage', productImage.productImage, 'files').then((res) => {
              
                this.productImagePhotos.push({productImage: productImage, data: res});
              });
            }
          
            resolve(this.productImagePhotos);
          });
        }
      
      }).catch((err) => {
        console.log(err);
      });
    
    });
  }
}
