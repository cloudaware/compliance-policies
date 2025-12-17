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
4. Select the appropriate Management Group or Subscription.
5. Click on `Security policies` in the left column.
6. Click on `Microsoft cloud security benchmark`.
7. Click `Add Filter` and select `Effect`.
8. Check the `Disabled` box to search for all disabled policies.
9. Click `Apply`.
10. Ensure that no policies are displayed, signifying that there are no disabled policies.
11. Repeat steps 1-10 for each Management Group or Subscription.

## Default Value

By default, the MCSB policy initiative is associated to all subscriptions and **most** policies will have an effect of `Audit`. Some policies will have a default effect of `Disabled`.

## References

1. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/security-policy-concept>
2. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/implement-security-recommendations>
3. <https://learn.microsoft.com/en-us/rest/api/policy/policy-assignments/get>
4. <https://learn.microsoft.com/en-us/rest/api/policy/policy-assignments/create>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-7-define-and-implement-logging-threat-detection-and-incident-response-strategy>
