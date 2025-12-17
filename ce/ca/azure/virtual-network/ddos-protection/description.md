# Description

This policy identifies Azure Virtual Network that have DDoS Network Protection disabled.
Azure DDoS Network Protection defends resources in virtual networks against distributed denial-of-service (DDoS) attacks.

While an automated assessment procedure exists for this recommendation, the assessment status remains manual. Determining the appropriateness of enabling Azure DDoS Network Protection depends on the context and requirements of each organization and environment.

## Rationale

Virtual networks and resources are protected against attacks, helping to ensure reliability and availability for critical workloads.

## Impact

Azure DDoS Network Protection incurs a significant fixed monthly charge, with additional charges if more than 100 public IP resources are protected. Careful consideration and analysis should be applied before enabling DDoS protection. Refer to <https://azure.microsoft.com/en-us/pricing/details/ddos-protection> for detailed pricing information.

## Audit

This policy marks an *Azure Virtual Network* as `INCOMPLIANT` if it has **disabled** `DDoS Network Protection`.

## Default Value

DDoS protection is disabled by default.

## References

1. <https://learn.microsoft.com/en-us/azure/ddos-protection/ddos-protection-overview>
2. <https://learn.microsoft.com/en-us/azure/ddos-protection/manage-ddos-protection>
3. <https://azure.microsoft.com/en-us/pricing/details/ddos-protection>
4. <https://learn.microsoft.com/en-us/cli/azure/network/vnet>
