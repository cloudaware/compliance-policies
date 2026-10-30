# Description

This policy identifies AWS DynamoDB Tables that are not protected by **Point-in-Time Recovery (PITR)**.

Point-in-Time Recovery is a fully managed, continuous backup feature that captures all changes to table data, enabling recovery to any second within the preceding 35-day retention window. PITR protects against accidental writes, deletions, and data corruption by allowing precise, time-based restoration.

## Rationale

Enabling PITR provides an automated and resilient data protection mechanism without requiring manual backup workflows or third-party solutions. This capability improves data durability and reduces the Recovery Time Objective (RTO) in the event of data loss, operational errors, or unintended changes.

## Impact

Enabling PITR incurs additional charges based on the total size of the DynamoDB table, including table data and any associated local secondary indexes.

## Audit

This policy flags an *AWS DynamoDB Table* as `INCOMPLIANT` if the `Point-in-Time Recovery Status` is set to **DISABLED** and no recent on-demand backup or AWS Backup recovery point exists.

*DynamoDB Tables* with `Point-in-Time Recovery Status` set to **DISABLED** and a recent *AWS DynamoDB Backup* or *AWS Backup Recovery Point* are marked as `INAPPLICABLE`.

If a *DynamoDB Table* is not in an **ACTIVE** state, it is marked as `INAPPLICABLE`.
