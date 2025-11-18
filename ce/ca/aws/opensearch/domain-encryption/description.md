# Description

This policy identifies AWS OpenSearch Domains that do not have encryption at rest enabled.

When enabled, encryption at rest secures the following data within the domain:

- All indexes, including those stored in UltraWarm storage
- OpenSearch logs
- Swap files
- All other data in the application directory
- Automated snapshots

The following components are not encrypted when you enable encryption at rest, but you can take additional steps to protect them:

- Manual snapshots: AWS KMS keys cannot be used to encrypt manual snapshots. However, you can use server-side encryption (SSE) with S3-managed keys or KMS keys to encrypt the Amazon S3 bucket used as the snapshot repository.
- Slow logs and error logs: If you publish logs to Amazon CloudWatch Logs, you can encrypt the corresponding log group using the same AWS KMS key as your OpenSearch Service domain.

## Rationale

Enabling encryption at rest for OpenSearch domains helps protect data from unauthorized access to the underlying storage. It leverages AWS KMS to manage encryption keys, providing a strong layer of protection and supporting compliance with data security and privacy requirements.

## Audit

This policy flags an *AWS OpenSearch Domain* as `INCOMPLIANT` if the `Encryption At Rest Enabled` checkbox is set to **false**.
