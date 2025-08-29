# `PolicyRun` Table

This table stores metadata about policy runs, including the policy ID, name, description, run time, snapshot time, object type, and statistics about the run.

## Fields

| Field                | BQ Type   | CA Type                                                   | Description                                                                                            |
|:---------------------|:----------|:----------------------------------------------------------|:-------------------------------------------------------------------------------------------------------|
| `policyId`           | STRING    | [Policy&nbsp;ID](../data-types.md#policy-id)              | The unique identifier of the policy                                                                    |
| `policyName`         | STRING    |                                                           | The display name of the policy                                                                         |
| `policyDescription`  | STRING    |                                                           | A brief description of the policy                                                                      |
| `runTime`            | TIMESTAMP |                                                           | The date and time the policy run was executed                                                          |
| `snapshotTime`       | TIMESTAMP |                                                           | The date and time the snapshot was taken for the policy run                                            |
| `objectType`         | STRING    | [Type&nbsp;API&nbsp;Name](../data-types.md#type-api-name) | The type of cloud resource the policy is evaluating                                                    |
| `masterType`         |           | [Type&nbsp;API&nbsp;Name](../data-types.md#type-api-name) | The type of the master object associated with the cloud resource.                                      |
| `completed`          | BOOLEAN   |                                                           | Indicates whether the policy run was completed successfully.                                           |
| `stats`              | RECORD    |                                                           | A nested record containing statistics about the policy run.                                            |
| `stats.disappeared`  | INTEGER   |                                                           | The number of resources that were no longer present in the cloud environment during the policy run.    |
| `stats.compliant`    | INTEGER   |                                                           | The number of resources that were compliant with the policy during the policy run.                     |
| `stats.incompliant`  | INTEGER   |                                                           | The number of resources that were non-compliant with the policy during the policy run.                 |
| `stats.inapplicable` | INTEGER   |                                                           | The number of resources that were not applicable to the policy during the policy run.                  |
| `stats.undetermined` | INTEGER   |                                                           | The number of resources for which the compliance status could not be determined during the policy run. |

## Data Source

This table is populated by the Compliance Engine's policy evaluation process.

## Purpose

This table is used to:

- Track policy execution history.
- Analyze compliance trends over time.
- Identify policies that are consistently failing or producing errors.
- Monitor the overall health of the compliance engine.

## Notes

- The `stats` field provides valuable insights into the performance and effectiveness of individual policies.
- The `snapshotTime` field indicates the point in time the data was collected for the policy run.