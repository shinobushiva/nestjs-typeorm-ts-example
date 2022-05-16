#!/bin/bash

cd /app
export $(cat .env | grep -v ^\# | xargs)
sls offline --host 0.0.0.0 --stage local-docker