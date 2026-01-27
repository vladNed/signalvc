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

    df = pd.DataFrame(data)

    csv_path = os.path.join(out_dir, "vc_table_100.csv")
    df.to_csv(csv_path, index=False)
    print(f"CSV file saved to {csv_path}")

    parquet_path = os.path.join(out_dir, "vc_table_100.parquet")
    try:
        df.to_parquet(parquet_path, index=False)
        print(f"Parquet file saved to {parquet_path}")
    except Exception as e:
        print(f"Could not write parquet file (missing engine?). Error: {e}\nCSV is available at {csv_path}")


if __name__ == "__main__":
    generate_vc_data()
