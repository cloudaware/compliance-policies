# Remediation

## Disable Public Access for the Object Storage Bucket

Set the affected bucket visibility to private by changing its public access type to **NoPublicAccess**. Before remediation, confirm that no approved workload depends on anonymous object reads. If public delivery is required, use a controlled access pattern such as pre-authenticated requests, signed URLs, or a CDN configuration that exposes only approved content.

### **From Oracle Cloud Console**

1. Open the OCI Console.
2. Go to **Storage** > **Object Storage & Archive Storage** > **Buckets**.
3. Select the compartment that contains the affected bucket.
4. Open the affected bucket.
5. Click **Edit Visibility** or edit the bucket visibility settings.
6. Set visibility to **Private** or set **Public Access Type** to **NoPublicAccess**.
7. Save the change.

### **From Command Line**

For each affected bucket, run:

```sh
oci os bucket update \
    --namespace-name "{{namespace-name}}" \
    --bucket-name "{{bucket-name}}" \
    --public-access-type "NoPublicAccess"
```

After remediation, verify that the bucket no longer allows public object access:

```sh
oci os bucket get \
    --namespace-name "{{namespace-name}}" \
    --bucket-name "{{bucket-name}}" \
    --query "data.\"public-access-type\""
```
