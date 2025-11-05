# Description

This policy identifies Google Kubernetes Engine (GKE) clusters that are configured to use alpha features. Alpha clusters provide early access to experimental Kubernetes functionality prior to general availability.

## Rationale

Alpha clusters are intended solely for testing and experimentation. They enable all Kubernetes API features but come with significant limitations: they are excluded from the GKE service-level agreement (SLA), do not receive security patches, have node auto-upgrade and auto-repair disabled, and cannot be upgraded. Additionally, alpha clusters are automatically deleted after 30 days. As a result, they are not suitable for production workloads.

## Audit

This policy marks a *Google GKE Cluster* as `INCOMPLIANT` if `Kubernetes Alpha` is set to **ENABLED**.
