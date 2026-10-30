# Description

This recommendation ensures that users accessing Microsoft Admin Portals (e.g., Microsoft 365 Admin, Microsoft 365 Defender, Exchange Admin Center, Azure portal) are required to use multi-factor authentication (MFA) when logging in to an admin portal.

## Rationale

Administrative portals for Microsoft Azure should be secured with a higher level of scrutiny for authentication mechanisms. Enabling multi-factor authentication is recommended to reduce the potential for abuse of administrative actions and to prevent intruders or compromised admin credentials from changing administrative settings.

**Important**: While this recommendation allows exceptions to specific users or groups, they should be carefully tracked and reviewed for necessity on a regular interval through an access review process. It is important that this rule includes `All Users` to ensure that all users not specifically excepted are required to use MFA to access admin portals.

## Impact

Conditional Access policies require Microsoft Entra ID P1 or P2 licenses. Similarly, they may require additional overhead to maintain if users lose access to their MFA. Any users or groups which are granted an exception to this policy should be carefully tracked, be granted only minimal necessary privileges, and conditional access exceptions should be reviewed or investigated.

## Audit

### From Azure Portal

1. From the Azure Admin Portal dashboard, open `Microsoft Entra ID`.
2. In the menu on the left of the Entra ID blade, click `Security`.
3. In the menu on the left of the Security blade, click `Conditional Access`.
4. In the menu on the left of the Conditional Access blade, click `Policies`.
5. Click on the name of the policy you wish to audit.
6. Click the blue text under `Users`.
7. Under the `Include` section of Users, review `Users and Groups` to ensure that `All Users` is selected.
8. Under the `Exclude` section of Users, review the `Users and Groups` that are excluded from the policy (**Note**: this should be limited to break-glass emergency access accounts, non-interactive service accounts, and other carefully considered exceptions).
9. On the left side, click the blue text under `Target Resources`.
10. Under the `Include` section of Target resources, ensure the `Select apps` radio button is selected.
11. Under `Select`, ensure `Microsoft Admin Portals` is listed.

## Default Value

MFA is not enabled by default for administrative actions.

## References

1. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-7-restrict-resource-access-based-on--conditions>
2. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-users-groups>
3. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-old-require-mfa-admin-portals>

## Additional Information

These policies should be tested by using the What If tool in the References. Setting these can create issues with administrators changing settings until they use an MFA device linked to their accounts. An emergency access account is recommended for this eventuality if all administrators are locked out. See the documentation in the references for further information. Further testing can also be done via the insights and reporting resource in References, which monitors Azure sign-ins.
