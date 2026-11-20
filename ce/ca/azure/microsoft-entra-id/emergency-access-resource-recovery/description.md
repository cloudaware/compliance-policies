# Description

Microsoft Entra ID roles grant no Azure RBAC, so a tenant can lose all ability to manage its subscriptions while Global Administrators remain. A Global Administrator restores access by setting Access management for Azure resources to Yes, which grants root-scope access. Maintain emergency access accounts (aka "break-glass accounts") and a tested recovery procedure.

## Rationale

Because Entra ID and Azure RBAC are secured separately, a tenant can reach a state where no account holds Owner or User Access Administrator at any scope, after the last privileged account leaves or root-scope access is removed for least privilege. If no Global Administrator can sign in, no one can elevate access, and recovery depends on Microsoft support.

## Audit

This requirement needs manual assessment. Emergency-account designation and a tested resource-access recovery procedure require organizational review.
