# Description

This policy identifies AWS RDS cluster and database Snapshots that are not encrypted.

## Rationale

RDS snapshots contain full backups of databases, including potentially sensitive data. If an unencrypted snapshot is inadvertently shared or if its underlying storage is compromised, the data may be exposed to unauthorized access. Enforcing encryption helps ensure that backup data remains protected, maintaining the confidentiality and integrity of stored information.

## Audit

This policy marks an *AWS RDS Snapshot* as `INCOMPLIANT` if the snapshot's `Encrypted` checkbox is set to **false**.

The *Snapshot* is marked as INAPPLICABLE if its `Status` is not **available**.
