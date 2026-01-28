-- Create enum for swipes
CREATE TYPE swipe_type AS ENUM ('left', 'right', 'up', 'down');

-- Create table for swipes
CREATE TABLE IF NOT EXISTS swipes (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    startup_id UUID NOT NULL REFERENCES public.startup(id),
    swipe_type swipe_type NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index for user_id
CREATE INDEX IF NOT EXISTS idx_swipes_user_id ON swipes(user_id);

-- Create index for startup_id
CREATE INDEX IF NOT EXISTS idx_swipes_startup_id ON swipes(startup_id);

alter table swipes enable row level security;

-- Create write policy for swipes table
CREATE POLICY write_swipes ON swipes FOR INSERT TO authenticated with check (true);

-- Create read policy for swipes table
CREATE POLICY read_swipes ON swipes FOR SELECT TO authenticated USING (true);
