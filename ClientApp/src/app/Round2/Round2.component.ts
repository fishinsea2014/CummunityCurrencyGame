import { Component, OnInit } from '@angular/core';
import { Member, Product, Stock } from '../Entities';
import { ProductService } from '../Services/Product.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RulesService } from '../Services/Rules.service';
import { TradeRule } from '../Entities/TradeRule';
import { MemberService } from '../Services/Member.service';
import { CCBank } from '../Entities/CCBank';
import { CCLoanRecord } from '../Entities/CCLoanRecord';

@Component({
  selector: 'app-Round2',
  templateUrl: './Round2.component.html',
  styleUrls: ['./Round2.component.css']
})
export class Round2Component implements OnInit {

  //Community bank variables
  _ccBank: CCBank = {
    balance: 0,
    LoanRecord: []
  }
  _loanUnitAmount: number = 200;

  //Invisiable trading record
  _tradeRules: TradeRule[];
  _activeButtonId: number = -1;
  tradeForm: FormGroup;
  p_dress: Product = {
    Name: "dress",
  };
  moneyLender: Member = {
    Occupation: "MoneyLender",
    Saving: 500000,
    SavingCC: 0
  };
  _moneyLenderBalance: number;
  outsider: Member = {
    Occupation: "Outsider",
    Saving: 50000,
    SavingCC: 0,
    BoughtProducts: []
  }

  merchant: Member = {
    Occupation: "Merchant",
    Saving: 50000,
    SavingCC: 0,
    BoughtProducts: []
  }

  curMember: Member = null;
  curMemberId: number = -1;

  _activePlayersR2: Member[] = null;
  productsToChoose: String[] = null;
  constructor(private productService: ProductService,
    private tradeRulesService: RulesService,
    private memberService: MemberService,
    private fb: FormBuilder) {
    this._tradeRules = tradeRulesService.getAllRulesR2();
    console.log(this._tradeRules);
    this._activePlayersR2 = memberService.getActivePlayersR2();
    this.productsToChoose = tradeRulesService.getProductsToChooseR2();
    this._moneyLenderBalance = this.caclateLenderBalance();

    this.tradeForm = this.fb.group({
      product1: new FormControl('', [
        Validators.required,
      ]),
      product2: new FormControl('', [
        Validators.required,
      ]),
      product3: new FormControl('', [
        Validators.required,
      ]),
      product4: new FormControl('', [
        Validators.required,
      ]),
      product5: new FormControl('', [
        Validators.required,
      ])
    })
  }

  ngOnInit() {
  }

  //Caculator the balance of the money lender
  caclateLenderBalance(): number {
    let lentMoney = 0;
    this._activePlayersR2.forEach(p => {
      if (p.Saving < 0) {
        lentMoney -= p.Saving;
      }
    });
    return lentMoney + this.moneyLender.Saving;
  }



  selectPlayer(event: any, index: number) {
    this._activeButtonId = index;
    this.curMember = this._activePlayersR2[index];
    this.curMemberId = index;
    //TODO:disable other players' button
  }

  getMemberBoughtItemPrice(productName): number[] {
    let price: number;
    let priceCC: number;
    this._tradeRules.forEach(r => {
      if (r.Buyer != "Outsider" && r.Buyer != "Merchant" && r.ProductName == productName) {
        price = r.Price;
        priceCC = r.CcPrice
      }
    })
    return [price, priceCC];
  }
  buy(tradeForm) {
    let outsider = "Outsider";
    let merchant = "Merchant";
    var boughtItems = tradeForm.value;
    let p1: Product = {
      Name: boughtItems.product1,
      BuyingPrice: this.getMemberBoughtItemPrice(boughtItems.product1)[0],
      BuyingPriceCC: this.getMemberBoughtItemPrice(boughtItems.product1)[1],
    }
    let p2: Product = {
      Name: boughtItems.product2,
      BuyingPrice: this.getMemberBoughtItemPrice(boughtItems.product2)[0],
      BuyingPriceCC: this.getMemberBoughtItemPrice(boughtItems.product2)[1],
    }
    let p3: Product = {
      Name: boughtItems.product3,
      BuyingPrice: this.getMemberBoughtItemPrice(boughtItems.product3)[0],
      BuyingPriceCC: this.getMemberBoughtItemPrice(boughtItems.product3)[1],
    }
    let p4: Product = {
      Name: boughtItems.product4,
      BuyingPrice: this.getMemberBoughtItemPrice(boughtItems.product4)[0],
      BuyingPriceCC: this.getMemberBoughtItemPrice(boughtItems.product4)[1],
    }
    let p5: Product = {
      Name: boughtItems.product5,
      BuyingPrice: this.getMemberBoughtItemPrice(boughtItems.product5)[0],
      BuyingPriceCC: this.getMemberBoughtItemPrice(boughtItems.product5)[1],
    }
    let boughtProducts = [p1, p2, p3, p4, p5]

    console.log(this.curMember.Occupation);
    //Logic of purchasing
    this._activePlayersR2.forEach(m => {

      //Kee the record of the products bought 
      if (m.Occupation == this.curMember.Occupation) {
        boughtProducts.forEach(p => {
          m.BoughtProducts.push(p);
        });
      }

    });

    //Decuct from the buyer's deposits
    //this._activePlayers[this.curMemberId].Saving -= (p1.BuyingPrice+p2.BuyingPrice);
    let total = 0;
    let totalCC = 0;
    boughtProducts.forEach(p => {
      //Caculate total amount of money
      total += p.BuyingPrice;
      totalCC += p.BuyingPriceCC;

      //For every dress/shirt sell, tailer must purchase factory cloth from the weaver (purchase price of 10,000 Rp)
      if (p.Name == "dress") {
        this.playerBuy("traditionalCloth", "Tailor", "Weaver", 20000, 30);
      };

      //When sell a lunch (4,000 Rp), must purchase factory noodles (input) from the labourer for 2,000 Rp.     
      if (p.Name == "lunch") {
        this.playerBuy("homeMadeNoodles", "FoodVendor", "Labourer", 0, 10);
      }

      //When you sell 1 unit of cloth you have to pay the outsider 3,000 Rp for factory thread and chemical dye
      if (p.Name == "traditionalCloth") {
        this.playerBuy("cotton", "Homemaker", "Weaver", 1000, 10)
        this.playerBuy("naturalDyes", "HerbalDoctor", "Weaver", 0, 10);
      }
      //When you sell your "service" (repair engines), you have to buy engine parts from the outsider
      // (price =7,000 Rp).
      if (p.Name == "fixEngine") {
        this.playerBuy("engineParts", outsider, "Mechanic", 7000, 0);
      }

    })
    //Keep the orginal saving, to caculate lending money
    this._activePlayersR2[this.curMemberId].Saving -= total;
    this._activePlayersR2[this.curMemberId].SavingCC -= totalCC;

    //Lend money from Community Bank when required.
    if (this._activePlayersR2[this.curMemberId].SavingCC < 0) {
      this.borrowCCFromCommunityBank(this.curMember.Occupation, this._loanUnitAmount);

      //Update balance of CC
      this._activePlayersR2[this.curMemberId].SavingCC += this._loanUnitAmount;

    }

    //TODO: increase the seller's deposit
    boughtProducts.forEach(p => {
      this.upateSellerSaving(p.Name, this.curMember.Occupation);
    })

    //Disable current user's button
    this._activePlayersR2[this._activeButtonId].isDealDone = true;
    //Releas other buttons
    this._activeButtonId = -1;
    //Update the money lender's balance.
    this._moneyLenderBalance = this.caclateLenderBalance();

    //TODO: Popup a modal to display the transactions that occured automaticlly according to the rules.
  }
  borrowCCFromCommunityBank(borrower: string, amountCC: number) {
    this._ccBank.balance += -amountCC;
    let borrowerExist = false;
    this._ccBank.LoanRecord.forEach(r => {
      if (r.Borrower == borrower) {
        r.Amount += amountCC;
        borrowerExist = true;
      }
    })
    if (!borrowerExist) {

      this._ccBank.LoanRecord.push(
        {
          Borrower: borrower,
          Amount: amountCC
        });
    }
    console.log(`${borrower},  ${amountCC}`)
  }

  //this.playerBuy(p.Name,"Tailor", "Weaver", 20000, 30);
  playerBuy(product, buyer: string, seller: string, price: number, priceCC: number) {
    //Deduct buyer's saving, increase seller's balance
    this._activePlayersR2.forEach(p => {
      if (p.Occupation == buyer) {
        p.Saving -= price;
        p.SavingCC -= priceCC;
      };
      if (p.Occupation == seller) {
        p.SavingCC += priceCC;
        p.Saving += price;
      }
    });

    //Increase outsider or merchant's saving
    if (seller = this.outsider.Occupation) {
      this.outsider.Saving += price;
      this.outsider.SavingCC += priceCC;
    }

    if (seller = this.merchant.Occupation) {
      this.merchant.Saving += price;
      this.merchant.SavingCC += priceCC;
    }

    //TODO: record the deal
    console.log(`${buyer} buy ${product} from ${seller} by ${price}.`);
  }


  upateSellerSaving(productName: string, buyerName: string) {
    let seller: string;
    let price: number;
    let priceCC: number;

    //TODO: Should not ignore the outsider and the merchant
    this._tradeRules.forEach(r => {
      if (r.ProductName == productName && r.Buyer == "Everyone") {
        seller = r.Seller;
        price = r.Price;
        priceCC = r.CcPrice;
      }
    })

    if (seller == "Outsider") {
      this.outsider.Saving += price;
      this.outsider.SavingCC += priceCC;
      this.agentBuy(seller, productName);

    } else if (seller == "Merchant") {
      this.merchant.Saving += price;
      this.merchant.SavingCC += priceCC;
      this.agentBuy(seller, productName);
    } else {
      this._activePlayersR2.forEach(m => {
        if (m.Occupation == seller) {
          m.Saving += price;
          m.SavingCC += priceCC;
        }
      })
    }
  }

  //Merchant or outsider purchase products.
  agentBuy(buyer: string, productName: string) {
    let seller = "";
    let agentBuyPrice = -1;
    let agentBuyPriceCC = -1;
    this._tradeRules.forEach(r => {
      if (r.Buyer == buyer && r.ProductName == productName) {
        seller = r.Seller;
        agentBuyPrice = r.Price;
        agentBuyPriceCC = r.CcPrice;
      }
    });

    this._activePlayersR2.forEach(m => {
      if (m.Occupation == seller) {
        m.Saving += agentBuyPrice;
        m.SavingCC += agentBuyPriceCC;
      }
    })

    //Deduct agent's saving
    if (buyer == "Merchant") {
      this.merchant.Saving -= agentBuyPrice;
      this.merchant.SavingCC -= agentBuyPriceCC;

    } else if (buyer == "Outsider") {
      this.outsider.Saving -= agentBuyPrice;
      this.outsider.SavingCC -= agentBuyPriceCC;
    }
  }

  //Get price of a selected price in trading board.
  getSelectedPrice(e, elementId) {
    document.getElementById("price" + elementId).innerText
      = this.getMemberBoughtItemPrice(e.value)[0] + "Rp & "
      + this.getMemberBoughtItemPrice(e.value)[1] + 'CC';
  }

  // getMemberBoughtItemPrice(productName):number[]{
  //   let price : number;
  //   let priceCC:number;
  //   this._tradeRules.forEach( r =>{
  //     if (r.Buyer != "Outsider" && r.Buyer != "Merchant" && r.ProductName==productName){
  //       price=r.Price;
  //       priceCC=r.CcPrice
  //     }
  //   })
  //   return [price,priceCC];
  // }



  //Cancel current deal
  cancelDeal() {
    this._activeButtonId = -1;
  }

  completeRound2() {
    console.log("complete");
    let interest = 0;
    this._activePlayersR2.forEach(p => {
      //Handle the money lent
      if (p.Saving < 0) {

        p.Saving += p.Saving * 0.1;
        interest += -p.Saving * 0.1;
      }
    })
    this._moneyLenderBalance += interest;
    this.moneyLender.Saving = this._moneyLenderBalance;
  }
}
