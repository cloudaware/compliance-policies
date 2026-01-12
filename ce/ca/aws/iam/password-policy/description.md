# Description

This policy identifies AWS Accounts that do not have an **IAM password policy** configured.

A strong password policy helps enforce requirements such as minimum password length, expiration period, and complexity rules for IAM users.

## Rationale

IAM password policies enable administrators to enforce password strength and complexity for users signing in to the AWS Management Console. Without a password policy, users may create weak passwords that are easily guessed or compromised, increasing the risk of unauthorized access to your AWS environment.

## Audit

This policy flags an *AWS Account* as `INCOMPLIANT` if there is no related *AWS IAM Password Policy*.

## References

1. CCE-78907-3
2. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html>
3. <https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#configure-strong-password-policy>
