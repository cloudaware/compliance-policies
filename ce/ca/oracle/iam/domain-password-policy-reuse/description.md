# Description

Set Previous passwords remembered to at least 24 for every Oracle IAM domain password policy, including the default fallback policy, to meet CIS Oracle control 1.6.

## Rationale

Remembering previous passwords prevents users from repeatedly choosing the same credentials after a reset.

## Impact

Users must choose a password outside the remembered history at their next password change. Communicate the change before enforcing it.

## Audit

This policy marks an *Oracle IAM Domain Password Policy* as `INCOMPLIANT` if **Previous Passwords Remembered** is below 24.

A history of at least 24 passwords is `COMPLIANT`. A missing **Previous Passwords Remembered** is `UNDETERMINED`: the optional API field alone does not establish the effective default. Every collected policy is evaluated, regardless of its name or group assignments. This checks the configured setting; actual end-user password reuse is not observed.
