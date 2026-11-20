# Remediation

A public IP address is covered by Azure DDoS Protection through IP Protection, enabled on the address, or Network Protection, inherited from its virtual network. Its protection mode is Enabled, VirtualNetworkInherited or Disabled. Addresses DDoS Protection does not support, such as those on a NAT gateway, are out of scope.

For a supported Standard SKU public IP address, open **Public IP addresses**, select the address, and set **DDoS protection > Protection type** to **IP**. Alternatively, enable **DDoS Network Protection** on the associated virtual network and configure the address to inherit that protection. Basic SKU addresses and addresses from a public IP prefix linked to a public load balancer frontend require the network-protection path. Verify effective workload protection after applying the configuration.

Automated assessment is unavailable: The collected protection mode does not establish inherited workload protection. Effective ddosProtectionStatus.isWorkloadProtected and supported-resource exclusions are not collected.
