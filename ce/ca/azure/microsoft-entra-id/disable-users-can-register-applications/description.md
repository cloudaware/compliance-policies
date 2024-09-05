# Description

Require administrators or appropriately delegated users to register third-party applications.

## Rationale

It is recommended to only allow an administrator to register custom-developed applications. This ensures that the application undergoes a formal security review and approval process prior to exposing Microsoft Entra ID data. Certain users like developers or other high-request users may also be delegated permissions to prevent them from waiting on an administrative user. Your organization should review your policies and decide your needs.

## Impact

Enforcing this setting will create additional requests for approval that will need to be addressed by an administrator. If permissions are delegated, a user may approve a malevolent third party application, potentially giving it access to your data.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Select `Users`.
4. Select `User settings`.
5. Ensure that `Users can register applications` is set to `No`.

### From PowerShell

```ps
Connect-MsolService Get-MsolCompanyInformation | Select-Object UsersPermissionToCreateLOBAppsEnabled
```

Command should return `UsersPermissionToCreateLOBAppsEnabled` with the value of `False`.

## Default Value

By default, `Users can register applications` is set to `Yes`.

## References

1. <https://docs.microsoft.com/en-us/azure/active-directory/roles/delegate-app-roles#restrict-who-can-create-applications>
2. <https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-how-applications-are-added#who-has-permission-to-add-applications-to-my-azure-ad-instance>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-1-separate-and-limit-highly-privilegedadministrative-users>
5. <https://blogs.msdn.microsoft.com/exchangedev/2014/06/05/managing-user-consent-for-applications-using-office-365-apis/>
6. <https://nicksnettravels.builttoroam.com/post/2017/01/24/Admin-Consent-for-Permissions-in-Azure-Active-Directory.aspx>
7. <https://docs.microsoft.com/en-us/powershell/module/msonline/get-msolcompanyinformation?view=azureadps-1.0>
8. <https://docs.microsoft.com/en-us/powershell/module/msonline/set-msolcompanysettings?view=azureadps-1.0>
