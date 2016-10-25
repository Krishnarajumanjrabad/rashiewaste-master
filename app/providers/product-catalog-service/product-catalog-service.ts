import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {ConnectivityService} from "../connectivity-service/connectivity-service";
var blobUtil = require('blob-util');

/*
 Generated class for the ProductCatalogService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ProductCatalogService {
  db: any;

  constructor(private http: Http) {
    if (this.db == null || this.db == "UNDEFINED") {
      this.db = ConnectivityService.getDatabaseConnection();
    }

    this.db.setSchema([
      {
        singular: 'order',
        plural: 'orders',
        relations: {
          'products': {hasMany: 'product'}

        }
      },
      {
        singular: 'inventory',
        plural: 'inventories',
        relations: {
          'product': {belongsTo: {type: 'product', options: {async: true}}}

        }
      },
      {
        singular: 'productImage',
        plural: 'productImages',
        relations: {
          'products': {hasMany: {type: 'product', options: {async: true}}}

        }
      },

      {
        singular: 'product',
        plural: 'products',
        relations: {
          'categories': {hasMany: 'category'},
          'subCategories': {hasMany: 'subCategory'}
        }
      },
      {
        singular: 'subCategory',
        plural: 'subCategories',
        relations: {
          'categories': {hasMany: 'category'}
        }
      }, {
        singular: 'category',
        plural: 'categories',
        relations: {
          'catalogs': {hasMany: 'catalog'}
        }
      },
      {
        singular: 'catalog',
        plural: 'catalogs',
        relations: {
          'category': {belongsTo: 'category'}
        }
      }
    ]);
  }

  insertProductCatalog(form, file, type) {
    /* if (form) {
     return new Promise((resolve, reject)=> {

     this.db.rel.find('products').then((result) => {
     console.log(result);
     if (result) {
     for (let product of result.products) {
     if (JSON.stringify(form.product) == JSON.stringify(product)) {

     productMatchFound = true;
     }
     }
     for (let category of result.categories) {
     if (JSON.stringify(form.category) == JSON.stringify(category)) {

     categoryMatchFound = true;
     }
     }
     for (let subCategory of result.subCategories) {
     if (JSON.stringify(form.subCategory) == JSON.stringify(subCategory)) {

     subCategoryMatchFound = true;
     }
     }
     for (let catalog of result.catalogs) {
     if (JSON.stringify(form.catalog) == JSON.stringify(catalog)) {

     catalogMatchFound = true;
     }
     }
     for (let productImage of result.productImages) {
     if (JSON.stringify(form.productImage) == JSON.stringify(productImage)) {

     productImageMatchFound = true;
     }
     }

     if(productImageMatchFound, catalogMatchFound, subCategoryMatchFound, productMatchFound, categoryMatchFound ){
     insertOrUpdateProducts(form, file, type, result_rev);
     } else {
     insertOrUpdateProducts(form, file, type);
     }
     }
     }).catch((err) => {
     console.log('Noo data found from database' + err);
     this.insertOrUpdateProducts(form, file, type);
     });

     });
     }*/
  }

  private insertOrUpdateProducts(form, file, type, rev) {
    /* if (form & rev) {
     return this.db.rel.save('product', {
     productName: 'Stephen King',
     ProductShortDesc: 'Supreme LDDRAM4',
     ProductLongDesc: 'This is most powerful ram which supports many mobile and laptop devices',
     Services: [{' 2 Days replacement Policy'}, {'Good Condition'}],
     Brand: 'Kingston',
     Type: 'LDDRAM'

     id: 1001,
     categories: [101],
     subCategories: [501]
     }).then(function () {
     return this.db.rel.save('category', {
     id: 101,
     title: 'Computer Ram'
     });
     }).then(function () {
     return this.db.rel.save('subCategories', {
     id: 501,
     title: 'LDDRAM4'
     });
     }).then(function () {
     return this.db.rel.save('catalog', {
     id: 1,
     title: 'Computer Accessory'
     });
     }).then(function () {
     return this.db.rel.save('inventory', {
     id: 5001,
     inventoryName: 'Computer Accessory',
     inventoryROL: 50,
     inventoryQty: 5000,
     inventoryCurrentQty: 4500,
     inventoryCreatedDate: '2016/10/24',
     inventoryModifiedDate: '2016/10/24',
     productId: '1001',
     qty: 500

     });
     }).then(function () {
     return this.db.rel.putAttachment('productImage', id, 'files', file, type);
     }).then(function () {

     return this.db.rel.find('products');
     });
     }
     }*/
  }

}

