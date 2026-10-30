# Description

Conditional Access Policies can be used to prevent the device code authentication flow. Device code flow should be permitted only for users who regularly perform duties that explicitly require the use of device code to authenticate, such as using Azure with PowerShell.

## Rationale

Attackers use device code flow in phishing attacks and, if successful, can gain access and refresh tokens scoped to `user_impersonation`, which can perform any action the user has permission to perform.

## Impact

Microsoft Entra ID P1 or P2 is required.

This policy should be tested using the `Report-only mode` before implementation. Without a full and careful understanding of the accounts and personnel who require Device code authentication flow, implementing this policy can block authentication for users and devices who rely on Device code flow. For users and devices that rely on device code flow authentication, more secure alternatives should be implemented wherever possible.

## Audit

### From Azure Portal

1. In the Azure portal, open the portal menu in the upper left and select `Microsoft Entra ID`.
2. Scroll down in the menu on the left and select `Security`.
3. On the left, select `Conditional Access`.
4. Select `Policies`.
5. Select the policy you wish to audit, then:
    - Under `Assignments` > `Users`, review the users and groups for the personnel the policy will apply to.
    - Under `Assignments` > `Target resources`, review the cloud apps or actions for the systems the policy will apply to.
    - Under `Conditions` > `Authentication Flows`, review the configuration to ensure `Device code flow` is selected.
    - Under `Access Controls` > `Grant`, confirm that `Block access` is selected.

## Default Value

This policy does not exist by default.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-authentication-flows#device-code-flow>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-7-restrict-resource-access-based-on--conditions>
3. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only>
4. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-block-authentication-flows>

## Additional Information

These policies should be tested by using the What If tool in the References. Setting these can create issues with users logging in until they use an MFA device linked to their accounts. Further testing can also be done via the insights and reporting resource in References, which monitors Azure sign-ins.
