# Description

Microsoft Entra ID has native and extended identity functionality allowing you to invite people from outside your organization to be guest users in your cloud account and sign in with their own work, school, or social identities.

## Rationale

Guest users are typically added outside your employee on-boarding/off-boarding process and could potentially be overlooked indefinitely. To prevent this, guest users should be reviewed on a regular basis. During this audit, guest users should also be determined to not have administrative privileges.

## Impact

Before removing guest users, determine their use and scope. Like removing any user, there may be unforeseen consequences to systems if an account is removed without careful consideration.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Under `Manage`, select `Users`.
4. Click on `Add filter`.
5. Select `User type`.
6. Select `Guest` from the `Value` dropdown.
7. Click `Apply`.
8. Audit the listed guest users.

### From Azure CLI

```sh
az ad user list --query "[?userType=='Guest']"
```

Ensure all users listed are still required and not inactive.

### From Azure PowerShell

```ps
Get-AzureADUser |Where-Object {$_.UserType -like "Guest"} |Select-Object DisplayName, UserPrincipalName, UserType -Unique
```

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [e9ac8f8e-ce22-4355-8f04-99b911d6be52](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fe9ac8f8e-ce22-4355-8f04-99b911d6be52) - **Name**: `Guest accounts with read permissions on Azure resources should be removed`
- **Policy ID**: [94e1c2ac-cbbe-4cac-a2b5-389c812dee87](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F94e1c2ac-cbbe-4cac-a2b5-389c812dee87) - **Name**: `Guest accounts with write permissions on Azure resources should be removed`
- **Policy ID**: [339353f6-2387-4a45-abe4-7f529d121046](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F339353f6-2387-4a45-abe4-7f529d121046) - **Name**: `Guest accounts with owner permissions on Azure resources should be removed`

## Default Value

By default no guest users are created.

## References

1. <https://learn.microsoft.com/en-us/entra/external-id/user-properties>
2. <https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users#delete-a-user>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-4-review-and-reconcile-user-access-regularly>
4. <https://www.microsoft.com/en-us/security/business/identity-access-management/azure-ad-pricing>
5. <https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-manage-inactive-user-accounts>
6. <https://learn.microsoft.com/en-us/entra/fundamentals/users-restore>

## Additional Information

It is good practice to use a dynamic security group to manage guest users.

To create the dynamic security group:

1. Navigate to the 'Microsoft Entra ID' blade in the Azure Portal
2. Select the 'Groups' item
3. Create new
4. Type of 'dynamic'
5. Use the following dynamic selection rule. "(user.userType -eq "Guest")"
6. Once the group has been created, select access reviews option and create a new access review with a period of monthly and send to relevant administrators for review.
