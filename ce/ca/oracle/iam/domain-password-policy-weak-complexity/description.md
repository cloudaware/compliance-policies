# Description

This policy identifies Oracle IAM domain password policies assigned to groups that do not require a minimum password length of at least 14 characters, at least one numeric character, or at least one special character.

## Rationale

Password policies enforce baseline complexity for local IAM passwords. This policy does not evaluate the auto-created `defaultPasswordPolicy`. Non-default password policies apply only when they are assigned to an Oracle IAM group, and the policy then applies to users who are members of that group. Requiring a longer password, at least one numeric character, and at least one special character reduces the likelihood that users can choose overly weak passwords.

## Impact

Increasing password requirements can require users to change existing passwords at their next password reset or policy enforcement event. Communicate the change before applying it to production identity domains.

## Audit

This policy flags an *Oracle IAM Domain Password Policy* as `INCOMPLIANT` if it is assigned to at least one Oracle IAM group and one of the following is true:

- The policy is `simplePasswordPolicy` or `standardPasswordPolicy`.
- `Password Length (minimum)` is empty or less than 14.
- `Minimum Numerals` is empty or less than 1.
- `Minimum Special Characters` is empty or less than 1.

Assigned custom password policies that require a minimum length of at least 14, at least one numeric character, and at least one special character are marked as `COMPLIANT`.

This policy marks the auto-created `defaultPasswordPolicy` as `INAPPLICABLE`. It also marks any non-default password policy as `INAPPLICABLE` when it is not assigned to any Oracle IAM group. This avoids reporting policies that do not apply through group assignment.
