# Description

Restrict access to the Microsoft Entra ID administration center to administrators only.

**NOTE**: This only affects access to the Entra ID administrator's web portal. This setting does not prohibit privileged users from using other methods such as Rest API or Powershell to obtain sensitive information from Microsoft Entra ID.

## Rationale

The Microsoft Entra ID administrative center has sensitive data and permission settings. All non-administrators should be prohibited from accessing any Microsoft Entra ID data in the administration center to avoid exposure.

## Impact

All administrative tasks will need to be done by Administrators, causing additional overhead in management of users and resources.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Then `Users`.
4. Select `User settings`.
5. Ensure that `Restrict access to Microsoft Entra admin center` is set to `Yes`.

## Default Value

By default, `Restrict access to Microsoft Entra admin center` is set to `No`.

## References

1. <https://docs.microsoft.com/en-us/azure/active-directory/active-directory-assign-admin-roles-azure-portal>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-1-separate-and-limit-highly-privilegedadministrative-users>
