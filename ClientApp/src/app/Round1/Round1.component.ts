import { Component, OnInit } from '@angular/core';
import { Member, Product,Stock } from '../Entities';
import { ProductService } from '../Services/Product.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RulesService } from '../Services/Rules.service';
import { TradeRule } from '../Entities/TradeRule';



@Component({
  selector: 'app-Round1',
  templateUrl: './Round1.component.html',
  styleUrls: ['./Round1.component.css']
})
export class Round1Component implements OnInit {

  _tradeRules:TradeRule[];
  tradeForm:FormGroup;
  p_dress : Product = {
    Name: "dress",
  };
  moneyLender:Member = {
    Occupation:"MoneyLender",
    Saving:500000
  };
  outsider:Member = {
    Occupation:"Outsider",
    Saving: 50000,
    BoughtProducts:[]
  }

  merchant:Member = {
    Occupation:"Merchant",
    Saving: 50000,
    BoughtProducts:[]
  }

  curMember:Member= null;
  curMemberId:number = -1;
  
  members:Member[] =
  [
    {
      Occupation:"Tailor",
      Products : [
        {
          Name: "dress",
        },        
      ],
      Saving : 50000,
      IsActive : false,
      BoughtProducts:[],

    },
    {
      Occupation:"VegetableFarmer",
      Products : [
        {
          Name: "vegetables",
        }        
      ],
      BoughtProducts:[],
      Saving : 100000,
      IsActive : false
    },
    {
      Occupation:"RiceFarmer",
      Products : [
        {
          Name: "rice",
        },
        {
          Name: "localTobacco",
        },        
      ],
      Saving : -50000,
      IsActive : false,
      BoughtProducts:[],

    },

  ];
  products:Product[] = null;  
  constructor(private productService:ProductService,
              private tradeRules:RulesService,
              private fb:FormBuilder
    ) {
      this._tradeRules=tradeRules.getAllRules();
    this.products = productService.GetProducts();
    this.tradeForm = this.fb.group({
      product1: new FormControl('',[
        Validators.required,
      ]),      
      product2: new FormControl('',[
        Validators.required,
      ]),      
    })
  }

  ngOnInit() {
  }

  selectPlayer(event:any,index:number){
    console.log(event.target + index);
    this.curMember=this.members[index];
    this.curMemberId = index;
    console.log(this.curMember);
    console.log(this.products);
    //TODO:disable other players' button
  }

  getMemberBoughtItemPrice(productName):number{
    let price : number;
    this._tradeRules.forEach( r =>{
      if (r.Buyer=="Everyone" && r.ProductName==productName){
        price=r.Price;
      }
    })
    return price;
  }
  buy(tradeForm){
    console.log(tradeForm.value);
    var boughtItems = tradeForm.value;
    let p1:Product = {
      Name:boughtItems.product1,
      BuyingPrice:this.getMemberBoughtItemPrice(boughtItems.product1)
    } 
    let p2:Product = {
      Name:boughtItems.product2,
      BuyingPrice:this.getMemberBoughtItemPrice(boughtItems.product2)
    } 
    console.log(this.curMember.Occupation);
    this.members.forEach( m => {
      if (m.Occupation == this.curMember.Occupation){
        m.BoughtProducts.push(p1);
        m.BoughtProducts.push(p2);
      }
    });
    
    //Decuct from the buyer's deposits
    this.members[this.curMemberId].Saving -= (p1.BuyingPrice+p2.BuyingPrice);

    //TODO: increase the seller's deposit
    this.upateSellerSaving(p1.Name,this.curMember.Occupation);
    this.upateSellerSaving(p2.Name,this.curMember.Occupation);

    this._tradeRules.forEach(r =>{
      if (r.ProductName==p1.Name && r.Buyer==""){

      }
    })

    //TODO: Disable current user's button
    //TODO: Popup a modal to display the transactions that occured automaticlly according to the rules.
  }
  upateSellerSaving(productName: string, sellerName: string) {
     console.log(this._tradeRules);
     let seller:string;
     let price:number;

     this._tradeRules.forEach(r => {
       if (r.ProductName == productName && r.Buyer=="Everyone"){
        seller= r.Seller;
        price=r.Price;
       }
     })
     
     if (seller=="Outsider"){
       this.outsider.Saving += price;
       this.agentBuy(seller,productName);

     }else if (seller=="Merchant") {
       this.merchant.Saving += price;
       this.agentBuy(seller,productName);
     }else {
      this.members.forEach( m =>{
        if (m.Occupation == seller){
          m.Saving += price;
        }
      })
    }
  }

  //Merchant or outsider purchase products.
  agentBuy(buyer: string, productName: string) {
    let seller = "";
    let agentBuyPrice = -1;
    this._tradeRules.forEach(r => {
      if (r.Buyer==buyer && r.ProductName == productName){
        seller=r.Seller;
        agentBuyPrice = r.Price;
      }
    });   
     
    
    this.members.forEach(m =>{
      if (m.Occupation == seller) {
        m.Saving +=agentBuyPrice;
      }
    })

    //Deduct agent's saving
    if (buyer=="Merchant"){
      this.merchant.Saving -= agentBuyPrice;
    }else if(buyer =="Outsider"){
      this.outsider.Saving -=agentBuyPrice;
    }
  }

  //Get price of a selected price in trading board.
  getSelectedPrice(e,elementId){    
    console.log(e);
    document.getElementById("price"+elementId).innerText = this.getMemberBoughtItemPrice(e.value)+"";
  }

  

  

}
