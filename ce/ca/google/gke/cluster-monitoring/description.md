# Description

This policy ensures that Cloud Monitoring is enabled for all Google Kubernetes Engine (GKE) clusters. Cloud Monitoring collects metrics, events, and metadata from your clusters, providing visibility into cluster performance, uptime, and overall health.

## Rationale

Enabling Cloud Monitoring allows you to track resource utilization, troubleshoot issues, and set up alerts for abnormal behavior. Without monitoring, you lack the necessary visibility to diagnose problems, optimize performance, or respond effectively to security incidents.

## Audit

This policy marks a *Google GKE Cluster* as `INCOMPLIANT` if `Monitoring Service` is **not** set to **monitoring.googleapis.com/kubernetes**.

## Default Value

Cloud Monitoring is enabled by default starting in GKE version 1.14;
Legacy Logging and Monitoring support is enabled by default for earlier versions.

## References

1. <https://cloud.google.com/stackdriver/docs/solutions/gke/observing>
2. <https://cloud.google.com/stackdriver/docs/solutions/gke/managing-logs>
3. <https://cloud.google.com/stackdriver/docs/solutions/gke/installing>
4. <https://cloud.google.com/sdk/gcloud/reference/container/clusters/update#--monitoring>
