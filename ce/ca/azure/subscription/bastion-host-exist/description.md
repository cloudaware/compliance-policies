# Description

The Azure Bastion service allows secure remote access to Azure Virtual Machines over the Internet without exposing remote access protocol ports and services directly to the Internet. The Azure Bastion service provides this access using TLS over 443/TCP, and subscribes to hardened configurations within an organization's Azure Active Directory service.

## Rationale

The Azure Bastion service allows organizations a more secure means of accessing Azure Virtual Machines over the Internet without assigning public IP addresses to those Virtual Machines. The Azure Bastion service provides Remote Desktop Protocol (RDP) and Secure Shell (SSH) access to Virtual Machines using TLS within a web browser, thus preventing organizations from opening up 3389/TCP and 22/TCP to the Internet on Azure Virtual Machines. Additional benefits of the Bastion service includes Multi-Factor Authentication, Conditional Access Policies, and any other hardening measures configured within Azure Active Directory using a central point of access.

## Impact

The Azure Bastion service incurs additional costs and requires a specific virtual network configuration. The `Standard` tier offers additional configuration options compared to the `Basic` tier and may incur additional costs for those added features.

## Audit

### From Azure Portal

1. Click on `Bastions`.
2. Ensure there is at least one `Bastion` host listed under the `Name` column.

### From Azure CLI

**Note**: The Azure CLI `network bastion` module is in `Preview` as of this writing:

```sh
az network bastion list --subscription <subscription ID>
```

Ensure the output of the above command is not empty.

### From PowerShell

Retrieve the `Bastion` host(s) information for a specific `Resource Group`:

```ps
Get-AzBastion -ResourceGroupName <resource group name>
```

Ensure the output of the above command is not empty.

## Default Value

By default, the Azure Bastion service is not configured.

## References

1. <https://learn.microsoft.com/en-us/azure/bastion/bastion-overview#sku>
2. <https://learn.microsoft.com/en-us/powershell/module/az.network/get-azbastion?view=azps-9.2.0>
3. <https://learn.microsoft.com/en-us/cli/azure/network/bastion?view=azure-cli-latest>
