#!/bin/bash
source ./env.rsc

echo "Drop and restore database $DB_DATABASE"
echo "Login mysql $DB_ROOT_USER@$DB_HOST:"
sudo mysql -h $DB_HOST -u $DB_ROOT_USER -p << eof
DROP SCHEMA IF EXISTS $DB_DATABASE;
CREATE DATABASE $DB_DATABASE DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL ON $DB_DATABASE.* TO '$DB_USER'@'$DB_HOST';
FLUSH PRIVILEGES;
SET GLOBAL log_bin_trust_function_creators = 1;
eof

echo
echo "Restore database from '$DB_BACKUP_SRUCT_PATH'"
mysql -h $DB_HOST -u $DB_USER  -p"$DB_PASSWORD" $DB_DATABASE < "$DB_BACKUP_SRUCT_PATH"
