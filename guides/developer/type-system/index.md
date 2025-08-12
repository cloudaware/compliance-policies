# Type System

Compliance Engine type system is tailored for declarative policy development. These types not always behave as their counterparts from common programming languages.

## Text Type

The `Text` type in the Compliance Engine is a fundamental type designed for handling string data. It simplifies comparisons by normalizing case and a wide range of whitespace characters—including spaces, tabs (`\t`), newlines (`\n`), and carriage returns (`\r`)—making it ideal for scenarios where the general content of the text matters more than its exact formatting. Unlike the [`Bytes`](#bytes-type) type, which preserves precise string representations, the `Text` type ensures that variations in case and whitespace do not impact equality or pattern matching operations.

### Key Characteristics

- **Case Insensitivity:** All comparisons ignore case differences. For example, `"Hello"` is treated as equal to `"hello"`.
- **Whitespace Normalization:**
  - Leading and trailing whitespace characters (spaces, tabs, newlines, carriage returns) are removed.
  - Multiple consecutive whitespace characters (spaces, tabs, newlines, carriage returns) are collapsed into a single space.
  - Examples of normalization:
    - `"  Hello   World  "` becomes `"hello world"`.
    - `"a\nb\tc\r d"` becomes `"a b c d"`.
    - `" aa   bb  cc "` becomes `"aa bb cc"`.
- **Text-Only:** The `Text` type is limited to text data and does not support binary data.

### Purpose

The `Text` type is tailored for use cases where exact casing and whitespace formatting (including special characters like tabs and newlines) are not significant, such as:

- **General Text Handling:** Comparing or searching strings where case and extra whitespace should be ignored, like usernames, descriptions, or tags.
- **User-Friendly Inputs:** Managing fields where users might input data inconsistently in terms of case or spacing (e.g., `"John Doe"`, `"john doe"`, or `"John\nDoe"`).
- **Simplified Matching:** Enabling straightforward string matching in policies without needing to account for formatting variations caused by different whitespace characters.

### When to Use `Text` Type

Choose the `Text` type when your policy requires string comparisons that are tolerant of differences in case and whitespace, including special characters like tabs, newlines, and carriage returns. For cases where exact string matching is essential—such as API keys, passwords, or encoded data—use the [`Bytes`](#bytes-type) type instead.

### Examples

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

### Important Notes

- **Normalization Impact:** The normalization of case and whitespace may cause unexpected matches if exact string representation matters. For precise matching, use the [`Bytes`](#bytes-type) type.
- **Not for Sensitive Data:** Avoid the `Text` type for data where case or whitespace is significant, such as passwords, API keys, or encoded strings.
- **Null and Empty String Handling:** Empty strings (`""`) and null values are treated as equivalent. In operations like `CONTAINS`, an empty or null string contains another empty or null string but not a non-empty string.

### Relevant Unit Tests

To explore or validate the `Text` type's behavior further, check these unit tests:

- [Unit tests](../../../ce/unit-test/is-empty/text/unit-test.logic.yaml.md) for `IS_EMPTY` operation on Text type
- [Unit tests](../../../ce/unit-test/is-equal/text/unit-test.logic.yaml.md) for `IS_EQUAL` operation on Text type
- [Unit tests](../../../ce/unit-test/contains/text/unit-test.logic.yaml.md) for `CONTAINS` operation on Text type
- [Unit tests](../../../ce/unit-test/starts-with/unit-test.logic.yaml.md) for `STARTS_WITH` operation on Text type
- [Unit tests](../../../ce/unit-test/ends-with/unit-test.logic.yaml.md) for `ENDS_WITH` operation on Text type

## Bytes Type

The `Bytes` type in the Compliance Engine is a specialized text type designed to preserve case sensitivity and retain all whitespace exactly as provided, without trimming or normalization. Unlike the standard [`Text`](#text-type) type, which may normalize case or whitespace for comparisons, the `Bytes` type ensures that string values are treated precisely as they are entered. This makes it ideal for scenarios requiring exact string matching.

### Key Characteristics

- **Case Sensitivity:** Uppercase and lowercase letters are treated as distinct (e.g., `"Key"` and `"key"` are different).
- **Whitespace Preservation:** All spaces, tabs, and newlines are retained with no trimming or normalization (e.g., `"  hello "` keeps its leading and trailing spaces).
- **Text-Only:** Despite its name, the `Bytes` type does not store or process binary data; it is strictly a text type with specific handling rules.

### Purpose

The `Bytes` type is intended for use cases where the exact representation of text matters, such as:

- **Sensitive Identifiers:** API keys, tokens, or other identifiers where case and whitespace are significant.
- **Encoded Strings:** Text-based encoded data (e.g., base64 strings) that must remain unaltered for accurate processing or comparison.
- **Precise Configuration Values:** Settings or strings where whitespace or case differences carry meaning.

### When to Use `Bytes` Type

Use the `Bytes` type when your policy requires exact string comparisons without modifications to case or whitespace. For general text handling where normalization is acceptable, the `Text` type is more appropriate.

### Examples

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

### Important Notes

- **Not for Binary Data:** The `Bytes` type is not a container for binary data. The Cloudaware CMDB does not support binary storage, and this type is meant solely for text with precise handling.
- **Naming Clarification:** The name "Bytes" reflects its focus on exactness (like raw bytes in some contexts), but it remains a text-based type in practice.

### Relevant Unit Tests

To explore or validate the `Bytes` type's behavior further, check these unit tests:

- [Unit tests](../../../ce/unit-test/is-equal/bytes/unit-test.logic.yaml.md) for [`IS_EQUAL`](../operations/is-equal.md) operation on Bytes type
- [Unit tests](../../../ce/unit-test/is-empty/bytes/unit-test.logic.yaml.md) for [`IS_EMPTY`](../operations/is-empty.md) operation on Bytes type

## Boolean Type

Boolean type values support following values: `true`, `false`, `null`.

You can not create `null` constants from [`BOOLEAN`](../operations/boolean.md) operation.
Return value of [`FIELD`](../operations/field.md) for Checkbox fields also does not return `null`.

However `null` can be returned by operations like [`JSON_QUERY_BOOLEAN`](../operations/json-query-boolean.md). And operation [`IS_EMPTY`](../operations/is-empty.md) will return `true` only on `null` value.
See [unit tests](../../../ce/unit-test/is-empty/boolean/unit-test.logic.yaml.md) for [`IS_EMPTY`](../operations/is-empty.md).

[`IS_EQUAL`](../operations/is-equal.md) operation also considers `null` as a distinct value, which is not equal neither to `true` nor to `false`.
See [unit tests](../../../ce/unit-test/is-equal/boolean/unit-test.logic.yaml.md) for [`IS_EQUAL`](../operations/is-equal.md).

## Number Type

Number type represents numeric values, including integers and decimal numbers. Key features:

- Supports both integer and decimal representations.
- Standard numeric equality comparison (e.g., `10` is equal to `10.0`).
- Zero (`0`) is considered a valid Number value and is **not** empty.
- `null` is considered an empty Number value.
- Standard comparison operations like `GREATER_THAN`, `LESS_THAN`, etc., work as expected for numeric values.
- Operations involving `null` and Number type in comparisons (`GREATER_THAN`, `LESS_THAN`, etc.) will generally return `false`.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-equal/number/unit-test.logic.yaml.md) for [`IS_EQUAL`](../operations/is-equal.md) operation on Number type
- [Unit Tests](../../../ce/unit-test/is-empty/number/unit-test.logic.yaml.md) for [`IS_EMPTY`](../operations/is-empty.md) operation on Number type
- [Unit Tests](../../../ce/unit-test/greater-than/unit-test.logic.yaml.md) for [`GREATER_THAN`](../operations/greater-than.md)
- [Unit Tests](../../../ce/unit-test/greater-than-equal/unit-test.logic.yaml.md) for [`GREATER_THAN_EQUAL`](../operations/greater-than-equal.md)
- [Unit Tests](../../../ce/unit-test/less-than/unit-test.logic.yaml.md) for [`LESS_THAN`](../operations/less-than.md)
- [Unit Tests](../../../ce/unit-test/less-than-equal/unit-test.logic.yaml.md) for [`LESS_THAN_EQUAL`](../operations/less-than-equal.md)

## DateTime Type

DateTime type represents a specific point in time, combining both date and time components. Key features:

- Stores both date and time information with precision up to milliseconds.
- Timezone-aware. All DateTime values are stored and processed in UTC. When comparing DateTime values, timezones are normalized to UTC for accurate comparison.
- `null` is considered an empty DateTime value.
- Standard comparison operations like `IS_EQUAL`, `NOT_EQUAL`, work as expected for DateTime values.
- Contrary to usual approach to DateTime operations (like in BigQuery), where there are `CURRENT_DATETIME`, `DATETIME_ADD`, `DATETIME_SUB` functions which work together with numeric comparisons like `<`, `<=`, `<`, `>=`, Compliance Engine's approach is to minimize nested function calls by expose operations that integrate reference to current date and time, shifts and comparisons in one operation.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-equal/date-time/unit-test.logic.yaml.md) for [`IS_EQUAL`](../operations/is-equal.md) operation on DateTime type
- [Unit Tests](../../../ce/unit-test/is-empty/date-time/unit-test.logic.yaml.md) for [`IS_EMPTY`](../operations/is-empty.md) operation on DateTime type
- [Unit Tests](../../../ce/unit-test/is-after-today/unit-test.logic.yaml.md) for [`IS_AFTER_TODAY`](../operations/is-after-today.md)
- [Unit Tests](../../../ce/unit-test/is-before-today/unit-test.logic.yaml.md) for [`IS_BEFORE_TODAY`](../operations/is-before-today.md)
- [Unit Tests](../../../ce/unit-test/is-beyond-last-days/unit-test.logic.yaml.md) for [`IS_BEYOND_LAST_DAYS`](../operations/is-beyond-last-days.md)
- [Unit Tests](../../../ce/unit-test/is-beyond-next-days/unit-test.logic.yaml.md) for [`IS_BEYOND_NEXT_DAYS`](../operations/is-beyond-next-days.md)
- [Unit Tests](../../../ce/unit-test/is-within-last-days/unit-test.logic.yaml.md) for [`IS_WITHIN_LAST_DAYS`](../operations/is-within-last-days.md)
- [Unit Tests](../../../ce/unit-test/is-within-next-days/unit-test.logic.yaml.md) for [`IS_WITHIN_NEXT_DAYS`](../operations/is-within-next-days.md)

## Duration Type

Duration type represents a span of time, expressed in days, hours, minutes, and seconds. Key features:

- Represents a time difference, not a specific point in time.
- Can represent durations of any length, from seconds to many years.
- `null` is considered an empty Duration value.
- Durations are always positive. Negative durations are not supported.

## Collection Types

The Compliance Engine provides two types of collections for handling groups of items: **Sets** and **Lists**. Both can contain either `Text` or `Bytes` items, and the choice of `itemType` significantly impacts their behavior.

### Set Type

A `Set` is an **unordered** collection of **unique** items. This type is ideal when you need to check for the presence of items in a group where the order and number of duplicates are irrelevant.

The behavior of a `Set`, particularly how it handles uniqueness and empty values, depends entirely on its `itemType`.

#### Behavior for `itemType: TEXT`

When a `Set` is defined with `itemType: TEXT`, it normalizes its items *before* determining uniqueness. This makes it flexible for general text matching.

- **Uniqueness**: Uniqueness is **case-insensitive** and **whitespace-insensitive**.
- **Normalization**:
  - All items are converted to lowercase.
  - Leading and trailing whitespace characters (spaces, tabs, newlines) are removed.
  - Multiple consecutive whitespace characters within the string are collapsed into a single space.
- **Empty and Whitespace-Only Items**: After normalization, any item that becomes an empty string (`""`) is **discarded** and not included in the set. This means that both `""` and strings containing only whitespace (like `" "`, `"\t"`) are effectively ignored.

**Example**: The strings `"apple"`, `"Apple"`, and `" APPLE "` are all considered the same item. A string from a `SET_FROM` operation like `",, ,,"` will result in an empty set, as each split element is an empty or whitespace-only string that gets discarded.

**When to use**:

- General text data where formatting variations are not important.
- Resource names, tags, descriptions, or categories.
- Checking for the presence of keywords regardless of their case or spacing.

#### Behavior for `itemType: BYTES`

When a `Set` is defined with `itemType: BYTES`, it performs an exact, literal comparison of its items without any normalization.

- **Uniqueness**: Uniqueness is determined by a **case-sensitive**, byte-for-byte comparison.
- **Normalization**: No normalization occurs. All case and whitespace characters are preserved exactly as they are.
- **Empty and Whitespace-Only Items**:
  - Strictly empty strings (`""`) are **discarded**.
  - Strings containing only whitespace (e.g., `" "`, `"\t"`) are treated as **valid, distinct, non-empty items** and are included in the set.

**Example**: The strings `"Apple"` and `"apple"` are treated as two distinct items. The set `[" ", "\t"]` contains two unique items.

**When to use**:

- Data where case and exact whitespace are significant.
- API keys, identifiers, encoded strings, or specific configuration values.
- Scenarios where you need to distinguish between `"value"`, `"Value"`, and `" value "`.

#### Null Handling

For both `TEXT` and `BYTES` item types, a `null` set is considered equal to an empty set (`[]`).

### List Type

A `List` is an **ordered** collection of items that **allows duplicates**.

- **Order:** The order of items is preserved as defined.
- **Duplicates:** Lists can contain multiple identical items.
- **Empty Items:** Empty strings are treated as valid items and are included in the list.
- **Null Handling:** A `null` list is considered equal to an empty list.

Use the `LIST` and `LIST_FROM` operations to work with lists.

## JSON Type

The JSON Type represents data in JavaScript Object Notation (JSON) format. This type is used to handle semi-structured data commonly returned by various APIs, especially in cloud environments. Key features:

- Handles JSON objects, arrays, and primitive values.
- Uses [JMESPath](https://jmespath.org/) queries for extracting specific data elements using operations like [`JSON_QUERY_TEXT`](../operations/json-query-text.md), [`JSON_QUERY_BOOLEAN`](../operations/json-query-boolean.md), etc.
