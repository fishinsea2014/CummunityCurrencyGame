import { Injectable } from '@angular/core';
import { TradeRule } from '../Entities/TradeRule';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  rules:TradeRule[] = [
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
  ];
  constructor() { }
  getAllRules(){
    return this.rules;
  }
}
