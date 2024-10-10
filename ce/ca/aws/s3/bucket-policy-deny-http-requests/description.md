# Description

At the Amazon S3 bucket level, you can configure permissions through a bucket policy making the objects accessible only through HTTPS.

## Rationale

By default, Amazon S3 allows both HTTP and HTTPS requests. To achieve only allowing access to Amazon S3 objects through HTTPS you also have to explicitly deny access to HTTP requests. Bucket policies that allow HTTPS requests without explicitly denying HTTP requests will not comply with this recommendation.

## Audit

To allow access to HTTPS, you can use a bucket policy with the effect `allow` and a
condition that checks for the key `"aws:SecureTransport": "true"`. This means that
HTTPS requests are allowed, but it does not deny HTTP requests. To explicitly deny
HTTP access, ensure that there is also a bucket policy with the effect `deny` that contains
the key `"aws:SecureTransport": "false"`. You may also require TLS by setting a
policy to deny any version lower than the one you wish to require, using the condition
`NumericLessThan` and the key `"s3:TlsVersion": "1.2"`.

## From Console

1. Login to AWS Management Console and open the Amazon S3 console using <https://console.aws.amazon.com/s3/>.
2. Select the Check box next to the Bucket.
3. Click on `Permissions`, then Click on `Bucket Policy`.
4. Ensure that a policy is listed that matches either:

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

`<optional>` and `<bucket_name>` will be specific to your account.

5. Repeat for all the buckets in your AWS account.

## From Command Line

1. List all of the S3 Buckets:

```sh
aws s3 ls
```

2. Using the list of buckets run this command on each of them:

```sh
aws s3api get-bucket-policy --bucket <bucket_name> | grep aws:SecureTransport
```

**NOTE** : If Error being thrown by CLI, it means no Policy has been configured for specified S3 bucket and by default it's allowing both HTTP and HTTPS requests.

3. Confirm that `aws:SecureTransport` is set to false `aws:SecureTransport:false`.
4. Confirm that the policy line has `Effect`set to Deny `Effect:Deny`.

## Default Value

Both HTTP and HTTPS Request are allowed.

## References

1. <https://aws.amazon.com/premiumsupport/knowledge-center/s3-bucket-policy-for-config-rule/>
2. <https://aws.amazon.com/blogs/security/how-to-use-bucket-policies-and-apply-defense-in-depth-to-help-secure-your-amazon-s3-data/>
3. <https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/get-bucket-policy.html>
