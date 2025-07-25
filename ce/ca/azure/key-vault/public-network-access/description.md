# Description

When Private endpoint is configured on a Key Vault, connections from Azure resources within the same subnet will use its private IP address. However, network traffic from the public internet can still flow connect to the Key Vault’s public endpoint (mykeyvault.vault.azure.net) using its public IP address unless Public network access is set to “Disabled”.

Setting the Public network access to “Disabled” with a Private Endpoint will remove the Vault’s public endpoint from Azure public DNS, reducing its exposure to the public internet. Network traffic will use the Vault private endpoint IP address for all requests (mykeyvault.vault.privatelink.azure.net).

## Rationale

Removing a point of interconnection from the internet edge to your Key Vault can strengthen the network security boundary of your system and reduce the risk of exposing the control plane or vault objects to untrusted clients.

Although Azure resources are never truly isolated from the public internet, disabling the public endpoint removes a line of sight from the public internet and increases the effort required for an attack.

## Impact

Implementation needs to be properly designed from the ground up, as this is a fundamental change to the network architecture of your system. It will increase the configuration effort and decrease the usability of the Key Vault, and is appropriate for workloads where security is the primary consideration.

## Audit

This policy flags an *Azure Key Vault* as `INCOMPLIANT` if `Public Network Access` is **not** set to **Disabled**.

## Default Value

The default value for Access control in Key Vaults is Vault Policy.

## References

1. <https://learn.microsoft.com/en-us/azure/key-vault/general/network-security>
2. <https://learn.microsoft.com/en-us/azure/key-vault/general/private-link-service>
