# `ENDS_WITH`

```yaml
ENDS_WITH:
  arg: { arg } # required
  search: { search } # required
```

## Description

The `ENDS_WITH` operation checks if a searchable value (`arg`) ends with a specific string (`search`). This operation is versatile and works for both individual strings and collections of strings.

- When `arg` is a `Text` or `Bytes` string, it performs a simple suffix check.
- When `arg` is a `List` or `Set`, it checks if last element of the collection is `search` value.

The comparison is case-insensitive for `Text` types and case-sensitive for `Bytes` types. It returns `true` if the condition is met, and `false` otherwise.

## Parameters

- **`arg` (Operation<[`Text`](../type-system/index.md#text-type) | [`Bytes`](../type-system/index.md#bytes-type) | [`List`](../type-system/index.md#list-type) | [`Set`](../type-system/index.md#set-type)>, required):**
  - The value to be checked. This can be a single string or a collection of strings (a List or Set).
- **`search` (Operation<[`Text`](../type-system/index.md#text-type) | [`Bytes`](../type-system/index.md#bytes-type)>, required):**
  - The suffix string to look for at the end of the `arg` or last element within the `arg` collection.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. **Checking if a single field value ends with a specific suffix:**

    ```yaml
    ENDS_WITH:
      arg:
        FIELD:
          path: CA10__name__c
      search:
        TEXT: "-prod"
    ```

    This example checks if the `CA10__name__c` field value, after text normalization, ends with the string `"-prod"`. It would match `"database-prod"` and `"Database-PROD"`.

2. **Checking if last host name is server3.dev:**

    ```yaml
    ENDS_WITH:
      arg:
        LIST_FROM:
          separator: ","
          arg:
            FIELD:
              path: CA10__hostNames__c # e.g., "server1.dev,server2.prod,server3.dev"
      search:
        TEXT: "server3.dev"
    ```

    This example checks if last hostnamein in the comma-separated `CA10__hostNames__c` field is `"server3.dev"`. The operation would return `true` for the example field value.

3. **Performing a case-sensitive check using `Bytes`:**

    ```yaml
    ENDS_WITH:
      arg:
        FIELD:
          path: CA10__fileExtension__c
          returnType: BYTES # Ensure case and whitespace are preserved
      search:
        BYTES: ".YAML"
    ```

    This example checks if the `CA10__fileExtension__c` field ends with the exact, case-sensitive string `".YAML"`. It would not match `.yaml`.

## Relevant Unit Tests

For more detailed examples and to validate the behavior of the `ENDS_WITH` operation, you can refer to the official unit tests:

- [Unit tests for ENDS_WITH](../../../ce/unit-test/ends-with/unit-test.logic.yaml.gen.md)
