# Description

Ensure that the `AmazonEKS_CNI_Policy` IAM Policy is **not** attached to the EKS node's IAM role.

Instead, it is strongly recommended to configure a separate IAM role exclusively for the Amazon VPC CNI plugin. This avoids granting CNI pods broader permissions than necessary. When the policy is attached to the node IAM role, pods using the Amazon VPC CNI inherit those permissions, potentially exposing sensitive resources associated with the instance profile.

## Rationale

The Amazon VPC CNI plugin automatically creates and manages a service account named `aws-node`. By default, this service account is bound to the node IAM role, which often includes the `AmazonEKS_CNI_Policy`. This setup grants the plugin’s pods full access to all permissions attached to the node IAM role.

To follow the principle of least privilege, it is recommended to create a dedicated IAM role specifically for the `aws-node` service account and attach only the `AmazonEKS_CNI_Policy` to it using **IAM Roles for Service Accounts (IRSA)**.

## Impact

To apply the new IAM role and credential configuration, any existing pods associated with the `aws-node` service account must be deleted and recreated.

Note that annotation changes will not affect currently running pods unless they are restarted.

## Audit

An *AWS EKS Cluster* is marked as `INCOMPLIANT` if any related *EKS Cluster Node Group* has a Node IAM Role with **AmazonEKS_CNI_Policy** *IAM Role Policy Attachment* object.

The *EKS Cluster* is marked as `INAPPLICABLE` if it **does not have** an associated *AWS IAM OpenID Connect Provider*.
