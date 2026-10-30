# Description

This policy identifies Oracle IAAS Boot Volumes that are not encrypted with a customer managed key from OCI Vault.

## Rationale

OCI boot volumes store the operating system, boot files, and other data required to start compute instances. Oracle encrypts boot volumes at rest by default, but using a customer managed key provides stronger governance over the encryption key that protects this data. It allows the organization to manage key access, rotation, audit visibility, and revocation independently from the storage service.

Customer managed keys are recommended for boot volumes that support sensitive, regulated, or business-critical workloads because they enable stricter separation of duties and better control of the key lifecycle than provider-managed encryption keys.

## Impact

Using customer managed keys increases operational responsibility. Before remediation, confirm that the target Vault key is enabled, available in the required region, and grants the Compute and Block Volume services permission to use it. Disabling, deleting, or restricting the key can prevent access to protected boot volumes.

## Audit

This policy flags an *Oracle IAAS Boot Volume* as `INCOMPLIANT` when `KMS Key OCID` is empty.

The boot volume is `COMPLIANT` when `KMS Key OCID` contains the OCID of a customer managed key.

Boot volumes are `INAPPLICABLE` when `Lifecycle State` is not `AVAILABLE`.
