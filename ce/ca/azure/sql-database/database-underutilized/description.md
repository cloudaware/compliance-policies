# Description

This policy identifies Azure SQL Databases that appear to be underutilized. A database is considered underutilized if its performance and storage metrics remain below defined thresholds over the past 30 days. This enables organizations to pinpoint resources that may be over-provisioned relative to their actual workload.

The policy evaluates the following conditions:

- **DTU-based models**: Average DTU consumption is below 20% and maximum storage utilization is below 10%.
- **vCore-based models**: Average CPU utilization is below 20%, App Memory utilization is below 40% and maximum storage utilization is below 10%.

Databases may also be aggregated into Elastic Pools for collective management. **Underutilized Elastic Pools** are evaluated separately by a dedicated [policy](../elastic-pool-underutilized).

## Rationale

Provisioning databases with resources that significantly exceed workload requirements leads to unnecessary cloud costs. Identifying underutilized databases allows organizations to rightsize provisioned compute resources, update them to serverless compute model, or consolidate them into Elastic Pools, resulting in direct cost savings.

## Impact

While rightsizing can reduce costs, overly aggressive downsizing may introduce performance bottlenecks. Similarly, consolidating databases into Elastic Pools requires careful planning to ensure collective resource demand is aligned with pool capacity.

## Audit

This policy evaluates an *Azure SQL Database* based on its 30-day performance metrics.

The *Database* is marked as `INCOMPLIANT` if any of the following criteria are met:

- `Monitor: DTU Consumption Percent, 30-Day` < 20%.

    and `Monitor: Storage Percent, 30-Day` < 10%.

- `Monitor: CPU Percent, 30-Day` < 20%.

    and `Monitor: App Memory Percent, 30-Day` < 40%.

    and `Monitor: Storage Percent, 30-Day` < 10%.

- `Monitor: CPU Percent, 30-Day` < 20%.

    and `Monitor: Storage Percent, 30-Day` < 10%.

In case, `Monitor: DTU Consumption Percent, 30-Day` and `Monitor: App Memory Percent, 30-Day` are empty.

A *Database* is marked as `INAPPLICABLE` if it meets any of the following conditions:

- The database is not currently **Online**.
- It has been created or resumed from pause within the last 30 days.
- It is a **System** database.
- It is a **Serverless** database.
- It belongs to an **Elastic Pool** (underutilized Elastic Pools are evaluated by a separate [policy](../elastic-pool-underutilized)).

The *Database* is marked as `UNDETERMINED` if both `Monitor: CPU Percent, 30-Day` and `Monitor: Storage Percent, 30-Day` metrics are empty, indicating insufficient data in the CMDB to assess utilization.
