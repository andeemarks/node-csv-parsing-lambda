#!/bin/bash
echo "Emptying CSV bucket..."
aws s3 rm s3://csv-ingestion --recursive
echo "Tearing down stack..."
serverless remove
echo "Rebuilding stack..."
serverless deploy --aws-profile lambda
echo "Upload file to CSV bucket..."
aws s3 cp go.sh s3://csv-ingestion
echo "Tail of logs..."
aws logs filter-log-events --log-group-name /aws/lambda/node-csv-parsing-lambda-dev-ingest --filter-pattern "error"

