# Description

For designated users, they will be prompted to use their multi-factor authentication (MFA) process on login.

## Rationale

Enabling multi-factor authentication is a recommended setting to limit the use of Administrative accounts to authenticated personnel.

## Impact

There is an increased cost, as Conditional Access policies require Microsoft Entra ID P1. Similarly, MFA may require additional overhead to maintain. There is also a potential scenario in which the multi-factor authentication method can be lost, and administrative users are no longer able to log in. For this scenario, there should be an emergency access account. Please see References for creating this.

**NOTE**: Starting July 2024, Microsoft will begin requiring MFA for All Users - including Break Glass Accounts. By the end of October 2024, this requirement will be enforced. Physical FIDO2 security keys, or a certificate kept on secure removable storage can fulfill this MFA requirement. If opting for a physical device, that device should be kept in a very secure, documented physical location.

## Audit

### From Azure Portal

1. From Azure Home open the Portal Menu in the top left, and select `Microsoft Entra ID`.
2. Select `Security`.
3. Select `Conditional Access`.
4. Select `Policies`.
5. Select the policy you wish to audit.
6. Click the blue text under `Users`.
7. View under `Include` the corresponding users and groups to whom the policy is applied. Be certain the emergency access account is not in the list.
8. View under `Exclude` to determine which Users and groups to whom the policy is not applied.

## Default Value

Starting October 2024, MFA will be required for all accounts by default.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-policy-admin-mfa>
2. <https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access>
3. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/troubleshoot-conditional-access-what-if>
4. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-insights-reporting>
5. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-7-restrict-resource-access-based-on--conditions>

## Additional Information

These policies should be tested by using the What If tool in the References. Setting these can and will create issues with logging in for users until they use an MFA device linked to their accounts. Further testing can also be done via the insights and reporting resource in References which monitors Azure sign ins.
