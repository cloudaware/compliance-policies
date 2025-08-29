# `PolicyRunJob` Table

This table stores information about the BigQuery jobs that are executed as part of the policy evaluation process. It includes details such as the policy ID, run time, job ID, bytes processed, bytes billed, script creation/start/end times, job status, and the policy YAML and SQL.

## Fields

| Field                 | BQ Type   | CA Type                                      | Description                                               |
|-----------------------|-----------|----------------------------------------------|-----------------------------------------------------------|
| `policyId`            | STRING    | [Policy&nbsp;ID](../data-types.md#policy-id) | The unique identifier of the policy.                      |
| `runTime`             | TIMESTAMP |                                              | The date and time the policy run was executed.            |
| `jobId`               | STRING    |                                              | The unique identifier of the BigQuery job.                |
| `totalBytesProcessed` | INTEGER   |                                              | The total number of bytes processed by the BigQuery job.  |
| `totalBytesBilled`    | INTEGER   |                                              | The total number of bytes billed for the BigQuery job.    |
| `scriptCreationTime`  | TIMESTAMP |                                              | The date and time the BigQuery script was created.        |
| `scriptStartTime`     | TIMESTAMP |                                              | The date and time the BigQuery script started executing.  |
| `scriptEndTime`       | TIMESTAMP |                                              | The date and time the BigQuery script finished executing. |
| `jobStatus`           | STRING    |                                              | The status of the BigQuery job (e.g., "DONE").            |
| `policyYaml`          | STRING    |                                              | The YAML definition of the policy.                        |
| `policySql`           | STRING    |                                              | The SQL code that was executed to evaluate the policy.    |


## Data Source

This table is populated by the Compliance Engine's policy evaluation process.

## Purpose

This table is used to:

- Track the execution of BigQuery jobs for policy evaluations.
- Monitor the performance and cost of policy evaluations.
- Troubleshoot issues with policy evaluations.
- Analyze the SQL and YAML code associated with policies.

## Notes

- The `policySql` and `policyYaml` fields provide valuable information for understanding and debugging policy logic.
- The `totalBytesProcessed` and `totalBytesBilled` fields can be used to optimize policy performance and reduce BigQuery costs.