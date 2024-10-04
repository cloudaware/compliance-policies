# Description

Allow users to provide consent for selected permissions when a request is coming from a verified publisher.

## Rationale

If Microsoft Entra ID is running as an identity provider for third-party applications, permissions and consent should be limited to administrators or pre-approved. Malicious applications may attempt to exfiltrate data or abuse privileged user accounts.

## Impact

Enforcing this setting may create additional requests that administrators need to review.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Under `Manage`, select `Enterprise applications`.
4. Under `Security`, select `Consent and permissions`.
5. Under `Manage`, select `User consent settings`.
6. Under `User consent for applications`, ensure `Allow user consent for apps from verified publishers, for selected permissions` is selected.

### From PowerShell

```ps
Connect-MgGraph (Get-MgPolicyAuthorizationPolicy).DefaultUserRolePermissions | Select-Object -ExpandProperty PermissionGrantPoliciesAssigned
```

The command should return either `ManagePermissionGrantsForSelf.microsoft-user-default-low` or a custom app consent policy id if one is in use.

## Default Value

By default, `User consent for applications` is set to `Allow user consent for apps`.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent?pivots=ms-graph#configure-user-consent-to-applications>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-1-separate-and-limit-highly-privilegedadministrative-users>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
5. <https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.identity.signins/get-mgpolicyauthorizationpolicy?view=graph-powershell-1.0>
