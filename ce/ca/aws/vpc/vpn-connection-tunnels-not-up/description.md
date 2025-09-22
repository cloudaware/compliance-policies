# Description

Ensure that both tunnels of an AWS Site-to-Site VPN Connection are active and in the **UP** state.

## Rationale

AWS Site-to-Site VPN provides two redundant tunnels to connect your on-premises network with your VPC, ensuring high availability and resilience. If one tunnel becomes unavailable due to maintenance or failure, traffic is automatically redirected to the second tunnel.

However, if only one tunnel is active and it fails (e.g., due to internet connectivity issues, customer gateway device failure, or AWS maintenance), all network connectivity between your on-premises environment and the VPC will be lost. Such outages can cause significant disruptions to applications that depend on this connection.

## Audit

This policy flags an *AWS VPC VPN Connection* as `INCOMPLIANT` if fewer than 2 related *AWS VPC VPN Gateway Telemetries* have a `Status` of **UP**.

A *VPN Connection* is marked as `INAPPLICABLE` if its `State` is not **available**.
