# `TEXT`

```yaml
TEXT: { value }
```

## Description

The `TEXT` operation creates a constant [`Text`](../type-system/index.md#text-type) (string) value. This operation allows you to embed static text directly within your logic.

## Parameters

- **`value` (string, required):**
  - Specifies the text string you want to use as a constant.
  - This value will be directly returned by the operation.
  - The text value cannot be null or empty string.

## Return Type

[`Text`](../type-system/index.md#text-type)

## Examples

1. Using a simple text constant:

    ```yaml
    TEXT: "Enabled"
    ```

2. Using a text constant in a comparison:

    ```yaml
    IS_EQUAL:
      left:
        FIELD: 
          path: CA10__stateName__c
      right:
        TEXT: "running"
    ```
