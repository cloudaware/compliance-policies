# Description

This policy identifies Amazon EMR clusters that do not have logging enabled.
Ensure that all Amazon EMR cluster logs are archived and uploaded to Amazon S3 to support long-term retention, historical analysis, and operational troubleshooting.

## Rationale

Amazon EMR clusters are often ephemeral, created to perform specific workloads and terminated after completion. If logging is not enabled, all detailed records of cluster activity are lost upon termination. Logs are critical for diagnosing failures in Hadoop jobs, Spark applications, and cluster bootstrap or configuration processes. Centralizing EMR logs in Amazon S3 enables long-term retention, supports forensic analysis, and improves visibility into operational and security-related events across EMR workloads.

## Audit

This policy flags an *AWS EMR Cluster* as `INCOMPLIANT` if the `Log Url` field is **empty**, indicating that cluster logging is not configured.
