# Description

For designated users, they will be prompted to use their multi-factor authentication (MFA) process on login.

## Rationale

Enabling multi-factor authentication is a recommended setting to limit the use of Administrative accounts to authenticated personnel.

## Impact

There is an increased cost, as Conditional Access policies require Microsoft Entra ID P1. Similarly, MFA may require additional overhead to maintain. There is also a potential scenario in which the multi-factor authentication method can be lost, and administrative users are no longer able to log in. For this scenario, there should be an emergency access account. Please see References for creating this.

## Audit

### From Azure Portal

1. From Azure Home open the Portal Menu in the top left, and select `Microsoft Entra ID`.
2. Select `Security`.
3. Select `Conditional Access`.
4. Select the policy you wish to audit.
5. View under `Users and Groups` the corresponding users and groups to whom the policy is applied. Be certain the emergency access account is not in the list.
6. View under `Exclude` to determine which Users and groups to whom the policy is not applied.

## Default Value

By default, MFA is not enabled for any administrative accounts.

## References

1. <https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/howto-conditional-access-policy-admin-mfa>
2. <https://docs.microsoft.com/en-us/azure/active-directory/roles/security-emergency-access>
3. <https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/troubleshoot-conditional-access-what-if>
4. <https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/howto-conditional-access-insights-reporting>
5. <https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/plan-conditional-access>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-7-restrict-resource-access-based-on--conditions>

## Additional Information

These policies should be tested by using the What If tool in the References. Setting these can and will create issues with logging in for users until they use an MFA device linked to their accounts. Further testing can also be done via the insights and reporting resource in References which monitors Azure sign ins.
