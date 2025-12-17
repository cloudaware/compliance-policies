
# Description

A Conditional Access policy can be enabled to ensure that users are required to use Multifactor Authentication (MFA) to login.

**Note**: Since 2024, Azure has been rolling out mandatory multifactor authentication. For more information:

- <https://azure.microsoft.com/en-us/blog/announcing-mandatory-multi-factor-authentication-for-azure-sign-in>
- <https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mandatory-multifactor-authentication>

## Rationale

Multifactor authentication is strongly recommended to increase the confidence that a claimed identity can be proven to be the subject of the identity. This results in a stronger authentication chain and reduced likelihood of exploitation.

## Impact

There is an increased cost associated with Conditional Access policies because of the requirement of Microsoft Entra ID P1 or P2 licenses. Additional support overhead may also need to be considered.

## Audit

### From Azure Portal

1. From Azure Home open the Portal Menu in the top left, and select `Microsoft Entra ID`.
2. Scroll down in the menu on the left, and select `Security`.
3. Select on the left side `Conditional Access`.
4. Select `Policies`.
5. Select the policy you wish to audit.
6. Click the blue text under `Users`.
7. View under `Include` the corresponding users and groups to whom the policy is applied.
8. Under `Exclude` ensure that no users or groups are specified. If there are users or groups specified for exclusion, a very strong justification should exist for each exception, and all excepted account-level objects should be recorded in documentation along with the justification for comparison in future audits.

## Default Value

Starting October 2024, MFA will be required for all accounts by default.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-mfa-strength>
2. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/troubleshoot-conditional-access-what-if>
3. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-insights-reporting>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-7-restrict-resource-access-based-on--conditions>

## Additional Information

These policies should be tested by using the What If tool in the References. Setting these can and will create issues with logging in for users until they use an MFA device linked to their accounts. Further testing can also be done via the insights and reporting resource the in References which monitors Azure sign ins.
