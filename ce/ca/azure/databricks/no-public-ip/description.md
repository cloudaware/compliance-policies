# Description

Enable secure cluster connectivity (also known as no public IP) on Azure Databricks workspaces to ensure that clusters do not have public IP addresses and communicate with the control plane over a secure connection.

## Rationale

Enabling secure cluster connectivity limits exposure to the public internet, improving security and reducing the risk of external attacks.

## Impact

Enabling secure cluster connectivity requires careful network configuration. Before secure cluster connectivity can be enabled, Azure Databricks workspaces must be deployed in a customer-managed virtual network (VNet injection), refer to the policy [`Azure Databricks Workspace is not deployed in a customer-managed virtual network (VNet)`](../customer-managed-virtual-network/).

## Audit

This policy flags an *Azure Databricks Workspace* as `INCOMPLAINT` if the `Parameters JSON` field **does not** contain the **enableNoPublicIp** parameter set to **true**.

## Default Value

`No Public IP` is set to `Enabled` by default.

## References

1. <https://learn.microsoft.com/en-us/azure/databricks/security/network/classic/secure-cluster-connectivity>
2. <https://learn.microsoft.com/en-us/cli/azure/databricks/workspace>
3. <https://learn.microsoft.com/en-us/powershell/module/az.databricks>
