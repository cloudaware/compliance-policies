# Description

Microsoft Azure admin accounts should not be used for routine, non-administrative tasks.

## Rationale

Using admin accounts for daily operations increases the risk of accidental misconfigurations and security breaches.

## Impact

Minor administrative overhead includes managing separate accounts, enforcing stricter access controls, and potential licensing costs for advanced security features.

## Audit

### From Azure Portal

#### Monitor

1. Go to `Monitor`.
2. Click `Activity log`.
3. Review the activity log and ensure that admin accounts are not being used for daily operations.

#### Microsoft Entra ID

1. Go to `Microsoft Entra ID`.
2. Under `Monitoring`, click `Sign-in logs`.
3. Review the sign-in logs and ensure that admin accounts are not being accessed more frequently than necessary.

## References

1. <https://learn.microsoft.com/en-us/security/privileged-access-workstations/critical-impact-accounts>
