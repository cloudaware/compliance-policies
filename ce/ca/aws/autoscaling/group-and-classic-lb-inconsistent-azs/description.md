# Description

Ensure that AWS Auto Scaling Groups (ASGs) and their associated Classic Load Balancers (CLBs) are configured to use the same Availability Zones (AZs). Aligning AZs between ASGs and CLBs helps to optimize network performance, allowing applications to fully utilize AWS’s low-latency links.

## Rationale

Aligning ASGs and CLBs within the same Availability Zones improves the efficiency and responsiveness of auto-scaling applications. When ASGs and CLBs share the same AZs, load balancers can route traffic within the same zone to instances as they scale, reducing latency, enhancing failover capabilities, and minimizing cross-AZ data transfer costs. This configuration also contributes to better application availability and consistent performance, particularly during high-demand periods or when recovering from failures.

## Audit

This policy will mark an *Auto Scaling Group* as `INCOMPLIANT` if its configured `Availability Zones` do not match `Availability Zones` of the associated *Classic Load Balancer* which is identifies via *AWS EC2 Auto Scaling Group Tfc.Src.Links* object.
