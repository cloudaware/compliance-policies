# Description

This policy identifies AWS EC2 Auto Scaling Groups (ASGs) that are not configured to launch instances across multiple Availability Zones (AZs).

## Rationale

Configuring an Auto Scaling Group to operate across multiple Availability Zones is a key best practice for ensuring high availability and fault tolerance. By distributing instances across multiple AZs, you minimize the risk of downtime caused by failures in a single zone, helping maintain application continuity during infrastructure disruptions.

## Impact

If an Auto Scaling Group is restricted to a single Availability Zone, any outage within that zone, such as power failures, network disruptions, or natural disasters, can render all instances in the group unavailable, leading to potential service interruptions.

When modifying the number of Availability Zones for an Auto Scaling Group, ensure that the associated load balancer is also updated to reflect the new zone configuration.

## Audit

This policy flags an *AWS EC2 Auto Scaling Group* as `INCOMPLIANT` if it is configured with fewer than **two** `Availability Zones`.
