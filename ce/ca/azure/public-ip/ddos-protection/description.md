# Description

A public IP address is covered by Azure DDoS Protection through IP Protection, enabled on the address, or Network Protection, inherited from its virtual network. Its protection mode is Enabled, VirtualNetworkInherited or Disabled. Addresses DDoS Protection does not support, such as those on a NAT gateway, are out of scope.

## Rationale

Without IP Protection or Network Protection, a public IP address relies only on Azure DDoS infrastructure protection, whose mitigation thresholds are set for the platform rather than the application. Attack traffic below those thresholds can still exhaust the bandwidth, connections, or compute behind the address, and no attack telemetry, alerting, or mitigation report is produced.

## Audit

This requirement needs manual assessment. The collected protection mode does not establish inherited workload protection. Effective ddosProtectionStatus.isWorkloadProtected and supported-resource exclusions are not collected.
