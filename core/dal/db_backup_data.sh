#!/bin/bash
source ./env.rsc

echo mv "$DB_BACKUP_DATA_PATH" "$DB_BACKUP_DATA_PATH-old"
mysqldump \
    --replace --skip-extended-insert --skip-comments --no-create-info --no-tablespaces --skip-add-locks \
    -h ${DB_HOST} \
    -u ${DB_USER} \
    -p${DB_PASSWORD} \
    ${DB_DATABASE} \
    > $DB_BACKUP_DATA_PATH
