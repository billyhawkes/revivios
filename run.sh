#!/bin/bash
set -e

DB_PATH="/usr/src/app/persist/sqlite.db"

# Restore the database if it does not already exist.
if [ -f "$DB_PATH" ]; then
  echo "✅ Database already exists at $DB_PATH, skipping restore."
else
  echo "🔄 No database found at $DB_PATH, attempting restore from replica..."
  litestream restore -if-replica-exists "$DB_PATH"
fi

# Run Litestream and Bun app together
echo "🚀 Starting Litestream replication and Bun app..."
exec litestream replicate -exec "bun run start"

