# Description

This policy identifies AWS ELB Load Balancers (Classic, Application, Network, and Gateway) that are not configured to use cross-zone load balancing. Cross-zone load balancing helps distribute traffic evenly across all registered instances in all enabled Availability Zones, reducing the need to maintain an equal number of instances per zone and improving application resilience.

## Rationale

Enabling cross-zone load balancing allows the load balancer to route requests evenly across all available instances, regardless of the Availability Zone where the request originated. Without this feature, traffic is distributed only among instances in the same Availability Zone as the request, which can lead to uneven load distribution if instances are not balanced across zones or if traffic patterns vary.

## Impact

If cross-zone load balancing is disabled, the application becomes more susceptible to performance degradation and service disruptions. An outage or heavy traffic in one Availability Zone could overload its instances while leaving instances in other zones underutilized, resulting in poor performance, reduced fault tolerance, or complete service unavailability.

## Audit

This policy flags an *AWS ELB Load Balancer* as `INCOMPLIANT` under the following conditions:

- **Classic Load Balancers:** The `Cross-Zone Load Balancing` checkbox is set to **false**.
- **Network and Gateway Load Balancers:** The `Additional Attributes` include **load_balancing.cross_zone.enabled: false**.
- **Application Load Balancers:** Cross-zone load balancing is always enabled at the load balancer level. This policy checks the related *AWS ELB Load Balancer Target Groups* for the `Attribute` **load_balancing.cross_zone.enabled: false**.
