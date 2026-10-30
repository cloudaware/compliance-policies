# Description

This policy identifies Oracle Storage Buckets that are not encrypted with a customer managed key from OCI Vault.

## Rationale

Oracle Object Storage encrypts bucket data at rest by default. Using a customer managed key adds stronger governance over the encryption key that protects bucket objects. It allows the organization to manage key access, rotation, audit visibility, and revocation independently from the storage service.

Customer managed keys are recommended for buckets that store sensitive, regulated, or business-critical data because they support stricter separation of duties and key lifecycle controls than provider-managed encryption keys.

## Impact

Changing the encryption key affects how new and updated objects are encrypted. Before remediation, confirm that the target Vault key is enabled, available in the required region, and grants Object Storage the permissions needed to use the key. Disabling, deleting, or restricting the key can prevent access to encrypted objects.

## Audit

This policy flags an *Oracle Storage Bucket* as `INCOMPLIANT` when `KMS Key OCID` is empty.

The bucket is `COMPLIANT` when `KMS Key OCID` contains the OCID of a customer managed key.
