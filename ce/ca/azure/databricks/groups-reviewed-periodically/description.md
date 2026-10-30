# Description

Azure Databricks groups are used with role-based access control to assign permissions to users and service principals. These assignments should be reviewed periodically to confirm that access remains appropriate.

## Rationale

Regular access reviews reduce the risk of stale or excessive permissions in Databricks workspaces. Reviewing group membership and role assignments helps ensure that users retain only the access required for their current responsibilities.

## Impact

Periodic reviews require administrative effort and coordination with workspace owners. Removing or changing assignments without validation may disrupt users, jobs, or integrations that depend on Databricks access.

## Audit

### From Azure Portal

1. Open `Azure Databricks`.
2. Select the Databricks workspace to audit.
3. Select `Access control (IAM)`.
4. Select `Role assignments`.
5. Review each role assignment and verify that assigned groups and users are still required.

## Default Value

By default, Azure Databricks has the owner user and role assigned.

## References

1. <https://learn.microsoft.com/en-us/azure/databricks/security/auth/>
2. <https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal>
