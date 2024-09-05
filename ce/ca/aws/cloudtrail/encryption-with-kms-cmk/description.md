# Description

AWS CloudTrail is a web service that records AWS API calls for an account and makes those logs available to users and resources in accordance with IAM policies. AWS Key Management Service (KMS) is a managed service that helps create and control the encryption keys used to encrypt account data, and uses Hardware Security Modules (HSMs) to protect the security of encryption keys. CloudTrail logs can be configured to leverage server side encryption (SSE) and KMS customer created master keys (CMK) to further protect CloudTrail logs. It is recommended that CloudTrail be configured to use SSE-KMS.

## Rationale

Configuring CloudTrail to use SSE-KMS provides additional confidentiality controls on log data as a given user must have S3 read permission on the corresponding log bucket and must be granted decrypt permission by the CMK policy.

## Impact

Customer created keys incur an additional cost. See <https://aws.amazon.com/kms/pricing/> for more information.

## Audit

Perform the following to determine if CloudTrail is configured to use SSE-KMS:

### From Console

1. Sign in to the AWS Management Console and open the CloudTrail console at <https://console.aws.amazon.com/cloudtrail>.
2. In the left navigation pane, choose `Trails`.
3. Select a Trail.
4. Under the S3 section, ensure `Encrypt log files` is set to `Yes` and a KMS key ID is specified in the `KSM Key Id` field.

### From Command Line

1. Run the following command:

```sh
aws cloudtrail describe-trails
```

2. For each trail listed, SSE-KMS is enabled if the trail has a `KmsKeyId` property defined.

## References

1. <https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html>
2. <https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html>
3. CCE-78919-8

## Additional Information

3 statements which need to be added to the CMK policy:

1. Enable Cloudtrail to describe CMK properties:

```json
{ 
    "Sid": "Allow CloudTrail access", 
    "Effect": "Allow", 
    "Principal": { 
        "Service": "cloudtrail.amazonaws.com" 
    }, 
    "Action": "kms:DescribeKey", 
    "Resource": "*" 
}
```

2. Granting encrypt permissions:

```json
{ 
    "Sid": "Allow CloudTrail to encrypt logs", 
    "Effect": "Allow", 
    "Principal": { 
        "Service": "cloudtrail.amazonaws.com" 
    }, 
    "Action": "kms:GenerateDataKey*", 
    "Resource": "*", 
    "Condition": { 
        "StringLike": { 
            "kms:EncryptionContext:aws:cloudtrail:arn":  "arn:aws:cloudtrail:*:aws-account-id:trail/*" 
        } 
    }
}
```

3. Granting decrypt permissions:

```json
{ 
    "Sid": "Enable CloudTrail log decrypt permissions", 
    "Effect": "Allow", 
    "Principal": { 
        "AWS": "arn:aws:iam::aws-account-id:user/username" 
    }, 
    "Action": "kms:Decrypt", 
    "Resource": "*", 
    "Condition": { 
        "Null": { 
            "kms:EncryptionContext:aws:cloudtrail:arn": "false" 
        } 
    } 
}
```
