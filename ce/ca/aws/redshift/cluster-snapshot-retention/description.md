# Description

This policy identifies AWS Redshift Clusters that do not have automated snapshots enabled.

Amazon Redshift automatically takes snapshots of clusters based on the configured snapshot retention period, which defines the number of days automated snapshots are retained. When the retention period is set to **0**, automated snapshots are disabled. While manual snapshots can still be created in this configuration, automated snapshots provide a more reliable and consistent mechanism for data protection and recovery.

## Rationale

Automated snapshots provide a critical safety net for Amazon Redshift environments. Without automated snapshots, point-in-time recovery is not possible in the event of accidental data deletion, data corruption, malicious activity (such as ransomware), or infrastructure failures.

## Impact

Automated snapshots incur storage costs. Organizations should balance the snapshot retention period against storage expenses while ensuring adequate data protection and recoverability.

## Audit

This policy flags an *AWS Redshift Cluster* as `INCOMPLIANT` when the `Automated Snapshot Retention Period` is set to **0**.
