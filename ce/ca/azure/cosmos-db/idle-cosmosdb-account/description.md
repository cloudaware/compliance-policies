# Description

This policy identifies Azure Cosmos DB accounts that have recorded zero Total Request Units (RU) over the past 30 days.

A Request Unit is a performance metric that abstracts system resource consumption (CPU, IOPS, memory, etc.) required for executing database operations within Azure Cosmos DB.

## Rationale

Monitoring Total Request Units is essential for detecting idle or underutilized Cosmos DB accounts. By identifying accounts with zero recent activity, you can assess their relevance and potential for deallocation, optimizing cloud resource management and cost efficiency.

You're billed on an hourly basis for the number of RUs per second provisioned.

## Impact

Idle Cosmos DB accounts incur ongoing charges for provisioned throughput, contributing to unnecessary cloud spend and resource waste.

## Audit

This policy flags an *Azure Cosmos DB Account* as `INCOMPLIANT` if the `Total Request Units Sum` for the past 30 days equals **0**.

A *Cosmos DB Account* will be marked as `INAPPLICABLE` if the account type is serverless, as determined by the `Capabilities` field with the value **EnableServerless**.
