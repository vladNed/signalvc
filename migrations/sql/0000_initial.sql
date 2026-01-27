CREATE TABLE IF NOT EXISTS profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    user_id UUID NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Initial migration to create veridion_data table
CREATE TABLE IF NOT EXISTS startup (
    id UUID primary key default gen_random_uuid(),
    operational_name TEXT NOT NULL,
    description TEXT NOT NULL,
    business_category TEXT NOT NULL,
    target_markets JSONB NOT NULL,
    country_name TEXT NOT NULL,
    region_name TEXT,
    founded_year INTEGER,
    employee_count INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_startup_category ON startup(business_category);

CREATE INDEX IF NOT EXISTS idx_startup_country ON startup(country_name);

CREATE INDEX IF NOT EXISTS idx_startup_target_markets ON startup USING GIN(target_markets);

-- GIN index for array overlap
alter table
    profile enable row level security;

create policy read_only_own_policy on profile as permissive for
select
    to authenticated using (
        (
            select
                auth.uid() = user_id
        )
    );