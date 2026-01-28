CREATE TABLE IF NOT EXISTS investor (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    domain TEXT NOT NULL UNIQUE,
    country_name TEXT NOT NULL,
    region_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_investor_country ON investor(country_name);

CREATE INDEX IF NOT EXISTS idx_investor_domain ON investor(domain);

ALTER TABLE
    investor ENABLE ROW LEVEL SECURITY;