#!/bin/bash
source ./env.rsc

mysqldump -p1  --replace --routines --triggers --no-data --no-tablespaces --skip-dump-date \
    -h ${DB_HOST} \
    -u ${DB_USER} \
    -p${DB_PASSWORD} \
    ${DB_DATABASE} \
    | sed 's/\sDEFINER=`[^`]*`@`[^`]*`//g' \
    | sed 's/ AUTO_INCREMENT=[0-9]*//g' \
    > $DB_BACKUP_SRUCT_PATH