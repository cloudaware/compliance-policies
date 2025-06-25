# Description

Ensure that Snowflake user account passwords are rotated at regular intervals, with a default threshold of 90 days.

## Rational

In the event a password is exposed or exfiltrated, limiting its validity period minimizes the window of opportunity for unauthorized access. Regular rotation also mitigates the risks associated with reused, forgotten, or improperly stored credentials.

## Impact

This policy enforces a password rotation interval of 90 days, aligning with common security best practices. Organizations may need to adjust this threshold to meet internal risk management policies or external regulatory requirements.

## Audit

This policy marks a *Snowflake User* as `INCOMPLIANT` if:

- The `Has Password` field is **true**, and
- The `Password Last Set Time` exceeds **90** days.

A User is marked as `INAPPLICABLE` if the `Has Password` field is not set to true.
