# Remediation

Virtual machines without an explicit outbound method reach public endpoints through default outbound access, a Microsoft-owned public IP address, unless their subnet is private. The subnet's Default outbound access setting is Enabled or Disabled (private); delegated subnets and the subnets reserved for gateways, Azure Firewall, Route Server, and Bastion are out of scope. Prerequisites: Give each virtual machine that needs public endpoints an explicit outbound method, such as a NAT gateway, before disabling default outbound access.

In **Virtual networks**, select the affected virtual network and open **Settings > Subnets**. Select each in-scope subnet, set **Default outbound access** to **Disabled**, and save. Verify that required outbound connections use the approved explicit outbound method.
