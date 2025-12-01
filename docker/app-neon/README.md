# NocoBase with Neon PostgreSQL

This configuration allows you to run NocoBase with [Neon](https://neon.tech/), a serverless PostgreSQL service.

## Quick Start

1. **Create a Neon Project**
   - Go to [Neon Console](https://console.neon.tech/)
   - Create a new project
   - Copy your connection details

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your Neon credentials:
   - `NEON_HOST`: Your Neon project endpoint (e.g., `ep-cool-name-123456.eu-central-1.aws.neon.tech`)
   - `NEON_DATABASE`: Your database name (default: `neondb`)
   - `NEON_USER`: Your Neon username
   - `NEON_PASSWORD`: Your Neon password

3. **Start NocoBase**
   ```bash
   docker-compose up -d
   ```

4. **Access NocoBase**
   Open http://localhost:13000 in your browser

## Why Neon?

- **Serverless**: No server management needed
- **Auto-scaling**: Scales automatically with your usage
- **Free tier**: Generous free tier for personal projects
- **Branching**: Create database branches for development

## SSL Configuration

Neon requires SSL connections. This is already configured in the docker-compose.yml:
```yaml
DB_DIALECT_OPTIONS_SSL_REJECT_UNAUTHORIZED=false
```

## Proverbs & Citations Plugin

This setup is perfect for running the Proverbs & Citations plugin, which allows you to:
- Manage a collection of proverbs and quotes
- Categorize and tag entries
- Track authors and sources
- Mark favorites

Enable the plugin through NocoBase's Plugin Manager after starting the application.
