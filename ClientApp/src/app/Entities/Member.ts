import { Product } from "./Product";

export interface Member {
    Occupation: string;
    Products?: Product[];
    Saving : number;
    IsActive?: boolean;
    BoughtProducts?: Product[];
    
    //If a mumber has already traded,then isTraded is true, and disable their buttons   
    isTraded?: boolean;
}
