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
| [`DATE_TIME`](#date_time)                             | DateTime                      |
| [`COLLECTION`](#collection)                           | Collection                    |
| [`JSON`](#json)                                       | Collection                    |
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
| [`STARTS_WITH`](#starts_with)                         | Boolean                       |
| [`ENDS_WITH`](#ends_with)                             | Boolean                       |
| Numerical Comparison                                  |                               |
| [`GREATER_THAN`](#greater_than)                       | Boolean                       |
| [`GREATER_THAN_EQUAL`](#greater_than_equal)           | Boolean                       |
| [`LESS_THAN`](#less_than)                             | Boolean                       |
| [`LESS_THAN_EQUAL`](#less_than_equal)                 | Boolean                       |
| Date & Time                                           |                               |
| [`IS_BEFORE_TODAY`](#is_before_today)                 | Boolean                       |
| [`IS_AFTER_TODAY`](#is_after_today)                   | Boolean                       |
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
| [`UNIT_TEST_NULL`](#unit_test_null)                   | Any                           |
| [`UNIT_TEST_RUNTIME_ERROR`](#unit_test_runtime_error) | Any                           |

## Type System

Compliance Engine type system is tailored for declarative policy development. These types not always behave as their counterparts from common programming languages.

### Text Type

The `Text` type in the Compliance Engine is a fundamental type designed for handling string data. It simplifies comparisons by normalizing case and a wide range of whitespace characters—including spaces, tabs (`\t`), newlines (`\n`), and carriage returns (`\r`)—making it ideal for scenarios where the general content of the text matters more than its exact formatting. Unlike the [`Bytes`](#bytes-type) type, which preserves precise string representations, the `Text` type ensures that variations in case and whitespace do not impact equality or pattern matching operations.

#### Key Characteristics

- **Case Insensitivity:** All comparisons ignore case differences. For example, `"Hello"` is treated as equal to `"hello"`.
- **Whitespace Normalization:**
  - Leading and trailing whitespace characters (spaces, tabs, newlines, carriage returns) are removed.
  - Multiple consecutive whitespace characters (spaces, tabs, newlines, carriage returns) are collapsed into a single space.
  - Examples of normalization:
    - `"  Hello   World  "` becomes `"hello world"`.
    - `"a\nb\tc\r d"` becomes `"a b c d"`.
    - `" aa   bb  cc "` becomes `"aa bb cc"`.
- **Text-Only:** The `Text` type is limited to text data and does not support binary data.

#### Purpose

The `Text` type is tailored for use cases where exact casing and whitespace formatting (including special characters like tabs and newlines) are not significant, such as:

- **General Text Handling:** Comparing or searching strings where case and extra whitespace should be ignored, like usernames, descriptions, or tags.
- **User-Friendly Inputs:** Managing fields where users might input data inconsistently in terms of case or spacing (e.g., `"John Doe"`, `"john doe"`, or `"John\nDoe"`).
- **Simplified Matching:** Enabling straightforward string matching in policies without needing to account for formatting variations caused by different whitespace characters.

#### When to Use `Text` Type

Choose the `Text` type when your policy requires string comparisons that are tolerant of differences in case and whitespace, including special characters like tabs, newlines, and carriage returns. For cases where exact string matching is essential—such as API keys, passwords, or encoded data—use the [`Bytes`](#bytes-type) type instead.

#### Examples

Here are practical examples demonstrating how the `Text` type behaves in policy conditions, incorporating its normalization of special characters:

1. **Case-Insensitive Matching with Newlines:**
   - **Field:** `CA10__status__c` contains `"Active\n"`.
   - **Operation:**

     ```yaml
     IS_EQUAL:
       left:
         FIELD:
           path: CA10__status__c
       right:
         TEXT: "active"
     ```

   - **Result:** `true` because `"Active\n"` normalizes to `"active"`, ignoring case and the newline.

2. **Whitespace Normalization with Tabs and Spaces:**
   - **Field:** `CA10__name__c` contains `"  John\tDoe  "`.
   - **Operation:**

     ```yaml
     IS_EQUAL:
       left:
         FIELD:
           path: CA10__name__c
       right:
         TEXT: "john doe"
     ```

   - **Result:** `true` because leading/trailing spaces and tabs are trimmed, and internal tabs collapse to spaces.

3. **Handling Multiple Spaces and Newlines:**
   - **Field:** `CA10__description__c` contains `"Hello   World\n\nTest"`.
   - **Operation:**

     ```yaml
     CONTAINS:
       arg:
         FIELD:
           path: CA10__description__c
       substring:
         TEXT: "hello world test"
     ```

   - **Result:** `true` because multiple spaces and newlines are collapsed into single spaces, normalizing to `"hello world test"`.

4. **Matching Strings with Mixed Whitespace:**
   - **Field:** `CA10__config__c` contains `"key=value\r\nsetting=enabled"`.
   - **Operation:**

     ```yaml
     CONTAINS:
       arg:
         FIELD:
           path: CA10__config__c
       substring:
         TEXT: "key=value setting=enabled"
     ```

   - **Result:** `true` because `\r\n` is normalized to a single space, aligning the strings for comparison.

#### Important Notes

- **Normalization Impact:** The normalization of case and whitespace may cause unexpected matches if exact string representation matters. For precise matching, use the [`Bytes`](#bytes-type) type.
- **Not for Sensitive Data:** Avoid the `Text` type for data where case or whitespace is significant, such as passwords, API keys, or encoded strings.
- **Null and Empty String Handling:** Empty strings (`""`) and null values are treated as equivalent. In operations like `CONTAINS`, an empty or null string contains another empty or null string but not a non-empty string.

#### Relevant Unit Tests

To explore or validate the `Text` type's behavior further, check these unit tests:

- [Unit tests](../../../ce/unit-test/is-empty/text/unit-test.logic.yaml.gen.md) for `IS_EMPTY` operation on Text type
- [Unit tests](../../../ce/unit-test/is-equal/text/unit-test.logic.yaml.gen.md) for `IS_EQUAL` operation on Text type
- [Unit tests](../../../ce/unit-test/contains/unit-test.logic.yaml.gen.md) for `CONTAINS` operation on Text type
- [Unit tests](../../../ce/unit-test/starts-with/unit-test.logic.yaml.gen.md) for `STARTS_WITH` operation on Text type
- [Unit tests](../../../ce/unit-test/ends-with/unit-test.logic.yaml.gen.md) for `ENDS_WITH` operation on Text type

### Bytes Type

The `Bytes` type in the Compliance Engine is a specialized text type designed to preserve case sensitivity and retain all whitespace exactly as provided, without trimming or normalization. Unlike the standard [`Text`](#text-type) type, which may normalize case or whitespace for comparisons, the `Bytes` type ensures that string values are treated precisely as they are entered. This makes it ideal for scenarios requiring exact string matching.

#### Key Characteristics

- **Case Sensitivity:** Uppercase and lowercase letters are treated as distinct (e.g., `"Key"` and `"key"` are different).
- **Whitespace Preservation:** All spaces, tabs, and newlines are retained with no trimming or normalization (e.g., `"  hello "` keeps its leading and trailing spaces).
- **Text-Only:** Despite its name, the `Bytes` type does not store or process binary data; it is strictly a text type with specific handling rules.

#### Purpose

The `Bytes` type is intended for use cases where the exact representation of text matters, such as:

- **Sensitive Identifiers:** API keys, tokens, or other identifiers where case and whitespace are significant.
- **Encoded Strings:** Text-based encoded data (e.g., base64 strings) that must remain unaltered for accurate processing or comparison.
- **Precise Configuration Values:** Settings or strings where whitespace or case differences carry meaning.

#### When to Use `Bytes` Type

Use the `Bytes` type when your policy requires exact string comparisons without modifications to case or whitespace. For general text handling where normalization is acceptable, the `Text` type is more appropriate.

#### Examples

1. **Matching an API Key Exactly:**
   - **Field**: `CA10__apiKey__c` contains `"AbCdEf123"`.
   - **Operation**:

     ```yaml
     IS_EQUAL:
       left:
         FIELD:
           path: CA10__apiKey__c
       right:
         BYTES: "AbCdEf123"
     ```

   - **Result:** `true` only if the field matches `"AbCdEf123"` exactly, including case.

2. **Checking Whitespace in a Configuration String:**
   - **Field**: `CA10__configString__c` contains `"  indent: 4"`.
   - **Operation**:

     ```yaml
     STARTS_WITH:
       arg:
         FIELD:
           path: CA10__configString__c
       prefix:
         BYTES: "  "
     ```

   - **Result:** `true` because the string starts with exactly two spaces.

3. **Comparing Encoded Data:**
   - **Field**: `CA10__encodedData__c` contains `"SGVsbG8="`.
   - **Operation**:

     ```yaml
     IS_EQUAL:
       left:
         FIELD:
           path: CA10__encodedData__c
       right:
         BYTES: "SGVsbG8="
     ```

   - **Result:** `true` if the field matches the base64 string exactly.

#### Important Notes

- **Not for Binary Data:** The `Bytes` type is not a container for binary data. The Cloudaware CMDB does not support binary storage, and this type is meant solely for text with precise handling.
- **Naming Clarification:** The name "Bytes" reflects its focus on exactness (like raw bytes in some contexts), but it remains a text-based type in practice.

#### Relevant Unit Tests

To explore or validate the `Bytes` type's behavior further, check these unit tests:

- [Unit tests](../../../ce/unit-test/is-equal/bytes/unit-test.logic.yaml.gen.md) for [`IS_EQUAL`](#is_equal) operation on Bytes type
- [Unit tests](../../../ce/unit-test/is-empty/bytes/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on Bytes type

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

- [Unit Tests](../../../ce/unit-test/is-equal/number/unit-test.logic.yaml.gen.md) for [`IS_EQUAL`](#is_equal) operation on Number type
- [Unit Tests](../../../ce/unit-test/is-empty/number/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on Number type
- [Unit Tests](../../../ce/unit-test/greater-than/unit-test.logic.yaml.gen.md) for [`GREATER_THAN`](#greater_than)
- [Unit Tests](../../../ce/unit-test/greater-than-equal/unit-test.logic.yaml.gen.md) for [`GREATER_THAN_EQUAL`](#greater_than_equal)
- [Unit Tests](../../../ce/unit-test/less-than/unit-test.logic.yaml.gen.md) for [`LESS_THAN`](#less_than)
- [Unit Tests](../../../ce/unit-test/less-than-equal/unit-test.logic.yaml.gen.md) for [`LESS_THAN_EQUAL`](#less_than_equal)

### DateTime Type

DateTime type represents a specific point in time, combining both date and time components. Key features:

- Stores both date and time information with precision up to milliseconds.
- Timezone-aware. All DateTime values are stored and processed in UTC. When comparing DateTime values, timezones are normalized to UTC for accurate comparison.
- `null` is considered an empty DateTime value.
- Standard comparison operations like `IS_EQUAL`, `NOT_EQUAL`, work as expected for DateTime values.
- Contrary to usual approach to DateTime operations (like in BigQuery), where there are `CURRENT_DATETIME`, `DATETIME_ADD`, `DATETIME_SUB` functions which work together with numeric comparisons like `<`, `<=`, `<`, `>=`, Compliance Engine's approach is to minimize nested function calls by expose operations that integrate reference to current date and time, shifts and comparisons in one operation.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-equal/date-time/unit-test.logic.yaml.gen.md) for [`IS_EQUAL`](#is_equal) operation on DateTime type
- [Unit Tests](../../../ce/unit-test/is-empty/date-time/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on DateTime type
- [Unit Tests](../../../ce/unit-test/is-after-today/unit-test.logic.yaml.gen.md) for [`IS_AFTER_TODAY`](#is_after_today)
- [Unit Tests](../../../ce/unit-test/is-before-today/unit-test.logic.yaml.gen.md) for [`IS_BEFORE_TODAY`](#is_before_today)
- [Unit Tests](../../../ce/unit-test/is-beyond-last-days/unit-test.logic.yaml.gen.md) for [`IS_BEYOND_LAST_DAYS`](#is_beyond_last_days)
- [Unit Tests](../../../ce/unit-test/is-beyond-next-days/unit-test.logic.yaml.gen.md) for [`IS_BEYOND_NEXT_DAYS`](#is_beyond_next_days)
- [Unit Tests](../../../ce/unit-test/is-within-last-days/unit-test.logic.yaml.gen.md) for [`IS_WITHIN_LAST_DAYS`](#is_within_last_days)
- [Unit Tests](../../../ce/unit-test/is-within-next-days/unit-test.logic.yaml.gen.md) for [`IS_WITHIN_NEXT_DAYS`](#is_within_next_days)

### Duration Type

Duration type represents a span of time, expressed in days, hours, minutes, and seconds. Key features:

- Represents a time difference, not a specific point in time.
- Can represent durations of any length, from seconds to many years.
- `null` is considered an empty Duration value.
- Durations are always positive. Negative durations are not supported.

### Collection Type

The Collection Type represents an unordered collection of [Text](#text-type) values. Key features:

- Order of the elements in a collection does not matter.
- Item type is always [Text](#text-type).
- No duplicate values allowed. Item comparison is based on [`IS_EQUAL`](#is_equal) operation for [Text](#text-type) type.
- Items considered empty by [`IS_EMPTY`](#is_empty) operation are not added to collection.
- `null` and empty collections are considered equal by [`IS_EQUAL`](#is_equal) and empty by the [`IS_EMPTY`](#is_empty) operation.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-equal/collection/unit-test.logic.yaml.gen.md) for [`IS_EQUAL`](#is_equal) operation on Collection type
- [Unit Tests](../../../ce/unit-test/is-empty/collection/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on Collection type
- [Unit Tests](../../../ce/unit-test/collection-size/unit-test.logic.yaml.gen.md) for [`COLLECTION_SIZE`](#collection_size) operation
- [Unit Tests](../../../ce/unit-test/collection-contains/unit-test.logic.yaml.gen.md) for [`COLLECTION_CONTAINS`](#collection_contains) operation
- [Unit Tests](../../../ce/unit-test/collection-from/unit-test.logic.yaml.gen.md) for [`COLLECTION_FROM`](#collection_from) operation

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

### `DATE_TIME`

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

### `JSON`

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

- [Unit Tests](../../../ce/unit-test/is-empty/text/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on [Text](#text-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/bytes/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on [Bytes](#bytes-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/boolean/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on [Boolean](#boolean-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/number/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on [Number](#number-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/date-time/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on [DateTime](#datetime-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/collection/unit-test.logic.yaml.gen.md) for [`IS_EMPTY`](#is_empty) operation on [Collection](#collection-type) type

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

- [Unit Tests](../../../ce/unit-test/is-empty/text/unit-test.logic.yaml.gen.md) for [`NOT_EMPTY`](#not_empty) operation on [Text](#text-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/bytes/unit-test.logic.yaml.gen.md) for [`NOT_EMPTY`](#not_empty) operation on [Bytes](#bytes-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/boolean/unit-test.logic.yaml.gen.md) for [`NOT_EMPTY`](#not_empty) operation on [Boolean](#boolean-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/number/unit-test.logic.yaml.gen.md) for [`NOT_EMPTY`](#not_empty) operation on [Number](#number-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/date-time/unit-test.logic.yaml.gen.md) for [`NOT_EMPTY`](#not_empty) operation on [DateTime](#datetime-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/collection/unit-test.logic.yaml.gen.md) for [`NOT_EMPTY`](#not_empty) operation on [Collection](#collection-type) type

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

```yaml
AND:
  args: # required
    - { arg1 }
    - { arg2 }
    # ...
```

#### Description

The `AND` operation performs a logical AND operation on a list of boolean arguments. It returns a [boolean](#boolean-type) value: `true` if **all** arguments evaluate to `true`, and `false` otherwise.
The operation uses short-circuit evaluation: if any argument evaluates to `false`, the operation immediately returns `false` without evaluating the remaining arguments.

#### Parameters

- **`args` (list of Operation<[Boolean](#boolean-type)>, required):**
  - Specifies a YAML list of boolean operations to be evaluated.
  - Must contain at least one argument. However, it only makes sense to use at lest two arguments, as a single argument `AND` is can be replaced by the argument itself.
  - Each item in the list should be an operation that resolves to a [boolean](#boolean-type) value, such as [`IS_EQUAL`](#is_equal), [`IS_EMPTY`](#is_empty), [`CONTAINS`](#contains), or nested logical operations like `AND`, `OR`, `NOT`.

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. AND operation with mixed operations:

    ```yaml
    AND:
      args:
        - IS_EQUAL:
            left:
              FIELD:
                path: CA10__stateName__c
            right:
              TEXT: "running"
        - NOT_EMPTY:
            arg:
              FIELD:
                path: CA10__publicIpAddress__c
    ```

   This example checks if an instance is both in the "running" state AND has a non-empty public IP address.

### `OR`

```yaml
OR:
  args: # required
    - { arg1 }
    - { arg2 }
    # ...
```

#### Description

The `OR` operation performs a logical OR operation on a list of boolean arguments. It returns a [boolean](#boolean-type) value: `true` if **at least one** argument evaluates to `true`, and `false` if all arguments are `false`.
The operation uses short-circuit evaluation: if any argument evaluates to `true`, the operation immediately returns `true` without evaluating the remaining arguments.

#### Parameters

- **`args` (list of Operation<[Boolean](#boolean-type)>, required):**
  - Specifies a YAML list of boolean operations to be evaluated.
  - Must contain at least one argument. However, it only makes sense to use at lest two arguments, as a single argument `AND` is can be replaced by the argument itself.
  - Each item in the list should be an operation that resolves to a [boolean](#boolean-type) value.

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. OR operation with mixed operations:

    ```yaml
    OR:
      args:
        - GREATER_THAN:
            left:
              FIELD:
                path: CA10__ramGb__c
            right:
              NUMBER: 32
        - GREATER_THAN:
            left:
              FIELD:
                path: CA10__vCpu__c
            right:
              NUMBER: 8
    ```

   This example checks if an instance has more the 32 GB of RAM or more than 8 vCPU.

### `NOT`

```yaml
NOT:
  arg: { arg } # required
```

#### Description

The `NOT` operation performs a logical NOT operation on a boolean argument. It returns a [boolean](#boolean-type) value: `true` if the argument is `false`, and `false` if the argument is `true`.

Majority of operations come in normal and negated variants (e.g. [`IS_EMPTY`](#is_empty) and [`NOT_EMPTY`](#not_empty)) to reduce the number of operations required to describe the logic. It is advised to use appropriate variant of the operation to eliminate unneeded use of `NOT`. `NOT` operation is primarily intended to be used with complex operation without negated variant like [`AWS_POLICY_ALLOWS`](#aws_policy_allows), [`GCP_LOGGING_QUERY_MATCH`](#gcp_logging_query_match), etc.

#### Parameters

- **`arg` (Operation<[Boolean](#boolean-type)>, required):**
  - Specifies the boolean operation to be negated.
  - Should be an operation that resolves to a [boolean](#boolean-type) value.

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. NOT operation with another operation:

    ```yaml
    NOT:
      arg:
        FIELD:
          path: CA10__publiclyAccessible__c
    ```

   This example checks if an instance is NOT publicly accessible.

### `CONTAINS`

```yaml
CONTAINS:
  arg: { arg } # required
  substring: { substring } # required
```

#### Description

The `CONTAINS` operation checks if a [text](#text-type) (string) value specified by the `arg` parameter contains another [text](#text-type) (string) value specified by the `substring` parameter.
The comparison is case-insensitive and whitespace-normalized, consistent with the [Text Type](#text-type) behavior.
It returns a [boolean](#boolean-type) value: `true` if the `arg` string contains the `substring`, and `false` otherwise.

#### Parameters

- **`arg` (Operation<[Text](#text-type)>, required):**
  - Specifies the [text](#text-type) value to be searched within.
  - This should be an operation that resolves to a [text](#text-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`JSON_QUERY_TEXT`](#json_query_text), etc.

- **`substring` (Operation<[Text](#text-type)>, required):**
  - Specifies the [text](#text-type) value to search for within the `arg`.
  - This should be an operation that resolves to a [text](#text-type) value.

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a field value contains a specific substring:

    ```yaml
    CONTAINS:
      arg:
        FIELD:
          path: CA10__description__c
      substring:
        TEXT: "expired"
    ```

   This example checks if the `CA10__description__c` field value contains the substring `expired`.

2. Using `NOT` with `CONTAINS` to check for the absence of a substring:

    ```yaml
    NOT:
      arg:
        CONTAINS:
          arg:
            FIELD:
              path: CA10__name__c
          substring:
            TEXT: "test"
    ```

   This example checks if the `CA10__name__c` field value does *not* contain the substring `test`.

See more details in:

- [Unit Tests](../../../ce/unit-test/contains/unit-test.logic.yaml.gen.md) for [`CONTAINS`](#contains) operation

### `STARTS_WITH`

```yaml
STARTS_WITH:
  arg: { arg } # required
  prefix: { prefix } # required
```

#### Description

The `STARTS_WITH` operation checks if a [text](#text-type) (string) value specified by the `arg` parameter starts with another [text](#text-type) (string) value specified by the `prefix` parameter.
The comparison is case-insensitive and whitespace-normalized, consistent with the [Text Type](#text-type) behavior.
It returns a [boolean](#boolean-type) value: `true` if the `arg` string starts with the `prefix`, and `false` otherwise.

#### Parameters

- **`arg` (Operation<[Text](#text-type)>, required):**
  - Specifies the [text](#text-type) value to be checked.
  - This should be an operation that resolves to a [text](#text-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`JSON_QUERY_TEXT`](#json_query_text), etc.

- **`prefix` (Operation<[Text](#text-type)>, required):**
  - Specifies the [text](#text-type) value to check as the starting prefix.
  - This should be an operation that resolves to a [text](#text-type) value.

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a field value starts with a specific prefix:

    ```yaml
    STARTS_WITH:
      arg:
        FIELD:
          path: Name
      prefix:
        TEXT: "i-"
    ```

   This example checks if the `Name` field value starts with the prefix `i-`.

2. Using `NOT` with `STARTS_WITH` to check if a string does not start with a prefix:

    ```yaml
    NOT:
      arg:
        STARTS_WITH:
          arg:
            FIELD:
              path: CA10__domainName__c
          prefix:
            TEXT: "*"
    ```

   This example checks if the `CA10__domainName__c` field value does *not* start with the prefix `*` (wildcard).

See more details in:

- [Unit Tests](../../../ce/unit-test/starts-with/unit-test.logic.yaml.gen.md) for [`STARTS_WITH`](#starts_with) operation

### `ENDS_WITH`

```yaml
ENDS_WITH:
  arg: { arg } # required
  suffix: { suffix } # required
```

#### Description

The `ENDS_WITH` operation checks if a [text](#text-type) (string) value specified by the `arg` parameter ends with another [text](#text-type) (string) value specified by the `suffix` parameter.
The comparison is case-insensitive and whitespace-normalized, consistent with the [Text Type](#text-type) behavior.
It returns a [boolean](#boolean-type) value: `true` if the `arg` string ends with the `suffix`, and `false` otherwise.

#### Parameters

- **`arg` (Operation<[Text](#text-type)>, required):**
  - Specifies the [text](#text-type) value to be checked.
  - This should be an operation that resolves to a [text](#text-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`JSON_QUERY_TEXT`](#json_query_text), etc.

- **`suffix` (Operation<[Text](#text-type)>, required):**
  - Specifies the [text](#text-type) value to check as the ending suffix.
  - This should be an operation that resolves to a [text](#text-type) value.

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a field value ends with a specific suffix:

    ```yaml
    ENDS_WITH:
      arg:
        FIELD:
          path: CA10__name__c
      suffix:
        TEXT: "-prod"
    ```

   This example checks if the `CA10__name__c` field value ends with the suffix `-prod`.

2. Using `NOT` with `ENDS_WITH` to check if a string does not end with a suffix:

    ```yaml
    NOT:
      arg:
        ENDS_WITH:
          arg:
            FIELD:
              path: CA10__domainName__c
          suffix:
            TEXT: ".com"
    ```

   This example checks if the `CA10__domainName__c` field value does *not* end with the suffix `.com`.

See more details in:

- [Unit Tests](../../../ce/unit-test/ends-with/unit-test.logic.yaml.gen.md) for [`ENDS_WITH`](#ends_with) operation

### `GREATER_THAN`

```yaml
GREATER_THAN:
  left: { arg1 } # required
  right: { arg2 } # required
```

#### Description

The `GREATER_THAN` operation performs a numerical comparison to check if the `left` argument is strictly greater than the `right` argument. It returns a [boolean](#boolean-type) value: `true` if `left` is greater than `right`, and `false` otherwise.
Both arguments must be of [number](#number-type) type.

#### Parameters

- **`left` (Operation<[Number](#number-type)>, required):**
  - Specifies the first argument for comparison.
  - This should be an operation that resolves to a [number](#number-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`NUMBER`](#number), [`COLLECTION_SIZE`](#collection_size), etc.

- **`right` (Operation<[Number](#number-type)>, required):**
  - Specifies the second argument for comparison.
  - **Must be of the same type as the `left` argument.**

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a number field is greater than a number constant:

    ```yaml
    GREATER_THAN:
      left:
        FIELD:
          path: CA10__instanceCount__c
      right:
        NUMBER: 5
    ```

   This example checks if the value of the `CA10__instanceCount__c` field is greater than the number constant `5`.

2. Using `GREATER_THAN` with `COLLECTION_SIZE`:

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

   This example checks if the size of the collection created from the `CA10__availabilityZones__c` field is greater than `1`.

See more details in:

- [Unit Tests](../../../ce/unit-test/greater-than/unit-test.logic.yaml.gen.md) for [`GREATER_THAN`](#greater_than) operation

### `GREATER_THAN_EQUAL`

```yaml
GREATER_THAN_EQUAL:
  left: { arg1 } # required
  right: { arg2 } # required
```

#### Description

The `GREATER_THAN_EQUAL` operation performs a numerical comparison to check if the `left` argument is greater than or equal to the `right` argument. It returns a [boolean](#boolean-type) value: `true` if `left` is greater than or equal to `right`, and `false` otherwise.
Both arguments must be of [number](#number-type) type.

#### Parameters

- **`left` (Operation<[Number](#number-type)>, required):**
  - Specifies the first argument for comparison.
  - This can be any operation that resolves to a [number](#number-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`NUMBER`](#number), [`COLLECTION_SIZE`](#collection_size), etc.

- **`right` (Operation<[Number](#number-type)>, required):**
  - Specifies the second argument for comparison.
  - **Must be of the same type as the `left` argument.**

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a number field is greater than or equal to a number constant:

    ```yaml
    GREATER_THAN_EQUAL:
      left:
        FIELD:
          path: CA10__ruleCount__c
      right:
        NUMBER: 50
    ```

   This example checks if the value of the `CA10__ruleCount__c` field is greater than or equal to the number constant `50`.

2. Using `GREATER_THAN_EQUAL` with `RELATED_LIST_COUNT`:

    ```yaml
      GREATER_THAN_EQUAL:
        left:
          RELATED_LIST_COUNT:
            status: "COMPLIANT"
            relationshipName: "CA10__AWS_EC2_Security_Group_Rules__r"
        right:
          NUMBER: 1
    ```

   This example checks if the related list has at least 1 `COMPLIANT` object.

See more details in:

- [Unit Tests](../../../ce/unit-test/greater-than-equal/unit-test.logic.yaml.gen.md) for [`GREATER_THAN_EQUAL`](#greater_than_equal) operation

### `LESS_THAN`

```yaml
LESS_THAN:
  left: { arg1 } # required
  right: { arg2 } # required
```

#### Description

The `LESS_THAN` operation performs a numerical comparison to check if the `left` argument is strictly less than the `right` argument. It returns a [boolean](#boolean-type) value: `true` if `left` is less than `right`, and `false` otherwise.
Both arguments must be of [number](#number-type) type.

#### Parameters

- **`left` (Operation<[Number](#number-type)>, required):**
  - Specifies the first argument for comparison.
  - This can be any operation that resolves to a [number](#number-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`NUMBER`](#number), [`COLLECTION_SIZE`](#collection_size), etc.

- **`right` (Operation<[Number](#number-type)>, required):**
  - Specifies the second argument for comparison.
  - **Must be of the same type as the `left` argument.**

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a number field is less than a number constant:

    ```yaml
    LESS_THAN:
      left:
        FIELD:
          path: CA10__cpuCount__c
      right:
        NUMBER: 4
    ```

   This example checks if the value of the `CA10__cpuCount__c` field is less than the number constant `4`.

2. Using `LESS_THAN` with `JSON_QUERY_NUMBER`:

    ```yaml
      LESS_THAN:
        left:
          JSON_QUERY_NUMBER:
            arg:
              JSON_FROM:
                arg: 
                  EXTRACT: "CA10__securityCenterAutoProvisioning__c"
            expression: "length([? name == 'default' && autoProvision == 'Off'])"
        right:
          NUMBER: 1
    ```

   This example checks if the number extracted from JSON is less than `1`.

See more details in:

- [Unit Tests](../../../ce/unit-test/less-than/unit-test.logic.yaml.gen.md) for [`LESS_THAN`](#less_than) operation

### `LESS_THAN_EQUAL`

```yaml
LESS_THAN_EQUAL:
  left: { arg1 } # required
  right: { arg2 } # required
```

#### Description

The `LESS_THAN_EQUAL` operation performs a numerical comparison to check if the `left` argument is less than or equal to the `right` argument. It returns a [boolean](#boolean-type) value: `true` if `left` is less than or equal to `right`, and `false` otherwise.
Both arguments must be of [number](#number-type) type.

#### Parameters

- **`left` (Operation<[Number](#number-type)>, required):**
  - Specifies the first argument for comparison.
  - This can be any operation that resolves to a [number](#number-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`NUMBER`](#number), [`COLLECTION_SIZE`](#collection_size), etc.

- **`right` (Operation<[Number](#number-type)>, required):**
  - Specifies the second argument for comparison.
  - **Must be of the same type as the `left` argument.**

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a number field is less than or equal to a number constant:

    ```yaml
    LESS_THAN_EQUAL:
      left:
        FIELD:
          path: CA10__ruleCount__c
      right:
        NUMBER: 50
    ```

   This example checks if the value of the `CA10__ruleCount__c` field is less than or equal to the number constant `50`.

2. Using `LESS_THAN_EQUAL` with `JSON_QUERY_NUMBER`:

    ```yaml
      LESS_THAN_EQUAL:
        left:
          JSON_QUERY_NUMBER:
            arg: 
              EXTRACT: "caJsonFrom__firewallRules__c"
            expression: "length([? starts_with(name, 'AllowAllAzureServicesAndResourcesWithinAzureIps')])"
          right:
            NUMBER: 2
    ```

   This example checks if the size of the number extracted from JSON is less than or equal to `2`.

See more details in:

- [Unit Tests](../../../ce/unit-test/less-than-equal/unit-test.logic.yaml.gen.md) for [`LESS_THAN_EQUAL`](#less_than_equal) operation

### `IS_BEFORE_TODAY`

```yaml
IS_BEFORE_TODAY:
  arg: { arg } # required
```

#### Description

The `IS_BEFORE_TODAY` operation checks if a [dateTime](#datetime-type) value, provided as the argument `arg`, is strictly before the current day (today). The comparison is based on the current date at UTC midnight. It returns a [boolean](#boolean-type) value: `true` if the `arg` DateTime is before today, and `false` otherwise.

#### Parameters

- **`arg` (Operation<[DateTime](#datetime-type)>, required):**
  - Specifies the [dateTime](#datetime-type) value to be checked.
  - This should be an operation that resolves to a [dateTime](#datetime-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`DATE_TIME_FROM`](#date_time_from), or [`DATE_TIME`](#date_time).

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a date field is before today:

    ```yaml
    IS_BEFORE_TODAY:
      arg:
        FIELD:
          path: CA10__dueDate__c # Assume this field returns a DateTime value
    ```

   This example checks if the date in the `CA10__dueDate__c` field is before the current day.

2. Using `IS_BEFORE_TODAY` in a Condition:

    ```yaml
    - status: INCOMPLIANT
      currentStateMessage: "The expiration date is in the past."
      remediationMessage: "Review and update the expiration date to a future date."
      check:
        IS_BEFORE_TODAY:
          arg:
            EXTRACT: CA10__expirationDate__c # Assume 'CA10__expirationDate__c' is an extract returning DateTime
    ```

   This condition flags a resource as `INCOMPLIANT` if its expiration date, obtained from the `CA10__expirationDate__c` extract, is before today.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-before-today/unit-test.logic.yaml.gen.md) for [`IS_BEFORE_TODAY`](#is_before_today) operation

### `IS_AFTER_TODAY`

```yaml
IS_AFTER_TODAY:
  arg: { arg } # required
```

#### Description

The `IS_AFTER_TODAY` operation checks if a [dateTime](#datetime-type) value, provided as the argument `arg`, is strictly after the current day (today). The comparison is based on the current date at UTC midnight. It returns a [boolean](#boolean-type) value: `true` if the `arg` DateTime is after today, and `false` otherwise.

#### Parameters

- **`arg` (Operation<[DateTime](#datetime-type)>, required):**
  - Specifies the [dateTime](#datetime-type) value to be checked.
  - This can be any operation that resolves to a [dateTime](#datetime-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`DATE_TIME_FROM`](#date_time_from), or [`DATE_TIME`](#date_time).

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a date field is after today:

    ```yaml
    IS_AFTER_TODAY:
      arg:
        FIELD:
          path: CA10__startTime__c # Assume this field returns a DateTime value
    ```

   This example checks if the date in the `CA10__startTime__c` field is after the current day.

2. Using `IS_AFTER_TODAY` in a Condition:

    ```yaml
    - status: COMPLIANT
      currentStateMessage: "Certificate is not expired yet."
      check:
        IS_AFTER_TODAY:
          arg:
            EXTRACT: CA10__expiration__c # Assume 'CA10__expiration__c' is an extract returning DateTime
    ```

   This condition flags a resource as `COMPLIANT` if its expiration date, obtained from the `CA10__expiration__c` extract, is in the future.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-after-today/unit-test.logic.yaml.gen.md) for [`IS_AFTER_TODAY`](#is_after_today) operation

### `IS_BEYOND_LAST_DAYS`

```yaml
IS_BEYOND_LAST_DAYS:
  arg: { arg } # required
  offsetDays: { offsetDays } # required
```

#### Description

The `IS_BEYOND_LAST_DAYS` operation checks if a [dateTime](#datetime-type) value, provided as the argument `arg`, is strictly earlier than a date calculated by subtracting a specified number of days (`offsetDays`) from the current day (today). The comparison is based on the current date at UTC midnight. It returns a [boolean](#boolean-type) value: `true` if the `arg` DateTime is beyond the last `offsetDays`, and `false` otherwise.

#### Parameters

- **`arg` (Operation<[DateTime](#datetime-type)>, required):**
  - Specifies the [dateTime](#datetime-type) value to be checked.
  - This should be an operation that resolves to a [dateTime](#datetime-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`DATE_TIME_FROM`](#date_time_from), etc.

- **`offsetDays` (number, required):**
  - Specifies the number of days to subtract from the current date for the comparison.
  - Must be a non-negative integer.

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a date field is beyond the last 30 days:

    ```yaml
    IS_BEYOND_LAST_DAYS:
      arg:
        FIELD:
          path: CA10__lastModifiedDate__c # Assume this field returns a DateTime value
      offsetDays: 30
    ```

   This example checks if the date in the `CA10__lastModifiedDate__c` field is earlier than 30 days ago.

2. Using `IS_BEYOND_LAST_DAYS` in a Condition:

    ```yaml
    - status: INCOMPLIANT
      currentStateMessage: "The resource has not been modified in the last 90 days and is considered stale."
      remediationMessage: "Review and update the resource or consider archiving it."
      check:
        IS_BEYOND_LAST_DAYS:
          arg:
            EXTRACT: CA10__lastModified__c # Assume 'CA10__lastModified__c' is an extract returning DateTime
          offsetDays: 90
    ```

   This condition flags a resource as `INCOMPLIANT` if its last modification date, obtained from the `CA10__lastModified__c` extract, is beyond the last 90 days.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-beyond-last-days/unit-test.logic.yaml.gen.md) for [`IS_BEYOND_LAST_DAYS`](#is_beyond_last_days) operation

### `IS_BEYOND_NEXT_DAYS`

```yaml
IS_BEYOND_NEXT_DAYS:
  arg: { arg } # required
  offsetDays: { offsetDays } # required
```

#### Description

The `IS_BEYOND_NEXT_DAYS` operation checks if a [dateTime](#datetime-type) value, provided as the argument `arg`, is strictly later than a date calculated by adding a specified number of days (`offsetDays`) to the current day (today). The comparison is based on the current date at UTC midnight. It returns a [boolean](#boolean-type) value: `true` if the `arg` DateTime is beyond the next `offsetDays`, and `false` otherwise.

#### Parameters

- **`arg` (Operation<[DateTime](#datetime-type)>, required):**
  - Specifies the [dateTime](#datetime-type) value to be checked.
  - This can be any operation that resolves to a [dateTime](#datetime-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`DATE_TIME_FROM`](#date_time_from), etc.

- **`offsetDays` (number, required):**
  - Specifies the number of days to add to the current date for the comparison.
  - Must be a non-negative integer.

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a date field is beyond the next 7 days:

    ```yaml
    IS_BEYOND_NEXT_DAYS:
      arg:
        FIELD:
          path: CA10__expiryDate__c # Assume this field returns a DateTime value
      offsetDays: 7
    ```

   This example checks if the date in the `CA10__expiryDate__c` field is later than 7 days from now.

2. Using `IS_BEYOND_NEXT_DAYS` in a Condition:

    ```yaml
    - status: COMPLIANT
      currentStateMessage: "The resource is valid for more than 30 days."
      check:
        IS_BEYOND_NEXT_DAYS:
          arg:
            EXTRACT: CA10__validUntil__c # Assume 'CA10__validUntil__c' is an extract returning DateTime
          offsetDays: 30
    ```

   This condition flags a resource as `COMPLIANT` if its validity date, obtained from the `CA10__validUntil__c` extract, is beyond the next 30 days.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-beyond-next-days/unit-test.logic.yaml.gen.md) for [`IS_BEYOND_NEXT_DAYS`](#is_beyond_next_days) operation

### `IS_WITHIN_LAST_DAYS`

```yaml
IS_WITHIN_LAST_DAYS:
  arg: { arg } # required
  offsetDays: { offsetDays } # required
```

#### Description

The `IS_WITHIN_LAST_DAYS` operation checks if a [dateTime](#datetime-type) value, provided as the argument `arg`, falls within the last number of days (`offsetDays`) including today. The comparison is based on the current date at UTC midnight. It returns a [boolean](#boolean-type) value: `true` if the `arg` DateTime is within the last `offsetDays`, and `false` otherwise.

#### Parameters

- **`arg` (Operation<[DateTime](#datetime-type)>, required):**
  - Specifies the [dateTime](#datetime-type) value to be checked.
  - This can be any operation that resolves to a [dateTime](#datetime-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`DATE_TIME_FROM`](#date_time_from), etc.

- **`offsetDays` (number, required):**
  - Specifies the number of days to define the "last days" range, including today.
  - Must be a non-negative integer.

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a last login date is within the last 7 days:

    ```yaml
    IS_WITHIN_LAST_DAYS:
      arg:
        FIELD:
          path: CA10__lastLoginDate__c # Assume this field returns a DateTime value
      offsetDays: 7
    ```

   This example checks if the date in the `CA10__lastLoginDate__c` field is within the last 7 days, including today.

2. Using `IS_WITHIN_LAST_DAYS` in a Condition:

    ```yaml
    - status: COMPLIANT
      currentStateMessage: "The user has logged in recently (within the last 30 days)."
      check:
        IS_WITHIN_LAST_DAYS:
          arg:
            EXTRACT: CA10__lastLogin__c # Assume 'CA10__lastLogin__c' is an extract returning DateTime
          offsetDays: 30
    ```

   This condition flags a resource as `COMPLIANT` if the last login date, obtained from the `CA10__lastLogin__c` extract, is within the last 30 days.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-within-last-days/unit-test.logic.yaml.gen.md) for [`IS_WITHIN_LAST_DAYS`](#is_within_last_days) operation

### `IS_WITHIN_NEXT_DAYS`

```yaml
IS_WITHIN_NEXT_DAYS:
  arg: { arg } # required
  offsetDays: { offsetDays } # required
```

#### Description

The `IS_WITHIN_NEXT_DAYS` operation checks if a [dateTime](#datetime-type) value, provided as the argument `arg`, falls within the next number of days (`offsetDays`) including today. The comparison is based on the current date at UTC midnight. It returns a [boolean](#boolean-type) value: `true` if the `arg` DateTime is within the next `offsetDays`, and `false` otherwise.

#### Parameters

- **`arg` (Operation<[DateTime](#datetime-type)>, required):**
  - Specifies the [dateTime](#datetime-type) value to be checked.
  - This can be any operation that resolves to a [dateTime](#datetime-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), [`DATE_TIME_FROM`](#date_time_from), etc.

- **`offsetDays` (number, required):**
  - Specifies the number of days to define the "next days" range, including today.
  - Must be a non-negative integer.

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Checking if a certificate expiration date is within the next 14 days:

    ```yaml
    IS_WITHIN_NEXT_DAYS:
      arg:
        FIELD:
          path: CA10__certificateExpiryDate__c # Assume this field returns a DateTime value
      offsetDays: 14
    ```

   This example checks if the date in the `CA10__certificateExpiryDate__c` field is within the next 14 days, including today.

2. Using `IS_WITHIN_NEXT_DAYS` in a Condition:

    ```yaml
    - status: INCOMPLIANT
      currentStateMessage: "The certificate is expiring soon (within the next 30 days)."
      remediationMessage: "Renew the certificate to avoid service disruption."
      check:
        IS_WITHIN_NEXT_DAYS:
          arg:
            EXTRACT: CA10__certExpiration__c # Assume 'CA10__certExpiration__c' is an extract returning DateTime
          offsetDays: 30
    ```

   This condition flags a resource as `INCOMPLIANT` if its certificate expiration date, obtained from the `CA10__certExpiration__c` extract, is within the next 30 days.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-within-next-days/unit-test.logic.yaml.gen.md) for [`IS_WITHIN_NEXT_DAYS`](#is_within_next_days) operation

### `COLLECTION_SIZE`

```yaml
COLLECTION_SIZE:
  arg: { arg } # required
```

#### Description

The `COLLECTION_SIZE` operation returns the number of elements in a [collection](#collection-type) value provided as the argument `arg`. It returns a [number](#number-type) representing the size of the collection.

#### Parameters

- **`arg` (Operation<[Collection](#collection-type)>, required):**
  - Specifies the [collection](#collection-type) whose size you want to determine.
  - This should be an operation that resolves to a [collection](#collection-type) value, such as [`COLLECTION_FROM`](#collection_from), etc.

#### Return Type

[Number](#number-type)

#### Examples

1. Using `COLLECTION_SIZE` in a condition to check if a collection has more than 5 elements:

    ```yaml
    GREATER_THAN:
      left:
        COLLECTION_SIZE:
          arg:
            COLLECTION_FROM:
              arg:
                FIELD:
                  path: CA10__availabilityZones__c
              separator: ","
      right:
        NUMBER: 5
    ```

   This condition checks if the collection created from the comma-separated string in `CA10__availabilityZones__c` field has more than 5 elements.

See more details in:

- [Unit Tests](../../../ce/unit-test/collection-size/unit-test.logic.yaml.gen.md) for [`COLLECTION_SIZE`](#collection_size) operation

### `COLLECTION_CONTAINS`

```yaml
COLLECTION_CONTAINS:
  arg: { arg } # required
  search: { search } # required
```

#### Description

The `COLLECTION_CONTAINS` operation checks if a [collection](#collection-type) value, provided as the `arg` parameter, contains a specific element, provided as the `search` parameter. The element to search for must be a [text](#text-type) value.
The search is case-insensitive and whitespace-normalized, consistent with the [Text Type](#text-type) behavior.
It returns a [boolean](#boolean-type) value: `true` if the element is found in the collection, and `false` otherwise.

#### Parameters

- **`arg` (Operation<[Collection](#collection-type)>, required):**
  - Specifies the [collection](#collection-type) to be searched.
  - This should be an operation that resolves to a [collection](#collection-type) value, such as [`COLLECTION_FROM`](#collection_from), etc.

- **`search` (Operation<[Text](#text-type)>, required):**
  - Specifies the [text](#text-type) value to search for within the collection.
  - This should be an operation that resolves to a [text](#text-type) value, such as [`FIELD`](#field), [`EXTRACT`](#extract), or [`TEXT`](#text).

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. Using `COLLECTION_CONTAINS` with `FIELD` and `COLLECTION_FROM` to check if a collection contains a field value:

    ```yaml
    COLLECTION_CONTAINS:
      arg:
        COLLECTION_FROM:
          arg:
            FIELD:
              path: CA10__availabilityZones__c
          separator: ","
      search:
        TEXT: us-east-1a
    ```

   This example checks if the collection created from the comma-separated string in `CA10__availabilityZones__c` field contains the element `"us-east-1a"`.

See more details in:

- [Unit Tests](../../../ce/unit-test/collection-contains/unit-test.logic.yaml.gen.md) for [`COLLECTION_CONTAINS`](#collection_contains) operation

### `JSON_QUERY_TEXT`

```yaml
JSON_QUERY_TEXT:
  arg: { arg } # required, Operation<JSON>
  expression: { expression } # required, string (JMESPath expression)
  undeterminedIf:
    evaluationError: { message } # required, string
    resultTypeMismatch: { message } # required, string
    resultIsEmpty: { message } # optional, string
```

#### Description

The `JSON_QUERY_TEXT` operation evaluates a JMESPath expression against a JSON object and returns the result as a text value. It enables the extraction of specific text data from JSON structures, leveraging the JMESPath query language to navigate and transform JSON documents stored in fields or extracts.

#### Parameters

- **`arg` (Operation<[JSON](#json-type)>, required):**
  - The JSON object against which the JMESPath expression will be evaluated.
  - Typically, sourced using `JSON_FROM` to convert a text field containing JSON data into a JSON object, or directly from an extract providing a JSON type.

- **`expression` (string, required):**
  - The JMESPath expression that defines what data to extract from the JSON object.
  - Must result in a text value (string); otherwise, the operation returns an undetermined status with the `resultTypeMismatch` message.
  - JMESPath is a powerful query language for JSON, supporting operations like selecting elements, filtering arrays, and applying functions (e.g., `join`).
  - For complex JSON queries, refer to the [JMESPath documentation](https://jmespath.org/) for supported syntax and functions.

- **`undeterminedIf` (object, required):**
  - Specifies conditions under which the operation returns an undetermined status instead of a value.

    - **`evaluationError` (string, required):**
      - Message returned if there is an error evaluating the JMESPath expression, such as a syntax error.

    - **`resultTypeMismatch` (string, required):**
      - Message returned if the result of the expression is not a text value (e.g., a number, boolean, or array).

    - **`resultIsEmpty` (string, optional):**
      - Message returned if the result is an empty string. When provided, an empty result triggers an undetermined status with this message. If omitted, an empty string is returned as the result.

#### Return Type

[Text](#text-type)

#### Examples

1. **Extracting a simple key from a JSON object:**
   - **Field:** `CA10__configJson__c` contains `{"name": "example", "value": "test"}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_TEXT:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__configJson__c # Assume '' contains  
          undeterminedIf:
            isEmpty: "Config JSON is empty"
            isInvalid: "Config JSON is invalid"
      expression: "name"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a text value"
    ```

   - **Result:** `"example"`
   - **Explanation:** Extracts the value of the `"name"` key from the JSON object.

2. **Extracting a nested value:**
   - **Field:** `CA10__detailsJson__c` contains `{"details": {"id": "123", "status": "active"}}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_TEXT:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__detailsJson__c 
          undeterminedIf:
            isEmpty: "Details JSON is empty"
            isInvalid: "Details JSON is invalid"
      expression: "details.status"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a text value"
    ```

   - **Result:** `"active"`
   - **Explanation:** Accesses the nested `"status"` field within the `"details"` object.

3. **Using JMESPath functions:**
   - **Field:** `CA10__itemsJson__c` contains `{"items": [{"name": "item1"}, {"name": "item2"}]}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_TEXT:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__itemsJson__c 
          undeterminedIf:
            isEmpty: "Items JSON is empty"
            isInvalid: "Items JSON is invalid"
      expression: "join(', ', items[].name)"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a text value"
      ```

   - **Result:** `"item1, item2"`
   - **Explanation:** Uses the JMESPath `join` function to concatenate the `"name"` values from the `"items"` array into a single string.

4. **Handling empty results:**
   - **Field:** `CA10__configJson__c` contains `{"description": ""}`.
   - **Operation:**

    ```yaml
   JSON_QUERY_TEXT:
     arg:
       JSON_FROM:
         arg:
           FIELD:
             path: CA10__configJson__c # 
         undeterminedIf:
           isEmpty: "Config JSON is empty"
           isInvalid: "Config JSON is invalid"
     expression: "description"
     undeterminedIf:
       evaluationError: "Error in JMESPath expression"
       resultTypeMismatch: "Result is not a text value"
       resultIsEmpty: "Description is empty"
   ```

   - **Result:** Undetermined status with message `"Description is empty"`
   - **Explanation:** Since `resultIsEmpty` is specified and the result is an empty string, the operation returns undetermined. Without `resultIsEmpty`, it would return `""`.

### `JSON_QUERY_BYTES`

```yaml
JSON_QUERY_BYTES:
  arg: { arg } # required, Operation<JSON>
  expression: { expression } # required, string (JMESPath expression)
  undeterminedIf:
    evaluationError: { message } # required, string
    resultTypeMismatch: { message } # required, string
    resultIsEmpty: { message } # optional, string
```

#### Description

The `JSON_QUERY_BYTES` operation evaluates a JMESPath expression against a JSON object and returns the result as a `Bytes` type value - a case-sensitive, whitespace-preserving text string. It enables the extraction of specific text data from JSON structures where exact string representation matters, leveraging the JMESPath query language to navigate and select data from JSON documents stored in fields or extracts.

#### Parameters

- **`arg` (Operation<[JSON](#json-type)>, required):**
  - The JSON object against which the JMESPath expression is evaluated.
  - Typically, sourced using `JSON_FROM` to convert a text field containing JSON data into a JSON object, or directly from an extract providing a JSON type.

- **`expression` (string, required):**
  - The JMESPath expression defining the data to extract from the JSON object.
  - Must result in a string value; otherwise, the operation returns an undetermined status with the `resultTypeMismatch` message.
  - The returned string is treated as a `Bytes` type, preserving its exact case and whitespace (including spaces, tabs, newlines, and carriage returns) without normalization.
  - JMESPath supports operations like selecting fields, filtering arrays, and applying functions (e.g., `join`). Refer to the [JMESPath documentation](https://jmespath.org/) for syntax and capabilities.

- **`undeterminedIf` (object, required):**
  - Specifies conditions under which the operation returns an undetermined status instead of a value.

    - **`evaluationError` (string, required):**
      - Message returned if the JMESPath expression evaluation fails, such as due to a syntax error.

    - **`resultTypeMismatch` (string, required):**
      - Message returned if the expression's result is not a string (e.g., a number, boolean, or array).

    - **`resultIsEmpty` (string, optional):**
      - Message returned if the result is an empty string (`""`). When provided, an empty result triggers an undetermined status with this message. If omitted, an empty string is returned as a `Bytes` value.

#### Return Type

[Bytes](#bytes-type)

#### Examples

1. **Extracting a Case-Sensitive Key:**
   - **Field:** `CA10__configJson__c` contains `{"apiKey": "AbCdEf123"}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BYTES:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__configJson__c
          undeterminedIf:
            isEmpty: "Config JSON is empty"
            isInvalid: "Config JSON is invalid"
      expression: "apiKey"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a string"
    ```

   - **Result:** `"AbCdEf123"` (as a `Bytes` type, preserving exact case).
   - **Explanation:** Extracts the `"apiKey"` value, maintaining its original casing.

2. **Extracting a Whitespace-Sensitive Value:**
   - **Field:** `CA10__detailsJson__c` contains `{"format": "  indent: 4\n"}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BYTES:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__detailsJson__c
          undeterminedIf:
            isEmpty: "Details JSON is empty"
            isInvalid: "Details JSON is invalid"
      expression: "format"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a string"
    ```

   - **Result:** `"  indent: 4\n"` (as a `Bytes` type, preserving spaces and newline).
   - **Explanation:** Retrieves the `"format"` field, keeping all whitespace intact.

3. **Using JMESPath Functions with Exact Output:**
   - **Field:** `CA10__itemsJson__c` contains `{"items": [{"id": "A1"}, {"id": "B2"}]}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BYTES:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__itemsJson__c
          undeterminedIf:
            isEmpty: "Items JSON is empty"
            isInvalid: "Items JSON is invalid"
      expression: "join(' - ', items[].id)"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a string"
    ```

   - **Result:** `"A1 - B2"` (as a `Bytes` type, preserving exact output).
   - **Explanation:** Uses the `join` function to concatenate `"id"` values with a separator, retaining the exact string as a `Bytes` type.

4. **Handling Empty Results:**
   - **Field:** `CA10__configJson__c` contains `{"description": ""}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BYTES:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__configJson__c
          undeterminedIf:
            isEmpty: "Config JSON is empty"
            isInvalid: "Config JSON is invalid"
      expression: "description"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a string"
        resultIsEmpty: "Description is empty"
    ```

   - **Result:** Undetermined status with message `"Description is empty"`.
   - **Explanation:** The empty string result triggers the `resultIsEmpty` condition. Without this, it would return `""` as a `Bytes` value.

### `JSON_QUERY_BOOLEAN`

```yaml
JSON_QUERY_BOOLEAN:
  arg: { arg } # required, Operation<JSON>
  expression: { expression } # required, string (JMESPath expression)
  undeterminedIf:
    evaluationError: { message } # required, string
    resultTypeMismatch: { message } # required, string
    resultIsEmpty: { message } # optional, string
```

#### Description

The `JSON_QUERY_BOOLEAN` operation evaluates a JMESPath expression against a JSON object and returns the result as a boolean value. It enables the extraction of specific boolean data from JSON structures, leveraging the JMESPath query language to navigate and query JSON documents stored in fields or extracts.

#### Parameters

- **`arg` (Operation<[JSON](#json-type)>, required):**
  - The JSON object against which the JMESPath expression is evaluated.
  - Typically, sourced using `JSON_FROM` to convert a text field containing JSON data into a JSON object, or directly from an extract providing a JSON type.

- **`expression` (string, required):**
  - The JMESPath expression that defines what data to extract from the JSON object.
  - Must result in a boolean value (e.g., `true` or `false`); otherwise, the operation returns an undetermined status with the `resultTypeMismatch` message.
  - JMESPath supports logical operations, comparisons, and functions that can produce boolean results (e.g., `contains`, `length() > 0`). Refer to the [JMESPath documentation](https://jmespath.org/) for supported syntax and functions.

- **`undeterminedIf` (object, required):**
  - Specifies conditions under which the operation returns an undetermined status instead of a value.

    - **`evaluationError` (string, required):**
      - Message returned if the JMESPath expression evaluation fails, such as due to a syntax error.

    - **`resultTypeMismatch` (string, required):**
      - Message returned if the expression's result is not a boolean (e.g., a string, number, or array).

    - **`resultIsEmpty` (string, optional):**
      - Message returned if the result is empty (e.g., `null` or an empty array when expecting a boolean). When provided, an empty result triggers an undetermined status with this message. If omitted, an empty result may still return a boolean if valid, or trigger `resultTypeMismatch` if invalid.

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. **Extracting a Boolean Field:**
   - **Field:** `CA10__configJson__c` contains `{"enabled": true, "name": "test"}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BOOLEAN:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__configJson__c
          undeterminedIf:
            isEmpty: "Config JSON is empty"
            isInvalid: "Config JSON is invalid"
      expression: "enabled"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a boolean"
    ```

   - **Result:** `true`
   - **Explanation:** Extracts the boolean value of the `"enabled"` key from the JSON object.

2. **Checking for Presence of an Element:**
   - **Field:** `CA10__tagsJson__c` contains `{"tags": ["prod", "secure"]}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BOOLEAN:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__tagsJson__c
          undeterminedIf:
            isEmpty: "Tags JSON is empty"
            isInvalid: "Tags JSON is invalid"
      expression: "contains(tags, 'secure')"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a boolean"
    ```

   - **Result:** `true`
   - **Explanation:** Uses the `contains` function to check if `"secure"` exists in the `"tags"` array, returning a boolean.

3. **Comparing Array Length:**
   - **Field:** `CA10__rulesJson__c` contains `{"rules": [{"id": 1}, {"id": 2}]}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BOOLEAN:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__rulesJson__c
          undeterminedIf:
            isEmpty: "Rules JSON is empty"
            isInvalid: "Rules JSON is invalid"
      expression: "length(rules) > `1`"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a boolean"
    ```

   - **Result:** `true`
   - **Explanation:** Evaluates if the length of the `"rules"` array is greater than 1, returning a boolean.

4. **Handling Type Mismatch:**
   - **Field:** `CA10__configJson__c` contains `{"status": "active"}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BOOLEAN:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__configJson__c
          undeterminedIf:
            isEmpty: "Config JSON is empty"
            isInvalid: "Config JSON is invalid"
      expression: "status"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a boolean"
    ```

   - **Result:** Undetermined status with message `"Result is not a boolean"`
   - **Explanation:** The `"status"` field is a string, not a boolean, triggering the `resultTypeMismatch` condition.

### `JSON_QUERY_NUMBER`

```yaml
JSON_QUERY_NUMBER:
  arg: { arg } # required, Operation<JSON>
  expression: { expression } # required, string (JMESPath expression)
  undeterminedIf:
    evaluationError: { message } # required, string
    resultTypeMismatch: { message } # required, string
    resultIsEmpty: { message } # optional, string
```

#### Description

The `JSON_QUERY_NUMBER` operation evaluates a JMESPath expression against a JSON object and returns the result as a number value. It enables the extraction of specific numeric data from JSON structures, leveraging the JMESPath query language to navigate and transform JSON documents stored in fields or extracts.

#### Parameters

- **`arg` (Operation<[JSON](#json-type)>, required):**
  - The JSON object against which the JMESPath expression is evaluated.
  - Typically, sourced using `JSON_FROM` to convert a text field containing JSON data into a JSON object, or directly from an extract providing a JSON type.

- **`expression` (string, required):**
  - The JMESPath expression that defines what data to extract from the JSON object.
  - Must result in a numeric value (e.g., integer or float); otherwise, the operation returns an undetermined status with the `resultTypeMismatch` message.
  - JMESPath supports numeric operations, such as `length()` for array sizes or direct extraction of numeric fields. Refer to the [JMESPath documentation](https://jmespath.org/) for supported syntax and functions.

- **`undeterminedIf` (object, required):**
  - Specifies conditions under which the operation returns an undetermined status instead of a value.

    - **`evaluationError` (string, required):**
      - Message returned if the JMESPath expression evaluation fails, such as due to a syntax error.

    - **`resultTypeMismatch` (string, required):**
      - Message returned if the expression's result is not a number (e.g., a string, boolean, or array).

    - **`resultIsEmpty` (string, optional):**
      - Message returned if the result is empty (e.g., `null` or an empty array when expecting a number). When provided, an empty result triggers an undetermined status with this message. If omitted, an empty result may trigger `resultTypeMismatch` if invalid.

#### Return Type

[Number](#number-type)

#### Examples

1. **Extracting a Numeric Field:**
   - **Field:** `CA10__metricsJson__c` contains `{"count": 42, "name": "test"}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_NUMBER:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__metricsJson__c
          undeterminedIf:
            isEmpty: "Metrics JSON is empty"
            isInvalid: "Metrics JSON is invalid"
      expression: "count"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a number"
    ```

   - **Result:** `42`
   - **Explanation:** Extracts the numeric value of the `"count"` key from the JSON object.

2. **Calculating Array Length:**
   - **Field:** `CA10__itemsJson__c` contains `{"items": ["a", "b", "c"]}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_NUMBER:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__itemsJson__c
          undeterminedIf:
            isEmpty: "Items JSON is empty"
            isInvalid: "Items JSON is invalid"
      expression: "length(items)"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a number"
    ```

   - **Result:** `3`
   - **Explanation:** Uses the `length` function to return the number of elements in the `"items"` array.

3. **Extracting a Nested Numeric Value:**
   - **Field:** `CA10__statsJson__c` contains `{"stats": {"total": 15.5}}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_NUMBER:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__statsJson__c
          undeterminedIf:
            isEmpty: "Stats JSON is empty"
            isInvalid: "Stats JSON is invalid"
      expression: "stats.total"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a number"
    ```

   - **Result:** `15.5`
   - **Explanation:** Accesses the nested `"total"` field within the `"stats"` object, returning a float.

4. **Handling Null or Missing Field:**
   - **Field:** `CA10__configJson__c` contains `{"items": null}` or `{}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_NUMBER:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__configJson__c
          undeterminedIf:
            isEmpty: "Config JSON is empty"
            isInvalid: "Config JSON is invalid"
      expression: "length(items)"
      undeterminedIf:
        evaluationError: "Failed to evaluate length: items is null or missing"
        resultTypeMismatch: "Result is not a number"
    ```

   - **Result:** Undetermined status with message `"Failed to evaluate length: items is null or missing"`
   - **Explanation:** When `"items"` is `null` or absent, `length(items)` triggers a `TypeError` in JMESPath, which is caught as an evaluation error rather than an empty result. The `resultIsEmpty` condition isn't triggered here because `0` (from an empty array) is valid, and `null` leads to an error instead.

### `RELATED_LIST_HAS`

```yaml
RELATED_LIST_HAS:
  status: { status } # required, string (enum: "DISAPPEARED", "INAPPLICABLE", "COMPLIANT", "INCOMPLIANT", "UNDETERMINED")
  relationshipName: { relationshipName } # required, string
```

#### Description

The `RELATED_LIST_HAS` operation checks if at least one related object in the specified `relationshipName` satisfies the conditions defined in the corresponding `relatedLists` section of the logic file, matching the given `status`. It returns a [boolean](#boolean-type) value: `true` if at least one related object has the specified `status`, and `false` otherwise (including when no related objects exist).

This operation is useful for validating parent objects based on the presence of specific compliance states in related objects, such as security group rules or IAM policy attachments. See the [Relationships Between Objects](#relationships-between-objects) section for details on configuring related lists.

#### Parameters

- **`status` (string, required):**
  - The compliance status to check for among related objects.
  - Valid values: `"DISAPPEARED"`, `"INAPPLICABLE"`, `"COMPLIANT"`, `"INCOMPLIANT"`, `"UNDETERMINED"`.
  - Matches the `status` assigned by the nested logic in the `relatedLists` section for the specified `relationshipName`.

- **`relationshipName` (string, required):**
  - The name of the relationship to the related objects, as defined in the Cloudaware CMDB schema for the parent `inputType`.
  - Examples: `CA10__AWS_EC2_Security_Group_Rules__r`, `CA10__AWS_IAM_Policy_User_Links__r`.
  - Must correspond to a `relationshipName` entry in the `relatedLists` section of the logic file.
  - Supports chained relationships (e.g., `CA10__parent__r.CA10__child__r`).

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. **Checking for Unrestricted Security Group Rules:**
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsSecurityGroup__c"
    conditions:
      - status: "INCOMPLIANT"
        currentStateMessage: "Security Group has unrestricted rules."
        remediationMessage: "Restrict rule sources."
        check:
          RELATED_LIST_HAS:
            status: "INCOMPLIANT"
            relationshipName: "CA10__AWS_EC2_Security_Group_Rules__r"
    otherwise:
      status: "COMPLIANT"
      currentStateMessage: "No unrestricted rules."
    relatedLists:
      - relationshipName: "CA10__AWS_EC2_Security_Group_Rules__r"
        conditions:
          - status: "INCOMPLIANT"
            currentStateMessage: "Rule allows all IPs."
            check:
              IS_EQUAL:
                left:
                  EXTRACT: "CA10__sourceIpRange__c"
                right:
                  TEXT: "0.0.0.0/0"
        otherwise:
          status: "COMPLIANT"
          currentStateMessage: "Rule is restricted."
    ```

   - **Result:** `true` if any rule has `CA10__sourceIpRange__c` equal to `"0.0.0.0/0"`, `false` otherwise.
   - **Explanation:** `RELATED_LIST_HAS` detects `INCOMPLIANT` rules using a type-safe `IS_EQUAL` check on the text field `CA10__sourceIpRange__c`.

2. **Detecting Attached IAM Policies for a User:**
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsUser__c"
    conditions:
      - status: "INCOMPLIANT"
        currentStateMessage: "User has attached policies."
        remediationMessage: "Use IAM groups instead."
        check:
          RELATED_LIST_HAS:
            status: "COMPLIANT"
            relationshipName: "CA10__AWS_IAM_Policy_User_Links__r"
    otherwise:
      status: "COMPLIANT"
      currentStateMessage: "No attached policies."
    relatedLists:
      - relationshipName: "CA10__AWS_IAM_Policy_User_Links__r"
        conditions: []
        otherwise:
          status: "COMPLIANT"
          currentStateMessage: "This is an attached policy."
    ```

   - **Result:** `true` if the user has any policy links (counting `COMPLIANT` objects), `false` otherwise (including zero related objects).
   - **Explanation:** With no conditions, all related objects are `COMPLIANT` by default. `RELATED_LIST_HAS` returns `false` if no related objects exist, ensuring compliance when the count is zero.

3. **Verifying Policy Attachments to Roles:**
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsIamPolicy__c"
    conditions:
      - status: "INCOMPLIANT"
        currentStateMessage: "Policy is attached to a role."
        remediationMessage: "Detach the policy."
        check:
          RELATED_LIST_HAS:
            status: "INCOMPLIANT"
            relationshipName: "CA10__AWS_IAM_Role_Policy_Attachments__r"
    otherwise:
      status: "COMPLIANT"
      currentStateMessage: "Policy is not attached."
    relatedLists:
      - relationshipName: "CA10__AWS_IAM_Role_Policy_Attachments__r"
        conditions:
          - status: "INCOMPLIANT"
            currentStateMessage: "Attached to a role."
            check:
              NOT_EMPTY_LOOKUP: "CA10__role__r"
        otherwise:
          status: "COMPLIANT"
          currentStateMessage: "Not attached."
    ```

   - **Result:** `true` if the policy is attached to any role, `false` otherwise.
   - **Explanation:** `RELATED_LIST_HAS` identifies `INCOMPLIANT` attachments based on a non-empty role lookup.

### `RELATED_LIST_HAS_NO`

```yaml
RELATED_LIST_HAS_NO:
  status: { status } # required, string (enum: "DISAPPEARED", "INAPPLICABLE", "COMPLIANT", "INCOMPLIANT", "UNDETERMINED")
  relationshipName: { relationshipName } # required, string
```

#### Description

The `RELATED_LIST_HAS_NO` operation checks if no related objects in the specified `relationshipName` satisfy the conditions defined in the corresponding `relatedLists` section of the logic file, matching the given `status`. It returns a [boolean](#boolean-type) value: `true` if no related objects have the specified `status` (including when no related objects exist), and `false` if at least one does.

This operation is ideal for ensuring the absence of specific compliance states in related objects, such as verifying no unrestricted security group rules or no attached policies. See the [Relationships Between Objects](#relationships-between-objects) section for details on configuring related lists.

#### Parameters

- **`status` (string, required):**
  - The compliance status to check for absence among related objects.
  - Valid values: `"DISAPPEARED"`, `"INAPPLICABLE"`, `"COMPLIANT"`, `"INCOMPLIANT"`, `"UNDETERMINED"`.
  - Matches the `status` assigned by the nested logic in the `relatedLists` section for the specified `relationshipName`.

- **`relationshipName` (string, required):**
  - The name of the relationship to the related objects, as defined in the Cloudaware CMDB schema for the parent `inputType`.
  - Examples: `CA10__AWS_EC2_Security_Group_Rules__r`, `CA10__AWS_IAM_Policy_User_Links__r`.
  - Must correspond to a `relationshipName` entry in the `relatedLists` section of the logic file.
  - Supports chained relationships (e.g., `CA10__parent__r.CA10__child__r`).

#### Return Type

[Boolean](#boolean-type)

#### Examples

1. **Ensuring No Unrestricted Security Group Rules:**
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsSecurityGroup__c"
    conditions:
      - status: "COMPLIANT"
        currentStateMessage: "No unrestricted rules in Security Group."
        check:
          RELATED_LIST_HAS_NO:
            status: "INCOMPLIANT"
            relationshipName: "CA10__AWS_EC2_Security_Group_Rules__r"
    otherwise:
      status: "INCOMPLIANT"
      currentStateMessage: "Security Group has unrestricted rules."
      remediationMessage: "Restrict rule sources."
    relatedLists:
      - relationshipName: "CA10__AWS_EC2_Security_Group_Rules__r"
        conditions:
          - status: "INCOMPLIANT"
            currentStateMessage: "Rule allows all IPs."
            check:
              IS_EQUAL:
                left:
                  EXTRACT: "CA10__sourceIpRange__c"
                right:
                  TEXT: "0.0.0.0/0"
        otherwise:
          status: "COMPLIANT"
          currentStateMessage: "Rule is restricted."
    ```

   - **Result:** `true` if no rules have `CA10__sourceIpRange__c` equal to `"0.0.0.0/0"`, `false` otherwise.
   - **Explanation:** `RELATED_LIST_HAS_NO` confirms the absence of `INCOMPLIANT` rules, ensuring compliance.

2. **Verifying No Attached IAM Policies for a User:**
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsUser__c"
    conditions:
      - status: "COMPLIANT"
        currentStateMessage: "No attached policies for user."
        check:
          RELATED_LIST_HAS_NO:
            status: "INCOMPLIANT"
            relationshipName: "CA10__AWS_IAM_Policy_User_Links__r"
    otherwise:
      status: "INCOMPLIANT"
      currentStateMessage: "User has attached policies."
      remediationMessage: "Use IAM groups instead."
    relatedLists:
      - relationshipName: "CA10__AWS_IAM_Policy_User_Links__r"
        conditions: []
        otherwise:
          status: "INCOMPLIANT"
          currentStateMessage: "This is an attached policy."
    ```

   - **Result:** `true` if no policy links are `INCOMPLIANT` (i.e., no links exist), `false` if any do.
   - **Explanation:** With no conditions, all related objects are `INCOMPLIANT`. `RELATED_LIST_HAS_NO` returns `true` when the list is empty (no `INCOMPLIANT` objects), ensuring compliance.

3. **Confirming No Role Attachments for a Policy:**
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsIamPolicy__c"
    conditions:
      - status: "COMPLIANT"
        currentStateMessage: "Policy is not attached to any role."
        check:
          RELATED_LIST_HAS_NO:
            status: "INCOMPLIANT"
            relationshipName: "CA10__AWS_IAM_Role_Policy_Attachments__r"
    otherwise:
      status: "INCOMPLIANT"
      currentStateMessage: "Policy is attached to a role."
      remediationMessage: "Detach the policy."
    relatedLists:
      - relationshipName: "CA10__AWS_IAM_Role_Policy_Attachments__r"
        conditions:
          - status: "INCOMPLIANT"
            currentStateMessage: "Attached to a role."
            check:
              NOT_EMPTY_LOOKUP: "CA10__role__r"
        otherwise:
          status: "COMPLIANT"
          currentStateMessage: "Not attached."
    ```

   - **Result:** `true` if no attachments are `INCOMPLIANT` (no roles linked), `false` otherwise.
   - **Explanation:** `RELATED_LIST_HAS_NO` verifies no `INCOMPLIANT` role attachments exist, indicating compliance.

### `RELATED_LIST_COUNT`

```yaml
RELATED_LIST_COUNT:
  status: { status } # required, string (enum: "DISAPPEARED", "INAPPLICABLE", "COMPLIANT", "INCOMPLIANT", "UNDETERMINED")
  relationshipName: { relationshipName } # required, string
```

#### Description

The `RELATED_LIST_COUNT` operation returns the number of related objects in the specified `relationshipName` that satisfy the conditions defined in the corresponding `relatedLists` section of the logic file, matching the given `status`. It returns a [number](#number-type) value representing this count, which can be compared to thresholds or other numeric values to enforce compliance with limits.

This operation excels at monitoring quotas, such as the maximum number of security group rules or RDS parameters, helping ensure resources stay within provider-defined or organizational limits. See the [Relationships Between Objects](#relationships-between-objects) section for details on configuring related lists.

#### Parameters

- **`status` (string, required):**
  - The compliance status to count among related objects.
  - Valid values: `"DISAPPEARED"`, `"INAPPLICABLE"`, `"COMPLIANT"`, `"INCOMPLIANT"`, `"UNDETERMINED"`.
  - Matches the `status` assigned by the nested logic in the `relatedLists` section for the specified `relationshipName`.

- **`relationshipName` (string, required):**
  - The name of the relationship to the related objects, as defined in the Cloudaware CMDB schema for the parent `inputType`.
  - Examples: `CA10__AWS_EC2_Security_Group_Rules__r`, `CA10__AWS_IAM_Policy_User_Links__r`.
  - Must correspond to a `relationshipName` entry in the `relatedLists` section of the logic file.
  - Supports chained relationships (e.g., `CA10__parent__r.CA10__child__r`).

#### Return Type

[Number](#number-type)

#### Examples

1. **Monitoring Security Group Rule Limits:**
   - **Context:** AWS limits security groups to 60 inbound rules by default; this enforces a practical limit of 50.
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsSecurityGroup__c"
    conditions:
      - status: "INCOMPLIANT"
        currentStateMessage: "Security Group exceeds 50 inbound rules."
        remediationMessage: "Reduce inbound rules to 50 or fewer."
        check:
          GREATER_THAN:
            left:
              RELATED_LIST_COUNT:
                status: "COMPLIANT"
                relationshipName: "CA10__AWS_EC2_Security_Group_Rules__r"
            right:
              NUMBER: 50
    otherwise:
      status: "COMPLIANT"
      currentStateMessage: "Security Group within rule limit."
    relatedLists:
      - relationshipName: "CA10__AWS_EC2_Security_Group_Rules__r"
        importExtracts:
          - file: "/types/CA10__CaAwsSecurityGroupRule2__c/object.extracts.yaml"
        conditions:
          - status: "COMPLIANT"
            currentStateMessage: "Inbound rule exists."
            check:
              IS_EQUAL:
                left:
                  EXTRACT: "CA10__direction__c"
                right:
                  TEXT: "Inbound"
        otherwise:
          status: "INAPPLICABLE"
          currentStateMessage: "Not an inbound rule."
    ```

   - **Result:** Number of `COMPLIANT` inbound rules. Fails if > 50.
   - **Explanation:** `RELATED_LIST_COUNT` counts inbound rules, compared to a threshold of 50 to stay under AWS's 60-rule limit with a buffer.

2. **Enforcing IAM User Policy Attachment Limits:**
   - **Context:** AWS limits IAM users to 10 directly attached managed policies; this sets a cap at 8.
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsUser__c"
    conditions:
      - status: "INCOMPLIANT"
        currentStateMessage: "User exceeds 8 policy attachments."
        remediationMessage: "Limit attachments to 8 or use groups."
        check:
          GREATER_THAN:
            left:
              RELATED_LIST_COUNT:
                status: "COMPLIANT"
                relationshipName: "CA10__AWS_IAM_Policy_User_Links__r"
            right:
              NUMBER: 8
    otherwise:
      status: "COMPLIANT"
      currentStateMessage: "User within policy limit."
    relatedLists:
      - relationshipName: "CA10__AWS_IAM_Policy_User_Links__r"
        conditions: []
        otherwise:
          status: "COMPLIANT"
          currentStateMessage: "Policy is attached."
    ```

   - **Result:** Number of attached policies (all `COMPLIANT`). Fails if > 8.
   - **Explanation:** `RELATED_LIST_COUNT` counts policy links, enforcing a custom limit of 8 for safety below AWS's 10.

### `AWS_POLICY_ALLOWS`

### `GCP_LOGGING_QUERY_MATCH`

### `IS_DISAPPEARED`

### `DEBUG`

### `UNIT_TEST`

### `UNIT_TEST_NULL`

### `UNIT_TEST_RUNTIME_ERROR`
