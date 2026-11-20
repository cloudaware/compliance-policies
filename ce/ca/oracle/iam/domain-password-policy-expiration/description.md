# Description

Set Expires after (days) to a value from 1 to 365 for every Oracle IAM domain password policy, including the default fallback policy, to meet CIS Oracle control 1.5.

## Rationale

Annual expiration limits the lifetime of a potentially compromised password. Passwords must also be changed promptly after compromise or relevant personnel changes.

## Impact

A shorter expiration period can require users to change their passwords sooner. Communicate the change before enforcing it.

## Audit

This policy marks an *Oracle IAM Domain Password Policy* as `INCOMPLIANT` if **Password Expires After (days)** is zero or negative (no valid expiration), or greater than 365.

An expiration period from 1 through 365 days is `COMPLIANT`. A missing **Password Expires After (days)** is `UNDETERMINED`: the optional API field alone does not establish the effective default. Every collected policy is evaluated, regardless of its name or group assignments. This checks the configured setting; event-driven password changes require operational review.
