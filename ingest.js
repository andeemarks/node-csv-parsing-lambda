'use strict';

var AWS = require('aws-sdk');
var s3 = new AWS.S3();

module.exports.handler = (event, context, callback) => {
  var bucket = event.Records[0].s3.bucket.name;
  var key = event.Records[0].s3.object.key;
  s3.getObject({Bucket: bucket, Key: key}, function(err, data) {
    if (err) {
      console.log("Error getting object " + key + " from bucket " + bucket +
          ". Make sure they exist and your bucket is in the same region as this function.");
      context.fail ("Error getting file: " + err)      
    } else {
      console.log('CONTENT TYPE:', data.ContentType);
      context.succeed();
    }
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello Andy!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
