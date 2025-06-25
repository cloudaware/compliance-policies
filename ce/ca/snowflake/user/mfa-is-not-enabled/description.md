# Description

Ensure that Multi-Factor Authentication (MFA) is enabled for Snowflake user accounts. Snowflake provides native MFA support via its integration with Duo Security, which is fully managed by Snowflake.

## Rationale

MFA introduces an additional verification layer beyond the standard username and password, significantly mitigating the risk of unauthorized access due to compromised credentials.

## Impact

Accounts without MFA are more susceptible to common attack vectors such as brute-force attempts, credential stuffing, and password leaks. The absence of MFA increases the likelihood of unauthorized access, potentially resulting in data exposure, privilege escalation, or malicious activity within the Snowflake environment.

## Audit

This policy marks a *Snowflake User* as `INCOMPLIANT` if:

- The `Has Password` field is **true**, and
- The `Duo Security Is Enabled` field is *not* set to **true**.

A User is marked as `INAPPLICABLE` if the `Has Password` field is *not* set to true.
