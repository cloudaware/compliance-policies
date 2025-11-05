# Description

This policy identifies Google GKE Clusters where Control Plane Authorized Networks are not enabled. Enabling this feature restricts access to the cluster’s control plane to a defined allowlist of trusted IP addresses.

## Rationale

Control Plane Authorized Networks improve cluster security by limiting which IP addresses can access the Kubernetes API server.

Key benefits include:

- Restricts external, non-GCP access to a specified set of IP addresses (e.g., corporate office ranges), reducing exposure in the event of a vulnerability in authentication or authorization mechanisms.
- Helps mitigate risks from leaked master certificates by ensuring they cannot be used from unauthorized IP ranges.
- Allows administrators to enforce strict access policies while still permitting trusted GCP traffic (e.g., Compute Engine VMs).

## Impact

When implementing Control Plane Authorized Networks, ensure all required networks are included in the allowlist, otherwise legitimate external access to the cluster’s control plane may be inadvertently blocked.

## Audit

This policy flags a *Google GKE Cluster* as `INCOMPLIANT` if `Master Authorized Networks` is **not** set to **Enabled**.

## Default Value

By default, Control Plane Authorized Networks is disabled.

## References

1. <https://cloud.google.com/kubernetes-engine/docs/how-to/authorized-networks>
2. <https://cloud.google.com/kubernetes-engine/docs/how-to/latest/network-isolation>
