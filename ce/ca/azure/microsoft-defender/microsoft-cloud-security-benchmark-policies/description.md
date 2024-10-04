# Description

The Microsoft Cloud Security Benchmark (or "MCSB") is an Azure Policy Initiative containing many security policies to evaluate resource configuration against best practice recommendations. If a policy in the MCSB is set with effect type `Disabled`, it is not evaluated and may prevent administrators from being informed of valuable security recommendations.

## Rationale

A security policy defines the desired configuration of resources in your environment and helps ensure compliance with company or regulatory security requirements. The MCSB Policy Initiative a set of security recommendations based on best practices and is associated with every subscription by default. When a policy "Effect" is set to `Audit`, policies in the MCSB ensure that Defender for Cloud evaluates relevant resources for supported recommendations. To ensure that policies within the MCSB are not being missed when the Policy Initiative is evaluated, none of the policies should have an Effect of `Disabled`.

## Impact

Policies within the MCSB default to an effect of `Audit` and will evaluate - but not enforce - policy recommendations. Ensuring these policies are set to `Audit` simply ensures that the evaluation occurs to allow administrators to understand where an improvement may be possible. Administrators will need to determine if the recommendations are relevant and desirable for their environment, then manually take action to resolve the status if desired.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Defender for Cloud`.
3. Under `Management`, select `Environment Settings`.
4. Select the appropriate Subscription.
5. Click on `Security policies` in the left column.
6. Click on `Microsoft cloud security benchmark`.
7. Click `Add Filter` and select `Effect`.
8. Check the `Disabled` box to search for all disabled policies.
9. Click `Apply`.

If no Policies are shown, no Policies are in `Disabled` status and no remediation is necessary. If any Policies remain in the list, the policy `Effect` should be changed to `Audit`.

## Default Value

By default, the MCSB policy initiative is associated to all subscriptions and **most** policies will have an effect of `Audit`. Some policies will have a default effect of `Disabled`.

## References

1. <https://docs.microsoft.com/en-us/azure/security-center/security-center-policies>
2. <https://docs.microsoft.com/en-us/azure/security-center/security-center-enable-transparent-data-encryption>
3. <https://msdn.microsoft.com/en-us/library/mt704062.aspx>
4. <https://msdn.microsoft.com/en-us/library/mt704063.aspx>
5. <https://docs.microsoft.com/en-us/rest/api/policy/policy-assignments/get>
6. <https://docs.microsoft.com/en-us/rest/api/policy/policy-assignments/create>
7. <https://docs.microsoft.com/en-in/azure/security-center/tutorial-security-policy>
8. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-7-define-and-implement-logging-threat-detection-and-incident-response-strategy>
