# Description

This policy identifies AWS DynamoDB Tables that are not encrypted at rest using an AWS KMS key.
By default, all DynamoDB tables are encrypted using server-side encryption with an AWS-owned key. However, for enhanced security and compliance control, tables should be configured to use either a Customer-Managed Key (CMK) or an AWS Managed Key stored in AWS Key Management Service (KMS).

## Rationale

Encrypting DynamoDB tables with a KMS key provides several advantages over the default AWS-owned key:

- You can manage key lifecycle operations (such as creation, rotation, and access control) directly within AWS KMS.
- All key usage is recorded in AWS CloudTrail, providing a detailed audit trail of data access and decryption events.
- You can define fine-grained IAM policies on the KMS key to restrict which users or roles can access encrypted data in the table.

## Impact

Enabling encryption with a KMS key may incur additional costs associated with AWS KMS usage.

## Audit

This policy marks an *AWS DynamoDB Table* as `INCOMPLIANT` if `SSE: Status` field is not set to **ENABLED**.

If the *DynamoDB Table* is not **ACTIVE**, it is marked as `INAPPLICABLE`.
