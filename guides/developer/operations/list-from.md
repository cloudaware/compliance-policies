# `LIST_FROM`

```yaml
LIST_FROM:
  arg: { arg } # required
  separator: { separator } # required
```

## Description

The `LIST_FROM` operation converts a `Text` or `Bytes` string into a [`List`](../type-system/index.md#list-type) by splitting the string using a specified separator. This is useful when you have a comma-separated or newline-separated string that you need to evaluate as an ordered list where duplicates are significant.

## Parameters

- **`arg` (Operation<[`Text`](../type-system/index.md#text-type) | [`Bytes`](../type-system/index.md#bytes-type)>, required):**
  - The string value to be split into a list.
  - This should be an operation that resolves to a `Text` or `Bytes` value.
- **`separator` (string, required):**
  - The character or string to use for splitting the `arg` string.

## Return Type

[`List`](../type-system/index.md#list-type)

## Examples

1. Creating a list from a newline-separated string, preserving order and empty elements:

    ```yaml
    LIST_FROM:
      arg:
        FIELD:
          path: CA10__logData__c # Assume field contains "event1\nevent2\n\nevent1"
      separator: "\n"
    ```

   This operation will return a list containing `["event1", "event2", "", "event1"]`.
