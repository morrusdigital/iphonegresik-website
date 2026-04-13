export type Category = 'iphone' | 'ipad' | 'macbook' | 'accessories';
export type StockStatus = 'Ready' | 'terbatas' | 'indent';
export type Condition = 'baru' | 'second';
export type BranchKey = 'gresik' | 'tuban'

export interface StockPerBranch {
    gresik : number;
    tuban : number;
}

export interface Product {
    id : string;
    name : string;
    slug : string;
    category : Category;
    model : string;
    storage : string;
    color : string;
    condition : Condition;
    price : number;
    image : string;
    specs : string;
    stock : StockPerBranch;
}

export interface FilterState {
  model: string       
  storage: string     
  color: string        
  condition: string    
  priceMin: number    
  priceMax: number     
}
 
export const DEFAULT_FILTER_STATE: FilterState = {
  model: '',
  storage: '',
  color: '',
  condition: '',
  priceMin: 0,
  priceMax: 0,
}

export interface FilterOptions {
  models: string[]
  storages: string[]
  colors: string[]
  conditions: Condition[]
}