# Description

Ensure that Point-in-Time Recovery (PITR) is enabled for all Amazon DynamoDB tables. PITR is a fully managed, continuous backup feature that automatically records all changes to table data, allowing recovery to any second within the preceding 35-day retention window. It protects against accidental writes, deletes, and corruption by enabling precise, time-based data restoration.

## Rationale

Enabling PITR provides an automated and resilient data protection mechanism without requiring manual backup workflows or third-party solutions.This enhances data durability and minimizes the Recovery Time Objective (RTO) in the event of data loss or operational errors.

## Impact

Enabling PITR incurs additional charges based on the total size of the DynamoDB table, including table data and any associated local secondary indexes.

## Audit

This policy marks an *AWS DynamoDB Table* as `INCOMPLIANT` if `Point In Time Recovery Status` is set to **DISABLED**.

If the *DynamoDB Table* is not **ACTIVE**, it is marked as `INAPPLICABLE`.
