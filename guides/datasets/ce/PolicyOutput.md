# `PolicyOutput` Table

This table stores the results of policy evaluations performed by the Compliance Engine. It provides a comprehensive record of compliance statuses for various cloud resources across different cloud providers.

Rows are immutable and uniquely identified by 3 fields: `policyId`, `runTime` and `objectId`. `policyId` and `runTime` will match the corresponding columns in [`PolicyRun`](PolicyRun.md) and [`PolicyRunJob`](PolicyRunJob.md) tables.

## Fields

| Field                                          | BQ Type          | CA Type                                                      | Description                                                                                                                                        |
|------------------------------------------------|------------------|--------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| `policyId`                                     | STRING           | [Policy&nbsp;ID](../data-types.md#policy-id)                 | ID of the policy                                                                                                                                   |
| `runTime`                                      | TIMESTAMP        |                                                              | The date and time the policy was evaluated.                                                                                                        |
| `objectId`                                     | STRING           | [Salesforce&nbsp;ID](../data-types.md#salesforce-id)         | ID of the cloud resource that was evaluated by the policy.                                                                                         |
| `masterId`                                     | STRING           | [Salesforce&nbsp;ID](../data-types.md#salesforce-id)         | ID of the master object associated with the cloud resource. This is often the account or project the resource belongs to.                          |
| `externalId`                                   | STRING           | [External&nbsp;ID](../data-types.md#external-id)             | An external identifier for the resource, if available.                                                                                             |
| `status`                                       | STRING           | [Compliance&nbsp;Status](../data-types.md#compliance-status) | The compliance status of the policy                                                                                                                |
| `statusDate`                                   | TIMESTAMP        |                                                              | The date and time the compliance status was last changed.                                                                                          |
| `incompliantStartDate`                         | TIMESTAMP        |                                                              | The date and time the resource first became non-compliant. Present if the object ever been in `INCOMPLIANT` status, otherwise `NULL`               |
| `incompliantEndDate`                           | TIMESTAMP        |                                                              | The date and time the resource changed status from `INCOMPLIANT` to any other status, `NULL` if never entered `IMCOMPLIANT` or still `INCOMPLIANT` |
| `objectDetails`                                | STRING           | [Multiline&nbsp;Text](../data-types.md#multiline-text)       | Human-readable text containing the object's core attributes, e.g. name, region, identifiers, etc.                                                  |
| `currentStateMessage`                          | STRING           |                                                              | A message describing the current state of the resource with respect to the policy.                                                                 |
| `currentStateReferences`                       | STRING           | [Multiline&nbsp;Text](../data-types.md#multiline-text)       | References to specific properties of the resource that were used by the policy logic to determine the state.                                       |
| `remediationMessage`                           | STRING           |                                                              | A message providing guidance on how to remediate the non-compliance.                                                                               |
| `conditionIndex`                               | NUMERIC          |                                                              | The index of the condition in the policy logic that determined the compliance status.                                                              |
| `conditionText`                                | STRING           |                                                              | The pseudo-code of the condition in the policy logic that determined the compliance status.                                                        |
| `object`                                       | RECORD           |                                                              | A nested record containing more information about the cloud resource, including its type, details, and master object.                              |
| `object.typeName`                              | STRING           |                                                              | The type of the cloud resource (e.g., "Google BigQuery Table", "AWS EC2 Instance").                                                                |
| `object.typeApiName`                           | STRING           | [Type&nbsp;API&nbsp;Name](../data-types.md#type-api-name)    | The API name of the cloud resource type                                                                                                            |
| `object.id`                                    | STRING           | [Salesforce&nbsp;ID](../data-types.md#salesforce-id)         | Same as `objectId`                                                                                                                                 |
| `object.externalId`                            | STRING           | [External&nbsp;ID](../data-types.md#external-id)             | Same as `externalId`                                                                                                                               |
| `object.details`                               | RECORD, REPEATED |                                                              | A list of records containing the object's core attributes.                                                                                         |
| `object.details[].fieldName`                   | STRING           |                                                              | The display name of the field.                                                                                                                     |
| `object.details[].fieldApiName`                | STRING           | [Field&nbsp;API&nbsp;Name](../data-types.md#field-api-name)  | The API name of the field.                                                                                                                         |
| `object.details[].value`                       | STRING           |                                                              | The value of the field.                                                                                                                            |
| `object.master`                                | RECORD           |                                                              | A record containing information about the master object associated with the cloud resource.                                                        |
| `object.master.typeName`                       | STRING           |                                                              | The type of the master object (e.g., "Google Project", "AWS Account").                                                                             |
| `object.master.typeApiName`                    | STRING           | [Type&nbsp;API&nbsp;Name](../data-types.md#type-api-name)    | The API name of the master object type                                                                                                             |
| `object.master.id`                             | STRING           | [Salesforce&nbsp;ID](../data-types.md#salesforce-id)         | Same as `masterId`                                                                                                                                 |
| `object.master.externalId`                     | STRING           | [External&nbsp;ID](../data-types.md#external-id)             | An external identifier for the master object, if available.                                                                                        |
| `object.master.name`                           | STRING           |                                                              | The name of the master object.                                                                                                                     |
| `object.application`                           | RECORD           |                                                              | Information about the application () and tier associated with the cloud resource.                                                                  |
| `object.application.applicationUniqueName`     | STRING           |                                                              | The unique name (`CA10__CaApplication__c`: `CA10__uniqueName__c`) of the application                                                               |
| `object.application.applicationId`             | STRING           | [Salesforce&nbsp;ID](../data-types.md#salesforce-id)         | ID of the related application                                                                                                                      |
| `object.application.applicationTierUniqueName` | STRING           |                                                              | The unique name (`CA10__CaApplicationTier__c`: `CA10__uniqueName__c`) of the application tier                                                      |
| `object.application.applicationTierId`         | STRING           | [Salesforce&nbsp;ID](../data-types.md#salesforce-id)         | ID of thr related application tier                                                                                                                 |

## Data Source

This table is populated by the Compliance Engine's policy evaluation process.

## Purpose

This table is used to:

- Track compliance status of cloud resources.
- Identify non-compliant resources.
- Provide remediation guidance.
- Analyze compliance trends.
- Generate compliance reports.

## Notes

- The `objectDetails` field contains a JSON string that can be parsed to extract specific properties of the cloud resource.
- The `currentStateReferences` field provides references to specific properties or settings of the resource that are relevant to the policy.
- The `remediationMessage` field provides guidance on how to remediate the non-compliance.
