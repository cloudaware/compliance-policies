---
title: Operations
---

# Operations

Welcome to the heart of the Compliance Engine—its operations. Operations are the declarative building blocks you will use in [`logic.yaml`](../index.md#logic) files to define how the engine evaluates your cloud resources. They are designed to be expressive, readable, and powerful, enabling you to translate complex compliance requirements into clear, maintainable logic.

This documentation is structured to help you quickly find the information you need. Below, you will find a categorized list of all available operations. Each operation links to a dedicated page with detailed syntax, examples, and direct links to its unit tests.

## Foundational Concepts

Before diving into specific operations, it is highly recommended to understand the two core concepts that underpin all policy logic:

- **[The Type System](../type-system/index.md):** The Compliance Engine uses a specialized set of data types (`Text`, `Bytes`, `Number`, `Set`, etc.). Understanding their unique behaviors—especially how they handle comparisons, case sensitivity, and empty values—is essential for writing accurate policies.
- **[Object Relationships](../object-ralationships/index.md):** Policies often need to evaluate data from related resources (e.g., checking the rules of a security group attached to an instance). This guide explains how to navigate these connections using lookup fields and related lists.

## Operations Quick Reference

Operations are grouped by their primary function to help you find the right tool for the job.

| Operation Name                                            | Return Type(s)                        | Description                                                                                              |
|:----------------------------------------------------------|:--------------------------------------|:---------------------------------------------------------------------------------------------------------|
| **Data Access**                                           |                                       |                                                                                                          |
| [`FIELD`](./field.md)                                     | `Text`, `Bytes`, `Number`, `DateTime` | Accesses a raw field value from a CMDB object. Best used during development or within extracts.          |
| [`EXTRACT`](./extract.md)                                 | `Any`                                 | Retrieves a pre-defined, safe-to-use value via a reusable extract. **Recommended for production logic.** |
| **Lookup Validation**                                     |                                       |                                                                                                          |
| [`IS_EMPTY_LOOKUP`](./is-empty-lookup.md)                 | `Boolean`                             | Checks if a lookup relationship path is broken or incomplete.                                            |
| [`NOT_EMPTY_LOOKUP`](./not-empty-lookup.md)               | `Boolean`                             | Ensures a lookup relationship path is fully resolved.                                                    |
| **Constants**                                             |                                       |                                                                                                          |
| [`TEXT`](./text.md)                                       | `Text`                                | Creates a case-insensitive, whitespace-normalized text constant.                                         |
| [`BYTES`](./bytes.md)                                     | `Bytes`                               | Creates a case-sensitive, whitespace-preserving text constant.                                           |
| [`BOOLEAN`](./boolean.md)                                 | `Boolean`                             | Creates a `true` or `false` constant.                                                                    |
| [`NUMBER`](./number.md)                                   | `Number`                              | Creates a numeric constant (integer or decimal).                                                         |
| [`DATE_TIME`](./date-time.md)                             | `DateTime`                            | Creates a specific date-time constant.                                                                   |
| [`LIST`](./list.md)                                       | `List`                                | Creates an ordered collection that allows duplicates.                                                    |
| [`SET`](./set.md)                                         | `Set`                                 | Creates an unordered collection of unique items.                                                         |
| [`JSON`](./json.md)                                       | `Json`                                | Creates a JSON object constant from YAML.                                                                |
| **Type Conversions**                                      |                                       |                                                                                                          |
| [`BOOLEAN_FROM`](./boolean-from.md)                       | `Boolean`                             | Converts a string (e.g., "true", "yes", "enabled") into a boolean.                                       |
| [`DATE_TIME_FROM`](./date-time-from.md)                   | `DateTime`                            | Parses a string into a `DateTime` object.                                                                |
| [`DURATION_FROM`](./duration-from.md)                     | `Duration`                            | Parses a string into a `Duration` object.                                                                |
| [`LIST_FROM`](./list-from.md)                             | `List`                                | Splits a string into an ordered `List`.                                                                  |
| [`SET_FROM`](./set-from.md)                               | `Set`                                 | Splits a string into an unordered `Set` of unique items.                                                 |
| [`JSON_FROM`](./json-from.md)                             | `Json`                                | Parses a JSON-formatted string into a queryable `Json` object.                                           |
| **Simple Comparison**                                     |                                       |                                                                                                          |
| [`IS_EMPTY`](./is-empty.md)                               | `Boolean`                             | Checks if a value is empty, null, or whitespace-only.                                                    |
| [`NOT_EMPTY`](./not-empty.md)                             | `Boolean`                             | Checks if a value is not empty.                                                                          |
| [`IS_EQUAL`](./is-equal.md)                               | `Boolean`                             | Performs a deep equality check between two values of the same type.                                      |
| [`NOT_EQUAL`](./not-equal.md)                             | `Boolean`                             | Checks if two values are not equal.                                                                      |
| **Logical Operators**                                     |                                       |                                                                                                          |
| [`AND`](./and.md)                                         | `Boolean`                             | Returns `true` if all arguments are `true`.                                                              |
| [`OR`](./or.md)                                           | `Boolean`                             | Returns `true` if at least one argument is `true`.                                                       |
| [`NOT`](./not.md)                                         | `Boolean`                             | Inverts a boolean value.                                                                                 |
| **Search & Substring**                                    |                                       |                                                                                                          |
| [`CONTAINS`](./contains.md)                               | `Boolean`                             | Checks if a string contains a substring or a collection contains an element.                             |
| [`CONTAINS_ALL`](./contains-all.md)                       | `Boolean`                             | Checks if a target contains all items from a given collection.                                           |
| [`CONTAINS_ANY`](./contains-any.md)                       | `Boolean`                             | Checks if a target contains at least one item from a given collection.                                   |
| [`STARTS_WITH`](./starts-with.md)                         | `Boolean`                             | Checks if a string or list starts with a specific value.                                                 |
| [`ENDS_WITH`](./ends-with.md)                             | `Boolean`                             | Checks if a string or list ends with a specific value.                                                   |
| **Numerical Comparison**                                  |                                       |                                                                                                          |
| [`GREATER_THAN`](./greater-than.md)                       | `Boolean`                             | `left` > `right`                                                                                         |
| [`GREATER_THAN_EQUAL`](./greater-than-equal.md)           | `Boolean`                             | `left` >= `right`                                                                                        |
| [`LESS_THAN`](./less-than.md)                             | `Boolean`                             | `left` < `right`                                                                                         |
| [`LESS_THAN_EQUAL`](./less-than-equal.md)                 | `Boolean`                             | `left` <= `right`                                                                                        |
| **Date & Time**                                           |                                       |                                                                                                          |
| [`IS_BEFORE_TODAY`](./is-before-today.md)                 | `Boolean`                             | Checks if a date is in the past.                                                                         |
| [`IS_AFTER_TODAY`](./is-after-today.md)                   | `Boolean`                             | Checks if a date is in the future.                                                                       |
| [`IS_BEYOND_LAST_DAYS`](./is-beyond-last-days.md)         | `Boolean`                             | Checks if a date is older than `N` days ago.                                                             |
| [`IS_BEYOND_NEXT_DAYS`](./is-beyond-next-days.md)         | `Boolean`                             | Checks if a date is further out than `N` days from now.                                                  |
| [`IS_WITHIN_LAST_DAYS`](./is-within-last-days.md)         | `Boolean`                             | Checks if a date falls within the last `N` days.                                                         |
| [`IS_WITHIN_NEXT_DAYS`](./is-within-next-days.md)         | `Boolean`                             | Checks if a date falls within the next `N` days.                                                         |
| **Collection Operations**                                 |                                       |                                                                                                          |
| [`SIZE`](./size.md)                                       | `Number`                              | Returns the number of items in a `List` or `Set`.                                                        |
| **JSON Operations**                                       |                                       |                                                                                                          |
| [`JSON_QUERY_TEXT`](./json-query-text.md)                 | `Text`                                | Extracts a `Text` value from a `Json` object using a JMESPath query.                                     |
| [`JSON_QUERY_BYTES`](./json-query-bytes.md)               | `Bytes`                               | Extracts a `Bytes` value from a `Json` object.                                                           |
| [`JSON_QUERY_BOOLEAN`](./json-query-boolean.md)           | `Boolean`                             | Extracts a `Boolean` value from a `Json` object.                                                         |
| [`JSON_QUERY_NUMBER`](./json-query-number.md)             | `Number`                              | Extracts a `Number` value from a `Json` object.                                                          |
| **Tag Operations**                                        |                                       |                                                                                                          |
| [`TAG_EXISTS`](./tag-exists.md)                           | `Boolean`                             | Checks if a tag with a specific name exists.                                                             |
| [`TAG_VALUE_TEXT`](./tag-value-text.md)                   | `Text`                                | Retrieves a tag's value as a case-insensitive `Text`.                                                    |
| [`TAG_VALUE_BYTES`](./tag-value-bytes.md)                 | `Bytes`                               | Retrieves a tag's value as a case-sensitive `Bytes`.                                                     |
| **Related List Aggregates**                               |                                       |                                                                                                          |
| [`RELATED_LIST_HAS`](./related-list-has.md)               | `Boolean`                             | Checks if a related list has at least one item with a specific status.                                   |
| [`RELATED_LIST_HAS_NO`](./related-list-has-no.md)         | `Boolean`                             | Checks if a related list has no items with a specific status.                                            |
| [`RELATED_LIST_COUNT`](./related-list-count.md)           | `Number`                              | Counts the number of related items with a specific status.                                               |
| **Provider-Specific**                                     |                                       |                                                                                                          |
| [`AWS_POLICY_ALLOWS`](./aws-policy-allows.md)             | `Boolean`                             | Checks if an AWS IAM policy allows a set of actions at a given access level.                             |
| [`GCP_LOGGING_QUERY_MATCH`](./gcp-logging-query-match.md) | `Boolean`                             | Checks if a GCP Logging query matches another.                                                           |
| **Special & Development**                                 |                                       |                                                                                                          |
| [`IS_DISAPPEARED`](./is-disappeared.md)                   | `Boolean`                             | Checks if an object has been marked as disappeared from the source.                                      |
| [`DEBUG`](./debug.md)                                     | `Any`                                 | Prints the value of an operation during execution for debugging.                                         |
| [`UNIT_TEST`](./unit-test.md)                             | `Boolean`                             | Defines a unit test case within a logic file.                                                            |
| [`UNIT_TEST_NULL`](./unit-test-null.md)                   | `Any`                                 | Generates a null value of a specific type for testing.                                                   |
| [`UNIT_TEST_RUNTIME_ERROR`](./unit-test-runtime-error.md) | `Any`                                 | Simulates a runtime error for testing failure scenarios.                                                 |
