# Description

Enable multi-factor authentication for all roles, groups, and users that have write access or permissions to Azure resources. These include custom created objects or built-in roles such as:

- Service Co-Administrators
- Subscription Owners
- Contributors

## Rationale

Multi-factor authentication requires an individual to present a minimum of two separate forms of authentication before access is granted. Multi-factor authentication provides additional assurance that the individual attempting to gain access is who they claim to be. With multi-factor authentication, an attacker would need to compromise at least two different authentication mechanisms, increasing the difficulty of compromise and thus reducing the risk.

## Impact

Users would require two forms of authentication before any access is granted. Additional administrative time will be required for managing dual forms of authentication when enabling multi-factor authentication.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select the `Microsoft Entra ID` blade.
3. Select `Users`.
4. Take note of all users with the role `Service Co-Administrators`, `Owners` or `Contributors`.
5. Click on the `Per-User MFA` button in the top row menu.
6. Ensure that `MULTI-FACTOR AUTH STATUS` is `Enabled` for all noted users.

### From REST API

For Every Subscription, For Every Tenant

#### Step 1: Identify Users with Administrative Access

1. List All Users Using Microsoft Graph API:

```
GET https://graph.microsoft.com/v1.0/users
```

Capture `id` and corresponding `userPrincipalName` ('$uid', '$userPrincipalName')

2. List all Role Definitions Using Azure management API:

```
https://management.azure.com/subscriptions/:subscriptionId/providers/Microsoft.Authorization/roleDefinitions?api-version=2017-05-01
```

Capture Role Definition IDs/Name ('$name') and role names ('$properties/roleName') where "properties/roleName" contains (`Owner` or `*contributor` or `admin` )

3. List All Role Assignments (Mappings `$A.uid` to `$B.name`) Using Azure Management API:

```
GET https://management.azure.com/subscriptions/:subscriptionId/providers/Microsoft.Authorization/roleassignments?api-version=2017-10-01-preview
```

Find all administrative roles (`$B.name`) in `Properties/roleDefinitionId` mapped with user ids (`$A.id`) in `Properties/principalId` where `Properties/principalType` == `User`

4. Now Match `$CProperties/principalId` with `$A.uid` and get `$A.userPrincipalName` save this as `D.userPrincipalName`

#### Step 2: Run MSOL PowerShell command

```ps
Get-MsolUser -All | where {$_.StrongAuthenticationMethods.Count -eq 0} | Select-Object -Property UserPrincipalName
```

If the output contains any of the `$D.userPrincipalName`, then this recommendation is non-compliant.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [e3e008c3-56b9-4133-8fd7-d3347377402a](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fe3e008c3-56b9-4133-8fd7-d3347377402a) - **Name**: `Accounts with owner permissions on Azure resources should be MFA enabled`
- **Policy ID**: [931e118d-50a1-4457-a5e4-78550e086c52](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F931e118d-50a1-4457-a5e4-78550e086c52) - **Name**: `Accounts with write permissions on Azure resources should be MFA enabled`

## Default Value

By default, multi-factor authentication is disabled for all users.

## References

1. <https://docs.microsoft.com/en-us/azure/multi-factor-authentication/multi-factor-authentication>
2. <https://stackoverflow.com/questions/41156206/azure-active-directory-premium-mfa-attributes-via-graph-api>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-4-authenticate-server-and-services>

## Additional Information

Please note that at the time of writing, there is no API, Azure CLI or Powershell mechanism available to programmatically conduct security assessment or remediation for this recommendation. The only option is MSOL.
