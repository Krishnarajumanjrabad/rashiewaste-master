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
  matchSubCategoryFound: boolean = false;
  matchCategoryFound: boolean = false;
  matchCatalogFound: boolean = false;
  matchFound: boolean= false;
  //initalise the all the list Items
  catlogList = [];
  categoryList = [];
  subCategoryList = [];
  productList = [];
  
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
          'products': {belongsTo: {type: 'product', options: {async: true}}}
  
        }
      },
      {
        singular: 'product',
        plural: 'products',
        relations: {
          'subCategories': {hasMany: 'subCategory'},
          'categories': {hasMany: 'category'},
          'catalogs': {hasMany: 'catalog'}
        }
      },
      {
        singular: 'subCategory',
        plural: 'subCategories',
        relations: {
          'category': {belongsTo: 'category'}
        }
      },
      {
        singular: 'category',
        plural: 'categories',
        relations: {
          'subCategories': {hasMany: 'subCategory'}
        }
      },
      {
        singular: 'catalog',
        plural: 'catalogs',
        relations: {
          'categories': {hasMany: 'category'}
        }
      }] );
  }
  
  
  public store( productCatalog, file, type ) {
    
    return new Promise( ( resolve, reject )=> {
      this.db.rel.find( 'products' ).then( results => {
        if (results) {
          Object.keys( results.products ).forEach( function ( key ) {
            for (let product of results.products[key]) {
              console.log(product);
              
              for (let subCategory of product.subCategories) {
                this.db.rel.find( 'subCategory', subCategory.subCategoryID ).then( ( subCategoryInfo ) => {
                  if (subCategoryInfo.subCategoryName == productCatalog.subCategoryName) {
                    this.matchSubCategoryFound = true;
                    this.subCategoryList.push(subCategoryInfo.subCategoryID);
                  }
                } );
              }
              for (let category of product.categories) {
                this.db.rel.find( 'category', category.categoryID ).then( ( categoryInfo ) => {
                  if (categoryInfo.categoryName == productCatalog.categoryName) {
                    this.matchCategoryFound = true;
                    this.categoryList.push(category.categoryID);
                  }
                } );
                
              }
              for (let catalog of product.catalogs) {
                this.db.rel.find( 'catalog', catalog.catalogID ).then( ( catalogInfo ) => {
                  if (catalogInfo.catalogName == productCatalog.catalogName) {
                    this.matchCatalogFound = true;
                    this.catlogList.push(catalog.catalogID);
                  }
                } );
              }
            }
          } );
          if (! (this.matchCatalogFound && this.matchCategoryFound && this.matchSubCategoryFound)) {
            
            this.saveProdctInformation( productCatalog, file, productCatalog.catalogID, productCatalog.categoryID, productCatalog.subCategoryID, productCatalog.productID, productCatalog.productImageID, type, this.matchFound );
            resolve();
            return;
           } else {
            this.saveProdctInformation( productCatalog, file, null, null, null, productCatalog.productID, null, type, this.matchFound );
            resolve();
            return;
          }
        }
        
      } ).catch( ( err ) => {
        console.log( 'inside the err handler' );
        this.matchFound = true;
        this.saveProdctInformation( productCatalog, file, null, null, null, null, null, type, this.matchFound );
        resolve();
        return;
      } );
      
    } );
  }
  
  
  saveProdctInformation( productCatalog: any, file: any, catalogID: any, categoryID: any, subCategoryID: any, productID: any, productImageID: any, type: any, matchFound: boolean ) {
    
    if (catalogID) {
      catalogID ++;
    } else {
      if (matchFound){
        catalogID = 1;
      }
      
    }
    if (categoryID) {
      categoryID ++;
    } else {
      if (matchFound){
        categoryID = 200;
      }
     
    }
    if (subCategoryID) {
      subCategoryID ++;
    } else {
      if (matchFound){
        subCategoryID = 500;
      }
     
    }
    if (productID) {
      productID ++;
    } else {
      if(matchFound){
        productID = 2000;
      }
     
    }
    
    if (productImageID) {
      productImageID ++;
    } else {
      if (matchFound){
        productImageID = 8000;
      }
     
    }
 
    
    if ( ! catalogID && categoryID && subCategoryID) {
      this.db.rel.save( 'catalog', {
        catalogName: productCatalog.catalogName,
        catalogID: catalogID
      } ).then( ( catRes ) => {
        console.log( catRes );
    
        Object.keys( catRes ).forEach( function ( key ) {
          for (let catalog of catRes[key]) {
            console.log( catalog );
            this.catlogList.push( catalog.catalogID );
          }
      
        } );
        this.db.rel.save( 'category', {
          categoryName: productCatalog.categoryName,
          categoryID: categoryID,
          catalogID: this.catlogList
        } ).then( ( categoryRes ) => {
          console.log( 'response from category is -->' + categoryRes );
      
          Object.keys( categoryRes ).forEach( function ( key ) {
            for (let category of categoryRes[key]) {
              console.log( category );
              this.categoryList.push( category.categoryID );
            }
        
          } );
          this.db.rel.save( 'subCategory', {
            subCategoryName: productCatalog.subCategoryName,
            subCategoryID: subCategoryID,
            categoryID: this.categoryList
          } ).then( ( subCategoryRes ) => {
            console.log( subCategoryRes );
        
            Object.keys( subCategoryRes ).forEach( function ( key ) {
              for (let subCategory of subCategoryRes[key]) {
                console.log( subCategory );
                this.subCategoryList.push( subCategory.subCategoryID );
              }
          
            } );
        
            this.db.rel.save( 'product', {
              productName: productCatalog.productName,
              productShortDesc: productCatalog.productShortDesc,
              productType: productCatalog.productType,
              productBrand: productCatalog.productBrand,
              productPrice: productCatalog.productPrice,
              productID: productID,
              subCategories: this.subCategoryList,
              categories: this.categoryList,
              catalogs: this.catlogList
            } ).then( ( prodRes ) => {
              console.log( prodRes );
          
              Object.keys( prodRes ).forEach( function ( key ) {
                for (let product of prodRes[key]) {
                  console.log( product );
                  this.productList.push( product.productID );
                }
            
              } );
              this.db.rel.save( 'productImage', {
                productImageID: productCatalog.productImageID,
                product: this.productList,
                attachments: {
                  files: {
                    content_type: type,
                    data: file
                  }
                }
              } );
          
            } );
          } );
        } );
      } );
  
    } else {
      //only insert the product
      this.db.rel.save( 'product', {
        productName: productCatalog.productName,
        productShortDesc: productCatalog.productShortDesc,
        productType: productCatalog.productType,
        productBrand: productCatalog.productBrand,
        productPrice: productCatalog.productPrice,
        productID: productID,
        subCategories: this.subCategoryList,
        categories: this.categoryList,
        catalogs: this.catlogList
      } ).then( ( prodRes ) => {
        console.log( prodRes );
    
        Object.keys( prodRes ).forEach( function ( key ) {
          for (let product of prodRes[key]) {
            console.log( product );
            this.productList.push( product.productID );
          }
      
        } );
        this.db.rel.save( 'productImage', {
          productImageID: productCatalog.productImageID,
          product: this.productList,
          attachments: {
            files: {
              content_type: type,
              data: file
            }
          }
        } );
    
      } );
    }
    
  }
  
  getProductImagePhotos( id ) {
    
    return new Promise( ( resolve ) => {
      
      this.db.rel.find( id ).then( ( finalResult ) => {
        console.log( finalResult );
        resolve( finalResult );
      } );
    } );
  }
  
  getImageAttachments( productImage, productImageID, files ) {
    let sendPhotosList = [];
    return new Promise( ( resolve ) => {
      this.db.rel.getAttachment( productImage, productImageID, files ).then( ( attachment ) => {
        console.log( attachment );
        //  console.log(window.btoa(attachment));
        blobUtil.blobToBase64String( attachment ).then( function ( base64String ) {
          sendPhotosList.push( base64String );
          resolve( sendPhotosList );
        } ).catch( ( err ) => {
          console.log( err );
        } );
        
      } );
    } );
    
  }
  
}
