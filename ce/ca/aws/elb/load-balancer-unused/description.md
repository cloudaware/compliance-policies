# Description

This policy identifies AWS ELB Load Balancers that are considered unused. An ELB is flagged as unused if it meets either of the following criteria:

1. It has no listeners configured.
2. It has no registered targets.

## Rationale

Maintaining unused load balancers can lead to unnecessary costs. Regularly identifying and removing idle ELBs helps:

- Optimize costs by eliminating resources that incur charges without providing value.
- Simplify resource management and reduce operational complexity.
- Improve security posture by removing potentially misconfigured or forgotten endpoints.

## Impact

Unused load balancers incur hourly charges even when not actively routing traffic. While individual costs may be small, they can accumulate significantly across an organization. Additionally, idle load balancers can complicate network diagrams and asset inventories.

## Audit

This policy flags an *AWS ELB Load Balancer* as `INCOMPLIANT` if it has **no** related *AWS ELB Load Balancer Listeners* and *AWS ELB Load Balancer Targets*.
