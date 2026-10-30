# Remediation

## Encrypt the Bucket with a Customer Managed Key

Configure the affected Object Storage bucket to use a customer managed key from OCI Vault. Before applying the change, confirm that the target key is enabled and that Object Storage has permission to use it.

### **From Oracle Cloud Console**

1. Navigate to `https://cloud.oracle.com/object-storage/buckets`.
2. Click the affected bucket under the `Name` heading.
3. Click `Assign` next to `Encryption Key: Oracle managed key`.
4. Select the target Vault.
5. Select the target master encryption key.
6. Click `Assign`.

### **From OCI CLI**

For each affected bucket, run:

```sh
oci os bucket update \
    --namespace-name {{namespace-name}} \
    --bucket-name {{bucket-name}} \
    --kms-key-id {{kms-key-ocid}}
```

After remediation, verify that the bucket references the intended customer managed key:

```sh
oci os bucket get \
    --namespace-name {{namespace-name}} \
    --bucket-name {{bucket-name}} \
    --query "data.\"kms-key-id\""
```
