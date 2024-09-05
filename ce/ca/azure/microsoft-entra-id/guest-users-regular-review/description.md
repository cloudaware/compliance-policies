# Description

Microsoft Entra ID is extended to include Azure AD B2B collaboration, allowing you to invite people from outside your organization to be guest users in your cloud account and sign in with their own work, school, or social identities. Guest users allow you to share your company's applications and services with users from any other organization, while maintaining control over your own corporate data.

Work with external partners, large or small, even if they don't have Azure AD or an IT department. A simple invitation and redemption process lets partners use their own credentials to access your company's resources as a guest user.

Guest users in every subscription should be review on a regular basis to ensure that inactive and unneeded accounts are removed.

## Rationale

Guest users in the Microsoft Entra ID are generally required for collaboration purposes in Office 365, and may also be required for Azure functions in enterprises with multiple Azure tenants. Guest users are typically added outside your employee on-boarding/off-boarding process and could potentially be overlooked indefinitely, leading to a potential vulnerability. To prevent this, guest users should be reviewed on a regular basis. During this audit, guest users should also be determined to not have administrative privileges.

## Impact

Before removing guest users, determine their use and scope. Like removing any user, there may be unforeseen consequences to systems if it is deleted.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Select `Users`.
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

1. <https://docs.microsoft.com/en-us/azure/active-directory/b2b/user-properties>
2. <https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/add-users-azure-active-directory#delete-a-user>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-4-review-and-reconcile-user-access-regularly>
4. <https://www.microsoft.com/en-us/security/business/identity-access-management/azure-ad-pricing>
5. <https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/howto-manage-inactive-user-accounts>
6. <https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-users-restore>

## Additional Information

It is good practice to use a dynamic security group to manage guest users.

To create the dynamic security group:

1. Navigate to the 'Microsoft Entra ID' blade in the Azure Portal
2. Select the 'Groups' item
3. Create new
4. Type of 'dynamic'
5. Use the following dynamic selection rule. "(user.userType -eq "Guest")"
6. Once the group has been created, select access reviews option and create a new access review with a period of monthly and send to relevant administrators for review.
