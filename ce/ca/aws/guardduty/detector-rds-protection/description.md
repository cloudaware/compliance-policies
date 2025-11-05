# Description

This policy identifies AWS GuardDuty Detectors that do not have RDS Protection enabled.

RDS Protection in Amazon GuardDuty analyzes and profiles login activity for potential access threats to your Amazon Aurora databases (MySQL- and PostgreSQL-compatible editions) and Amazon RDS for PostgreSQL instances.

## Rationale

GuardDuty RDS Protection monitors and analyzes RDS login activity to detect potential threats. It identifies suspicious login behaviors, such as an unusually high number of failed login attempts or successful logins from unfamiliar locations or known malicious IP addresses.

## Impact

Charges for GuardDuty RDS Protection are based on the number of protected RDS provisioned instance vCPUs per month.

## Audit

This policy flags an *AWS GuardDuty Detector* as `INCOMPLIANT` if the **RDS_LOGIN_EVENTS** `Feature` is not set to **ENABLED**.
