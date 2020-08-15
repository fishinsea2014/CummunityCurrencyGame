import { Component, OnInit } from '@angular/core';
import { Member, Product,Stock } from '../Entities';
import { ProductService } from '../Services/Product.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RulesService } from '../Services/Rules.service';
import { TradeRule } from '../Entities/TradeRule';
import { MemberService } from '../Services/Member.service';

@Component({
  selector: 'app-Round2',
  templateUrl: './Round2.component.html',
  styleUrls: ['./Round2.component.css']
})
export class Round2Component implements OnInit {

  _tradeRules:TradeRule[];
  _activeButtonId : number = -1;
  tradeForm:FormGroup;
  p_dress : Product = {
    Name: "dress",
  };
  moneyLender:Member = {
    Occupation:"MoneyLender",
    Saving:500000
  };
  _moneyLenderBalance: number;
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
  
  _activePlayers:Member[] =null;
  productsToChoose:String[] = null;  
  constructor(private productService:ProductService,
              private tradeRulesService:RulesService,
              private memberService:MemberService,
              private fb:FormBuilder) 
  {
    this._tradeRules=tradeRulesService.getAllRules();
    console.log(this._tradeRules);
    this._activePlayers = memberService.getActivePlayers();
    this.productsToChoose = tradeRulesService.getProductsToChoose();
    this._moneyLenderBalance = this.caclateLenderBalance();
    
    this.tradeForm = this.fb.group({
      product1: new FormControl('',[
        Validators.required,
      ]),      
      product2: new FormControl('',[
        Validators.required,
      ]),   
      product3: new FormControl('',[
        Validators.required,
      ]),      
      product4: new FormControl('',[
        Validators.required,
      ]),
      product5: new FormControl('',[
        Validators.required,
      ]) 
    })
  }

  ngOnInit() {
  }

  //Caculator the balance of the money lender
  caclateLenderBalance(): number {
    let lentMoney = 0;
    this._activePlayers.forEach( p =>{
      if (p.Saving<0){
        lentMoney -= p.Saving;
      }
    });
    return lentMoney+this.moneyLender.Saving;
  }



  selectPlayer(event:any,index:number){
    this._activeButtonId = index;
    this.curMember=this._activePlayers[index];
    this.curMemberId = index;
    //TODO:disable other players' button
  }

  getMemberBoughtItemPrice(productName):number{
    let price : number;
    this._tradeRules.forEach( r =>{
      if (r.Buyer != "Outsider" && r.Buyer != "Merchant" && r.ProductName==productName){
        price=r.Price;
      }
    })
    return price;
  }
  buy(tradeForm){
    let outsider = "Outsider";
    let merchant = "Merchant";
    var boughtItems = tradeForm.value;
    let p1:Product = {
      Name:boughtItems.product1,
      BuyingPrice:this.getMemberBoughtItemPrice(boughtItems.product1)
    } 
    let p2:Product = {
      Name:boughtItems.product2,
      BuyingPrice:this.getMemberBoughtItemPrice(boughtItems.product2)
    } 
    let p3:Product = {
      Name:boughtItems.product3,
      BuyingPrice:this.getMemberBoughtItemPrice(boughtItems.product3)
    } 
    let p4:Product = {
      Name:boughtItems.product4,
      BuyingPrice:this.getMemberBoughtItemPrice(boughtItems.product4)
    } 
    let p5:Product = {
      Name:boughtItems.product5,
      BuyingPrice:this.getMemberBoughtItemPrice(boughtItems.product5)
    } 
    let boughtProducts = [p1,p2,p3,p4,p5]

    console.log(this.curMember.Occupation);
    //Logic of purchasing
    this._activePlayers.forEach( m => {

      //Kee the record of the products bought 
      if (m.Occupation == this.curMember.Occupation){
        boughtProducts.forEach(p =>{
          m.BoughtProducts.push(p);
        });        
      }

    });
    
    //Decuct from the buyer's deposits
    //this._activePlayers[this.curMemberId].Saving -= (p1.BuyingPrice+p2.BuyingPrice);
    let total = 0;
    boughtProducts.forEach( p => {
      //Caculate total amount of money
      total += p.BuyingPrice;
      
      //For every dress/shirt sell, tailer must purchase factory cloth from the outsider (purchase price of 10,000 Rp)
      if (p.Name == "dress") {
        this.playerBuy(p.Name,"Tailor", outsider, 10000);
      };

      //When sell a lunch (4,000 Rp), must purchase factory noodles (input) from the outsider for 2,000 Rp.     
      if (p.Name=="lunch"){
        this.playerBuy(p.Name, "FoodVendor",outsider,2000);
      }

      //When you sell 1 unit of cloth you have to pay the outsider 3,000 Rp for factory thread and chemical dye
      if (p.Name=="traditionalCloth"){
        this.playerBuy(p.Name, "factoryThreadChemicalDye",outsider,3000);
      }
      //When you sell your "service" (repair engines), you have to buy engine parts from the outsider
      // (price =7,000 Rp).
      if (p.Name=="fixEngine"){
        this.playerBuy(p.Name, "engineParts",outsider,7000);
      }

    })
    this._activePlayers[this.curMemberId].Saving -= total;    

    //TODO: increase the seller's deposit
    boughtProducts.forEach( p => {
      this.upateSellerSaving(p.Name,this.curMember.Occupation);
    })

    // this._tradeRules.forEach(r =>{
    //   if (r.ProductName==p1.Name && r.Buyer==""){

    //   }
    // })

    //Disable current user's button
    this._activePlayers[this._activeButtonId].isDealDone = true;
    //Releas other buttons
    this._activeButtonId = -1;
    //Update the money lender's balance.
    this._moneyLenderBalance = this.caclateLenderBalance();

    //TODO: Popup a modal to display the transactions that occured automaticlly according to the rules.
  }
  playerBuy(product,buyer:string, seller:string,price:number){
    //Deduct buyer's saving
    this._activePlayers.forEach( p =>{
      if (p.Occupation == buyer){
        p.Saving -= price;
      }
    });

    //Increase seller's saving
    if (seller=this.outsider.Occupation){
      this.outsider.Saving +=price;
    }

    //TODO: record the deal
    console.log(`${buyer} buy ${product} from ${seller} by ${price}.`);
  }


  upateSellerSaving(productName: string, sellerName: string) {
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
      this._activePlayers.forEach( m =>{
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
    
    this._activePlayers.forEach(m =>{
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
    document.getElementById("price"+elementId).innerText = this.getMemberBoughtItemPrice(e.value)+"";
  }

  

  //Cancel current deal
  cancelDeal(){
    this._activeButtonId = -1;
  }

  completeRound1(){
    console.log("complete");
    let interest = 0;
    this._activePlayers.forEach(p =>{
      //Handle the money lent
      if (p.Saving < 0){

        p.Saving += p.Saving *0.1;
        interest += -p.Saving *0.1;
      }
    })
    this._moneyLenderBalance += interest;
    this.moneyLender.Saving= this._moneyLenderBalance;
  }
}
