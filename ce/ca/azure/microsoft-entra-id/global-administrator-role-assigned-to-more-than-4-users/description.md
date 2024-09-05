# Description

This recommendation aims to maintain a balance between security and operational efficiency by ensuring that a minimum of 2 and a maximum of 4 users are assigned the Global Administrator role in Microsoft Entra ID. Having at least two Global Administrators ensures redundancy, while limiting the number to four reduces the risk of excessive privileged access.

## Rationale

The Global Administrator role has extensive privileges across all services in Microsoft Entra ID. The Global Administrator role should never be used in regular daily activities; administrators should have a regular user account for daily activities, and a separate account for administrative responsibilities. Limiting the number of Global Administrators helps mitigate the risk of unauthorized access, reduces the potential impact of human error, and aligns with the principle of least privilege to reduce the attack surface of an Azure tenant. Conversely, having at least two Global Administrators ensures that administrative functions can be performed without interruption in case of unavailability of a single admin.

## Impact

Implementing this recommendation may require changes in administrative workflows or the redistribution of roles and responsibilities. Adequate training and awareness should be provided to all Global Administrators.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Select `Roles and Administrators`.
4. Select `Global Administrator`.
5. Ensure less than 5 users are actively assigned the role.
6. Ensure that at least 2 users are actively assigned the role.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/best-practices#5-limit-the-number-of-global-administrators-to-less-than-5>
2. <https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#security-guidelines-for-assigning-roles>
3. <https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-1-separate-and-limit-highly-privilegedadministrative-users>
