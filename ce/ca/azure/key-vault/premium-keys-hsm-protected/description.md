# Description

A key in a Premium-tier key vault is software-protected, with key type RSA or EC, or HSM-protected, with key type RSA-HSM, EC-HSM, or oct-HSM. The key type chosen when each key is created selects between them. Keys that back certificates follow the certificate's key type and are out of scope.

## Rationale

Key Vault Premium accepts software-protected keys beside HSM-protected ones, and a software-protected key carries FIPS 140-2 Level 1 validation rather than the FIPS 140-3 Level 3 of HSM-protected key versions on HSM Platform 2. A vault chosen for HSM protection can therefore hold keys protected only to FIPS 140-2 Level 1, short of what a hardware key protection requirement demands.

## Audit

This requirement needs manual assessment. The key cryptographic type (RSA-HSM or EC-HSM) is not collected; vault SKU alone cannot establish hardware protection of each key.
