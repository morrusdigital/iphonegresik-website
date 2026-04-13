import { BranchKey } from "./products"

export interface Branch {
  key: BranchKey
  name: string       
  city: string        
  whatsapp: string    
  address?: string    
}


export interface WhatsAppConfig {
  branch: Branch
  productName: string
  specs: string
}

export interface WhatsAppLink {
  url: string
  label: string       // e.g. "Chat WA Gresik"
}