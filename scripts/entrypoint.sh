#!/bin/sh
set -e

HOST=${APP_HOST:-0.0.0.0}
PORT=${APP_PORT:-8080}
LOG_LEVEL=${APP_LOG_LEVEL:-debug}

export APP_MODULE=${APP_MODULE}

# Activate virtual environment
if [ -d ".venv" ] ; then
    . ./.venv/bin/activate
else
    echo "WARNING: no .venv found and activated, using $(which python)"
fi

# Run the application

exec gunicorn -k uvicorn.workers.UvicornWorker \
    --bind ${HOST}:${PORT} \
    --log-level ${LOG_LEVEL} \
    --workers 4 \
    --reload \
    ${APP_MODULE}