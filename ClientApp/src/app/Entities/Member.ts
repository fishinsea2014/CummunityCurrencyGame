import { Product } from "./Product";

export interface Member {
    Occupation: string;
    Products?: string[];
    Saving : number;
    BoughtProducts?: Product[];
    
    //If a mumber has already done trade,then true, and disable their buttons   
    isDealDone?: boolean;
}
