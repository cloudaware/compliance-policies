# Description

Ensure that AWS EKS clusters have an associated OpenID Connect (OIDC) provider configured. The OIDC provider is required to enable IAM Roles for Service Accounts (IRSA) - a feature that allows assigning IAM roles directly to Kubernetes service accounts. When a pod is associated with such a service account, the Kubernetes API server uses the cluster’s public OIDC discovery endpoint to validate tokens and enable secure role assumption.

## Rationale

Configuring an IAM OIDC provider for an EKS cluster enables fine-grained, pod-level access control to AWS resources. This implementation supports the principle of least privilege, allowing each Kubernetes workload to assume only the permissions it requires.

Additionally, certain core components - such as the Amazon VPC CNI plugin - rely on IRSA to assume roles securely and avoid over-permissioning the node IAM role. Without an OIDC provider, these components fall back to using the EC2 instance profile, which can introduce security risks and complicate auditing.

## Audit

An *AWS EKS Cluster* is marked as `INCOMPLIANT` if:

- It **does not have** an associated *AWS IAM OpenID Connect Provider*, or
- The OIDC provider is deleted in the CMDB.
