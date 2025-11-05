# Description

This policy identifies that Cloud Logging is enabled for all Google GKE Clusters.

## Rationale

Enabling logging for GKE clusters provides detailed insights into the behavior of the control plane, nodes, and running applications. These logs are essential for troubleshooting issues, monitoring performance, and detecting security incidents.

By default, GKE collects **Audit logs**, **System logs**, and **Application logs**.

## Impact

GKE logs are exported to Cloud Logging. Enabling logging may incur additional costs associated with Cloud Logging usage.

## Audit

This policy marks a *Google GKE Cluster* as `INCOMPLIANT` if `Logging Service` is **not** set to **logging.googleapis.com/kubernetes**.

## Default Value

Logging is enabled by default starting in GKE version 1.14.

Legacy Logging and Monitoring support is enabled by default for earlier versions.

## References

1. <https://cloud.google.com/stackdriver/docs/solutions/gke/observing>
2. <https://cloud.google.com/stackdriver/docs/solutions/gke/managing-logs>
3. <https://cloud.google.com/stackdriver/docs/solutions/gke/installing>
4. <https://cloud.google.com/sdk/gcloud/reference/container/clusters/update#--logging>
