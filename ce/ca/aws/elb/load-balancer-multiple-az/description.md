# Description

This policy identifies AWS ELB Load Balancers (Classic, Application, Network, Gateway) that are not configured to distribute traffic across multiple Availability Zones.

## Rationale

Configuring a load balancer to span multiple Availability Zones enhances availability and fault tolerance. When a load balancer node is deployed in only one Availability Zone, it becomes a single point of failure. If that AZ experiences an outage, both the load balancer node and the associated application may become unavailable.

## Impact

A load balancer restricted to a single Availability Zone poses a significant risk of service interruption. Any outage in that zone can result in complete application downtime, potentially affecting user experience and business continuity.

## Audit

This policy flags an *AWS ELB Load Balancer* as `INCOMPLIANT` if its `Availability Zones` field includes only one AZ.
