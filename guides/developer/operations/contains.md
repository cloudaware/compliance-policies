# `CONTAINS`

```yaml
CONTAINS:
  arg: { arg } # required
  search: { search } # required
```

## Description

The `CONTAINS` operation checks if a searchable value (`arg`) contains another value (`search`). This operation is versatile and works for both text and collection comparisons.

- When `arg` is `Text` or `Bytes`, it performs a substring search.
- When `arg` is a `List` or `Set`, it checks for the presence of an element.

The comparison is case-insensitive for `Text` types and case-sensitive for `Bytes` types. It returns `true` if the `arg` contains the `search` value, and `false` otherwise.

## Parameters

- **`arg` (Operation<[`Text`](../type-system/index.md#text-type) | [`Bytes`](../type-system/index.md#bytes-type) | [`List`](../type-system/index.md#list-type) | [`Set`](../type-system/index.md#set-type)>, required):**
  - The value to be searched within (the haystack).
- **`search` (Operation<[`Text`](../type-system/index.md#text-type) | [`Bytes`](../type-system/index.md#bytes-type)>, required):**
  - The value to search for (the needle).

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Checking if a field value contains a specific substring:

    ```yaml
    CONTAINS:
      arg:
        FIELD:
          path: CA10__description__c
      search:
        TEXT: "expired"
    ```

2. Checking if a set of allowed ports contains port `22`:

    ```yaml
    CONTAINS:
      arg:
        SET_FROM:
          arg:
            FIELD:
              path: CA10__allowedPorts__c # e.g., "80,443,22"
          separator: ","
      search:
        TEXT: "22"
    ```
