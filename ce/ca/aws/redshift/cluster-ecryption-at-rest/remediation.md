# Remediation

## Enable Encryption at Rest

To secure your Amazon Redshift cluster, enable encryption at rest using AWS KMS. When you enable encryption, Redshift automatically migrates your data to a new encrypted cluster. During this migration, the cluster remains available in **read-only** mode, and the cluster status appears as **resizing**.

> **Note:** If cross-region snapshot copy is enabled, you must disable it before enabling encryption.

### **From Command Line**

Use the following AWS CLI command to modify an unencrypted cluster and enable encryption. By default, the cluster uses the AWS-managed KMS key. To use a customer-managed key, include the `--kms-key-id` option:

```sh
aws redshift modify-cluster \
    --cluster-identifier {{cluster-id}} \
    --encrypted \
    --kms-key-id {{kms-key-id}}
```
