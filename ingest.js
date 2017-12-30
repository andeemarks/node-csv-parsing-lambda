'use strict';

var AWS = require('aws-sdk');
var s3 = new AWS.S3();

module.exports.handler = (event, context, callback) => {
  var bucket = event.Records[0].s3.bucket.name;
  var key = event.Records[0].s3.object.key;
  s3.getObject({Bucket: bucket, Key: key}, function(err, data) {
    if (err) {
      context.fail ("Error getting file: (" + bucket + ", " + key + ") " + err);
      return;      
    } else {
      console.log('CONTENT TYPE:', data.ContentType);
      context.succeed();

      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Hello Andy!',
          input: event,
        }),
      };

      callback(null, response);
    }
  });
};
