# `CONTAINS_ANY`

```yaml
CONTAINS_ANY:
  arg: { arg } # required
  search: { search } # required
```

## Description

The `CONTAINS_ANY` operation checks if a searchable value (`arg`) contains at least one item from a given collection (`search`). This is useful for checking against a list of forbidden or alternative values.

- When `arg` is `Text` or `Bytes`, it checks if any substring from the `search` collection is present.
- When `arg` is a `List` or `Set`, it checks if any element from the `search` collection is present.

## Parameters

- **`arg` (Operation<[`Text`](../type-system/index.md#text-type) | [`Bytes`](../type-system/index.md#bytes-type) | [`List`](../type-system/index.md#list-type) | [`Set`](../type-system/index.md#set-type)>, required):**
  - The value to be searched within (the haystack).
- **`search` (Operation<[`List`](../type-system/index.md#list-type) | [`Set`](../type-system/index.md#set-type)>, required):**
  - A collection of items, where at least one must be found in `arg`.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Checking if an instance type is any of the legacy types:

    ```yaml
    CONTAINS_ANY:
      arg:
        FIELD:
          path: CA10__instanceType__c
      search:
        SET:
          itemType: TEXT
          items: ["t1.micro", "m1.small", "m1.medium"]
    ```
