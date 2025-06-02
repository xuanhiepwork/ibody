#!/bin/bash

mysqldump -u phpmyadmin -p1  --replace --routines --triggers --no-data --no-tablespaces --skip-dump-date ibody | sed 's/\sDEFINER=`[^`]*`@`[^`]*`//g' | sed 's/ AUTO_INCREMENT=[0-9]*//g' > database_structure.sql > ./database_structure.sql