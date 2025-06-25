# Description

Ensure the AWS EKS Kubernetes API server endpoint is not exposed to unrestricted public access. This endpoint provides the interface to your cluster’s control plane; permitting open access allows any IP to initiate connections.

## Rational

Unrestricted public access expands your cluster’s attack surface. Threat actors could probe the API server for vulnerabilities, enumerate resources, or launch denial-of-service attacks.By limiting access to authorized CIDR ranges (e.g., corporate networks, VPN gateways, or designated CI/CD environments) you enforce the principle of least privilege and reduce the risk of unauthorized access and workloads compromise.

## Impact

When specifying approved CIDR blocks, include all addresses from which your worker nodes and (if applicable) Fargate pods will access the public endpoint. Omitting any required range may prevent legitimate cluster operations.

## Audit

This policy marks an *AWS EKS Cluster* as `INCOMPLIANT` when `Endpoint Public Access` is set to **Enabled** and `Public Access CIDRs` include **0.0.0.0/0**

A Cluster is marked as `INAPPLICABLE` if `Endpoint Public Access` is set to **Disabled**.
