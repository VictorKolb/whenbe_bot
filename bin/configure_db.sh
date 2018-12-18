#!/bin/bash

export PGPASSWORD="node_password"
echo "configuring whenbedb"

dropdb -U node_user whenbe
createdb -U node_user whenbe

psql -U node_user whenbe < ./bin/sql/fan.sql
psql -U node_user whenbe < ./bin/sql/artist.sql

echo "configuring whenbedb is done"
