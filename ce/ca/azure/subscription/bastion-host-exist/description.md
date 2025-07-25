# Description

The Azure Bastion service allows secure remote access to Azure Virtual Machines over the Internet without exposing remote access protocol ports and services directly to the Internet. The Azure Bastion service provides this access using TLS over 443/TCP, and subscribes to hardened configurations within an organization's Azure Active Directory service.

## Rationale

The Azure Bastion service allows organizations a more secure means of accessing Azure Virtual Machines over the Internet without assigning public IP addresses to those Virtual Machines. The Azure Bastion service provides Remote Desktop Protocol (RDP) and Secure Shell (SSH) access to Virtual Machines using TLS within a web browser, thus preventing organizations from opening up 3389/TCP and 22/TCP to the Internet on Azure Virtual Machines. Additional benefits of the Bastion service includes Multi-Factor Authentication, Conditional Access Policies, and any other hardening measures configured within Azure Active Directory using a central point of access.

## Impact

The Azure Bastion service incurs additional costs and requires a specific virtual network configuration. The `Standard` tier offers additional configuration options compared to the `Basic` tier and may incur additional costs for those added features.

## Audit

This policy flags an *Azure Subscription* as `INCOMPLIANT` if it does **not** have any related **Azure Bastion Hosts**.

## Default Value

By default, the Azure Bastion service is not configured.

## References

1. <https://learn.microsoft.com/en-us/azure/bastion/bastion-overview#sku>
2. <https://learn.microsoft.com/en-us/powershell/module/az.network/get-azbastion?view=azps-9.2.0>
3. <https://learn.microsoft.com/en-us/cli/azure/network/bastion?view=azure-cli-latest>
