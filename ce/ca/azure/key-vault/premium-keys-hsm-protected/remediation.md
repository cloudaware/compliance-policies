# Remediation

A key in a Premium-tier key vault is software-protected, with key type RSA or EC, or HSM-protected, with key type RSA-HSM, EC-HSM, or oct-HSM. The key type chosen when each key is created selects between them. Keys that back certificates follow the certificate's key type and are out of scope.

Create HSM-protected replacement keys using RSA-HSM or EC-HSM with the required key size or curve. Migrate dependent workloads to the replacement keys and verify their operation. Disable each software-protected key only after all dependent workloads and retained data have been migrated and verified.

**Retain access to keys required to decrypt existing data throughout the migration.**

Automated assessment is unavailable: The key cryptographic type (RSA-HSM or EC-HSM) is not collected; vault SKU alone cannot establish hardware protection of each key.
