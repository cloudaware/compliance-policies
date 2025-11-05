# Description

This policy identifies Google GKE clusters whose associated subnetwork is not configured with Private Google Access.

Private Google Access enables cluster nodes within a subnet to reach Google APIs and services using only internal IP addresses. This removes the requirement for nodes to have external IP addresses when performing tasks such as pulling container images from Artifact Registry or Container Registry (gcr.io), or interacting with other Google Cloud services.

## Rationale

Enabling Private Google Access enhances the security posture of a GKE cluster by allowing nodes to operate without exposure to the public internet. Keeping traffic within Google’s network reduces the risk of unauthorized access and data exfiltration.

## Audit

This policy marks a *Google GKE Cluster* as `INCOMPLIANT` if its associated *GCE Subnetwork* does not have `Private Google Access` **Enabled**.
