# Remediation

## From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Select `Enterprise Applications`.
4. Select `Consent and permissions`.
5. Select `User consent settings`.
6. Under `User consent for applications`, select `Allow user consent for apps from verified publishers, for selected permissions`.
7. Select `Save`.

## From PowerShell

```ps
Connect-MsolService Set-MsolCompanyInformation --UsersPermissionToUserConsentToAppEnabled $False
```
