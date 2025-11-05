# Description

This policy identifies Google Resource Manager Organizations with any of the predefined Redis IAM roles (`roles/redis.admin`, `roles/redis.editor`, `roles/redis.viewer`) assigned to any principal (user, group, or service account).

## Rationale

Assigning Redis roles at the organization level grants permissions across all projects within the organization, including projects that do not use Redis. Broad permissions increase the attack surface and the risk of accidental or malicious configuration changes to Redis instances in any project. Roles should be scoped to the specific projects where Redis instances are deployed and require management. Compromise of a principal with organization-level permissions could impact all Redis resources within the organization.

## Impact

Requires careful planning to ensure the user retains the necessary permissions to perform their job functions without interruption.

## Audit

This policy flags a *Google Resource Manager Organization* as `INCOMPLIANT` if its related *Google IAM Policy Binding* `IAM Role Name` is set to **roles/redis.admin**, **roles/redis.editor**, or **roles/redis.viewer**.
