# Description

Disable public network access to prevent exposure to the internet and reduce the risk of unauthorized access. Use private endpoints to securely manage access within trusted networks.

## Rationale

Disabling public network access improves security by ensuring that Azure Databricks workspaces are not exposed on the public internet.

## Impact

**NOTE**: Prior to disabling public network access, it is strongly recommended that, for each workspace, either:

- virtual network integration is completed as described in **"Ensure that Azure Databricks is deployed in a customer-managed virtual network (VNet)"**

OR

- private endpoints/links are set up as described in **"Ensure private endpoints are used to access Azure Databricks workspaces."**

Disabling public network access restricts access to the service. This enhances security but will require the configuration of a virtual network and/or private endpoints for any services or users needing access within trusted networks.

Before public network access can be disabled, Azure Databricks workspaces must be deployed in a customer-managed virtual network (VNet injection)—refer to the recommendation `Ensure that Azure Databricks is deployed in a customer-managed virtual network (VNet)`, and `requiredNsgRules` must be set to a value other than `AllRules`.

## Audit

This policy flags an *Azure Databricks Workspace* as `INCOMPLAINT` if the `Allow Public Network Access` field is set on **Enabled** or empty.

## Default Value

`Allow Public Network Access` is set to `Enabled` by default.

## References

1. <https://learn.microsoft.com/en-us/cli/azure/databricks/workspace>
2. <https://learn.microsoft.com/en-us/powershell/module/az.databricks>
