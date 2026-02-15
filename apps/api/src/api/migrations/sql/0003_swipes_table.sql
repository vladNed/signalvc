-- Create enum for swipes
CREATE TYPE swipe_type AS ENUM ('bull', 'bear', 'add_to_portofolio');

-- Create table for swipes
CREATE TABLE IF NOT EXISTS swipes (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profile(id),
    startup_id UUID NOT NULL REFERENCES public.startup(id),
    swipe_type swipe_type NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create table for swipe statistics
CREATE TABLE IF NOT EXISTS swipe_stats (
    id SERIAL PRIMARY KEY,
    startup_id UUID NOT NULL REFERENCES public.startup(id) UNIQUE,
    bull_count INT NOT NULL DEFAULT 0,
    bear_count INT NOT NULL DEFAULT 0,
    add_count INT NOT NULL DEFAULT 0,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index for user_id
CREATE INDEX IF NOT EXISTS idx_swipes_user_id ON swipes(user_id);

-- Create index for startup_id
CREATE INDEX IF NOT EXISTS idx_swipes_startup_id ON swipes(startup_id);

alter table swipes enable row level security;
ALTER TABLE swipe_stats ENABLE ROW LEVEL SECURITY;

-- Create write policy for swipes table
CREATE POLICY write_swipes ON swipes FOR INSERT TO authenticated with check (true);

-- Create read policy for swipes table
CREATE POLICY read_swipes ON swipes FOR SELECT TO authenticated USING (true);
