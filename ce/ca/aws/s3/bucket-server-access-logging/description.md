# Description

AWS S3 Server Access Logging enables you to track and analyze access to your S3 buckets, providing detailed records of requests made to the objects.

## Rational

When Server Access Logging is enabled for an S3 (source) bucket, Amazon S3 starts to capture access logs and store them in a separate (destination) bucket designated for logging purposes. These logs are typically stored in a standardized format and can be easily analyzed using various AWS tools or third-party services.

The access logs generated by S3 contain information such as:

- **Requester's IP Address:** The IP address of the entity making the request to access the S3 bucket.
- **Request Timestamp:** The date and time when the request was made.
- **Requested Resource:** The specific object within the S3 bucket that was accessed.
- **HTTP Method:** The method used for the request (e.g., GET, PUT, DELETE).
- **Response Status:** The HTTP status code returned by S3 in response to the request.
- **Bytes Sent/Received:** The number of bytes sent from S3 to the requester and received by S3 from the requester.

## Impact

By enabling Server Access Logging feature, you gain insights into who accessed your data, when, and from where, facilitating compliance auditing, security monitoring, and performance optimization.

## Audit

This policy marks an object as `INCOMPLIANT` in the following cases:

- `Logging Destination Bucket Name` field is empty, indicating that the feature is not enabled.
- `Logging Destination Bucket` field is empty, which means that the logging bucket is missing (excluding the case when the source bucket references itself as the destination).
- `Logging Destination Bucket` is deleted.

A bucket will be marked as `INAPPLICABLE` when it is referenced as the destination bucket by other buckets. The destination logging bucket doesn't need to have server access logging enabled, and you should suppress findings for this bucket.

If a bucket uses itself as the logging destination, it will be marked as `COMPLIANT` (in this case, the `Logging Destination Bucket` field is empty). However, delivering logs to the source bucket will cause an infinite loop of logs and is not recommended.

`UNDETERMINED` status indicates a possible permission issue with `s3:GetBucketLogging` API call.
