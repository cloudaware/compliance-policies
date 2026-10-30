# Description

This policy identifies Oracle IAAS Block Volumes that are not encrypted with a customer managed key from OCI Vault.

## Rationale

Oracle Block Volume encrypts volume data at rest by default. Using a customer managed key adds stronger governance over the encryption key that protects block volume data. It allows the organization to manage key access, rotation, audit visibility, and revocation independently from the storage service.

Customer managed keys are recommended for block volumes that store sensitive, regulated, or business-critical data because they support stricter separation of duties and key lifecycle controls than provider-managed encryption keys.

## Impact

Changing the encryption key affects how the volume is protected and can impact workloads that depend on the volume. Before remediation, confirm that the target Vault key is enabled, available in the required region, and grants the Block Volume service the permissions needed to use it. Disabling, deleting, or restricting the key can prevent access to encrypted volume data.

## Audit

This policy flags an *Oracle IAAS Block Volume* as `INCOMPLIANT` when `KMS Key OCID` is empty.

The block volume is `COMPLIANT` when `KMS Key OCID` contains the OCID of a customer managed key.

Block volumes are `INAPPLICABLE` when `Lifecycle State` is not `AVAILABLE`.
