import { Injectable } from '@angular/core';
import { Member } from '../Entities/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  activePlayersR1: Member[] =
    [
      {
        Occupation: "Tailor",
        Products: ["dress"],
        Saving: 50000,
        isDealDone: false,
        BoughtProducts: [],

      },
      {
        Occupation: "VegetableFarmer",
        Products: ["vegetables"],
        BoughtProducts: [],
        Saving: 100000,
        isDealDone: false
      },
      {
        Occupation: "RiceFarmer",
        Products: ["rice", "localTobacco"],
        Saving: -50000,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "FoodVendor",
        Products: ["lunch"],
        Saving: 50000,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "HerbalDoctor",
        Products: ["herbalMedicine", "naturalDyes","naturalInsecticide"],
        Saving: -50000,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "Labourer",
        Products: ["labour", "homeMadeNoodles"],
        Saving: -70000,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "Weaver",
        Products: ["traditionalCloth"],
        Saving: 30000,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "Fisher",
        Products: ["fish"],
        Saving: 50000,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "Homemaker",
        Products: ["babysitting", "cotton"],
        Saving: 0,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "FruitFarmer",
        Products: ["fruit"],
        Saving: -10000,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "Mechanic",
        Products: ["fixEngine"],
        Saving: 50000,
        isDealDone: false,
        BoughtProducts: [],
      },
    ];

    activePlayersR2: Member[] =
    [
      {
        Occupation: "Tailor",
        Products: ["dress"],
        Saving: 50000,
        SavingCC:0,
        isDealDone: false,
        BoughtProducts: [],

      },
      {
        Occupation: "VegetableFarmer",
        Products: ["vegetables"],
        BoughtProducts: [],
        Saving: 100000,
        SavingCC:0,
        isDealDone: false
      },
      {
        Occupation: "RiceFarmer",
        Products: ["rice", "localTobacco"],
        Saving: -50000,
        SavingCC:0,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "FoodVendor",
        Products: ["lunch"],
        Saving: 50000,
        SavingCC:0,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "HerbalDoctor",
        Products: ["herbalMedicine", "naturalDyes","naturalInsecticide"],
        Saving: -50000,
        SavingCC:0,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "Labourer",
        Products: ["labour", "homeMadeNoodles"],
        Saving: -70000,
        SavingCC:0,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "Weaver",
        Products: ["traditionalCloth"],
        Saving: 30000,
        SavingCC:0,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "Fisher",
        Products: ["fish"],
        Saving: 50000,
        SavingCC:0,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "Homemaker",
        Products: ["babysitting", "cotton"],
        Saving: 0,
        SavingCC:0,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "FruitFarmer",
        Products: ["fruit"],
        Saving: -10000,
        SavingCC:0,
        isDealDone: false,
        BoughtProducts: [],
      },
      {
        Occupation: "Mechanic",
        Products: ["fixEngine"],
        Saving: 50000,
        SavingCC:0,
        isDealDone: false,
        BoughtProducts: [],
      },
    ];
  constructor() { }

  getActivePlayersR1(): Member[] {
    return this.activePlayersR1;
  }

  getActivePlayersR2(): Member[] {
    return this.activePlayersR2;
  }


}
