# Remediation

## Enable Object Versioning for the Bucket

Enable object versioning for each affected Oracle Storage Bucket. If versioning is currently suspended, reactivate it so new object writes and deletes create recoverable object versions.

Because previous versions consume storage until they are deleted, configure Object Lifecycle Management if older object versions should expire automatically after an approved retention period.

### **From Oracle Cloud Console**

1. Open the OCI Console.
2. Go to **Storage** > **Object Storage & Archive Storage** > **Buckets**.
3. Select the compartment that contains the affected bucket.
4. Open the affected bucket.
5. Open the bucket edit or settings page.
6. Set **Object Versioning** to **Enabled**.
7. Save the change.

### **From OCI CLI**

For each affected bucket, run:

```sh
oci os bucket update \
    --namespace-name "{{namespace-name}}" \
    --bucket-name "{{bucket-name}}" \
    --versioning "Enabled"
```

After remediation, verify that versioning is enabled:

```sh
oci os bucket get \
    --namespace-name "{{namespace-name}}" \
    --bucket-name "{{bucket-name}}" \
    --query "data.versioning"
```
