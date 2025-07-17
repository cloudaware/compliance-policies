# `SET`

```yaml
SET:
  itemType: { itemType } # required
  items: # required
    - { value1 }
    - { value2 }
    # ...
```

## Description

The `SET` operation creates a constant, unordered [`Set`](../type-system/index.md#set-type) of unique values. This operation allows you to define a static set of `Text` or `Bytes` strings directly within your logic. It automatically removes duplicate values and does not preserve order.

## Parameters

- **`itemType` ([`Text`](../type-system/index.md#text-type) | [`Bytes`](../type-system/index.md#bytes-type), required):**
  - Specifies the type of items in the set. Valid values are `TEXT` or `BYTES`.
- **`items` (list of strings, required):**
  - A YAML list of strings that will form the set.
  - Duplicate values will be removed. For `TEXT` type, this is case-insensitive.
  - Empty strings or strings containing only whitespace will be ignored.

## Return Type

[`Set`](../type-system/index.md#set-type)

## Examples

1. Using a set to define unique approved regions:

    ```yaml
    SET:
      itemType: TEXT
      items:
        - "us-east-1"
        - "us-west-2"
        - "us-east-1" # Duplicate, will be removed
    ```

   This returns a set containing `"us-east-1"` and `"us-west-2"`.

2. Using a set in a `CONTAINS_ALL` operation:

    ```yaml
    CONTAINS_ALL:
      arg:
        LIST_FROM:
          arg:
            FIELD:
              path: CA10__availabilityZones__c
          separator: ","
      search:
        SET:
          itemType: TEXT
          items:
            - "us-east-1a"
            - "us-east-1b"
    ```
