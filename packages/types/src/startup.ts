export type Startup = {
  id: string;
  operationalName: string;
  description: string;
  targetMarkets: string[];
  businessCategory: string;
  employeeCount: number;
  foundedYear: number;
};

export type SwipeDirection = "bear" | "bull" | "portfolio" | null;
