# Description

Networking for Azure Databricks can be set up in a few different ways. Using a customer-managed Virtual Network (VNet) (also known as VNet Injection) ensures that compute clusters and control planes are securely isolated within the organization’s network boundary. By default, Databricks creates a managed VNet, which provides limited control over network security policies, firewall configurations, and routing.

## Rationale

Using a customer-managed VNet ensures better control over network security and aligns with zero-trust architecture principles. It allows for:

- Restricted outbound internet access to prevent unauthorized data exfiltration.
- Integration with on-premises networks via VPN or ExpressRoute for hybrid connectivity.
- Fine-grained NSG policies to restrict access at the subnet level.
- Private Link for secure API access, avoiding public internet exposure.

## Impact

- Requires additional configuration during Databricks workspace deployment.
- Might increase operational overhead for network maintenance.
- May impact connectivity if misconfigured (e.g., restrictive NSG rules or missing routes).

## Audit

This policy flags an *Azure Databricks Workspace* as `INCOMPLIANT` if the `Parameters JSON` field **does not** contain the **Custom Virtual Network Id** parameter.

## Default Value

By default, Azure Databricks uses a Databricks-Managed VNet.
