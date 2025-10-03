# Description

This policy identifies AWS EC2 Elastic IP addresses that are allocated to your AWS account but are not currently associated with an EC2 instance or a network interface.

## Rationale

AWS charges for Elastic IP addresses that are not associated with a running EC2 instance. Regularly identifying and releasing unattached Elastic IPs helps reduce unnecessary costs.

## Impact

Maintaining unattached public IPs can also pose a security risk, as they could be inadvertently associated with resources that should not be exposed to the internet.

## Audit

This policy marks an *AWS EC2 Elastic IP* as `INCOMPLIANT` if its `Association ID` is **empty**, indicating that it is not currently attached to any resource.
