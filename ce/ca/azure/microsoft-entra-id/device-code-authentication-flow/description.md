# Description

Conditional Access Policies can be used to prevent the Device code authentication flow. Device code flow should be permitted only for users that regularly perform duties that explicitly require the use of Device Code to authenticate, such as utilizing Azure with PowerShell.

## Rationale

Attackers use Device code flow in phishing attacks and, if successful, results in the attacker gaining access tokens and refresh tokens which are scoped to "user_impersonation", which can perform any action the user has permission to perform.

## Impact

Microsoft Entra ID P1 or P2 is required.

This policy should be tested using the Report-only mode before implementation. Without a full and careful understanding of the accounts and personnel who require Device code authentication flow, implementing this policy can block authentication for users and devices who rely on Device code flow. For users and devices that rely on device code flow authentication, more secure alternatives should be implemented wherever possible.

## Audit

### From Azure Portal

1. From Azure Home open the Portal menu in the top left and select `Microsoft Entra ID`.
2. Scroll down in the menu on the left and select `Security`.
3. Select on the left side `Conditional Access`.
4. Select `Policies`.
5. Select the policy you wish to audit, then:
    - Under `Assignments` > `Users`, review the users and groups for the personnel the policy will apply to.
    - Under `Assignments` > `Target resources`, review the cloud apps or actions for the systems the policy will apply to.
    - Under `Conditions` > `Authentication Flows`, review the configuration to ensure `Device code flow` is selected.
    - Under `Access Controls` > `Grant` - Confirm that `Block access` is selected.

## Default Value

This policy does not exist by default.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-authentication-flows#device-code-flow>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-7-restrict-resource-access-based-on--conditions>
3. <https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/concept-conditional-access-report-only>
4. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/how-to-policy-authentication-flows>

## Additional Information

These policies should be tested by using the What If tool in the References. Setting these can and will create issues with logging in for users until they use an MFA device linked to their accounts. Further testing can also be done via the insights and reporting resource in References which monitors Azure sign ins.
