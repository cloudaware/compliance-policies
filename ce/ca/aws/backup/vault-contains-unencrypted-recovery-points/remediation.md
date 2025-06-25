# Remediation

AWS Backup supports **independent encryption** for all fully managed resource types. Independent encryption lets you choose a distinct KMS key for your recovery points, separate from the source resource’s encryption. For example, you can back up an Amazon S3 bucket encrypted with SSE-S3 but store its recovery points under a customer-managed KMS key in your backup vault.

## Resources Supporting Independent Encryption

AWS Backup encrypts vaults with a KMS key by default. All recovery points stored in the vault that support **independent encryption** will adopt the vault’s KMS key, even if the original resource is unencrypted.

## Resources **Not** Supporting Independent Encryption

For resource types not yet fully integrated with AWS Backup’s independent encryption (e.g., RDS or EBS), recovery points inherit the encryption settings of the source resource. Review the service-specific documentation (e.g., Amazon EBS encryption) to adjust encryption on the source resource.

## IAM and KMS Permissions

Ensure the principal (role or user) executing backup and restore operations has the necessary KMS actions in its IAM policy. Confirm the KMS key policy grants the principal permission to use the key.  Without proper permissions, Backup jobs will report success, but individual recovery point objects will not be backed up or restored, resulting in unnoticed data gaps.
