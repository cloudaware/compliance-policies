# `CONTAINS_ALL`

```yaml
CONTAINS_ALL:
  arg: { arg } # required
  search: { search } # required
```

## Description

The `CONTAINS_ALL` operation checks if a searchable value (`arg`) contains every item from a given collection (`search`). This is useful for ensuring that a set of required values are all present.

- When `arg` is `Text` or `Bytes`, it checks if all substrings from the `search` collection are present.
- When `arg` is a `List` or `Set`, it checks if all elements from the `search` collection are present.

## Parameters

- **`arg` (Operation<[`Text`](../type-system/index.md#text-type) | [`Bytes`](../type-system/index.md#bytes-type) | [`List`](../type-system/index.md#list-type) | [`Set`](../type-system/index.md#set-type)>, required):**
  - The value to be searched within (the haystack).
- **`search` (Operation<[`List`](../type-system/index.md#list-type) | [`Set`](../type-system/index.md#set-type)>, required):**
  - A collection of items that must all be found in `arg`.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Ensuring a security group name contains both "prod" and "web" tags:

    ```yaml
    CONTAINS_ALL:
      arg:
        FIELD:
          path: Name
      search:
        LIST:
          itemType: TEXT
          items: ["prod", "web"]
    ```
