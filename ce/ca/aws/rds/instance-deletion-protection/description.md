# Description

This policy identifies AWS RDS Instances that do not have deletion protection enabled. Deletion protection helps safeguard database instances from accidental or unintended deletion.

## Rationale

Accidental deletion of a database instance can result in permanent data loss and prolonged service downtime. Although Amazon RDS supports automated backups and snapshots, restoring a database from backups can be time-consuming and may negatively impact recovery time objectives (RTO).

Enabling deletion protection adds an additional layer of operational safety. When deletion protection is enabled, any attempt to delete the database instance is blocked. An administrator must first explicitly disable deletion protection before proceeding with the deletion. This two-step, intentional process helps prevent accidental deletions caused by human error or misconfigured automation.

## Audit

This policy flags an *AWS RDS Instance* as `INCOMPLIANT` if **Deletion Protection** is not set to **true**.

*RDS Instances* are marked as `INAPPLICABLE` if they meet any of the following conditions:

- Are part of a **DB Cluster**
- Are not in the **available** state
- Use **Amazon DocumentDB** or **Amazon Neptune** engine types
