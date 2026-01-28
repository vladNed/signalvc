import os
import pandas as pd


def generate_vc_data():
    """Generate a CSV and Parquet with 100 VC firms (EU + USA)."""
    data = [
        {"Name": "Sequoia Capital", "Web domain name": "sequoiacap.com", "HQ Location": "Menlo Park, CA, USA"},
        {"Name": "Andreessen Horowitz", "Web domain name": "a16z.com", "HQ Location": "Menlo Park, CA, USA"},
        {"Name": "Accel", "Web domain name": "accel.com", "HQ Location": "Palo Alto, CA, USA"},
        {"Name": "Benchmark", "Web domain name": "benchmark.com", "HQ Location": "San Francisco, CA, USA"},
        {"Name": "Greylock Partners", "Web domain name": "greylock.com", "HQ Location": "Menlo Park, CA, USA"},
        {"Name": "Bessemer Venture Partners", "Web domain name": "bvp.com", "HQ Location": "Menlo Park, CA, USA"},
        {"Name": "Kleiner Perkins", "Web domain name": "kleinerperkins.com", "HQ Location": "Menlo Park, CA, USA"},
        {"Name": "Founders Fund", "Web domain name": "foundersfund.com", "HQ Location": "San Francisco, CA, USA"},
        {
            "Name": "Lightspeed Venture Partners",
            "Web domain name": "lightspeedvp.com",
            "HQ Location": "Menlo Park, CA, USA",
        },
        {"Name": "New Enterprise Associates (NEA)", "Web domain name": "nea.com", "HQ Location": "Menlo Park, CA, USA"},
        {"Name": "General Catalyst", "Web domain name": "generalcatalyst.com", "HQ Location": "Cambridge, MA, USA"},
        {
            "Name": "IVP (Institutional Venture Partners)",
            "Web domain name": "ivp.com",
            "HQ Location": "Menlo Park, CA, USA",
        },
        {"Name": "Battery Ventures", "Web domain name": "battery.com", "HQ Location": "Boston, MA, USA"},
        {"Name": "Union Square Ventures", "Web domain name": "usv.com", "HQ Location": "New York, NY, USA"},
        {"Name": "Khosla Ventures", "Web domain name": "khoslaventures.com", "HQ Location": "Menlo Park, CA, USA"},
        {"Name": "Tiger Global Management", "Web domain name": "tigerglobal.com", "HQ Location": "New York, NY, USA"},
        {"Name": "Insight Partners", "Web domain name": "insightpartners.com", "HQ Location": "New York, NY, USA"},
        {"Name": "GGV Capital", "Web domain name": "ggv.com", "HQ Location": "Menlo Park, CA, USA"},
        {"Name": "Spark Capital", "Web domain name": "sparkcapital.com", "HQ Location": "Boston, MA, USA"},
        {"Name": "Madrona Venture Group", "Web domain name": "madrona.com", "HQ Location": "Seattle, WA, USA"},
        {"Name": "Index Ventures", "Web domain name": "indexventures.com", "HQ Location": "London, UK & Geneva, CH"},
        {"Name": "Balderton Capital", "Web domain name": "balderton.com", "HQ Location": "London, UK"},
        {"Name": "Atomico", "Web domain name": "atomico.com", "HQ Location": "London, UK"},
        {"Name": "Northzone", "Web domain name": "northzone.com", "HQ Location": "London, UK & Stockholm, SE"},
        {"Name": "Lakestar", "Web domain name": "lakestar.com", "HQ Location": "Zurich, CH"},
        {"Name": "Speedinvest", "Web domain name": "speedinvest.com", "HQ Location": "Vienna, AT"},
        {"Name": "Seedcamp", "Web domain name": "seedcamp.com", "HQ Location": "London, UK"},
        {"Name": "Partech", "Web domain name": "partechpartners.com", "HQ Location": "Paris, FR"},
        {"Name": "Creandum", "Web domain name": "creandum.com", "HQ Location": "Stockholm, SE"},
        {"Name": "EQT Ventures", "Web domain name": "eqtventures.com", "HQ Location": "Stockholm, SE"},
        {"Name": "Octopus Ventures", "Web domain name": "octopusventures.com", "HQ Location": "London, UK"},
        {"Name": "LocalGlobe", "Web domain name": "localglobe.com", "HQ Location": "London, UK"},
        {"Name": "Dawn Capital", "Web domain name": "dawncapital.com", "HQ Location": "London, UK"},
        {"Name": "Notion Capital", "Web domain name": "notion.vc", "HQ Location": "London, UK"},
        {"Name": "Point Nine Capital", "Web domain name": "pointnine.com", "HQ Location": "Berlin, DE"},
        {"Name": "DN Capital", "Web domain name": "dncapital.com", "HQ Location": "London, UK"},
        {"Name": "HV Capital", "Web domain name": "hvcapital.com", "HQ Location": "Munich, DE"},
        {"Name": "Earlybird Venture Capital", "Web domain name": "earlybird.com", "HQ Location": "Berlin, DE"},
        {"Name": "Kima Ventures", "Web domain name": "kimaventures.com", "HQ Location": "Paris, FR"},
        {"Name": "Iris Capital", "Web domain name": "iriscapital.com", "HQ Location": "Paris, FR"},
        {"Name": "Alven Capital", "Web domain name": "alven.co", "HQ Location": "Paris, FR"},
        {"Name": "Eight Roads Ventures", "Web domain name": "eightroads.com", "HQ Location": "London, UK"},
        {"Name": "Sapphire Ventures", "Web domain name": "sapphireventures.com", "HQ Location": "Palo Alto, CA, USA"},
        {"Name": "Redpoint Ventures", "Web domain name": "redpoint.com", "HQ Location": "Menlo Park, CA, USA"},
        {"Name": "First Round Capital", "Web domain name": "firstround.com", "HQ Location": "Philadelphia, PA, USA"},
        {"Name": "Lerer Hippeau", "Web domain name": "lererhippeau.com", "HQ Location": "New York, NY, USA"},
        {"Name": "RRE Ventures", "Web domain name": "rre.com", "HQ Location": "New York, NY, USA"},
        {
            "Name": "Forerunner Ventures",
            "Web domain name": "forerunnerventures.com",
            "HQ Location": "San Francisco, CA, USA",
        },
        {"Name": "Foundry Group", "Web domain name": "foundrygroup.com", "HQ Location": "Boulder, CO, USA"},
        {"Name": "Polaris Partners", "Web domain name": "polarispartners.com", "HQ Location": "Boston, MA, USA"},
        {"Name": "Canaan Partners", "Web domain name": "canaan.com", "HQ Location": "Menlo Park, CA, USA"},
        {"Name": "Venrock", "Web domain name": "venrock.com", "HQ Location": "New York, NY, USA"},
        {"Name": "Sutter Hill Ventures", "Web domain name": "shv.com", "HQ Location": "Menlo Park, CA, USA"},
        {
            "Name": "Crosslink Capital",
            "Web domain name": "crosslinkcapital.com",
            "HQ Location": "San Francisco, CA, USA",
        },
        {"Name": "Ribbit Capital", "Web domain name": "ribbitcap.com", "HQ Location": "Palo Alto, CA, USA"},
        {"Name": "SOSV", "Web domain name": "sosv.com", "HQ Location": "Princeton, NJ, USA"},
        {"Name": "SV Angel", "Web domain name": "svangel.com", "HQ Location": "San Francisco, CA, USA"},
        {"Name": "True Ventures", "Web domain name": "trueventures.com", "HQ Location": "San Francisco, CA, USA"},
        {"Name": "Upfront Ventures", "Web domain name": "upfront.com", "HQ Location": "Los Angeles, CA, USA"},
        {"Name": "IA Ventures", "Web domain name": "iaventures.com", "HQ Location": "New York, NY, USA"},
        {"Name": "Scale Venture Partners", "Web domain name": "scalevp.com", "HQ Location": "Foster City, CA, USA"},
        {"Name": "TCV", "Web domain name": "tcv.com", "HQ Location": "Palo Alto, CA, USA"},
        {"Name": "8VC", "Web domain name": "8vc.com", "HQ Location": "San Francisco, CA, USA"},
        {"Name": "DFJ (Draper Fisher Jurvetson)", "Web domain name": "dfj.com", "HQ Location": "Menlo Park, CA, USA"},
        {"Name": "Maveron", "Web domain name": "maveron.com", "HQ Location": "Seattle, WA, USA"},
        {
            "Name": "Bain Capital Ventures",
            "Web domain name": "baincapitalventures.com",
            "HQ Location": "Boston, MA, USA",
        },
        {
            "Name": "OpenView Venture Partners",
            "Web domain name": "openviewpartners.com",
            "HQ Location": "Boston, MA, USA",
        },
        {"Name": "Highland Capital Partners", "Web domain name": "hcp.com", "HQ Location": "Boston, MA, USA"},
        {"Name": "Felicis Ventures", "Web domain name": "felicis.com", "HQ Location": "Palo Alto, CA, USA"},
        {"Name": "MMC Ventures", "Web domain name": "mmcventures.com", "HQ Location": "London, UK"},
        {"Name": "Octopus Capital", "Web domain name": "octopusgroup.com", "HQ Location": "London, UK"},
        {"Name": "Entrepreneur First", "Web domain name": "joinef.com", "HQ Location": "London, UK"},
        {"Name": "Eurazeo", "Web domain name": "eurazeo.com", "HQ Location": "Paris, FR"},
        {"Name": "BlueYard Capital", "Web domain name": "blueyard.com", "HQ Location": "Berlin, DE"},
    ]

    # Ensure output directory exists
    out_dir = "data"
    os.makedirs(out_dir, exist_ok=True)

    def parse_hq(hq: str):
        """Parse an HQ Location like 'City, ST, COUNTRY' into region and country.

        - region_name: everything before the last comma
        - country_name: last token after the final comma
        """
        if not hq:
            return "", ""

        # If there are multiple locations like 'London, UK & Geneva, CH', take the first
        first_loc = hq.split("&")[0].strip()
        parts = [p.strip() for p in first_loc.split(",") if p.strip()]
        if not parts:
            return "", ""

        country_token = parts[-1]

        # Map some common country abbreviations to full country names
        COUNTRY_MAP = {
            "USA": "United States",
            "US": "United States",
            "U.S.": "United States",
            "U.S.A.": "United States",
            "UK": "United Kingdom",
            "GB": "United Kingdom",
            "CH": "Switzerland",
            "DE": "Germany",
            "FR": "France",
            "AT": "Austria",
            "SE": "Sweden",
            "NL": "Netherlands",
        }

        country = COUNTRY_MAP.get(country_token, country_token)

        # US postal code to full state name map
        US_STATES = {
            "AL": "Alabama",
            "AK": "Alaska",
            "AZ": "Arizona",
            "AR": "Arkansas",
            "CA": "California",
            "CO": "Colorado",
            "CT": "Connecticut",
            "DE": "Delaware",
            "FL": "Florida",
            "GA": "Georgia",
            "HI": "Hawaii",
            "ID": "Idaho",
            "IL": "Illinois",
            "IN": "Indiana",
            "IA": "Iowa",
            "KS": "Kansas",
            "KY": "Kentucky",
            "LA": "Louisiana",
            "ME": "Maine",
            "MD": "Maryland",
            "MA": "Massachusetts",
            "MI": "Michigan",
            "MN": "Minnesota",
            "MS": "Mississippi",
            "MO": "Missouri",
            "MT": "Montana",
            "NE": "Nebraska",
            "NV": "Nevada",
            "NH": "New Hampshire",
            "NJ": "New Jersey",
            "NM": "New Mexico",
            "NY": "New York",
            "NC": "North Carolina",
            "ND": "North Dakota",
            "OH": "Ohio",
            "OK": "Oklahoma",
            "OR": "Oregon",
            "PA": "Pennsylvania",
            "RI": "Rhode Island",
            "SC": "South Carolina",
            "SD": "South Dakota",
            "TN": "Tennessee",
            "TX": "Texas",
            "UT": "Utah",
            "VT": "Vermont",
            "VA": "Virginia",
            "WA": "Washington",
            "WV": "West Virginia",
            "WI": "Wisconsin",
            "WY": "Wyoming",
            "DC": "District of Columbia",
        }

        region = ""

        # If the country resolves to United States, try to find a state code in the
        # tokens before the country token and map it to the full state name.
        if country == "United States":
            # search backwards in the tokens before the country token for a state abbrev
            for token in reversed(parts[:-1]):
                up = token.upper()
                # strip common 'US state' trailing periods (e.g., 'N.J.' -> 'NJ')
                up = up.replace(".", "")
                if up in US_STATES:
                    region = US_STATES[up]
                    break
                # if token already is a full state name, use it
                if token in US_STATES.values():
                    region = token
                    break

        # For non-US entries we avoid returning a city as region (user requested state/region only).
        # So region remains empty unless a US state was found above.

        return region, country

    # Normalize data to required columns: name, domain, country_name, region_name
    normalized = []
    for item in data:
        region, country = parse_hq(item.get("HQ Location", ""))
        normalized.append(
            {
                "name": item.get("Name", ""),
                "domain": item.get("Web domain name", ""),
                "country_name": country,
                "region_name": region,
            }
        )

    df = pd.DataFrame(normalized)

    parquet_path = os.path.join(out_dir, "investor.parquet")
    df.to_parquet(parquet_path, index=False)
    print(f"Parquet file saved to {parquet_path}")


if __name__ == "__main__":
    generate_vc_data()
