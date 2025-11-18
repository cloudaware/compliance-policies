# Remediation

## Update an Encrypted Table with an AWS Managed Key

### **From Command Line**

To enable encryption at rest using the **AWS managed key**, run the following command:

```sh
aws dynamodb update-table \
  --table-name {{table-name}} \
  --sse-specification Enabled=true,SSEType=KMS
```

## Update an Encrypted Table with a Customer-Managed Key

To enable encryption at rest using a **Customer-Managed key (CMK)**, specify the key ID in the command:

```sh
aws dynamodb update-table \
  --table-name {{table-name}} \
  --sse-specification Enabled=true,SSEType=KMS,KMSMasterKeyId={{kms-key-id}}
```
