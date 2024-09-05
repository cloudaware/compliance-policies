# Description

**CAUTION**: If these policies are created without first auditing and testing the result, misconfiguration can potentially lock out administrators or create undesired access issues.

Conditional Access Policies can be used to block access from geographic locations that are deemed out-of-scope for your organization or application. The scope and variables for this policy should be carefully examined and defined.

## Rationale

Conditional Access, when used as a deny list for the tenant or subscription, is able to prevent ingress or egress of traffic to countries that are outside of the scope of interest (e.g.: customers, suppliers) or jurisdiction of an organization. This is an effective way to prevent unnecessary and long-lasting exposure to international threats such as APTs.

## Impact

Microsoft Entra ID P1 or P2 is required. Limiting access geographically will deny access to users that are traveling or working remotely in a different part of the world. A point-to-site or site to site tunnel such as a VPN is recommended to address exceptions to geographic access policies.

## Audit

### From Azure Portal

1. From Azure Home open the Portal menu in the top left, and select `Microsoft Entra ID`.
2. Scroll down in the menu on the left, and select `Security`.
3. Select on the left side `Conditional Access`.
4. Select the policy you wish to audit, then:
    - Under `Assignments`, Review the `Users and Groups` for the personnel the policy will apply to.
    - Under `Assignments`, Review the `Cloud apps or actions` for the systems the policy will apply to.
    - Under `Conditions`, Review the `Include` locations for those that should be **blocked**.
    - Under `Conditions`, Review the `Exclude` locations for those that should be allowed (Note: locations set up in the previous recommendation for Trusted Location should be in the `Exclude` list.).
    - Under `Access Controls` > `Grant` - Confirm that `Block Access` is selected.

### From Azure CLI

As of this writing there are no subcommands for Conditional Access Policies within the Azure CLI

### From PowerShell

```ps
$conditionalAccessPolicies = Get-AzureADMSConditionalAccessPolicy foreach($policy in $conditionalAccessPolicies) {$policy | Select-Object @{N='Policy ID'; E={$policy.id}}, @{N="Included Locations"; E={$policy.Conditions.Locations.IncludeLocations}}, @{N="Excluded Locations"; E={$policy.Conditions.Locations.ExcludeLocations}}, @{N="BuiltIn GrantControls"; E={$policy.GrantControls.BuiltInControls}}}
```

Make sure there is at least 1 row in the output of the above PowerShell command that contains `Block` under the `BuiltIn GrantControls` column and location IDs under the `Included Locations` and `Excluded Locations` columns. If not, a policy containing these options has not been created and is considered a finding.

## Default Value

This policy does not exist by default.

## References

1. <https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/howto-conditional-access-policy-location>
2. <https://docs.microsoft.com/en-us/azure/active-directory/conditional-access/concept-conditional-access-report-only>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-7-restrict-resource-access-based-on--conditions>

## Additional Information

These policies should be tested by using the What If tool in the References. Setting these can and will create issues with logging in for users until they use an MFA device linked to their accounts. Further testing can also be done via the insights and reporting resource in References which monitors Azure sign ins.
