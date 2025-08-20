# Database Migration Guide

This guide explains how to use TypeORM migrations in your CoCos Game Login project.

## Setup

1. **Environment Configuration**: Create a `.env` file in the server directory with your database credentials:

   ```env
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=your_password
   MYSQL_DATABASE=cocos_game_db
   ```

2. **Install Dependencies**: Make sure all dependencies are installed:
   ```bash
   cd server
   npm install
   ```

## Available Migration Commands

### Run Migrations

Apply all pending migrations to your database:

```bash
npm run migration:run
```

### Generate New Migration

Auto-generate a migration based on entity changes:

```bash
npm run migration:generate src/migrations/MigrationName
```

### Create Empty Migration

Create a new empty migration file:

```bash
npm run migration:create src/migrations/MigrationName
```

### Revert Last Migration

Rollback the last applied migration:

```bash
npm run migration:revert
```

### Show Migration Status

View which migrations have been applied:

```bash
npm run migration:show
```

## Migration Files

Migration files are located in `src/migrations/` and follow the naming convention:
`TIMESTAMP-MigrationName.ts`

Each migration has two methods:

- `up()`: Contains the changes to apply
- `down()`: Contains the changes to rollback

## Initial Setup

Your initial migration `CreateUserInfoTable` has been created. To set up your database:

1. Create your MySQL database
2. Run the migration: `npm run migration:run`

## Best Practices

1. **Never edit existing migrations** that have been applied to production
2. **Always test migrations** on development/staging before production
3. **Create descriptive migration names** that explain what they do
4. **Review generated migrations** before applying them
5. **Backup your database** before running migrations in production

## Example: Adding a New Field

1. Update your entity (e.g., add a new field to UserInfo)
2. Generate migration: `npm run migration:generate src/migrations/AddNewFieldToUser`
3. Review the generated migration file
4. Run migration: `npm run migration:run`
