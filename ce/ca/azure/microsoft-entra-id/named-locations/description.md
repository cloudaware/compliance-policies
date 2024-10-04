# Description

Microsoft Entra ID Conditional Access allows an organization to configure `Named locations` and configure whether those locations are trusted or untrusted. These settings provide organizations the means to specify Geographical locations for use in conditional access policies, or define actual IP addresses and IP ranges and whether or not those IP addresses and/or ranges are trusted by the organization.

## Rationale

Defining trusted source IP addresses or ranges helps organizations create and enforce Conditional Access policies around those trusted or untrusted IP addresses and ranges. Users authenticating from trusted IP addresses and/or ranges may have less access restrictions or access requirements when compared to users that try to authenticate to Microsoft Entra ID from untrusted locations or untrusted source IP addresses/ranges.

## Impact

When configuring `Named locations`, the organization can create locations using Geographical location data or by defining source IP addresses or ranges. Configuring `Named locations` using a Country location does not provide the organization the ability to mark those locations as trusted, and any Conditional Access policy relying on those `Countries location` setting will not be able to use the `All trusted locations` setting within the Conditional Access policy. They instead will have to rely on the `Select locations` setting. This may add additional resource requirements when configuring, and will require thorough organizational testing.

In general, Conditional Access policies may completely prevent users from authenticating to Microsoft Entra ID, and thorough testing is recommended. To avoid complete lockout, a 'Break Glass' account with full Global Administrator rights is recommended in the event all other administrators are locked out of authenticating to Microsoft Entra ID. This 'Break Glass' account should be excluded from Conditional Access Policies and should be configured with the longest pass phrase feasible. This account should only be used in the event of an emergency and complete administrator lockout.

**NOTE**: Starting July 2024, Microsoft will begin requiring MFA for All Users - including Break Glass Accounts. By the end of October 2024, this requirement will be enforced. Physical FIDO2 security keys, or a certificate kept on secure removable storage can fulfill this MFA requirement. If opting for a physical device, that device should be kept in a very secure, documented physical location.

## Audit

### From Azure Portal

1. In the Azure Portal, navigate to `Microsoft Entra ID`.
2. Under `Manage`, click `Security`.
3. Under `Protect`, click `Conditional Access`.
4. Under `Manage`, click `Named locations`.

Ensure there are `IP ranges location` settings configured and marked as `Trusted`.

### From PowerShell

```ps
Get-MgIdentityConditionalAccessNamedLocation
```

In the output from the above command, for each Named location group, make sure at least one entry contains the `IsTrusted` parameter with a value of `True`. Otherwise, if there is no output as a result of the above command or all of the entries contain the `IsTrusted` parameter with an empty value, a `NULL` value, or a value of `False`, the results are out of compliance with this check.

## Default Value

By default, no locations are configured under the `Named locations` blade within the Microsoft Entra ID Conditional Access blade.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-assignment-network>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-7-restrict-resource-access-based-on--conditions>
3. <https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access>
