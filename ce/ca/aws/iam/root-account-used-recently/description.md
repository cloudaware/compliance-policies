# Description

Verify that the AWS root account credentials have not been used to access your AWS account in the past 30 days. Root account credentials should **not** be used for day-to-day operations, including administrative tasks. Instead, assign appropriate permissions to individual IAM users or roles to limit dependency on the root account.

## Rationale

The AWS root account has unrestricted access to all resources in the AWS environment. Routine use of the root account increases the risk of accidental or intentional misuse, which could result in data breaches, resource compromise, or loss of account control. By ensuring root user credentials are only used for critical administrative tasks (e.g., billing or account setup), organizations can reduce security risks and adhere to best practices for least-privilege access.

Additionally, frequent root account usage can undermine auditing efforts and make it difficult to track accountability.

## Impact

May require additional administrative effort to configure and maintain IAM roles and secure workflows.

## Audit

This policy marks a Root User as `INCOMPLIANT` based on the **Credential Report**'s *`password_last_used`* attribute. If the *`password_last_used`* value is within the last 30 days, the Root User is marked as `INCOMPLIANT`.

For Non-Root Users, the status is set to `INAPPLICABLE`.

A status of `UNDETERMINED` may indicate a permissions issue with the `iam:GetCredentialReport` API call.
