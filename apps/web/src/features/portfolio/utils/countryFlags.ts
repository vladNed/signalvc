const COUNTRY_FLAGS: Record<string, string> = {
  Romania: "🇷🇴",
  Germany: "🇩🇪",
  "United Kingdom": "🇬🇧",
  Netherlands: "🇳🇱",
  France: "🇫🇷",
  "United States": "🇺🇸",
  Canada: "🇨🇦",
  Sweden: "🇸🇪",
  Israel: "🇮🇱",
  India: "🇮🇳",
  Japan: "🇯🇵",
  Singapore: "🇸🇬",
  Australia: "🇦🇺",
  Brazil: "🇧🇷",
  Spain: "🇪🇸",
  Italy: "🇮🇹",
  Switzerland: "🇨🇭",
  Poland: "🇵🇱",
  Portugal: "🇵🇹",
  Ireland: "🇮🇪",
};

export function getCountryFlag(countryName: string): string {
  return COUNTRY_FLAGS[countryName] ?? "🏳️";
}
