# Remediation

## Enable Server-Side Encryption for SNS Topics Using KMS Keys

### **From Command Line**

To enable server-side encryption for an SNS topic using an AWS KMS key, run the following command:

```bash
aws sns set-topic-attributes \
    --topic-arn {{topic-arn}} \
    --attribute-name KmsMasterKeyId \
    --attribute-value {{kms-key-id}}
```

### Additional Considerations

Include the following in the key policy to allow Amazon SNS to encrypt and decrypt messages:

```json
{ 
    "Effect": "Allow", 
    "Principal": { 
        "Service": "sns.amazonaws.com" 
     },
    "Action": [
        "kms:Decrypt",
        "kms:GenerateDataKey"
    ],
    "Resource": "*",
    "Condition": {
        "ArnLike": { 
            "aws:SourceArn": "arn:aws:{{service}}:{{region}}:{{account-id}}:{{resource-type}}/{{resource-id}}" 
        },
        "StringEquals": { 
            "kms:EncryptionContext:aws:sns:topicArn": "arn:aws:sns:{{region}}:{{account-id}}:{{sns-topic-name}}" 
        }
    }
}
```
