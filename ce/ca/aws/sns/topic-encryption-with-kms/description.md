# Description

This policy identifies AWS SNS Topics that are not configured with server-side encryption (SSE) using an AWS KMS key.

## Rationale

Enabling server-side encryption for SNS topics protects message data stored at rest. Using an AWS KMS key provides centralized key management, including rotation, access control, and auditing, helping to maintain compliance with organizational and regulatory data protection standards.

## Audit

This policy flags an *SNS Topic* as `INCOMPLIANT` if the `KMS Key ID` field is **empty**.
