# Remediation

## Encrypt EFS File System Using KMS CMK

Encryption at rest for Amazon EFS can only be enabled during the creation of the file system. It is not possible to enable encryption or change the KMS key for an existing file system.

### **From Command Line**

1. **Create a customer-managed KMS key:**

    ```sh
    aws kms create-key \
        --region {{us-east-1}} \
        --description "CMK for EFS data encryption"
    ```

2. **(Optional) Create an alias for the CMK:**

    ```sh
    aws kms create-alias \
        --region {{us-east-1}} \
        --alias-name {{alias/efs-cmk}} \
        --target-key-id {{cmk-arn}}
    ```

3. **Create a new EFS file system using the CMK:**

    ```sh
    aws efs create-file-system \
        --region {{us-east-1}} \
        --creation-token {{unique-token}} \
        --encrypted \
        --kms-key-id {{cmk-arn}}
    ```

4. **Create mount targets for the new file system (repeat for each AZ):**

    ```sh
    aws efs create-mount-target \
        --region {{us-east-1}} \
        --file-system-id {{new-file-system-id}} \
        --subnet-id {{subnet-id}}
    ```

5. **Mount the new file system and migrate data** from the existing EFS file system using standard file copy tools (for example, `rsync`).

6. **Delete the original EFS file system** after validating the migration:

    ```sh
    aws efs delete-file-system \
        --region us-east-1 \
        --file-system-id {{old-file-system-id}}
    ```
