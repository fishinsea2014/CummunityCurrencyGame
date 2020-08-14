import { Injectable } from '@angular/core';
import { Product } from "../Entities/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dress : Product = {
    Name: "dress"    
  };

  vegetables: Product = {
    Name: "vegetables"
  };


  insecticide: Product = {
    Name: "insecticide"  
  };

  rice: Product = {
    Name: "rice"
  };

  localtobacco: Product = {
    Name: "localtobacco"
  };
 
  lunch: Product = {
    Name: "lunch",
  };

  constructor() { }
  GetProducts(){
    return [this.lunch,
      this.localtobacco, 
      this.rice,
      this.insecticide,
      this.dress,
      this.vegetables,
      this.lunch
    ]
  }

}
