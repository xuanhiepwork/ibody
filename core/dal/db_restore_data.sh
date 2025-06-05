#!/bin/bash
source ./env.rsc

echo "Restore db from ${DB_BACKUP_DATA_PATH}"
mysql -h ${DB_HOST} -u ${DB_USER}  -p"${DB_PASSWORD}" ${DB_DATABASE} < "$DB_BACKUP_DATA_PATH"
