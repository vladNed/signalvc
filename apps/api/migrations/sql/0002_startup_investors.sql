-- Migration to create startup_investors junction table
CREATE TABLE IF NOT EXISTS startup_investor (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    startup_id UUID NOT NULL REFERENCES public.startup(id) ON DELETE CASCADE,
    investor_id UUID NOT NULL REFERENCES public.investor(id) ON DELETE CASCADE,
    entry_valuation_usd BIGINT NOT NULL,
    current_valuation_usd BIGINT NOT NULL,
    entry_ticket_size_usd INTEGER NOT NULL,
    current_ticket_size_usd INTEGER NOT NULL,
    investment_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(startup_id, investor_id)
);

CREATE INDEX IF NOT EXISTS idx_startup_investor_startup ON startup_investor(startup_id);

CREATE INDEX IF NOT EXISTS idx_startup_investor_investor ON startup_investor(investor_id);

CREATE INDEX IF NOT EXISTS idx_startup_investor_date ON startup_investor(investment_date);

ALTER TABLE
    startup_investor ENABLE ROW LEVEL SECURITY;
