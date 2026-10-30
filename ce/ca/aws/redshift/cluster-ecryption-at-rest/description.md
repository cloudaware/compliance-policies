# Description

This policy identifies AWS Redshift Clusters that do not have encryption at rest enabled.

## Rationale

Encryption at rest is a fundamental security control that ensures only authorized users with appropriate AWS KMS permissions can access cluster data. It protects sensitive information by making it unreadable if physical storage media is compromised.

## Audit

This policy flags an *Amazon Redshift Cluster* as `INCOMPLIANT` if **Encryption** is not set to **Enabled**.
