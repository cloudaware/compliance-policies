---
title: Operations
---

# Operations

| Operation Name                                        | Return Type(s)                |
|-------------------------------------------------------|-------------------------------|
| Data Access                                           |                               |
| [`FIELD`](#field)                                     | Text, Bytes, Number, DateTime |
| [`EXTRACT`](#extract)                                 | Any                           |
| Lookup Validation                                     |                               |
| [`IS_EMPTY_LOOKUP`](#is_empty_lookup)                 | Boolean                       |
| [`NOT_EMPTY_LOOKUP`](#not_empty_lookup)               | Boolean                       |
| Constants                                             |                               |
| [`TEXT`](#text)                                       | Text                          |
| [`BYTES`](#bytes)                                     | Bytes                         |
| [`BOOLEAN`](#boolean)                                 | Boolean                       |
| [`NUMBER`](#number)                                   | Number                        |
| [`COLLECTION`](#collection)                           | Collection                    |
| Type Conversions                                      |                               |
| [`BOOLEAN_FROM`](#boolean_from)                       | Boolean                       |
| [`DATE_TIME_FROM`](#date_time_from)                   | DateTime                      |
| [`DURATION_FROM`](#duration_from)                     | Duration                      |
| [`COLLECTION_FROM`](#collection_from)                 | Collection                    |
| [`JSON_FROM`](#json_from)                             | Json                          |
| Simple Comparison                                     |                               |
| [`IS_EMPTY`](#is_empty)                               | Boolean                       |
| [`NOT_EMPTY`](#not_empty)                             | Boolean                       |
| [`IS_EQUAL`](#is_equal)                               | Boolean                       |
| [`NOT_EQUAL`](#not_equal)                             | Boolean                       |
| Logic                                                 |                               |
| [`AND`](#and)                                         | Boolean                       |
| [`OR`](#or)                                           | Boolean                       |
| [`NOT`](#not)                                         | Boolean                       |
| Text Comparison                                       |                               |
| [`CONTAINS`](#contains)                               | Boolean                       |
| [`ENDS_WITH`](#ends_with)                             | Boolean                       |
| [`STARTS_WITH`](#starts_with)                         | Boolean                       |
| Numerical Comparison                                  |                               |
| [`GREATER_THAN`](#greater_than)                       | Boolean                       |
| [`GREATER_THAN_EQUAL`](#greater_than_equal)           | Boolean                       |
| [`LESS_THAN`](#less_than)                             | Boolean                       |
| [`LESS_THAN_EQUAL`](#less_than_equal)                 | Boolean                       |
| Date & Time                                           |                               |
| [`IS_AFTER_TODAY`](#is_after_today)                   | Boolean                       |
| [`IS_BEFORE_TODAY`](#is_before_today)                 | Boolean                       |
| [`IS_BEYOND_LAST_DAYS`](#is_beyond_last_days)         | Boolean                       |
| [`IS_BEYOND_NEXT_DAYS`](#is_beyond_next_days)         | Boolean                       |
| [`IS_WITHIN_LAST_DAYS`](#is_within_last_days)         | Boolean                       |
| [`IS_WITHIN_NEXT_DAYS`](#is_within_next_days)         | Boolean                       |
| Collection                                            |                               |
| [`COLLECTION_SIZE`](#collection_size)                 | Number                        |
| [`COLLECTION_CONTAINS`](#collection_contains)         | Boolean                       |
| JSON                                                  |                               |
| [`JSON_QUERY_TEXT`](#json_query_text)                 | Text                          |
| [`JSON_QUERY_BYTES`](#json_query_bytes)               | Bytes                         |
| [`JSON_QUERY_BOOLEAN`](#json_query_boolean)           | Boolean                       |
| [`JSON_QUERY_NUMBER`](#json_query_number)             | Number                        |
| Related List                                          |                               |
| [`RELATED_LIST_HAS`](#related_list_has)               | Boolean                       |
| [`RELATED_LIST_HAS_NO`](#related_list_has_no)         | Boolean                       |
| [`RELATED_LIST_COUNT`](#related_list_count)           | Number                        |
| Special                                               |                               |
| [`AWS_POLICY_ALLOWS`](#aws_policy_allows)             | Boolean                       |
| [`GCP_LOGGING_QUERY_MATCH`](#gcp_logging_query_match) | Boolean                       |
| [`IS_DISAPPEARED`](#is_disappeared)                   | Boolean                       |
| Development                                           |                               |
| [`DEBUG`](#debug)                                     | Any                           |
| [`UNIT_TEST`](#unit_test)                             | Boolean                       |
| [`UNIT_TEST_DATE_TIME`](#unit_test_date_time)         | DateTime                      |
| [`UNIT_TEST_NULL`](#unit_test_null)                   | Any                           |
| [`UNIT_TEST_RUNTIME_ERROR`](#unit_test_runtime_error) | Any                           |

## Type System

Compliance Engine type system is tailored for declarative policy development. These types not always behave as their counterparts from common programming languages.

### Text Type

Text type represents a simple text string. Key features:

- Case-insensitive (`"a" == "A"`)
- Trims space characters from the beginning and the end of a text (`" a " == "a"`)
- Normalizes spaces in between words in the text (`"a   b" == "a b"`)
- `null`, empty text and text containing only space characters are equal (`null == "" == " "`)

See more details in:

- [unit tests](../../../ce/unit-test/is-equal/text/unit-test.logic.yaml.gen.md) for [`IS_EQUAL`](#is_equal) operation on Text type
- [unit tests](../../../ce/unit-test/is-empty/text/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on Text type

### Bytes Type

Bytes type represents an array of bytes. You can also think about it as a more strict analog of Text type. Key features:

- Case-sensitive (`"a" != "A"`)
- No trims of space characters (`" a " != "a"`)
- Does not normalize spaces in between words in the text (`"a   b" != "a b"`)
- `null` and empty text are equal (`null == ""`), empty string and string of only space characters are not equal (`"" != " "`)

See more details in:

- [unit tests](../../../ce/unit-test/is-equal/bytes/unit-test.logic.yaml.gen.md) for [`IS_EQUAL`](#is_equal) operation on Bytes type
- [unit tests](../../../ce/unit-test/is-empty/bytes/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on Bytes type

### Boolean Type

Boolean type values support following values: `true`, `false`, `null`.

You can not create `null` constants from [`BOOLEAN`](#boolean) operation.
Return value of [`FIELD`](#field) for Checkbox fields also does not return `null`.

However `null` can be returned by operations like [`JSON_QUERY_BOOLEAN`](#json_query_boolean). And operation [`IS_EMPTY`](#is_empty) will return `true` only on `null` value.
See [unit tests](../../../ce/unit-test/is-empty/boolean/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty).

[`IS_EQUAL`](#is_equal) operation also considers `null` as a distinct value, which is not equal neither to `true` nor to `false`.
See [unit tests](../../../ce/unit-test/is-equal/boolean/unit-test.logic.yaml.gen.md) for [`IS_EQUAL`](#is_equal).

### Number Type

Number type represents numeric values, including integers and decimal numbers. Key features:

- Supports both integer and decimal representations.
- Standard numeric equality comparison (e.g., `10` is equal to `10.0`).
- Zero (`0`) is considered a valid Number value and is **not** empty.
- `null` is considered an empty Number value.
- Standard comparison operations like `GREATER_THAN`, `LESS_THAN`, etc., work as expected for numeric values.
- Operations involving `null` and Number type in comparisons (`GREATER_THAN`, `LESS_THAN`, etc.) will generally return `false`.

See more details in:

- [unit tests](../../../ce/unit-test/is-equal/number/unit-test.logic.yaml.gen.md) for [`IS_EQUAL`](#is_equal) operation on Number type
- [unit tests](../../../ce/unit-test/is-empty/number/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on Number type
- [unit tests](../../../ce/unit-test/greater-than/unit-test.logic.yaml.gen.md) for [`GREATER_THAN`](#greater_than)
- [unit tests](../../../ce/unit-test/greater-than-equal/unit-test.logic.yaml.gen.md) for [`GREATER_THAN_EQUAL`](#greater_than_equal)
- [unit tests](../../../ce/unit-test/less-than/unit-test.logic.yaml.gen.md) for [`LESS_THAN`](#less_than)
- [unit tests](../../../ce/unit-test/less-than-equal/unit-test.logic.yaml.gen.md) for [`LESS_THAN_EQUAL`](#less_than_equal)

### DateTime Type

DateTime type represents a specific point in time, combining both date and time components. Key features:

- Stores both date and time information with precision up to milliseconds.
- Timezone-aware. All DateTime values are stored and processed in UTC. When comparing DateTime values, timezones are normalized to UTC for accurate comparison.
- `null` is considered an empty DateTime value.
- Standard comparison operations like `IS_EQUAL`, `NOT_EQUAL`, work as expected for DateTime values.
- Contrary to usual approach to DateTime operations (like in BigQuery), where there are `CURRENT_DATETIME`, `DATETIME_ADD`, `DATETIME_SUB` functions which work together with numeric comparisons like `<`, `<=`, `<`, `>=`, Compliance Engine's approach is to minimize nested function calls by expose operations that integrate reference to current date and time, shifts and comparisons in one operation.

See more details in:

- [unit tests](../../../ce/unit-test/is-equal/date-time/unit-test.logic.yaml.gen.md) for [`IS_EQUAL`](#is_equal) operation on DateTime type
- [unit tests](../../../ce/unit-test/is-empty/date-time/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on DateTime type
- [unit tests](../../../ce/unit-test/is-after-today/unit-test.logic.yaml.gen.md) for [`IS_AFTER_TODAY`](#is_after_today)
- [unit tests](../../../ce/unit-test/is-before-today/unit-test.logic.yaml.gen.md) for [`IS_BEFORE_TODAY`](#is_before_today)
- [unit tests](../../../ce/unit-test/is-beyond-last-days/unit-test.logic.yaml.gen.md) for [`IS_BEYOND_LAST_DAYS`](#is_beyond_last_days)
- [unit tests](../../../ce/unit-test/is-beyond-next-days/unit-test.logic.yaml.gen.md) for [`IS_BEYOND_NEXT_DAYS`](#is_beyond_next_days)
- [unit tests](../../../ce/unit-test/is-within-last-days/unit-test.logic.yaml.gen.md) for [`IS_WITHIN_LAST_DAYS`](#is_within_last_days)
- [unit tests](../../../ce/unit-test/is-within-next-days/unit-test.logic.yaml.gen.md) for [`IS_WITHIN_NEXT_DAYS`](#is_within_next_days)

### Duration Type

### Collection Type

The Collection Type represents an unordered collection of [Text](#text-type) values. Key features:

- Order of the elements in a collection does not matter.
- Item type is always [Text](#text-type).
- No duplicate values allowed. Item comparison is based on [`IS_EQUAL`](#is_equal) operation for [Text](#text-type) type.
- Items considered empty by [`IS_EMPTY`](#is_empty) operation are not added to collection.
- `null` and empty collections are considered equal by [`IS_EQUAL`](#is_equal) and empty by the [`IS_EMPTY`](#is_empty) operation.

See more details in:

- [unit tests](../../../ce/unit-test/is-equal/collection/unit-test.logic.yaml.gen.md) for [`IS_EQUAL`](#is_equal) operation on Collection type
- [unit tests](../../../ce/unit-test/is-empty/collection/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on Collection type
- [unit tests](../../../ce/unit-test/collection-size/unit-test.logic.yaml.gen.md) for [`COLLECTION_SIZE`](#collection_size) operation
- [unit tests](../../../ce/unit-test/collection-contains/unit-test.logic.yaml.gen.md) for [`COLLECTION_CONTAINS`](#collection_contains) operation
- [unit tests](../../../ce/unit-test/collection-from/unit-test.logic.yaml.gen.md) for [`COLLECTION_FROM`](#collection_from) operation

### JSON Type

The JSON Type represents data in JavaScript Object Notation (JSON) format. This type is used to handle semi-structured data commonly returned by various APIs, especially in cloud environments. Key features:

- Handles JSON objects, arrays, and primitive values.
- Uses [JMESPath](https://jmespath.org/) queries for extracting specific data elements using operations like [`JSON_QUERY_TEXT`](#json_query_text), [`JSON_QUERY_BOOLEAN`](#json_query_boolean), etc.
- Simple comparison operations like [`IS_EMPTY`](#is_empty) or [`IS_EQUAL`](#is_equal) are not supported for JSON type. Instead, use checks within [`JSON_FROM`](#json_from) operation and query operations to extract simple types.

## Relationships Between Objects

Compliance Engine represents your cloud resources as interconnected objects, mirroring how resources are linked in your cloud environment. Understanding these relationships is key to writing effective compliance policies.

Compliance Engine uses "lookup fields" to represent connections between resources, similar to relationships in databases. These lookups primarily define **one-to-many relationships**, meaning one resource (the 'parent') can be related to multiple other resources (the 'children'). For example:

- One **AWS VPC** (Virtual Private Cloud) can contain many **AWS EC2 Instances**.
- One **Azure Key Vault** can store multiple **Azure Key Vault Secrets**.

In these relationships, one object acts as the "parent" and the others as "children". Let's examine the fields involved in the relationship between an AWS EC2 Instance and an AWS VPC. The `CA10__CaAwsInstance__c` object (representing an EC2 Instance) contains the following fields related to its VPC:

| Field API Name in `CA10__CaAwsInstance__c` | Example Value                        | Description                                                                                                                                                      |
|--------------------------------------------|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CA10__vpcId__c`                           | `vpc-01234567`                       | **Cloud-native ID** of the related VPC. This is the identifier as known in AWS.                                                                                  |
| `CA10__vpc__c`                             | `00190000000vpc1AAR`                 | **Salesforce ID** of the related VPC object within Cloudaware CMDB. This is the unique identifier used internally by Compliance Engine.                          |
| `CA10__vpc__r`                             | `{"Id":"...", "Name":"..."}`         | **Related VPC object**. This field provides access to the entire VPC object and its fields, such as `Id` and `Name`.                                             |
| `CA10__vpc__r.CA10__disappearanceTime__c`  | `null` or `2025-01-01T00:00:00.000Z` | **Deletion timestamp** of the related VPC. If not null, it indicates the VPC has been deleted in AWS, even though the Instance object might still exist in CMDB. |

Conversely, the `CA10__CaAwsVpc__c` object (representing an AWS VPC) provides access to a list of related EC2 Instances through a *related list* field:

| Related List API Name in `CA10__CaAwsVpc__c` | **Example Value**                   | **Description**                                                                                                                                                      |
|----------------------------------------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CA10__AWS_EC2_Instances__r`                 | `[{"Id":"...", "Name":"..."}, ...]` | **List of related EC2 Instances** contained within this VPC. This is accessed as a *related list* from the VPC object, not as a field on the Instance object itself. |

To illustrate how these fields work in practice, consider these example SOQL queries, used to retrieve data from Cloudaware CMDB. These queries are similar to how Compliance Engine accesses data internally.

**Query 1 - Retrieving VPC details from an EC2 Instance:**

```sql
SELECT Id, Name, CA10__vpcId__c, CA10__vpc__c, CA10__vpc__r.Id, CA10__vpc__r.Name
FROM CA10__CaAwsInstance__c
```

This query retrieves information about an EC2 Instance and its related VPC.  The results demonstrate how the different fields are populated:

| `Id`                 | `Name`         | `CA10__vpcId__c` | `CA10__vpc__c`       | `CA10__vpc__r`                                       |
|:---------------------|:---------------|:-----------------|:---------------------|:-----------------------------------------------------|
| `0029000000inst1AAD` | `i-0011223344` | `vpc-01234567`   | `00190000000vpc1AAR` | `{"Id":"00190000000vpc1AAR", "Name":"vpc-01234567"}` |
| `0029000000inst2AAB` | `i-4433221100` | `vpc-01234567`   | `00190000000vpc1AAR` | `{"Id":"00190000000vpc1AAR", "Name":"vpc-01234567"}` |

As you can see, `CA10__vpc__r` field returns an object containing fields of the related VPC object.

**Query 2 - Retrieving EC2 Instances within a VPC:**

```sql
SELECT Id, Name, (SELECT Id, Name FROM CA10__AWS_EC2_Instances__r)
FROM CA10__CaAwsVpc__c
```

| `Id`                 | `Name`         | `CA10__AWS_EC2_Instances__r`                                                                               |
|:---------------------|:---------------|:-----------------------------------------------------------------------------------------------------------|
| `00190000000vpc1AAR` | `vpc-01234567` | `[{"Id":"0029000000inst1AAD", "Name":"i-0011223344"}, {"Id":"0029000000inst2AAB", "Name":"i-4433221100"}]` |

**Important Considerations for Policy Logic:**

When writing policies, remember that these lookup fields can have different states, especially in a dynamic cloud environment:

| `CA10__vpcId__c` | `CA10__vpc__c`       | `CA10__vpc__r.CA10__disappearanceTime__c` | Scenario                                                                                                                                                                                     |
|:-----------------|:---------------------|:------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| *Empty*          | *Empty*              | *Empty*                                   | **No VPC Association**: The EC2 Instance is not currently associated with any VPC. This might be valid in some cases, but often indicates a misconfiguration.                                |
| `vpc-01234567`   | *Empty*              | *Empty*                                   | **VPC Data Missing**: The Instance is associated with VPC `vpc-01234567`, but Cloudaware has not yet collected data for this VPC, or there are permission issues preventing data collection. |
| `vpc-01234567`   | `00190000000vpc1AAR` | *Empty*                                   | **VPC Data Present**: The Instance is associated with VPC `vpc-01234567`, and Cloudaware has successfully collected and stored the VPC data.                                                 |
| `vpc-01234567`   | `00190000000vpc1AAR` | `2025-01-01T00:00:00.000Z`                | **Deleted VPC**: The Instance is associated with VPC `vpc-01234567`, but the VPC has been deleted from the cloud provider, although Cloudaware retains the historical data.                  |

**Naming Conventions and Pronunciation:**

In a context of a single relationship between two objects, these fields are usually referred to and pronounced as follows:

- `lookupId__c` (e.g., `CA10__vpcId__c`): "lookup ID C"
- `lookup__c` (e.g., `CA10__vpc__c`): "lookup C"
- `lookup__r` (e.g., `CA10__vpc__r`): "lookup R"
- `lookup__r.disappearanceTime__c` (e.g., `CA10__vpc__r.CA10__disappearanceTime__c`): "lookup R dot disappearance time"

**Impact on Policy Operations:**

Operations like [`FIELD`](#field) and [`EXTRACT`](#extract) rely on these relationships to navigate and retrieve data across interconnected objects.  However, it's crucial to understand that these operations will return a `null` value not only when the target field itself is `null`, but also in scenarios where the relationship path is incomplete or broken. This can happen if:

1. **Target Field is Null:** The final field in the specified path inherently contains a `null` value in the data.
2. **Missing Lookup ID:** Any `lookupId__c` field in the relationship path is empty, indicating the relationship is not established at the cloud provider level.
3. **Missing Lookup Object ID:** Any `lookup__c` field in the relationship path is empty, suggesting that Cloudaware data collection is incomplete or has encountered errors for the related object.
4. **Deleted Related Object:** Any `lookup__r.CA10__disappearanceTime__c` field in the path is *not* empty, indicating that a related object in the path has been deleted from the cloud provider. While Cloudaware retains historical data, accessing fields on deleted objects will return `null`.

**Handling Nulls and Undetermined Status:**

To distinguish between a legitimate `null` value from the field itself and a `null` resulting from incomplete lookups, Compliance Engine provides operations like [`IS_EMPTY_LOOKUP`](#is_empty_lookup) and [`NOT_EMPTY_LOOKUP`](#not_empty_lookup). These operations are designed to specifically check the health and completeness of object relationships.  Using these operations allows you to:

- Handle potential data inconsistencies gracefully and return an `UNDETERMINED` status in your policies when data is unreliable, minimizing false positives and negatives.
- Return `COMPLIANT` or `INCOMPLIANT` status, when the existence of the related object exists matters for the policy logic.

## Operations List

### `FIELD`

```yaml
FIELD:
  path: { fieldPath } # required
  undeterminedIf: # optional
    isEmpty: { message } # optional
    noAccessDelegate: # optional
      path: { fieldPath } # required
      currentStateMessage: { message } # required
```

#### Description

The `FIELD` operation allows you to access the value of a specific field within your input object. You specify the field using a path, which can traverse relationships (lookups) to access fields on
related objects.

This operation is intended to be used in [logic files](../index.md#logic) during development, for production logic use [`EXTRACT`](#extract) operation and `FIELD` operation
in [extract files](../index.md#extracts).

#### Parameters

- **`path` (string, required):**
  - Specifies the path to the field you want to access.
  - The path is a string that can include:
    - Field names within the input object (e.g., `CA10__status__c`).
    - Relationship names to traverse lookups, followed by field names on the related object (e.g., `CA10__account__r.CA10__accountId__c`). Relationship names typically end with `__r`.
  - Example paths:
    - `CA10__status__c`
    - `CA10__policyDocument__c`
    - `CA10__vpc__r.CA10__isDefault__c`
    - `CA10__securityGroup__r.CA10__account__r.CA10__accountId__c`

- **`undeterminedIf` (object, optional):**
  - Allows you to define conditions under which the `FIELD` operation should return an `UNDETERMINED` status instead of a value. This is useful for handling scenarios where a field might be empty or
    inaccessible due to permissions.
  - Properties:
    - **`isEmpty` (string, optional):**
      - If provided, and the field value at the specified `path` is considered empty by [`IS_EMPTY`](#is_empty) operation, the operation will return `UNDETERMINED` status.
      - The string value is used as the `currentStateMessage` in the condition when the field is empty and `UNDETERMINED` is returned.
    - **`noAccessDelegate` (object, optional):**
      - Used as a temporary workaround until a dedicated "NO_ACCESS" check is available.
      - It checks if a *delegate field* is empty. If the delegate field is empty, it implies potential access issues to the primary field.
      - Primary field and delegate field can match.
      - Properties:
        - **`path` (string, required):** The path to the *delegate field* to check for emptiness.
        - **`currentStateMessage` (string, required):** The `currentStateMessage` to return if the delegate field is empty and `UNDETERMINED` status is returned.

#### Return Type

Depending on the type of the field:

| Salesforce Field Type                      | Return Type                |
|--------------------------------------------|----------------------------|
| `ID`, `Lookup`, `MasterDetail`             | [Text](#text-type)         |
| `Text`, `TextArea`, `EncryptedText`        | [Text](#text-type)         |
| `LongTextArea`, `RichTextArea`             | [Text](#text-type)         |
| `URL`, `Email`, `Phone`                    | [Text](#text-type)         |
| `Time`                                     | [Text](#text-type)         |
| `Picklist`                                 | [Text](#text-type)         |
| `Number`, `Percent`, `Currency`, `Summary` | [Number](#number-type)     |
| `Checkbox`                                 | [Boolean](#boolean-type)   |
| `DateTime`                                 | [DateTime](#datetime-type) |
| `Date`                                     | [DateTime](#datetime-type) |

#### Examples

1. Accessing field value:

    ```yaml
    FIELD:
      path: CA10__multiRegionTrail__c
    ```

2. Using `undeterminedIf` with `isEmpty`

    ```yaml
    FIELD:
      path: CA10__accountId__c
      undeterminedIf:
        isEmpty: "Account ID can not be empty. Possibly corrupted data."
    ```

3. Using `undeterminedIf` with `noAccessDelegate`:

    ```yaml
    FIELD:
      path: "CA10__versioningMfaDeleteEnabled__c"
      undeterminedIf:
        noAccessDelegate:
          path: "CA10__versioningStatus__c"
          currentStateMessage: "Unable to determine versioning status. Possible permission issue with s3:GetBucketVersioning"
    ```

### `EXTRACT`

```yaml
EXTRACT: { path }
```

#### Description

The `EXTRACT` operation allows you to retrieve a pre-defined, safe-to-use value from your input object. It references an "extract" defined in a separate [extract file](../index.md#extracts). Extracts
provide an abstraction layer, allowing you to define reusable logic for accessing and transforming data. This promotes cleaner and more maintainable logic files, especially for production use, as
changes to data access logic can be centralized in extract files rather than spread across multiple logic files. This operation should be used in [logic files](../index.md#logic) for production logic
use, while [`FIELD`](#field) operation is recommended for development and in [extract files](../index.md#extracts) where you define the extraction logic itself.

When using `EXTRACT` it is required to add reference corresponding [extracts file](../index.md#extracts)  to `importExtracts` section. Add `importExtracts` for extracts from types used in the root of the logic to the root and for extracts used in each of `relatedLists` to the related lists' `importExtracts` section:

```yaml
inputType: CA10__CaAwsInstance__c
importExtracts:
  - file: /types/CA10__CaAwsInstance__c/object.extracts.yaml
  - file: /types/CA10__CaAwsVpc__c/object.extracts.yaml
conditions:
  - status: UNDETERMINED
    currentStateMessage: Status fields are not populated
    check:
      OR:
        args:
          - IS_EMPTY:
              arg:
                EXTRACT: CA10__stateName__c
          - IS_EMPTY:
              arg:
                EXTRACT: CA10__vpc__r.CA10__state__c
# ...
relatedLists:
  - relationshipName: CA10__AWS_EBS_Volumes__r
    importExtracts:
      - file: /types/CA10__CaAwsVolume__c/object.extracts.yaml
    conditions:
      - status: UNDETERMINED
        currentStateMessage: Attachment status is undetermined
        check:
          IS_EMPTY:
            arg:
              EXTRACT: CA10__attachmentStatus__c
      # ...
```

#### Parameters

- **`path` (string, required):**
  - Specifies the path to the extract you want to access.
  - The path is a string that can include:
    - Extract names within the input object (e.g., `CA10__status__c`).
    - Relationship names to traverse lookups, followed by extract name on the related object (e.g., `CA10__account__r.CA10__accountId__c`). Relationship names typically end with `__r`.
  - The extract name must correspond to an extract defined in an available [extract file](../index.md#extracts).
  - Example paths:
    - `CA10__userName__c`
    - `CA10__user__r.CA10__credReportAttributesJson__c`
    - `CA10__account__r.CA10__accountId__c`

#### Return Type

Extract can return result from any operation supported by Compliance Engine, so it can return any of supported types.

#### Examples

1. Using a simple extract:

    ```yaml
    EXTRACT: CA10__userName__c
    ```

2. Using an extract from a related object:

    ```yaml
    EXTRACT: CA10__user__r.CA10__credReportPasswordLastUsed__c
    ```

### `IS_EMPTY_LOOKUP`

```yaml
IS_EMPTY_LOOKUP: { lookupPath }
```

#### Description

The `IS_EMPTY_LOOKUP` operation specifically checks whether a lookup field, or a chain of lookups, resolves to an empty value. This operation is designed to address scenarios described in the [Relationships Between Objects](#relationships-between-objects) documentation, where a `FIELD` operation might return `null` not just because the field is empty, but also because a lookup in the path is broken or incomplete.

`IS_EMPTY_LOOKUP` helps distinguish between a truly empty field and a `null` value resulting from a broken lookup chain. It returns `true` if the lookup path leads to a null or empty object at any point, indicating an incomplete or broken relationship. It returns `false` if the lookup path is fully resolved and the final field is not empty (or if the final field itself is null, which is not considered an empty lookup).

This operation is crucial for policies that need to verify the existence and completeness of related objects, especially when dealing with potentially inconsistent or partially collected data in Cloudaware CMDB.

#### Parameters

- **`lookupPath` (string, required):**
  - Specifies the lookup path to be checked for emptiness.
  - The path is a string that can include relationship names to traverse lookups (e.g., `CA10__vpc__r.CA10__subnet__r`).
  - The path should point to a lookup field or a chain of lookup fields. Only `lookup__r` fields can be used in the chain of lookups.
  - Example paths:
    - `CA10__vpc__r`
    - `CA10__vpc__r.CA10__subnet__r`

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a lookup field `CA10__vpc__r` is empty:

    ```yaml
    IS_EMPTY_LOOKUP: CA10__vpc__r
    ```

   This example checks if the VPC lookup on an EC2 instance is empty, which could indicate that the instance is not associated with a VPC or that VPC data is not available.

2. Checking a chain of lookups `CA10__vpc__r.CA10__subnet__r` for emptiness:

    ```yaml
    IS_EMPTY_LOOKUP: CA10__vpc__r.CA10__subnet__r
    ```

   This example checks if the subnet lookup, accessed through the VPC lookup, is empty or the VPC lookup itself is empty. This could indicate issues at any point in the lookup chain (instance -> VPC -> subnet).

3. Using `IS_EMPTY_LOOKUP` in a condition to set status to `UNDETERMINED` when a lookup is empty:

    ```yaml
    - status: UNDETERMINED
      currentStateMessage: "VPC information is not available, status cannot be determined."
      check:
        IS_EMPTY_LOOKUP: CA10__vpc__r
    ```

   This condition sets the policy status to `UNDETERMINED` if the VPC lookup is empty, acknowledging the lack of necessary data for evaluation.

### `NOT_EMPTY_LOOKUP`

```yaml
NOT_EMPTY_LOOKUP: { lookupPath }
```

#### Description

The `NOT_EMPTY_LOOKUP` operation is the inverse of [`IS_EMPTY_LOOKUP`](#is_empty_lookup). It checks whether a lookup field, or a chain of lookups, is fully populated with objects. This operation is also designed to address scenarios described in the [Relationships Between Objects](#relationships-between-objects) documentation, focusing on ensuring that a lookup path successfully resolves to a non-empty object.

`NOT_EMPTY_LOOKUP` returns `true` if the entire lookup path is successfully resolved and leads to a non-empty object. It returns `false` if any part of the lookup path is broken, incomplete, or resolves to a null or empty object.

This operation is essential for policies that require verification of complete and valid object relationships, ensuring data integrity and reliability in policy evaluations.

#### Parameters

- **`lookupPath` (string, required):**
  - Specifies the lookup path to be checked for non-emptiness.
  - The path is a string that can include relationship names to traverse lookups (e.g., `CA10__vpc__r.CA10__subnet__r`).
  - The path should point to a lookup field or a chain of lookup fields. Only `lookup__r` fields can be used in the chain of lookups.
  - Example paths:
    - `CA10__vpc__r`
    - `CA10__vpc__r.CA10__subnet__r`

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a lookup field `CA10__vpc__r` is not empty:

    ```yaml
    NOT_EMPTY_LOOKUP: CA10__vpc__r
    ```

   This example verifies that the VPC lookup on an EC2 instance is successfully resolved and the VPC data is available.

2. Checking a chain of lookups `CA10__vpc__r.CA10__subnet__r` for non-emptiness:

    ```yaml
    NOT_EMPTY_LOOKUP: CA10__vpc__r.CA10__subnet__r
    ```

   This example ensures that the entire lookup chain from instance to subnet (via VPC) is valid and data is available at each step.

### `TEXT`

```yaml
TEXT: { value }
```

#### Description

The `TEXT` operation creates a constant [text](#text-type) (string) value. This operation allows you to embed static text directly within your logic.

#### Parameters

- **`value` (string, required):**
  - Specifies the text string you want to use as a constant.
  - This value will be directly returned by the operation.
  - The text value cannot be null or empty string.

#### Return Type

[Text](#text-type)

#### Examples

1. Using a simple text constant:

    ```yaml
    TEXT: "Enabled"
    ```

2. Using a text constant in a comparison:

    ```yaml
    IS_EQUAL:
      left:
        FIELD: 
          path: CA10__stateName__c
      right:
        TEXT: "running"
    ```

### `BYTES`

```yaml
BYTES: { value }
```

#### Description

The `BYTES` operation created a constant [bytes](#bytes-type) (byte array) value. This operation allows you to embed static byte array within your logic.

#### Parameters

- **`value` (string, required):**
  - Specifies the byte array (as a yaml string) you want to use as a constant.
  - This value will be directly returned by the operation.
  - The text value cannot be null or empty string.

#### Return Type

[Bytes](#bytes-type)

#### Examples

TODO: Provide real-world examples

### `BOOLEAN`

```yaml
BOOLEAN: { value }
```

#### Description

The `BOOLEAN` operation creates a constant [boolean](#boolean-type) value. This operation allows you to embed static boolean values (`true` or `false`) directly within your logic.

#### Parameters

- **`value` (boolean, required):**
  - Specifies the boolean value you want to use as a constant.
  - Must be either `true` or `false`. Case-sensitive.
  - This value will be directly returned by the operation.

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Using a simple boolean constant:

    ```yaml
    BOOLEAN: true
    ```

2. Using a boolean constant in a comparison:

    ```yaml
    IS_EQUAL:
      left:
        FIELD: 
          path: CA10__publiclyAccessible__c
      right:
        BOOLEAN: true
    ```

### `NUMBER`

```yaml
NUMBER: { value }
```

#### Description

The `NUMBER` operation creates a constant [number](#number-type) value. This operation allows you to embed static numeric values (integers or decimals) directly within your logic.

#### Parameters

- **`value` (number, required):**
  - Specifies the numeric value you want to use as a constant.
  - Can be an integer (e.g., `10`) or a decimal number (e.g., `3.14`).
  - This value will be directly returned by the operation.

#### Return Type

[Number](#number-type)

#### Examples

1. Using an integer constant:

    ```yaml
    NUMBER: 10
    ```

2. Using a decimal constant:

    ```yaml
    NUMBER: 3.14
    ```

3. Using a number constant in a comparison:

    ```yaml
    GREATER_THAN:
      left:
        FIELD: 
          path: CA10__instanceCount__c
      right:
        NUMBER: 5
    ```

### `COLLECTION`

```yaml
COLLECTION:
  - { value1 }
  - { value2 }
  # ...
```

#### Description

The `COLLECTION` operation creates a constant [collection](#collection-type) value. This operation allows you to define a static list of text strings as a collection directly within your logic.

#### Parameters

- **(list of strings, required):**
  - Specifies a YAML list of text strings that will form the collection.
  - Each item in the list is treated as a [text](#text-type) value.
  - Duplicate values will be automatically removed; the resulting collection will contain only unique items.
  - Empty strings and strings containing only whitespace will be ignored and not added to the collection.

#### Return Type

[Collection](#collection-type)

#### Examples

1. Using a collection with multiple values:

    ```yaml
    COLLECTION:
      - "value1"
      - "value2"
      - "value1" # Duplicate, will be removed
      - "  "     # Whitespace, will be ignored
      - ""      # Empty string, will be ignored
    ```

2. Using an empty collection:

    ```yaml
    COLLECTION: []
    ```

3. Using a collection in `COLLECTION_CONTAINS` operation:

    ```yaml
    COLLECTION_CONTAINS:
      collection:
        COLLECTION:
          - "running"
          - "pending"
      item:
        FIELD: 
          path: CA10__stateName__c
    ```

### `BOOLEAN_FROM`

```yaml
BOOLEAN_FROM:
  arg: { arg } # required
  trueValue: { trueValue } # optional
  undeterminedIf: # optional
    isEmpty: { message } # optional
```

#### Description

The `BOOLEAN_FROM` operation converts a [text](#text-type) (string) value into a [boolean](#boolean-type) value. This is useful when you need to interpret string representations of boolean values (like "true", "false", "yes", "no", "1", "0") as actual boolean values within your logic.

#### Parameters

- **`arg` (Operation<[Text](#text-type)>, required):**
  - Specifies the [text](#text-type) value that you want to convert to a boolean.
  - This should be an operation that resolves to a [text](#text-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`JSON_QUERY_TEXT`](#json_query_text), etc.

- **`trueValue` (string, optional):**
  - Defines the text string that should be interpreted as `true`.
  - If the `arg` value, after text normalization (case-insensitive, trimmed, normalized spaces), matches this `trueValue`, the operation will return `true`.
  - If not provided, the default `trueValue` is `"true"` (case-insensitive).

- **`undeterminedIf` (object, optional):**
  - Allows you to define conditions under which the `BOOLEAN_FROM` operation should return an `UNDETERMINED` status instead of a boolean value.
  - Properties:
    - **`isEmpty` (string, optional):**
      - If provided, and the `arg` value is considered empty by [`IS_EMPTY`](#is_empty) operation (i.e., `null`, empty string, or string with only whitespace), the operation will return `UNDETERMINED` status.
      - The string value is used as the `currentStateMessage` in the condition when the `arg` is empty and `UNDETERMINED` is returned.

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Converting a field value to boolean, using default `trueValue`:

    ```yaml
    BOOLEAN_FROM:
      arg:
        FIELD: 
          path: CA10__isPublic__c # Assume this field returns "true" or "false" as text
      undeterminedIf:
        isEmpty: "The 'isPublic' field is empty and cannot be converted to a boolean."
    ```

2. Converting a field value to boolean, specifying a custom `trueValue`:

    ```yaml
    BOOLEAN_FROM:
      arg:
        FIELD: 
          path: CA10__encryptionStatus__c # Assume this field returns "ENABLED" or "DISABLED" as text
      trueValue: "ENABLED"
      undeterminedIf:
        isEmpty: "The 'Encryption Status' field is empty and cannot be converted to a boolean."
    ```

3. Using `BOOLEAN_FROM` in a condition check:

    ```yaml
    IS_EQUAL:
      left:
        BOOLEAN_FROM:
          arg:
            FIELD: 
              path: CA10__detailedMonitoringEnabled__c # Assume this field returns "yes" or "no" as text
          trueValue: "yes"
      right:
        BOOLEAN: true
    ```

### `DATE_TIME_FROM`

```yaml
DATE_TIME_FROM:
  arg: { arg } # required
  format: { format } # required
  nullValues: # optional
    - { nullValue1 }
    - { nullValue2 }
    # ...
  undeterminedIf: # optional
    isEmpty: { message } # optional
    invalidFormat: { message } # optional
```

#### Description

The `DATE_TIME_FROM` operation converts a [text](#text-type) (string) value into a [dateTime](#datetime-type) value. This is essential when dealing with date and time information represented as strings in your input data, allowing you to perform date-time comparisons and range checks within your policies.

#### Parameters

- **`arg` (Operation<[Text](#text-type)>, required):**
  - Specifies the [text](#text-type) value that you want to convert to a [dateTime](#datetime-type).
  - This should be an operation that resolves to a [text](#text-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`JSON_QUERY_TEXT`](#json_query_text), etc.
  - The string value must represent a date and time in the format specified by the `format` parameter.

- **`format` (string, required):**
  - Specifies the format of the date and time string provided in the `arg` parameter.
  - Currently, only one format is supported:
    - `"ISO_8601"`:  Indicates that the `arg` string is in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time format (e.g., `2023-10-26T10:00:00Z`, `2023-10-26T10:00:00-05:00`).
  - Example: `format: "ISO_8601"`

- **`nullValues` (list of strings, optional):**
  - Defines a list of text strings that should be interpreted as `null` or empty values when converting to DateTime.
  - If the `arg` value, after text normalization (case-insensitive, trimmed, normalized spaces), matches any of the strings in this list, the `DATE_TIME_FROM` operation will return a `null` DateTime value.
  - This is helpful for handling cases where your data uses specific strings to represent missing or invalid date-time values (e.g., "N/A", "Unknown", "-").
  - Example:

    ```yaml
    nullValues:
      - "N/A"
      - "Unknown"
      - "-"
    ```

- **`undeterminedIf` (object, optional):**
  - Allows you to define conditions under which the `DATE_TIME_FROM` operation should return an `UNDETERMINED` status instead of a [dateTime](#datetime-type) value. This is useful for handling potential errors during conversion.
  - Properties:
    - **`isEmpty` (string, optional):**
      - If provided, and the `arg` value is considered empty by [`IS_EMPTY`](#is_empty) operation (i.e., `null`, empty string, or string with only whitespace), the operation will return `UNDETERMINED` status.
      - The string value is used as the `currentStateMessage` in the condition when the `arg` is empty and `UNDETERMINED` is returned.
    - **`invalidFormat` (string, required):**
      - If the `arg` value cannot be parsed into a valid [dateTime](#datetime-type) according to the specified `format`, the operation will return `UNDETERMINED` status.
      - The string value provided here will be used as the `currentStateMessage` in the condition when the format is invalid and `UNDETERMINED` is returned.
      - **Note:** `invalidFormat` is **required** within `undeterminedIf` to ensure proper error handling for date-time conversion.

#### Return Type

[DateTime](#datetime-type)

#### Examples

1. Converting a field value in ISO 8601 format to DateTime:

    ```yaml
    DATE_TIME_FROM:
      arg:
        FIELD: 
          path: CA10__createdDate__c # Assume this field returns a date-time string in ISO 8601 format
      format: "ISO_8601"
      undeterminedIf:
        invalidFormat: "The 'Created Date' field is not in a valid ISO 8601 format."
    ```

2. Handling null values and invalid format:

    ```yaml
    DATE_TIME_FROM:
      arg:
        FIELD: 
          path: CA10__startTime__c # Assume this field might contain "N/A", "Unknown", or invalid date strings
      format: "ISO_8601"
      nullValues:
        - "N/A"
        - "Unknown"
      undeterminedIf:
        isEmpty: "The 'Start Time' field is empty."
        invalidFormat: "The 'Start Time' field is not in a valid ISO 8601 format."
    ```

3. Using `DATE_TIME_FROM` in a date-time comparison:

    ```yaml
    IS_BEFORE_TODAY:
      arg:
        DATE_TIME_FROM:
          arg:
            FIELD: 
              path: CA10__expirationDate__c # Assume this field returns a date-time string in ISO 8601 format
          format: "ISO_8601"
          undeterminedIf:
            invalidFormat: "The 'Expiration Date' field is not in a valid ISO 8601 format."
    ```

4. Using `DATE_TIME_FROM` with `EXTRACT`:

    ```yaml
    DATE_TIME_FROM:
      arg:
        EXTRACT: CA10__lastLoginTime__c # Assume the extract returns a date-time string in ISO 8601 format
      format: "ISO_8601"
      undeterminedIf:
        invalidFormat: "The 'Last Login Time' extract did not return a valid ISO 8601 format."
    ```

### `DURATION_FROM`

### `COLLECTION_FROM`

```yaml
COLLECTION_FROM:
  arg: { arg } # required
  separator: { separator } # required
```

#### Description

The `COLLECTION_FROM` operation converts a [text](#text-type) (string) value into a [collection](#collection-type) value by splitting the string using a specified separator. This is useful when you have a comma-separated or newline-separated string of values that you need to treat as a collection for operations like [`COLLECTION_CONTAINS`](#collection_contains) or [`COLLECTION_SIZE`](#collection_size).

#### Parameters

- **`arg` (Operation<[Text](#text-type)>, required):**
  - Specifies the [text](#text-type) value that you want to convert to a [collection](#collection-type).
  - This should be an operation that resolves to a [text](#text-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`JSON_QUERY_TEXT`](#json_query_text), or [`TEXT`](#text).
  - The string value will be split into a collection based on the `separator`.

- **`separator` (string, required):**
  - Specifies the separator string that will be used to split the `arg` string into individual items of the collection.
  - Common separators are commas (`,`), newlines (`\n`), or spaces.
  - Example: `separator: ","` or `separator: "\n"`

#### Return Type

[Collection](#collection-type)

#### Examples

1. Creating a collection from a newline-separated string obtained from a field:

    ```yaml
    COLLECTION_FROM:
      arg:
        FIELD:
          path: CA10__availabilityZones__c # Assume this field contains newline-separated Availability Zones
      separator: "\n"
    ```

    If the `CA10__availabilityZones__c` field contains:

    ```plaintext
    us-east-1a
    us-east-1b
    us-east-1c
    ```

    This operation will return a collection containing: `"us-east-1a"`, `"us-east-1b"`, `"us-east-1c"`.

2. Using `COLLECTION_FROM` with `COLLECTION_CONTAINS` to check if a collection contains a specific item:

    ```yaml
      GREATER_THAN: 
        left:
          COLLECTION_SIZE:
            arg:
              COLLECTION_FROM:
                arg:
                  FIELD:
                    path: CA10__availabilityZones__c
                separator: "\n"
        right: 
          NUMBER: 1
    ```

    This example checks if the `CA10__availabilityZones__c` field value contains more than 1 unique Availability Zone.

### `JSON_FROM`

```yaml
JSON_FROM:
  arg: { arg } # required
  undeterminedIf: # optional
    isEmpty: { message } # optional
    isInvalid: { message } # required
```

#### Description

The `JSON_FROM` operation parses a [text](#text-type) (string) value as a JSON and returns a [json](#json-type) value. This operation is crucial for handling JSON payloads that are often retrieved from external systems or APIs. It allows you to convert a string representation of JSON into a structured JSON object that can be further queried and processed using other JSON-specific operations like [`JSON_QUERY_TEXT`](#json_query_text).

#### Parameters

- **`arg` (Operation<[Text](#text-type)>, required):**
  - Specifies the [text](#text-type) value that contains a JSON string.
  - This should be an operation that resolves to a [text](#text-type) value, such as [`FIELD`](#field) or [`EXTRACT`](#extract).
  - The string value must be a valid JSON document.

- **`undeterminedIf` (object, optional):**
  - Allows you to define conditions under which the `JSON_FROM` operation should return an `UNDETERMINED` status instead of a [json](#json-type) value. This is useful for handling cases where the input string might not be a valid JSON or is empty.
  - Properties:
    - **`isEmpty` (string, optional):**
      - If provided, and the `arg` value is considered empty by [`IS_EMPTY`](#is_empty) operation (i.e., `null`, empty string, or string with only whitespace), the operation will return `UNDETERMINED` status.
      - The string value is used as the `currentStateMessage` in the condition when the `arg` is empty and `UNDETERMINED` is returned.
    - **`isInvalid` (string, required):**
      - If the `arg` value cannot be parsed as a valid JSON, the operation will return `UNDETERMINED` status.
      - The string value provided here will be used as the `currentStateMessage` in the condition when the JSON is invalid and `UNDETERMINED` is returned.
      - **Note:** `isInvalid` is **required** within `undeterminedIf` to ensure proper error handling for JSON parsing failures.

#### Return Type

[Json](#json-type)

#### Examples

1. Parsing a JSON string retrieved from a `FIELD` operation and handling empty input:

    ```yaml
    JSON_FROM:
      arg:
        FIELD:
          path: CA10__settingsJson__c # Assume this field contains a JSON string, like '{"enabled": true, "maxInstances": 123}'
      undeterminedIf:
        isEmpty: "Settings JSON is empty."
        isInvalid: "The 'Settings JSON' field does not contain a valid JSON."
    ```

    This example retrieves a string from the `CA10__settingsJson__c` field and attempts to parse it as JSON. If the field is empty, it returns `UNDETERMINED` with the message "Settings JSON is empty.". If the content is not valid JSON, it returns `UNDETERMINED` with the message "The 'Settings JSON' field does not contain a valid JSON.".

2. Using `JSON_FROM` with `JSON_QUERY_TEXT` to extract a value:

    ```yaml
    IS_EQUAL:
      left:
        JSON_QUERY_TEXT:
          arg:
            JSON_FROM:
              arg:
                FIELD:
                  path: CA10__attributesJson__c # Assume this field contains a JSON string '{"name": "example", "value": 123}'
              undeterminedIf:
                isInvalid: "Invalid JSON"
          expression: "name"
          undeterminedIf:
            evaluationError: "JSON query evaluation error"
            resultTypeMismatch: "JSON query result type mismatch"
      right:
        TEXT: "example"
    ```

    This example first uses `JSON_FROM` to parse a JSON string and then uses `JSON_QUERY_TEXT` to extract the value associated with the key `"name"`. It then checks if the extracted text value is equal to `"example"`.

### `IS_EMPTY`

```yaml
IS_EMPTY:
  arg: { arg } # required
```

#### Description

The `IS_EMPTY` operation checks if the provided argument `arg` is considered empty. What constitutes "empty" depends on the provided type (see [Type System](#type-system)). This operation returns a [boolean](#boolean-type) value: `true` if the argument is empty, and `false` otherwise.

#### Parameters

- **`arg` (Operation<[Any](#type-system)>, required):**
  - Specifies the value to be checked for emptiness.
  - This can be any operation that resolves to a supported Compliance Engine type (Text, Bytes, Number, DateTime, Collection, etc.).

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a text field is empty:

    ```yaml
    IS_EMPTY:
      arg:
        FIELD:
          path: CA10__notes__c
    ```

    This example checks if the value of the `CA10__notes__c` field is empty (null, empty text, or text containing only spaces).

2. Checking if a collection is empty:

    ```yaml
    IS_EMPTY:
      arg:
        COLLECTION_FROM:
          arg:
            FIELD:
              path: CA10__availabilityZones__c
          separator: ","
    ```

    This example checks if the collection created from the comma-separated string in `CA10__availabilityZones__c` field is empty. The result of `true` will be produces for following values of `CA10__availabilityZones__c`: `null`, `""`, `" "`, `" , "`. See [collection type](#collection-type) for more details.

3. Using `IS_EMPTY` in a condition:

    ```yaml
    - status: INCOMPLIANT
      currentStateMessage: "Description is missing"
      remediationMessage: "Please provide a description for this resource."
      check:
        IS_EMPTY:
          arg:
            FIELD:
              path: CA10__description__c
    ```

    This condition will be met if the `CA10__description__c` field is empty, setting the status to `INCOMPLIANT`.

See more details in:

- [unit tests](../../../ce/unit-test/is-empty/text/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on [Text](#text-type) type
- [unit tests](../../../ce/unit-test/is-empty/bytes/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on [Bytes](#bytes-type) type
- [unit tests](../../../ce/unit-test/is-empty/boolean/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on [Boolean](#boolean-type) type
- [unit tests](../../../ce/unit-test/is-empty/number/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on [Number](#number-type) type
- [unit tests](../../../ce/unit-test/is-empty/date-time/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on [DateTime](#datetime-type) type
- [unit tests](../../../ce/unit-test/is-empty/collection/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on [Collection](#collection-type) type

### `NOT_EMPTY`

```yaml
NOT_EMPTY:
  arg: { arg } # required
```

#### Description

The `NOT_EMPTY` operation is the inverse of [`IS_EMPTY`](#is_empty). It checks if the provided argument `arg` is *not* considered empty based on the provided type (see [Type System](#type-system)). This operation returns a [boolean](#boolean-type) value: `true` if the argument is not empty, and `false` if it is empty.

#### Parameters

- **`arg` (Operation<[Any](#type-system)>, required):**
  - Specifies the value to be checked for non-emptiness.
  - This can be any operation that resolves to a supported Compliance Engine type (Text, Bytes, Number, DateTime, Collection, etc.).

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a text field is not empty:

    ```yaml
    NOT_EMPTY:
      arg:
        FIELD:
          path: CA10__instanceName__c
    ```

    This example checks if the value of the `CA10__instanceName__c` field is not empty.

2. Checking if a collection is not empty:

    ```yaml
    NOT_EMPTY:
      arg:
        COLLECTION:
          - "item1"
          - "item2"
    ```

    This example checks if the constant collection containing "item1" and "item2" is not empty, which will always be true.

3. Using `NOT_EMPTY` in a condition:

    ```yaml
    - status: COMPLIANT
      currentStateMessage: "Instance name is provided"
      check:
        NOT_EMPTY:
          arg:
            FIELD:
              path: CA10__instanceName__c
    ```

    This condition will be met if the `CA10__instanceName__c` field is not empty, setting the status to `COMPLIANT`.

See more details in:

- [unit tests](../../../ce/unit-test/is-empty/text/unit-test.logic.yaml.gen.md) for [`NOT_EMPTY`](#not_empty) operation on [Text](#text-type) type
- [unit tests](../../../ce/unit-test/is-empty/bytes/unit-test.logic.yaml.gen.md) for [`NOT_EMPTY`](#not_empty) operation on [Bytes](#bytes-type) type
- [unit tests](../../../ce/unit-test/is-empty/boolean/unit-test.logic.yaml.gen.md) for [`NOT_EMPTY`](#not_empty) operation on [Boolean](#boolean-type) type
- [unit tests](../../../ce/unit-test/is-empty/number/unit-test.logic.yaml.gen.md) for [`NOT_EMPTY`](#not_empty) operation on [Number](#number-type) type
- [unit tests](../../../ce/unit-test/is-empty/date-time/unit-test.logic.yaml.gen.md) for [`NOT_EMPTY`](#not_empty) operation on [DateTime](#datetime-type) type
- [unit tests](../../../ce/unit-test/is-empty/collection/unit-test.logic.yaml.gen.md) for [`NOT_EMPTY`](#not_empty) operation on [Collection](#collection-type) type

### `IS_EQUAL`

```yaml
IS_EQUAL:
  left: { arg1 } # required
  right: { arg2 } # required
```

#### Description

The `IS_EQUAL` operation performs an equality check between two arguments, `left` and `right`. It returns a [boolean](#boolean-type) value: `true` if the arguments are considered equal, and `false` otherwise.
All types are supported, behavior of equality depends on the provided type (see [Type System](#type-system)).
Both arguments are required to be the same type. Cross-type comparisons are not supported.

#### Parameters

- **`left` (Operation<[Any](#type-system)>, required):**
  - Specifies the first argument for comparison.
  - This can be any operation that resolves to a supported Compliance Engine type (Text, Bytes, Number, DateTime, Collection, Boolean, etc.).

- **`right` (Operation<[Any](#type-system)>, required):**
  - Specifies the second argument for comparison.
  - **Must be of the same type as the `left` argument.**

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a field value is equal to a text constant:

    ```yaml
    IS_EQUAL:
      left:
        FIELD:
          path: CA10__stateName__c
      right:
        TEXT: "running"
    ```

2. Checking if a number field is equal to a number constant:

    ```yaml
    IS_EQUAL:
      left:
        FIELD:
          path: CA10__instanceCount__c
      right:
        NUMBER: 1
    ```

3. Checking equality of boolean values:

    ```yaml
    IS_EQUAL:
      left:
        BOOLEAN_FROM:
          arg:
            FIELD:
              path: CA10__detailedMonitoringEnabled__c
          trueValue: "yes"
      right:
        BOOLEAN: true
    ```

### `NOT_EQUAL`

```yaml
NOT_EQUAL:
  left: { arg1 } # required
  right: { arg2 } # required
```

#### Description

The `NOT_EQUAL` operation is the inverse of [`IS_EQUAL`](#is_equal). It checks if the provided arguments `left` and `right` are *not* equal. It returns a [boolean](#boolean-type) value: `true` if the arguments are not equal, and `false` if they are considered equal.
All types are supported, behavior of equality depends on the provided type (see [Type System](#type-system)).
Both arguments are required to be the same type. Cross-type comparisons are not supported.

#### Parameters

- **`left` (Operation<[Any](#type-system)>, required):**
  - Specifies the first argument for comparison.
  - This can be any operation that resolves to a supported Compliance Engine type (Text, Bytes, Number, DateTime, Collection, Boolean, etc.).

- **`right` (Operation<[Any](#type-system)>, required):**
  - Specifies the second argument for comparison.
  - **Must be of the same type as the `left` argument.**

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a text field is not equal to a text constant:

    ```yaml
    NOT_EQUAL:
      left:
        FIELD:
          path: CA10__stateName__c
      right:
        TEXT: "stopped"
    ```

2. Checking if a number field is not equal to a number constant:

    ```yaml
    NOT_EQUAL:
      left:
        FIELD:
          path: CA10__ruleCount__c
      right:
        NUMBER: 50
    ```

3. Checking inequality of boolean values:

   ```yaml
    NOT_EQUAL:
      left:
        BOOLEAN_FROM:
          arg:
            FIELD:
              path: CA10__detailedMonitoringEnabled__c
          trueValue: "yes"
      right:
        BOOLEAN: false
    ```

### `AND`

### `OR`

### `NOT`

### `CONTAINS`

### `ENDS_WITH`

### `STARTS_WITH`

### `GREATER_THAN`

### `GREATER_THAN_EQUAL`

### `LESS_THAN`

### `LESS_THAN_EQUAL`

### `IS_AFTER_TODAY`

### `IS_BEFORE_TODAY`

### `IS_BEYOND_LAST_DAYS`

### `IS_BEYOND_NEXT_DAYS`

### `IS_WITHIN_LAST_DAYS`

### `IS_WITHIN_NEXT_DAYS`

### `COLLECTION_SIZE`

### `COLLECTION_CONTAINS`

### `JSON_QUERY_TEXT`

### `JSON_QUERY_BYTES`

### `JSON_QUERY_BOOLEAN`

### `JSON_QUERY_NUMBER`

### `RELATED_LIST_HAS`

### `RELATED_LIST_HAS_NO`

### `RELATED_LIST_COUNT`

### `AWS_POLICY_ALLOWS`

### `GCP_LOGGING_QUERY_MATCH`

### `IS_DISAPPEARED`

### `DEBUG`

### `UNIT_TEST`

### `UNIT_TEST_DATE_TIME`

### `UNIT_TEST_NULL`

### `UNIT_TEST_RUNTIME_ERROR`
