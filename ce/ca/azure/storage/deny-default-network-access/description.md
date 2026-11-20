# Description

Restricting default network access provides an additional layer of security, since storage accounts accept connections from clients on any network. To limit access to selected networks, the default action must be changed.

## Rationale

Public access can be restricted by disabling it, enforcing a security perimeter, or denying traffic outside selected networks.

Storage accounts should be configured to deny access to traffic from all networks (including internet traffic). Access can be granted to traffic from specific Azure Virtual networks, allowing a secure network boundary for specific applications to be built. Access can also be granted to public internet IP address ranges to enable connections from specific internet or on-premises clients. When network rules are configured, only applications from allowed networks can access a storage account. When calling from an allowed network, applications continue to require proper authorization (a valid access key or SAS token) to access the storage account.

## Impact

All allowed networks will need to be whitelisted on each specific network, creating administrative overhead. This may result in loss of network connectivity, so do not turn on for critical resources during business hours.

## Audit

This policy marks an *Azure Storage Account* as `INCOMPLIANT` if **Public Network Access State** is `Enabled` or unset and **Network ACLs: Default Action** is `Allow`. A public access state of `Disabled` or `SecuredByPerimeter`, or default action `Deny`, is `COMPLIANT`.

## Default Value

By default, Storage Accounts will accept connections from clients on any network.

## References

1. <https://docs.microsoft.com/en-us/azure/storage/common/storage-network-security>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-2-secure-cloud-native-services-with-network-controls>
