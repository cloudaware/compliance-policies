# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Select `Roles and Administrators`.
4. Select `Global Administrator`.

### If more than 4 users are assigned

1. Remove Global Administrator role for users which do not or no longer require the role.
2. Assign Global Administrator role via PIM which can be activated when required.
3. Assign more granular roles to users to conduct their duties.

### If only one user is assigned

1. Provide the Global Administrator role to a trusted user or create a break glass admin account.
