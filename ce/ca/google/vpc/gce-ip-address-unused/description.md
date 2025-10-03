# Description

This policy identifies Google Compute Engine (GCE) static external IP addresses that are reserved but not currently attached to any active resources, such as virtual machine instances or load balancer forwarding rules.

## Rationale

Unused static external IP addresses incur ongoing charges in Google Cloud when they remain reserved without being in use. Beyond cost implications, leaving unattached IPs allocated increases the risk of accidental or unauthorized assignment, which could expose services to the internet without appropriate security review. Regularly reviewing and cleaning up unused IP addresses helps optimize costs, strengthen network security, and reduce unnecessary resource clutter.

## Impact

Before removing an unused static IP address, confirm that it is not reserved for a planned deployment or for a temporarily inactive service.

## Audit

This policy marks a *Google GCE IP Address* as `INCOMPLIANT` if its `Status` is set to **RESERVED**, indicating that it is not currently attached to any resource.
