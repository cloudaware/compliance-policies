# `BOOLEAN`

```yaml
BOOLEAN: { value }
```

## Description

The `BOOLEAN` operation creates a constant [`Boolean`](../type-system/index.md#boolean-type) value. This operation allows you to embed static boolean values (`true` or `false`) directly within your logic.

## Parameters

- **`value` (boolean, required):**
  - Specifies the boolean value you want to use as a constant.
  - Must be either `true` or `false`. Case-sensitive.
  - This value will be directly returned by the operation.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Using a simple boolean constant:

    ```yaml
    BOOLEAN: true
    ```

2. Using a boolean constant in a comparison:

    ```yaml
    IS_EQUAL:
      left:
        FIELD: 
          path: CA10__publiclyAccessible__c
      right:
        BOOLEAN: true
    ```
