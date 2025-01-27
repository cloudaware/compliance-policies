# Description

All RSA certificates managed by AWS Certificate Manager (ACM) must have a key length of at least 2048 bits. This includes certificates imported into ACM by users. Ensuring the use of 2048-bit keys enhances the security of the certificates, aligning with modern cryptographic standards and reducing vulnerabilities to brute-force attacks.

## Rationale

The use of RSA keys with a minimum length of 2048 bits provides stronger encryption, improving the security posture of applications and services relying on ACM-managed certificates. Shorter keys are more susceptible to cryptographic attacks, which could compromise sensitive data.

## Impact

May require updates to legacy systems or certificates.

## Audit

This policy will mark a certificate as `INCOMPLIANT` if the `Key Algorithm` is **RSA-1024** and the `Status` field is set to **Issued**.

If the `Status` field is not **Issued**, the certificate will be marked as `INAPPLICABLE`.
