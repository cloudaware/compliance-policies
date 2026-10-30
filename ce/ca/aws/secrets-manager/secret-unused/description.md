# Description

This policy identifies AWS Secrets Manager Secrets that have not been accessed or updated within the last 90 days.

## Rationale

Secrets that are not regularly accessed are often associated with decommissioned applications or obsolete testing environments. Retaining unused secrets increases security risk by expanding the pool of credentials that could be exposed in the event of an account compromise.

In addition, AWS charges a monthly fee for each stored secret. Identifying and removing unused secrets helps reduce unnecessary costs and improve overall security posture.

## Audit

This policy flags an *AWS Secrets Manager Secret* as `INCOMPLIANT` when either of the following conditions is met:

- The `Last Accessed Date` is empty and the `Last Changed Date` is more than **90 days** old.
- The `Last Accessed Date` is more than **90 days** old.

*Secrets* that are scheduled for deletion are marked as `INAPPLICABLE`.
