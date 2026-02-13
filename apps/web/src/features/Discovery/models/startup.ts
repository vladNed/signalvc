export interface Startup {
  id: string;
  name: string;
  description: string;
  industry: string;
  fundingStage: string;
  teamSize: number;
  location: string;
  imageUrl: string;
  founderName: string;
  bullBearScore: number;
  bullBearSentiment: "Very Bullish" | "Bullish" | "Neutral" | "Bearish" | "Very Bearish";
  peerScore: number;
  mrr: number;
  ticketSize: number;
  countryCode: string;
}
