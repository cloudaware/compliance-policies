# Description

Require Oracle IAM domain passwords to contain at least 14 characters and at least one numeric or special character, as specified by CIS Oracle control 1.4.

## Rationale

Longer passwords reduce guessing risk. CIS accepts either a numeric character or a special character; requiring both would exceed this control.

## Impact

Stronger requirements can affect subsequent password changes. Communicate changes before applying them to production identity domains.

## Audit

This policy marks an *Oracle IAM Domain Password Policy* as `INCOMPLIANT` if **Password Length (minimum)** is absent or below 14, or if both **Minimum Numerals** and **Minimum Special Characters** are absent or below 1. These optional minimum fields represent no restriction when absent.

Policies satisfying the length requirement and either character requirement are `COMPLIANT`. Every collected policy is evaluated, including the default fallback policy and policies without group assignments, matching the benchmark's instruction to audit each policy.
