# Description

This recommendation ensures that users accessing the Windows Azure Service Management API (i.e. Azure Powershell, Azure CLI, Azure Resource Manager API, etc.) are required to use multifactor authentication (MFA) credentials when accessing resources through the Windows Azure Service Management API.

## Rationale

Administrative access to the Windows Azure Service Management API should be secured with a higher level of scrutiny to authenticating mechanisms. Enabling multifactor authentication is recommended to reduce the potential for abuse of Administrative actions, and to prevent intruders or compromised admin credentials from changing administrative settings.

**IMPORTANT**: While this recommendation allows exceptions to specific Users or Groups, they should be very carefully tracked and reviewed for necessity on a regular interval through an Access Review process. It is important that this rule be built to include "All Users" to ensure that all users not specifically excepted will be required to use MFA to access the Azure Service Management API.

## Impact

Conditional Access policies require Microsoft Entra ID P1 or P2 licenses. Similarly, they may require additional overhead to maintain if users lose access to their MFA. Any users or groups which are granted an exception to this policy should be carefully tracked, be granted only minimal necessary privileges, and conditional access exceptions should be regularly reviewed or investigated.

## Audit

### From Azure Portal

1. From the Azure Admin Portal dashboard, open `Microsoft Entra ID`.
2. In the menu on the left of the Entra ID blade, click `Security`.
3. In the menu on the left of the Security blade, click `Conditional Access`.
4. In the menu on the left of the Conditional Access blade, click `Policies`.
5. Click on the name of the policy you wish to audit.
6. Click the blue text under `Users`.
7. Under the `Include` section of Users, review `Users and Groups` to ensure that `All Users` is selected.
8. Under the `Exclude` section of Users, review the `Users and Groups` that are excluded from the policy (**NOTE**: this should be limited to break-glass emergency access accounts, non-interactive service accounts, and other carefully considered exceptions).
9. On the left side, click the blue text under `Target Resources`.
10. Select what this policy applies to should have `Cloud apps` selected.
11. Under the `Include` section of Target Resources, the `Select apps` radio button should be selected.
12. Click the blue text under `Select`.
13. From the select prompt that appears, the checkbox for `Windows Azure Service Management API` should be checked.

## Default Value

MFA is not enabled by default for administrative actions.

## References

1. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-7-restrict-resource-access-based-on--conditions>
2. <https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/concept-conditional-access-users-groups>
3. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-policy-azure-management>
4. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-cloud-apps#windows-azure-service-management-api>

## Additional Information

These policies should be tested by using the What If tool in the References. Setting these can and will create issues with administrators changing settings until they use an MFA device linked to their accounts. An emergency access account is recommended for this eventuality if all administrators are locked out. Please see the documentation in the references for further information. Similarly further testing can also be done via the insights and reporting resource in References which monitors Azure sign ins.
