# Description

This policy identifies AWS RDS Clusters that are not configured with encryption at rest. Amazon RDS uses AWS Key Management Service (KMS) to manage encryption keys. When encryption at rest is enabled, it protects the underlying storage for DB clusters, as well as automated backups, read replicas, and snapshots.

## Rationale

Since databases often contain sensitive and business-critical information, enabling encryption at rest is strongly recommended to safeguard data against unauthorized access or disclosure. When RDS encryption is enabled, all associated data, including the cluster storage, automated backups, read replicas, and snapshots, is securely encrypted.

## Audit

This policy flags an *AWS RDS Cluster* as `INCOMPLIANT` if the `Storage Encrypted` checkbox is not set to **true**.  
