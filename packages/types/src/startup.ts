export type Startup = {
  id: string;
  operationalName: string;
  description: string;
  targetMarkets: string[];
  businessCategory: string;
  employeeCount: number;
  foundedYear: number;
};

export type SwipeType = "bear" | "bull" | "portfolio" | null;
