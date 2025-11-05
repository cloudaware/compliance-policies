# Description

This policy identifies Google GKE Cluster Node Pools that are configured to use the default Compute Engine service account instead of dedicated, least-privilege IAM service accounts.

## Rationale

By default, GKE nodes use the Compute Engine default service account, which has broad permissions that often exceed the requirements of a GKE cluster.

To follow the principle of least privilege, a dedicated service account should be created and used to run the GKE cluster. In addition, separate service accounts should be created for individual Kubernetes workloads as needed.

At a minimum, the node service account requires the following roles:

- `monitoring.viewer`
- `monitoring.metricWriter`
- `logging.logWriter`

Additional roles may be required for specific use cases, such as pulling images from Google Container Registry (GCR).

## Impact

Instances using the default service account are automatically granted the <https://www.googleapis.com/auth/cloud-platform>, which allows unrestricted access to all Google Cloud APIs.This means that IAM permissions are determined entirely by the roles assigned to the service account.

As a result, Kubernetes workloads relying on access scopes for API calls may lose functionality if the required permissions are not explicitly granted to the new service account.

## Audit

This policy flags a *Google GKE Cluster Node Pool* as `INCOMPLIANT` if `Node Config: Service Account` is set to **default**

## Default Value

By default, nodes use the Compute Engine default service account when you create a
new cluster.

## References

1. <https://cloud.google.com/compute/docs/access/serviceaccounts#compute_engine_default_service_account>
