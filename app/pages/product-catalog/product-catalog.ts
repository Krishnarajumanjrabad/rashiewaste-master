import {Component} from "@angular/core";
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

  productCatalogForm: any;
  catalogName: string;
  categoryName: string;
  subCategoryName: string;
  productName: string;
  productShortDesc: string;
  productLongDesc: string;
  productBrand: string;
  productType: string;
  inventoryName: string;
  inventoryROL: number;
  inventoryQty: number;
  inventoryCurrentDate: string;

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

    this.inventoryName = this.productCatalogForm.controls['inventoryName'];
    this.inventoryROL = this.productCatalogForm.controls['inventoryROL'];
    this.inventoryQty = this.productCatalogForm.controls['inventoryQty'];
    this.inventoryCurrentDate = this.productCatalogForm.controls['inventoryCurrentDate'];
    /*this.feedback = this.feedbackForm.controls['productName'];




     this.email = this.feedbackForm.controls['email'];*/


  }

}
