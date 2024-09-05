# Description

Require administrators to provide consent for applications before use.

## Rationale

If Microsoft Entra ID is running as an identity provider for third-party applications, permissions and consent should be limited to administrators or pre-approved. Malicious applications may attempt to exfiltrate data or abuse privileged user accounts.

## Impact

Enforcing this setting may create additional requests that administrators need to review.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Select `Enterprise Applications`.
4. Select `Consent and permissions`.
5. Select `User consent settings`.
6. Ensure `User consent for applications` is set to `Do not allow user consent`.

### From PowerShell

```ps
Connect-MsolService Get-MsolCompanyInformation | Select-Object UsersPermissionToUserConsentToAppEnabled
```

Command should return `UsersPermissionToUserConsentToAppEnabled` with the value of `False`.

## Default Value

By default, `Users consent for applications` is set to `Allow user consent for apps`.

## References

1. <https://nicksnettravels.builttoroam.com/post/2017/01/24/Admin-Consent-for-Permissions-in-Azure-Active-Directory.aspx>
2. <https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/configure-user-consent#configure-user-consent-to-applications>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-1-separate-and-limit-highly-privilegedadministrative-users>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
