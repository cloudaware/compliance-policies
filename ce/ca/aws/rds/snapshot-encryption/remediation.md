# Remediation

## Encrypt a Snapshot

To encrypt an unencrypted AWS RDS snapshot, create an encrypted copy of the existing snapshot using a KMS key, then remove the original unencrypted version.

### **From Command Line**

1. **Create an encrypted copy of the snapshot:**

    ```sh
    aws rds copy-db-snapshot \
        --source-db-snapshot-identifier {{source-snapshot-id}} \
        --target-db-snapshot-identifier {{new-snapshot-id}} \
        --kms-key-id {{kms-key-id}} \
        --copy-option-group \
        --copy-tags \
        --region {{region}}
         
   ```

2. **Delete the original unencrypted snapshot (optional):**

   Once you have confirmed that the encrypted snapshot is available, delete the original unencrypted snapshot.

    ```sh
    aws rds delete-db-snapshot \
        --db-snapshot-identifier {{source-snapshot-id}} \
        --region {{region}}
    ```
