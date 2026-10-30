# Description

This policy identifies AWS account **Root Users** that have active X.509 signing certificates listed in the AWS IAM Credential Report.

To strengthen account security, AWS root users should not use X.509 certificates to perform SOAP-based requests to AWS services. X.509 certificates are signing credentials used to authenticate API requests by validating signatures generated with a corresponding private key. While some legacy AWS services support this authentication method, its use by the root user is strongly discouraged.

It is recommended to disable all X.509 certificates associated with the root account. The root user should be reserved strictly for account-level administrative tasks, not for routine operations or application development.

## Rationale

Disabling X.509 signing certificates for the AWS root account reduces the risk of unauthorized access to AWS services and resources in the event that a private key is compromised, leaked, or shared unintentionally.

## Audit

This policy flags a *Root User* as `INCOMPLIANT` based on the **cert_1_active** and **cert_2_active** `Credential Report` attributes. If either attribute is set to **true**, the Root User is marked as `INCOMPLIANT`.

For **non-root users**, the policy status is set to `INAPPLICABLE`.

A status of `UNDETERMINED` indicates that the credential report could not be retrieved, which may be due to insufficient permissions for the `iam:GetCredentialReport` API action.
