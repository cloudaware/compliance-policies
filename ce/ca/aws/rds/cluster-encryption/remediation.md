# Remediation

## Encrypt the Cluster

### **From Command Line**

To encrypt an existing unencrypted RDS cluster, follow these steps:

1. **Create a snapshot of the unencrypted cluster:**

    ```sh
    aws rds create-db-cluster-snapshot \
        --db-cluster-identifier {{unencrypted-cluster-id}} \
        --db-cluster-snapshot-identifier {{snapshot-id}}
    ```

2. **Copy the snapshot with encryption enabled:**

    ```sh
    aws rds copy-db-cluster-snapshot \
    --source-db-cluster-snapshot-identifier {{snapshot-id}} \
        --target-db-cluster-snapshot-identifier {{encrypted-snapshot-id}} \
        --kms-key-id {{your-kms-key-id}}
    ```

3. **Restore the encrypted snapshot to a new cluster:**

    ```sh
    aws rds restore-db-cluster-from-snapshot \
        --db-cluster-identifier {{new-encrypted-cluster-id}} \
        --snapshot-identifier {{encrypted-snapshot-id}} \
        --engine {{engine-name}}
    ```

4. **Update application connection strings to point to the new encrypted cluster.**

5. **Delete the old unencrypted cluster after confirming successful migration:**

    ```sh
    aws rds delete-db-cluster \
        --db-cluster-identifier {{unencrypted-cluster-id}} \
        --skip-final-snapshot
    ```
