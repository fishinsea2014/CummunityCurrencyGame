import { Injectable } from '@angular/core';
import { TradeRule } from '../Entities/TradeRule';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  rules:TradeRule[] = [
    {
      ProductName:"dress",
      Seller: "Tailor",
      Buyer: "Everyone",
      Price:15000
    },
    {
      ProductName:"factoryCloth",
      Seller: "Outsider",
      Buyer: "Tailor",
      Price:10000
    },
    
    {
      ProductName:"vegetables",
      Seller: "VegetableFarmer",
      Buyer: "Merchant",
      Price:2000
    },
    {
      ProductName:"vegetables",
      Seller: "Merchant",
      Buyer: "Everyone",
      Price:3000
    },
    {
      ProductName:"insecticide",
      Seller: "Outsider",
      Buyer: "VegetableFarmer",
      Price:8000
    },
    {
      ProductName:"rice",
      Seller: "RiceFarmer",
      Buyer: "Outsider",
      Price:2500
    },  
    {
      ProductName:"rice",
      Seller: "Outsider",
      Buyer: "Everyone",
      Price:3500
    },   
    {
      ProductName:"localTobacco",
      Seller: "Merchant",
      Buyer: "Everyone",
      Price:1500
    },
    {
      ProductName:"localTobacco",
      Seller: "RiceFarmer",
      Buyer: "Merchant",
      Price:1000
    },
    {
      ProductName:"lunch",
      Seller: "FoodVendor",
      Buyer: "Everyone",
      Price:4000
    },
    {
      ProductName:"herbalMedicine",
      Seller: "HerbalDoctor",
      Buyer: "Everyone",
      Price:4000
    },
    {
      ProductName:"naturalDyes",
      Seller: "HerbalDoctor",
      Buyer: "Everyone",
      Price:1000
    },
    {
      ProductName:"naturalInsecticide",
      Seller: "HerbalDoctor",
      Buyer: "Everyone",
      Price:1500
    },
    {
      ProductName:"labour",
      Seller: "Labourer",
      Buyer: "Everyone",
      Price:1500
    },
    {
      ProductName:"homeMadeNoodles",
      Seller: "Labourer",
      Buyer: "FoodVendor",
      Price:2000
    },
    {
      ProductName:"traditionalCloth",
      Seller: "Weaver",
      Buyer: "Everyone",
      Price:5000
    },
    {
      ProductName:"factoryThreadChemicalDye",
      Seller: "Outsider",
      Buyer: "Weaver",
      Price:3000
    },
    {
      ProductName:"fish",
      Seller: "Fisher",
      Buyer: "Merchant",
      Price:6000
    },
    {
      ProductName:"fish",
      Seller: "Merchant",
      Buyer: "Everyone",
      Price:9000
    },
    {
      ProductName:"babysitting",
      Seller: "Homemaker",
      Buyer: "Everyone",
      Price:3000
    },
    {
      ProductName:"cotton",
      Seller: "Homemaker",
      Buyer: "Outsider",
      Price:1000
    },
    {
      ProductName:"fruit",
      Seller: "FruitFarmer",
      Buyer: "Merchant",
      Price:6000
    },
    {
      ProductName:"fruit",
      Seller: "Merchant",
      Buyer: "Everyone",
      Price:9000
    },
    {
      ProductName:"pesticide",
      Seller: "Outsider",
      Buyer: "FruitFarmer",
      Price:8000
    },
    {
      ProductName:"fixEngine",
      Seller: "Mechanic",
      Buyer: "Everyone",
      Price:15000
    },
    {
      ProductName:"engineParts",
      Seller: "Outsider",
      Buyer: "Mechanic",
      Price:7000
    },
    {
      ProductName:"garamCigarettes",
      Seller: "Outsider",
      Buyer: "Merchant",
      Price:2500
    },
    {
      ProductName:"garamCigarettes",
      Seller: "Merchant",
      Buyer: "Everyone",
      Price:3000
    },
    {
      ProductName:"indoMie",
      Seller: "Outsider",
      Buyer: "Everyone",
      Price:1000
    },




  ];
  constructor() { }
  getAllRules(){
    return this.rules;
  }

  getProductsToChoose():string[] {
    let products : string[] = [];
    this.rules.forEach( r => {
      if (r.Buyer == "Everyone"){
        products.push(r.ProductName);
      }
    });
    return products;
  }
}
