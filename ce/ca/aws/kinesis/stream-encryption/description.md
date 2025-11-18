# Description

This policy identifies AWS Kinesis Stream that do not have server-side encryption enabled.

## Rationale

Encrypting data at rest ensures that data stored in Kinesis streams is not readable by unauthorized users, protecting it from potential data breaches if the underlying storage is compromised.

## Audit

This policy flags an *AWS Kinesis Stream* as `INCOMPLIANT` if the `Encryption Type` field is set to **NONE**.
