# Description

Entra ID tracks the behavior of sign-in events. If the Entra ID domain is licensed with P2, the sign-in behavior can be used as a detection mechanism for additional scrutiny during the sign-in event. If this policy is set up, then Risky Sign-in events will prompt users to use multi-factor authentication (MFA) tokens on login for additional verification.

## Rationale

Enabling multi-factor authentication is a recommended setting to limit the potential of accounts being compromised and limiting access to authenticated personnel. Enabling this policy allows Entra ID's risk-detection mechanisms to force additional scrutiny on the login event, providing a deterrent response to potentially malicious sign-in events, and adding an additional authentication layer as a reaction to potentially malicious behavior.

## Impact

Risk Policies for Conditional Access require Microsoft Entra ID P2. Additional overhead to support or maintain these policies may also be required if users lose access to their MFA tokens.

## Audit

### From Azure Portal

1. In the Azure portal, open the portal menu in the upper left and select `Microsoft Entra ID`.
2. Select `Security`.
3. On the left, select `Conditional Access`.
4. Select `Policies`.
5. Select the policy you wish to audit.
6. Click the blue text under `Users`.
7. View under `Include` the corresponding users and groups to whom the policy is applied.
8. Under `Exclude`, review the users and groups to whom the policy is not applied.

## Default Value

MFA is not enabled by default.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-risk-based-sign-in>
2. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/troubleshoot-conditional-access-what-if>
3. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-insights-reporting>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-7-restrict-resource-access-based-on--conditions>
5. <https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection#license-requirements>

## Additional Information

These policies should be tested by using the What If tool in the References. Setting these can create issues with users logging in until they use an MFA device linked to their accounts. Further testing can also be done via the insights and reporting resource in the References, which monitors Azure sign-ins.
