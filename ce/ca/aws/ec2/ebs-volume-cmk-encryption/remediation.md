# Remediation

## Encrypt Amazon EBS Volumes

To encrypt Amazon EBS volumes using AWS KMS customer-managed keys (CMKs), perform the following steps.

### **From Command Line**

### Create a customer-managed KMS key

```sh
KMS_KEY_ARN=$(aws kms create-key \
  --region {{region-name}} \
  --description "Customer-managed CMK for EBS volume encryption" \
  --query 'KeyMetadata.Arn' \
  --output text)

aws kms create-alias \
  --region {{region-name}} \
  --alias-name {{alias/ebs-encryption-cmk}} \
  --target-key-id $KMS_KEY_ARN
```

### Re-create the EBS volume using the CMK

1. **Create a snapshot of the source volume:**

    ```sh
    aws ec2 create-snapshot \
    --region {{region-name}} \
    --volume-id {{volume-id}}
    ```

2. **Copy the snapshot with encryption enabled:**

    ```sh
    aws ec2 copy-snapshot \
    --region {{region-name}} \
    --source-region {{source-region}} \
    --source-snapshot-id {{snapshot-id}} \
    --encrypted \
    --kms-key-id {{kms-key-arn}}
    ```

3. **Create a new volume from the encrypted snapshot:**

    ```sh
    aws ec2 create-volume \
    --region {{region-name}} \
    --availability-zone {{availability-zone}} \
    --snapshot-id {{snapshot-id}} \
    --encrypted \
    --kms-key-id {{kms-key-arn}}
    ```

### Replace the existing volume (if attached)

1. **Stop the EC2 instance.**
2. **Detach the original unencrypted volume:**

    ```sh
    aws ec2 detach-volume \
    --region {{region-name}} \
    --volume-id {{unencrypted-volume-id}}
    ```

3. **Attach the new encrypted volume:**

    ```sh
    aws ec2 attach-volume \
    --region {{region-name}} \
    --volume-id {{encrypted-volume-id}} \
    --instance-id {{instance-id}} \
    --device {{/dev/sdf}}
    ```
