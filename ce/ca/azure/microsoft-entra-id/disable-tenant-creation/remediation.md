# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Select `Users`.
4. Select `User settings`.
5. Set `Restrict non-admin users from creating tenants` to `Yes`.

## From PowerShell

```ps
Import-Module Microsoft.Graph.Identity.SignIns Connect-MgGraph -Scopes 'Policy.ReadWrite.Authorization' Select-MgProfile -Name beta $params = @{ DefaultUserRolePermissions = @{ AllowedToCreateTenants = $false } } Update-MgPolicyAuthorizationPolicy -AuthorizationPolicyId -BodyParameter $params
```
