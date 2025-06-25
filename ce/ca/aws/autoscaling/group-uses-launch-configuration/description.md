# Description

This policy checks whether an AWS EC2 Auto Scaling Group is configured to use **no longer supported** Launch Configurations. AWS does not release new EC2 features to Launch Configurations and strongly recommends migrating to Launch Templates.

Launch Templates are a newer mechanism for EC2 instance provisioning, providing support for all current and future EC2 features, as well as integrated version control and heterogeneous instance type support.

## Rationale

AWS is phasing out support for Launch Configurations. They no longer receive updates for new EC2 instance types or platform enhancements. Using Launch Templates provides several key benefits:

- Launch Templates unlock new EC2 capabilities, including: Systems Manager parameters, the current generation of EBS Provisioned IOPS volumes (io2), EBS volume tagging, T2 Unlimited instances, Capacity Reservations, Capacity Blocks, Dedicated Hosts, etc.
- Version management, which simplifies testing of new configurations and rollbacks to previous versions.
- Launch Templates allow you to provision both On-Demand and Spot Instances within the same Auto Scaling group and define multiple instance types.

## Audit

This policy flags an *AWS EC2 Auto Scaling Group* as `INCOMPLIANT` if the `Launch Configuration Name` field is **not empty**, indicating that the ASG uses a launch configuration instead of a launch template.
