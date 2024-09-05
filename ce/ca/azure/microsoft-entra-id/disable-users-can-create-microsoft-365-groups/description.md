# Description

Restrict Microsoft 365 group creation to administrators only.

## Rationale

Restricting Microsoft 365 group creation to administrators only ensures that creation of Microsoft 365 groups is controlled by the administrator. Appropriate groups should be created and managed by the administrator and group creation rights should not be delegated to any other user.

## Impact

Enabling this setting could create a number of requests that would need to be managed by an administrator.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Then `Groups`.
4. Select `General` in `Setting`.
5. Ensure that `Users can create Microsoft 365 groups in Azure portals, API or PowerShell` is set to `No`.

## Default Value

By default, `Users can create Microsoft 365 groups in Azure portals, API or PowerShell` is set to `Yes`.

## References

1. <https://whitepages.unlimitedviz.com/2017/01/disable-office-365-groups-2/>
2. <https://support.office.com/en-us/article/Control-who-can-create-Office-365-Groups-4c46c8cb-17d0-44b5-9776-005fced8e618>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-1-separate-and-limit-highly-privilegedadministrative-users>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-3-manage-lifecycle-of-identities-and-entitlements>
