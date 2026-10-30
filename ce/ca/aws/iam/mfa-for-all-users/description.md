# Description

Ensure that Multi-Factor Authentication (MFA) is enabled for all IAM users within your account in order to secure your AWS environment and adhere to IAM security best practices.

## Rationale

When Multi-Factor Authentication (MFA) is enabled, the user must present at least two separate forms of authorization before access is granted. Having an MFA-protected user account is an efficient way to safeguard your AWS resources against malicious actors, as attackers would need to compromise at least two different authentication methods to gain access, significantly reducing the risk of attack.

## Impact

AWS will soon end support for SMS multi-factor authentication (MFA). New customers are not allowed to use this feature. We recommend that existing customers switch to one of the following alternative methods of MFA.

## Audit

This policy marks an *IAM User* as `INCOMPLIANT` based on the **Credential Report**'s *`mfa_active`* attribute. If *`mfa_active`* is not **true**, the *IAM User* is marked as `INCOMPLIANT`.

A status of `UNDETERMINED` may indicate a permissions issue with the `iam:GetCredentialReport` API call.
