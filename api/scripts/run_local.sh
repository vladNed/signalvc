#!/bin/sh
set -e

HOST=${APP_HOST:-0.0.0.0}
PORT=${APP_PORT:-8080}
LOG_LEVEL=${APP_LOG_LEVEL:-debug}

export APP_MODULE=${APP_MODULE:-"api.server:app"}


# Run the application
exec uvicorn $APP_MODULE --host $HOST --port $PORT --log-level $LOG_LEVEL --reload