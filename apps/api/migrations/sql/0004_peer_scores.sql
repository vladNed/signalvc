-- Create table for precomputed peer scores
-- Peer score = (investors in startup / total investors in market) * 100
CREATE TABLE IF NOT EXISTS peer_scores (
    id SERIAL PRIMARY KEY,
    startup_id UUID NOT NULL REFERENCES public.startup(id) ON DELETE CASCADE,
    market TEXT NOT NULL,
    investor_count INT NOT NULL DEFAULT 0,
    total_market_investors INT NOT NULL DEFAULT 0,
    peer_score NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    last_computed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(startup_id, market)
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_peer_scores_startup ON peer_scores(startup_id);

CREATE INDEX IF NOT EXISTS idx_peer_scores_market ON peer_scores(market);

CREATE INDEX IF NOT EXISTS idx_peer_scores_score ON peer_scores(peer_score DESC);

-- Enable row level security
ALTER TABLE
    peer_scores ENABLE ROW LEVEL SECURITY;

-- Create read policy for peer_scores table
CREATE POLICY read_peer_scores ON peer_scores FOR
SELECT
    TO authenticated USING (true);