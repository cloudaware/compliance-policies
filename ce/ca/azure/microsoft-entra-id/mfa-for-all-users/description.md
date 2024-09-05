
# Description

For designated users, they will be prompted to use their multi-factor authentication (MFA) process on logins.

## Rationale

Enabling multi-factor authentication is a recommended setting to limit the potential of accounts being compromised and limiting access to authenticated personnel.

## Impact

There is an increased cost, as Conditional Access policies require Microsoft Entra ID P1 or P2. Similarly, this may require additional overhead to maintain if users lose access to their MFA.

## Audit

### From Azure Portal

1. From Azure Home open the Portal Menu in the top left, and select `Microsoft Entra ID`.
2. Scroll down in the menu on the left, and select `Security`.
3. Select on the left side `Conditional Access`.
4. Select the policy you wish to audit.
5. View under `Users and Groups` the corresponding users and groups to whom the policy is applied.
6. View under `Exclude` to determine which users and groups to whom the policy is not applied.

## Default Value

MFA is not enabled by default.

## References

1. <https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/howto-conditional-access-policy-all-users-mfa>
2. <https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/troubleshoot-conditional-access-what-if>
3. <https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/howto-conditional-access-insights-reporting>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-7-restrict-resource-access-based-on--conditions>

## Additional Information

These policies should be tested by using the What If tool in the References. Setting these can and will create issues with logging in for users until they use an MFA device linked to their accounts. Further testing can also be done via the insights and reporting resource the in References which monitors Azure sign ins.
