# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Select `Users`.
4. Select `User settings`.
5. Set `Users can register applications` to `No`.

## From PowerShell

```ps
Connect-MsolService Set-MsolCompanyInformation -UsersPermissionToCreateLOBAppsEnabled $False
```
