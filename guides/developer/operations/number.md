# `NUMBER`

```yaml
NUMBER: { value }
```

## Description

The `NUMBER` operation creates a constant [`Number`](../type-system/index.md#number-type) value. This operation allows you to embed static numeric values (integers or decimals) directly within your logic.

## Parameters

- **`value` (number, required):**
  - Specifies the numeric value you want to use as a constant.
  - Can be an integer (e.g., `10`) or a decimal number (e.g., `3.14`).
  - This value will be directly returned by the operation.

## Return Type

[`Number`](../type-system/index.md#number-type)

## Examples

1. Using an integer constant:

    ```yaml
    NUMBER: 10
    ```

2. Using a decimal constant:

    ```yaml
    NUMBER: 3.14
    ```

3. Using a number constant in a comparison:

    ```yaml
    GREATER_THAN:
      left:
        FIELD: 
          path: CA10__instanceCount__c
      right:
        NUMBER: 5
    ```
