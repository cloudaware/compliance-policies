# Remediation

Identify the designated resource-lock administrators and the narrowest subscription or resource-group scope they require. In **Access control (IAM)**, assign **Locks Contributor**, or create and assign a custom role granting only `Microsoft.Authorization/locks/*` or both `Microsoft.Authorization/locks/write` and `Microsoft.Authorization/locks/delete`.

Review effective permissions, including inherited assignments, conditions and NotActions. Verify that administrators can manage the required locks without broader role-assignment permissions. Preserve existing locks; test with a noncritical resource and retain the previous role assignments for rollback. Do not remove existing access until the dedicated role has been verified.
