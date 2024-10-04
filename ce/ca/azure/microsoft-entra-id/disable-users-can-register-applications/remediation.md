# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Under `Manage`, select `Users`.
4. Under `Manage`, select `User settings`.
5. Set `Users can register applications` to `No`.
6. Click `Save`.

## From PowerShell

```ps
$param = @{ AllowedToCreateApps = "$false" } Update-MgPolicyAuthorizationPolicy -DefaultUserRolePermissions $param
```
