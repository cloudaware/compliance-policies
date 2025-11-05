# Description

This policy identifies Google GKE Clusters where Alias IP ranges are disabled. Enabling Alias IPs makes the cluster VPC-native, meaning Pod IP addresses are allocated from a CIDR range within the VPC network and are natively routable.

## Rationale

Enabling Alias IPs provides several key benefits:

- Pod IPs are reserved within the VPC network in advance, avoiding conflicts with other compute resources.
- The networking layer can perform anti-spoofing checks to ensure that egress traffic is not sent with arbitrary source IPs.
- Firewall rules for Pods can be managed independently of their nodes.
- Alias IPs allow Pods to access hosted services directly without requiring a NAT gateway.

## Impact

Existing clusters that use routes for Pod networking cannot be migrated to use Alias IPs.

Cluster IPs for internal services remain accessible only within the cluster. To access a Kubernetes Service from the VPC but outside the cluster, an internal load balancer must be used.

## Audit

This policy flags a *Google GKE Cluster* as `INCOMPLIANT` if `Use IP Aliases` is **not** set to **Enabled**.

## Default Value

By default, VPC-native (Alias IP) is enabled when creating a new cluster. The exception applies to clusters created before GKE version **1.21.0-gke.1500** (September 2021) using the `gcloud` CLI without the `--enable-ip-alias` flag.

## References

1. <https://cloud.google.com/kubernetes-engine/docs/how-to/alias-ips>
2. <https://cloud.google.com/kubernetes-engine/docs/concepts/alias-ips>
