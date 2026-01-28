import json
import logging

logger = logging.getLogger(__name__)


def parse_target_markets(val: str) -> str:
    """Parse target markets from a string to a JSON array to be added to JSONB"""
    try:
        return json.loads(val)
    except json.JSONDecodeError:
        logger.warning(f"Failed to parse target markets: {val}. Defaulting to empty list.")
        return json.dumps([])


def round_score(val: float) -> float:
    """Round relevance score to 4 decimal places"""
    return round(val, 1)
