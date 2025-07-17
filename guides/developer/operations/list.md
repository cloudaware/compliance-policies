# `LIST`

```yaml
LIST:
  itemType: { itemType } # required
  items: # required
    - { value1 }
    - { value2 }
    # ...
```

## Description

The `LIST` operation creates a constant, ordered [`List`](../type-system/index.md#list-type) of values. This operation allows you to define a static, ordered list of `Text` or `Bytes` strings directly within your logic. It preserves the order of elements and allows for duplicates.

## Parameters

- **`itemType` ([`Text`](../type-system/index.md#text-type) | [`Bytes`](../type-system/index.md#bytes-type), required):**
  - Specifies the type of items in the list. Valid values are `TEXT` or `BYTES`.

- **`items` (list of strings, required):**
  - A YAML list of strings that will form the list.
  - Unlike a `SET`, empty strings and duplicate values are preserved in the list.

## Return Type

[`List`](../type-system/index.md#list-type)

## Examples

1. Creating a list with duplicate `Text` items:

    ```yaml
    LIST:
      itemType: TEXT
      items:
        - "a"
        - "b"
        - "a"
    ```

   This returns a list containing `["a", "b", "a"]`.

2. Creating a list that includes empty strings:

    ```yaml
    LIST:
      itemType: TEXT
      items:
        - "a"
        - ""
        - "b"
    ```

   This returns a list containing `["a", "", "b"]`.
