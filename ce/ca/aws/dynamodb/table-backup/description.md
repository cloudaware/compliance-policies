# Description

This policy identifies AWS DynamoDB Tables that are not protected by **AWS Backup recovery points** or **on-demand backups** when **Point-in-Time Recovery (PITR)** is not enabled.

On-demand backup coverage may be provided through one of the following mechanisms:

1. **On-Demand Backups**: Backups created manually using the DynamoDB console or API.
2. **AWS Backup Recovery Points**: Backups managed centrally through AWS Backup plans.

## Rationale

Although PITR is recommended for most production workloads, certain environments rely on discrete backups to support long-term data retention, archival requirements, or cost optimization strategies.

If PITR is disabled and recent backups are not available, accidental deletion, data corruption, or misconfiguration may result in permanent data loss. On-demand backups and AWS Backup recovery points provide an alternative protection mechanism, enabling snapshot retention beyond the 35-day PITR window and supporting compliance and audit requirements.

## Impact

Failure to maintain recent backups significantly increases the risk of irreversible data loss due to system failures or human error.

Maintaining on-demand backups or AWS Backup recovery points incurs additional charges based on the total size of the DynamoDB table, including table data and any associated local secondary indexes.

## Audit

This policy flags an *AWS DynamoDB Table* as `INCOMPLIANT` if `Point In Time Recovery` is disabled and no related *AWS DynamoDB Backup* or *AWS Backup Recovery Point* has been created within the past **90 days**.

*DynamoDB Tables* with a recent *AWS DynamoDB Backup* or *AWS Backup Recovery Point* are marked as `COMPLIANT`.

*DynamoDB Tables* with `Point In Time Recovery Status` set to **ENABLED** and no recent discrete backup are marked as `INAPPLICABLE`.

If a *DynamoDB Table* is not in an **ACTIVE** state, it is marked as `INAPPLICABLE`.
