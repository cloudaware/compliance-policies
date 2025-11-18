# Description

This policy identifies AWS KMS Customer-Managed Keys (CMKs) that are scheduled for deletion. A KMS key should only be deleted when you are certain it is no longer required. If there is any uncertainty, it is recommended to disable the key instead. You can re-enable a disabled KMS key or cancel its scheduled deletion; however, once a key is deleted, it cannot be recovered.

## Rationale

Deleting an AWS KMS key is a destructive and irreversible operation. It permanently removes the key material and all associated metadata. Once a KMS key is deleted, any data encrypted with that key becomes unrecoverable. This risk is particularly critical for asymmetric KMS keys used for encryption because users can continue encrypting data with the public key even after the private key has been deleted, resulting in ciphertexts that can never be decrypted.

## Audit

This policy flags an *AWS KMS Key* as `INCOMPLIANT` if the `Deletion Date` field is not empty, indicating that the key is scheduled for deletion.

The *Key* is marked as `INAPPLICABLE` if the `Manager` field is not **CUSTOMER**, as only customer-managed keys can be scheduled for deletion.
