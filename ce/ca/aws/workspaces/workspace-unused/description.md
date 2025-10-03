# Description

This policy identifies AWS WorkSpaces that are considered unused. A WorkSpace is considered unused if it remains in an `AVAILABLE` or `STOPPED` state without any user connections for 30 days or more.

## Rationale

AWS WorkSpaces incur costs whether they are actively used, or automatically stopped (which still generates a stopped-instance fee). Maintaining idle WorkSpaces unnecessarily increases expenses. Furthermore, unused but running WorkSpaces may not be regularly patched or monitored, creating potential security vulnerabilities and expanding the attack surface of the environment.

## Audit

This policy flags an *AWS WorkSpaces* as `INCOMPLIANT` if it is in either the **AVAILABLE** or **STOPPED** `State` and the `Last Known User Connection Timestamp` is empty or older than 30 days.
