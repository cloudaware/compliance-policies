# Description

This policy identifies Azure Key Vaults where public network access is not disabled to reduce exposure to the internet and minimize the risk of unauthorized access. Access to Azure Key Vault should be restricted to trusted networks using private endpoints.

Disabling public network access removes the key vault’s public endpoint from Azure public DNS. With a private endpoint in place, all traffic is routed through the private endpoint using the private DNS name (`mykeyvault.vault.privatelink.azure.net`), ensuring access occurs only within trusted network boundaries.

When a private endpoint is configured for a key vault, Azure resources within the associated virtual network connect to the vault using a private IP address. However, unless public network access is explicitly disabled, the key vault remains reachable via its public endpoint (`mykeyvault.vault.azure.net`) over the internet.

## Rationale

Disabling public network access improves security by ensuring that a service is not exposed on the public internet.

Removing a point of interconnection from the internet edge to your key vault can strengthen the network security boundary of your system and reduce the risk of exposing the control plane or vault objects to untrusted clients.

Although Azure resources are never truly isolated from the public internet, disabling the public endpoint removes a line of sight from the public internet and increases the effort required for an attack.

## Impact

**NOTE:** Prior to disabling public network access, it is strongly recommended that, for each key vault, either:

- virtual network integration is completed

OR

- private endpoints/links are set up as described in **"Ensure Private Endpoints are used to access Azure Key Vault."**

Disabling public network access restricts access to the service. This enhances security but will require the configuration of a virtual network and/or private endpoints for any services or users needing access within trusted networks.

## Audit

This policy flags an *Azure Key Vault* as `INCOMPLIANT` if `Public Network Access` is **not** set to **Disabled**.

## Default Value

Public network access is enabled by default.

## References

1. <https://learn.microsoft.com/en-us/azure/key-vault/general/network-security>
2. <https://learn.microsoft.com/en-us/azure/key-vault/general/private-link-service>
