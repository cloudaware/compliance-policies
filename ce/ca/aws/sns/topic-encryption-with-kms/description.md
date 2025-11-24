# Description

This policy identifies AWS SNS Topics that are not configured with server-side encryption (SSE) using an AWS KMS key.

## Rationale

Enabling server-side encryption for SNS topics is a security measure that protects message data stored at rest. Using an AWS KMS key provides centralized management of encryption keys, including key rotation, access control, and auditing capabilities, helping to maintain compliance with organizational and regulatory data protection standards.

## Audit

This policy flags an *SNS Topic* as `INCOMPLIANT` if the `KMS Key ID` field is **empty**.
