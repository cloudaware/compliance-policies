# Remediation

## Enable Server-Side Encryption

### **From AWS CLI**

To enable server-side encryption using the AWS CLI, run the `start-stream-encryption` command:

```sh
aws kinesis start-stream-encryption \
    --stream-name {{stream-name}} \
    --encryption-type KMS \
    --key-id {{kms-key-id}}
```
