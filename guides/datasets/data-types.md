# Data Types

This document outlines the specialized data types that provide a conceptual layer on top of the standard BigQuery types used in Cloudaware's datasets. While all CMDB data is stored using native BigQuery types like `STRING`, `TIMESTAMP`, and `NUMERIC`, Cloudaware interprets this information using a more specific type system. For example, a column stored as a `STRING` in a BigQuery table is often treated as a "Salesforce ID" within the Cloudaware platform, indicating its role as a unique record identifier. Understanding these conceptual types is essential for correctly interpreting CMDB data and building effective custom queries.

## Type API Name

The **Type API Name** is the unique identifier for an object type within the Cloudaware CMDB. These names follow Salesforce's API naming conventions.

- **Naming Scheme**:
  - Cloudaware objects use a namespace, typically `CA10__`, followed by the object name and `__c`. For example: `CA10__CaAwsInstance__c`.
  - Custom objects created within a customer's organization will have a similar structure but may use a different namespace or none at all.
- **Usage**: This name is used to specify the exact object type being queried or referenced, for instance, in the table names within the `sobjects` dataset or in API calls.

For more details on how object types are structured, refer to the [`sobjects` dataset documentation](sobjects/index.md#type-tables).

**Type API Name** is also used in Compliance Engine's [Type ID](../developer/index.md#type).

## Field API Name

The **Field API Name** is the unique identifier for a specific field within a given object type. Like Type API Names, these also follow Salesforce conventions.

- **Example**: `CA10__stateName__c` on the `CA10__CaAwsInstance__c` object.
- **Usage**: Field API Names are used to reference specific attributes of an object, such as when querying data. They correspond directly to column names in the BigQuery `sobjects` tables.

You can find available fields for any given [type](../developer/index.md#type) by exploring the generated documentation in the `/types` directory.

## Salesforce ID

A **Salesforce ID** is a unique 18-character, case-insensitive identifier automatically assigned to every record in the Cloudaware CMDB. It functions as the primary key for each object.

- **Example**: `00190000000vpc1AAR`
- **Usage**: This ID is the primary key for all records and is used to uniquely identify individual resources and establish relationships between them across all Cloudaware datasets. For example, it is used in the `object.id` and `object.master.id` fields within the [`ce.PolicyOutput` table](ce/PolicyOutput.md) to link compliance findings back to specific CMDB records.

See the [Object Relationships guide](../developer/object-relationships/index.md) for more context on how Salesforce IDs are used.

## External ID

An **External ID** is the native identifier of a resource as it exists in the source cloud provider (e.g., AWS, Azure, GCP). This is often a more human-readable ID than the internal Salesforce ID.

- **Example**: An AWS EC2 instance ID like `i-0123456789abcdef0` or a VPC ID `vpc-01234567`.
- **Usage**: It provides a direct, human-readable reference to the resource in its native environment, making it useful for cross-referencing CMDB data with the source cloud console. This ID is present in various datasets, including in fields like `object.externalId` in the [`ce.PolicyOutput` table](ce/PolicyOutput.md).

## Policy ID

The **Policy ID** is the unique identifier for a compliance policy within the repository. It is derived from the policy's absolute file path. This type is specific to the Compliance Engine.

- **Structure**: The ID is the full path to the directory containing the `policy.yaml` file.
- **Example**: `/ce/ca/aws/ec2/instance-detailed-monitoring`
- **Usage**: This ID is used to link policy evaluation results in the [`PolicyOutput` table](ce/PolicyOutput.md) back to the specific policy definition in the repository.

For more information, see the [Policy Structure documentation](../developer/index.md#policy).

## Compliance Status

The **Compliance Status** is the result of a policy evaluation for a single resource. It indicates whether the resource adheres to a rule defined in the Compliance Engine. The possible statuses are:

- `COMPLIANT`: The resource adheres to the policy's requirements.
- `INCOMPLIANT`: The resource violates the policy's requirements.
- `INAPPLICABLE`: The policy does not apply to this specific resource.
- `UNDETERMINED`: The compliance status could not be determined due to missing data or other issues.
- `DISAPPEARED`: The resource has been deleted from the source cloud provider but still exists in the CMDB.

These statuses are defined in the [policy logic documentation](../developer/index.md#conditions).

## Multiline Text

**Multiline Text** is a string data type used for fields that contain formatted, human-readable text which may include line breaks.

- **Usage**: This format is used for fields that store descriptive, human-readable content which may include line breaks. An example can be found in the `objectDetails` field in the `ce.PolicyOutput` table, where it is used to provide a summary of a resource's attributes.
