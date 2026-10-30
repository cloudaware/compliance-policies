# Description

This policy identifies Oracle IAM Users that do not have multifactor authentication (MFA) activated.

## Rationale

MFA adds a second authentication factor to the standard username and password sign-in flow. Requiring MFA for OCI IAM users reduces the likelihood that stolen, guessed, or reused passwords can be used to access the OCI Console.

## Impact

Users without MFA are more exposed to credential theft, phishing, password spraying, and credential stuffing attacks. A compromised OCI IAM user can be used to view or change cloud resources according to the user's assigned policies, so interactive accounts should require an additional verification factor.

## Audit

This policy flags an *Oracle IAM User* as `INCOMPLIANT` if the `User Status` field is set to **ACTIVE** and the `MFA Status` field is set to **Deactivated**.

Users whose `User Status` field is not set to **ACTIVE** are marked as `INAPPLICABLE`. Users with an empty or unexpected `MFA Status` value are marked as `UNDETERMINED`.
