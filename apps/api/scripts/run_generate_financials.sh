#!/bin/bash
# Helper script to generate startup financial data with proper environment

# Load environment variables from .env if it exists
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if we're running in Docker or local
if [ -z "$POSTGRES__HOST" ]; then
    echo "POSTGRES__HOST not set. Defaulting to localhost"
    export POSTGRES__HOST="localhost"
fi

echo "Generating startup financial data (ARR, founder, funding_size)..."
echo "Database: $POSTGRES__DB on $POSTGRES__HOST"
echo ""

python scripts/generate_startup_financials.py
