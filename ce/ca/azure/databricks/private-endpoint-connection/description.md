# Description

This policy identifies Azure Databricks Workspaces that do not utilize private endpoints.

Private endpoints provide secure, private connectivity to Azure Databricks workspaces over an encrypted Azure Private Link. Each service receives an IP address from the associated Virtual Network (VNet), ensuring that network traffic between clients, services, and resources remains private and encrypted. Private endpoints also enable network segmentation, hybrid connectivity through VNet peering or VPN/ExpressRoute, and secure tunneling across public networks, reducing exposure to external threats.

## Rationale

Using private endpoints for Azure Databricks workspaces ensures that all communication occurs over a private IP space within a customer-managed VNet, eliminating exposure to the public internet. This approach:

- Minimizes the attack surface and supports Zero Trust principles.
- Enables network segmentation and fine-grained access control.
- Supports hybrid connectivity for accessing on-premises or remote resources securely.

## Impact

If an Azure Virtual Network is not implemented correctly, this may result in the loss of critical network traffic.

Private endpoints are charged per hour of use.

To estimate potential costs, refer to:

- <https://azure.microsoft.com/en-us/pricing/details/private-link/> and
- <https://azure.microsoft.com/en-us/pricing/calculator/>.

Before a private endpoint can be configured, Azure Databricks workspaces:

- must be deployed in a customer-managed virtual network (VNet injection), refer to [`Azure Databricks Workspace is not deployed in a customer-managed virtual network (VNet)`](../customer-managed-virtual-network/)
- must have secure cluster connectivity enabled—refer to the recommendation [`Azure Databricks Workspace Secure Cluster Connectivity is not enabled`](../no-public-ip/)
- must be on the `Premium` pricing tier

Ensure the requirements and concepts are considered carefully before applying this recommendation.

## Audit

This policy flags an *Azure Databricks Workspace* as `INCOMPLIANT` if it has no related `Private Endpoint Connections` with a connection state of `Approved`.

## Default Value

Private endpoints are not configured for Azure Databricks workspaces by default.

## References

1. <https://learn.microsoft.com/en-us/azure/databricks/security/network/classic/private-link>
2. <https://learn.microsoft.com/en-us/cli/azure/databricks/workspace>
3. <https://learn.microsoft.com/en-us/powershell/module/az.databricks>
