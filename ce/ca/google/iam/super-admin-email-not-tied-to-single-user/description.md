# Description

Assign the Google Workspace or Cloud Identity Super Admin role to a dedicated administrative account, such as `gcp-superadmin@company.com`, rather than to an individual user's email address.

## Rationale

Super Admin accounts have broad administrative authority over Google Workspace, Cloud Identity, and organization-level settings. Using a dedicated account reduces dependency on a single employee, separates privileged administration from day-to-day user activity, and supports stronger controls such as hardware security keys and restricted session policies.

## Impact

Creating a dedicated Super Admin account requires coordination with Google Workspace or Cloud Identity administrators. Existing individual user accounts should be removed from the Super Admin role after the dedicated account is configured and validated.

## Audit

### From Google Admin Console

1. Open the Google Admin Console at <https://admin.google.com>.
2. Go to `Account` > `Admin roles`.
3. Open the `Super Admin` role.
4. Review the assigned users.
5. Verify that the role is assigned to a dedicated administrative account and not directly to individual user email addresses.
