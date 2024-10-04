# Description

**[IMPORTANT - Please read the section overview**: If your organization pays for Microsoft Entra ID licensing (included in Microsoft 365 E3, E5, or F5, and EM&S E3 or E5 licenses) and **CAN** use Conditional Access, ignore the recommendations in this section and proceed to the Conditional Access section.]

Enable multi-factor authentication for all non-privileged users.

## Rationale

Multi-factor authentication requires an individual to present a minimum of two separate forms of authentication before access is granted. Multi-factor authentication provides additional assurance that the individual attempting to gain access is who they claim to be. With multi-factor authentication, an attacker would need to compromise at least two different authentication mechanisms, increasing the difficulty of compromise and thus reducing the risk.

## Impact

Users would require two forms of authentication before any access is granted. Also, this requires an overhead for managing dual forms of authentication.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select the `Microsoft Entra ID` blade.
3. Under `Manage`, click `Users`.
4. Click the `Per-User MFA` button on the top bar.

For every user listed, ensure that the `Status` column indicates `Enabled`.

### From REST API

For Every Subscription, For Every Tenant

#### Step 1: Identify Users with non-administrative Access

1. List All Users Using Microsoft Graph API:

```
GET https://graph.microsoft.com/v1.0/users
```

Capture `id` and corresponding `userPrincipalName` (`$uid`, `$userPrincipalName`)

2. List all Role Definitions Using Azure management API:

```
https://management.azure.com/subscriptions/<subscriptionId>/providers/Microsoft.Authorization/roleDefinitions?api-version=2017-05-01
```

Capture Role Definition IDs/Name (`$name`) and role names (`$properties/roleName`) where `properties/roleName` does NOT contain (`Owner` or `*contributor` or `admin` )

3. List All Role Assignments (Mappings `$A.uid` to `$B.name`) Using Azure Management API:

```
GET https://management.azure.com/subscriptions/<subscriptionId>/providers/Microsoft.Authorization/roleassignments?api-version=2017-10-01-preview
```

Find all non-administrative roles (`$B.name`) in `Properties/roleDefinitionId` mapped with user ids (`$A.id`) in `Properties/principalId` where `Properties/principalType` == `User`

4. Now Match `$CProperties/principalId` with `$A.uid` and get `$A.userPrincipalName` save this as `D.userPrincipleName`

#### Step 2: Run Graph PowerShell command

```ps
get-mguser -All | where {$_.StrongAuthenticationMethods.Count -eq 0} | Select-Object -Property UserPrincipalName
```

If the output contains any of the `$D.userPrincipleName`, then this recommendation is non-compliant.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [81b3ccb4-e6e8-4e4a-8d05-5df25cd29fd4](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F81b3ccb4-e6e8-4e4a-8d05-5df25cd29fd4) - **Name**: `Accounts with read permissions on Azure resources should be MFA enabled`

## Default Value

By default, multi-factor authentication is disabled for all users.

## References

1. <https://docs.microsoft.com/en-us/azure/multi-factor-authentication/multi-factor-authentication>
2. <https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-userstates>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-4-authenticate-server-and-services>
