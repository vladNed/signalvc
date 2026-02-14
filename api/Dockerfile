FROM python:3.13-bullseye

WORKDIR /app

# Install system dependencies needed for compilation
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    gcc \
    build-essential \
    libpq-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 - --version 1.8.0 \
    && ln -s /root/.local/bin/poetry /usr/local/bin/poetry

# Copy everything (including source)
COPY . .

# Install dependencies
RUN poetry config virtualenvs.create false \
    && poetry install --only main

# Make sure entrypoint is executable
RUN chmod +x ./scripts/run_local.sh

EXPOSE 8080

CMD ["./scripts/run_local.sh"]
