# Remediation

## From Console

1. Login to AWS Management Console and open the Amazon S3 console using <https://console.aws.amazon.com/s3/>
2. Select the Check box next to the Bucket.
3. Click on `Permissions`.
4. Click `Bucket Policy`.
5. Add either of the following to the existing policy, filling in the required information:

```json
{
     "Sid": "<optional>",
     "Effect": "Deny",
     "Principal": "*",
     "Action": "s3:*",
     "Resource": "arn:aws:s3:::<bucket_name>/*",
     "Condition": {
        "Bool": {
            "aws:SecureTransport": "false"
        }
    }
}
```

or

```json
{
    "Sid": "<optional>",
    "Effect": "Deny",
    "Principal": "*",
    "Action": "s3:*",
    "Resource": [
        "arn:aws:s3:::<bucket_name>",
        "arn:aws:s3:::<bucket_name>/*"
    ],
    "Condition": {
        "NumericLessThan": {
            "s3:TlsVersion": "1.2"
        }
    }
}
```

6. `Save`.
7. Repeat for all the buckets in your AWS account that contain sensitive data.

## From Console using AWS Policy Generator

1. Repeat steps 1-4 above.
2. Click on `Policy Generator` at the bottom of the Bucket Policy Editor.
3. Select Policy Type `S3 Bucket Policy`.
4. Add Statements.
    - `Effect = Deny`
    - `Principal = *`
    - `AWS Service = Amazon S3`
    - `Actions = *`
    - `Amazon Resource Name = <ARN of the S3 Bucket>`
5. Generate Policy.
6. Copy the text and add it to the Bucket Policy.

## From Command Line

1. Export the bucket policy to a json file.

```sh
aws s3api get-bucket-policy --bucket <bucket_name> --query Policy --output text > policy.json
```

2. Modify the `policy.json` file by adding either of the following:

```json
{
     "Sid": "<optional>",
     "Effect": "Deny",
     "Principal": "*",
     "Action": "s3:*",
     "Resource": "arn:aws:s3:::<bucket_name>/*",
     "Condition": {
        "Bool": {
            "aws:SecureTransport": "false"
        }
    }
}
```

or

```json
{
    "Sid": "<optional>",
    "Effect": "Deny",
    "Principal": "*",
    "Action": "s3:*",
    "Resource": [
        "arn:aws:s3:::<bucket_name>",
        "arn:aws:s3:::<bucket_name>/*"
    ],
    "Condition": {
        "NumericLessThan": {
            "s3:TlsVersion": "1.2"
        }
    }
}
```

3. Apply this modified policy back to the S3 bucket:

```sh
aws s3api put-bucket-policy --bucket <bucket_name> --policy file://policy.json
```
