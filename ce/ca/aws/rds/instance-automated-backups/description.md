# Description

Ensure that Amazon Relational Database Service (RDS) instances have automated backups enabled.

Automated backups allow you to recover your database to any point in time within your specified retention period (up to 35 days). When automated backups are enabled, RDS automatically performs a full daily snapshot of your data (during your preferred backup window) and captures transaction logs (as updates to your DB instance are made).

## Rationale

Disabling automated backups eliminates the ability to perform point-in-time recovery. In the event of data corruption, accidental deletion, or hardware failure, you may lose critical data if recent backups are not available.

## Audit

This policy flags an *AWS RDS Instance* as `INCOMPLIANT` if the `Backup Retention Period` is set to **0**.
