# Description

To ensure centralized identity and access management, users and groups from Microsoft Entra ID should be synchronized with Azure Databricks. This is achieved through SCIM provisioning, which automates the creation, update, and deactivation of users and groups in Databricks based on Entra ID assignments. Enabling this integration ensures that access controls in Databricks remain consistent with corporate identity governance policies, reducing the risk of orphaned accounts, stale permissions, and unauthorized access.

## Rationale

Syncing users and groups from Microsoft Entra ID centralizes access control, enforces the least privilege principle by automatically revoking unnecessary access, reduces administrative overhead by eliminating manual user management, and ensures auditability and compliance with industry regulations.

## Impact

SCIM provisioning requires role mapping to avoid misconfigured user privileges.

## Audit

### From Azure Portal

Verify SCIM provisioning is enabled:

1. Go to `Microsoft Entra ID`.
2. Under `Manage`, click `Enterprise applications`.
3. Click the name of the Azure Databricks SCIM application.
4. Under `Provisioning`, confirm that SCIM provisioning is enabled and running.

    Check user sync status in Azure Portal:

5. Under `Provisioning Logs`, verify the last successful sync and any failed entries.

    Check user sync status in Databricks:

6. Go to `Admin Console > Identity and Access Management`.
7. Confirm that Users and Groups match those assigned in Microsoft Entra ID.

    Ensure role-based access control (RBAC) mapping is correct:

8. Verify that users are assigned appropriate Databricks roles (e.g. Admin, User, Contributor).
9. Confirm that groups are mapped to workspace access roles.

## Default Value

By default, Azure Databricks does not sync users and groups from Microsoft Entra ID.

## References

1. <https://learn.microsoft.com/en-us/azure/databricks/administration-guide/users-groups/scim/aad>
