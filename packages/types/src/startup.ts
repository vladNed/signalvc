export type Startup = {
  id: string;
  operationalName: string;
  description: string;
  targetMarkets: string[];
  businessCategory: string;
  employeeCount: number;
  foundedYear: number;
  countryName: string;
  regionName: string;
  peerScore: number;
};

export interface PortfolioStartup {
  id: string;
  operationalName: string;
  description: string;
  businessCategory: string;
  targetMarkets: string[];
  countryName: string;
  regionName: string | null;
  foundedYear: number ;
  employeeCount: number;
  peerScore: number;
  currentValuation: number | null;
}

export type SwipeType = "bear" | "bull" | "portfolio" | null;
