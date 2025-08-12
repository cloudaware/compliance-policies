# `STARTS_WITH`

```yaml
STARTS_WITH:
  arg: { arg } # required
  search: { search } # required
```

## Description

The `STARTS_WITH` operation checks if a searchable value (`arg`) starts with another value (`search`). This operation is versatile and can be applied to both text and collection types.

- When `arg` is of type `Text` or `Bytes`, `STARTS_WITH` performs a prefix check to see if the string begins with the `search` value. The comparison is case-insensitive for `Text` and case-sensitive for `Bytes`.
- When `arg` is a `List` or a `Set`, the operation checks if first element of the collection is `search` value.

It returns a `true` if the condition is met, and `false` otherwise.

## Parameters

- **`arg` (Operation<[`Text`](../type-system/index.md#text-type) | [`Bytes`](../type-system/index.md#bytes-type) | [`List`](../type-system/index.md#list-type) | [`Set`](../type-system/index.md#set-type)>, required):**
  - The value to be checked. This can be a single string (`Text` or `Bytes`) or a collection of strings (`List` or `Set`).
- **`search` (Operation<[`Text`](../type-system/index.md#text-type) | [`Bytes`](../type-system/index.md#bytes-type)>, required):**
  - The prefix value to search for at the beginning of the `arg` string or first element within the `arg` collection.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. **Checking if a single Text field starts with a specific prefix:**

    This example checks if the `Name` field of a resource starts with "i-", which is common for AWS EC2 instance IDs. The check is case-insensitive.

    ```yaml
    STARTS_WITH:
      arg:
        FIELD:
          path: Name
      search:
        TEXT: "i-"
    ```

2. **Checking if first element in a List is `search`:**

    Imagine a field `CA10__hostnames__c` contains a newline-separated list of hostnames. This example checks if first hostname is "web".

    ```yaml
    STARTS_WITH:
      arg:
        LIST_FROM:
          arg:
            FIELD:
              path: CA10__hostnames__c
          separator: "\n"
      search:
        TEXT: "web"
    ```

3. **Using `NOT` to ensure a domain name does not start with a wildcard:**

    This example checks if an ACM certificate's domain name does *not* start with a wildcard character `*`.

    ```yaml
    NOT:
      arg:
        STARTS_WITH:
          arg:
            FIELD:
              path: CA10__domainName__c
          search:
            TEXT: "*."
    ```

## Relevant Unit Tests

For more detailed examples and to validate the behavior of the `STARTS_WITH` operation, you can refer to the official unit tests:

- [Unit tests for STARTS_WITH](../../../ce/unit-test/starts-with/unit-test.logic.yaml.md)
