# Description

This policy identifies Amazon Cognito user pools with password policies that do not meet a strong password baseline.

## Rationale

Amazon Cognito user pools often store local application identities and issue authentication tokens to connected applications. Weak password requirements make brute-force attempts, credential stuffing, and password reuse attacks more likely to succeed.

Requiring a minimum password length, mixed character types, and a short temporary password validity period helps reduce the risk of unauthorized access and improves the security posture of user pools that support username-password authentication.

## Audit

This policy flags a *Cognito User Pool* as `INCOMPLIANT` when any of the following is true:

- `Password Policy Minimum Length` is less than **8**
- `Password Policy Is Require Lowercase` is not **true**
- `Password Policy Is Require Uppercase` is not **true**
- `Password Policy Is Require Numbers` is not **true**
- `Password Policy Is Require Symbols` is not **true**
- `Password Policy Temporary Validity Days` is greater than **7**
