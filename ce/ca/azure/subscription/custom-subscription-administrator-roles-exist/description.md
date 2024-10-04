# Description

The principle of least privilege should be followed and only necessary privileges should be assigned instead of allowing full administrative access.

## Rationale

Custom roles in Azure with administrative access can obfuscate the permissions granted and introduce complexity and blind spots to the management of privileged identities. For less mature security programs without regular identity audits, the creation of Custom roles should be avoided entirely. For more mature security programs with regular identity audits, Custom Roles should be audited for use and assignment, used minimally, and the principle of least privilege should be observed when granting permissions.

## Impact

Subscriptions will need to be handled by Administrators with permissions.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Subscriptions`.
3. Select a subscription.
4. Select `Access control (IAM)`.
5. Select `Roles`.
6. Click `Type` and select `Custom role` from the drop-down menu.
7. Select `View` next to a role.
8. Select `JSON`.
9. Check for `assignableScopes` set to the subscription, and `actions` set to `*`.
10. Repeat steps 7-9 for each custom role.

### From Azure CLI

List custom roles:

```sh
az role definition list --custom-role-only True
```

Check for entries with `assignableScope` of the `subscription`, and an action of `*`.

### From PowerShell

```ps
Connect-AzAccount Get-AzRoleDefinition |Where-Object {($_.IsCustom -eq $true) -and ($_.Actions.contains('*'))}
```

Check the output for `AssignableScopes` value set to the subscription.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [a451c1ef-c6ca-483d-87ed-f49761e3ffb5](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fa451c1ef-c6ca-483d-87ed-f49761e3ffb5) - **Name**: `Audit usage of custom RBAC roles`

## Default Value

By default, no custom owner roles are created.

## References

1. <https://docs.microsoft.com/en-us/azure/billing/billing-add-change-azure-subscription-administrator>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-1-separate-and-limit-highly-privilegedadministrative-users>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-3-manage-lifecycle-of-identities-and-entitlements>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-7-follow-just-enough-administration-least-privilege-principle>
