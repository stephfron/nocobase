# @nocobase/plugin-proverbs-citations

A NocoBase plugin for managing a collection of proverbs, quotes, and citations.

## Features

- **Add, Edit, Delete**: Manage your proverbs and citations easily
- **Categorization**: Organize by categories (wisdom, inspiration, humor, life, love, success, philosophy, motivation)
- **Source Tracking**: Record authors, sources, and source URLs
- **Favorites**: Mark your favorite proverbs
- **Tags**: Add tags for better organization
- **Notes**: Add personal notes to each entry
- **Multilingual**: Support for multiple languages (EN, FR, ZH-CN)
- **Sorting**: Built-in sorting capability

## Installation

This plugin is included in NocoBase. Enable it through the Plugin Manager.

## Database Configuration for Neon PostgreSQL

To use NocoBase with [Neon](https://neon.tech/) (serverless PostgreSQL), configure your `.env` file:

```bash
# Database configuration for Neon PostgreSQL
DB_DIALECT=postgres
DB_HOST=your-project-id.region.aws.neon.tech
DB_PORT=5432
DB_DATABASE=your_database
DB_USER=your_username
DB_PASSWORD=your_password

# Important: Neon requires SSL
DB_DIALECT_OPTIONS_SSL_REJECT_UNAUTHORIZED=false
```

### Getting Neon Credentials

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project (or use an existing one)
3. In the project dashboard, click on "Connection Details"
4. Copy the connection string and extract the values for the environment variables

## Collection Schema

The `proverbs` collection includes the following fields:

| Field | Type | Description |
|-------|------|-------------|
| id | bigInt | Auto-incremented primary key |
| content | text | The proverb or citation text |
| author | string | Author of the quote |
| source | string | Source (book, speech, article, etc.) |
| sourceUrl | string | URL to the source |
| category | string | Category (wisdom, inspiration, etc.) |
| language | string | Language code (fr, en, es, etc.) |
| tags | string | Comma-separated tags |
| isFavorite | boolean | Mark as favorite |
| notes | text | Personal notes |
| createdAt | date | Creation timestamp |
| updatedAt | date | Last update timestamp |

## API Endpoints

### Get Random Proverb
```
GET /api/proverbs:random
```

### Get Favorites
```
GET /api/proverbs:favorites
```

### Standard CRUD
```
GET /api/proverbs:list
GET /api/proverbs:get?filterByTk=1
POST /api/proverbs:create
PUT /api/proverbs:update?filterByTk=1
DELETE /api/proverbs:destroy?filterByTk=1
```

## Usage Example

After enabling the plugin:

1. Go to the NocoBase admin interface
2. Navigate to "Collection Manager"
3. You'll find the "proverbs" collection ready to use
4. Create pages with table/form blocks to manage your proverbs

## License

AGPL-3.0 and NocoBase Commercial License
