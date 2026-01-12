# Description

This policy identifies unused AWS DynamoDB Tables to help reduce unnecessary costs in your AWS environment. A DynamoDB table is considered unused if it has remained in an `ACTIVE` state for more than 30 days and its `ItemCount` parameter, representing the number of items stored in the table, is `0` (zero).

## Rationale

Unused resources contribute to cloud waste and may incur avoidable costs, particularly when tables are provisioned with read and write capacity units or add unnecessary management overhead. Identifying and removing unused DynamoDB tables helps optimize costs and maintain a clean, well-managed infrastructure.

## Audit

This policy flags an *AWS DynamoDB Table* as `INCOMPLIANT` if the `Item Count` is `0`.

If the table is not in an **ACTIVE** state or was created less than 30 days ago, it is marked as `INAPPLICABLE`.
