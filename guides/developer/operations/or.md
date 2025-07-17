# `OR`

```yaml
OR:
  args: # required
    - { arg1 }
    - { arg2 }
    # ...
```

## Description

The `OR` operation performs a logical OR operation on a list of boolean arguments. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if **at least one** argument evaluates to `true`, and `false` if all arguments are `false`.
The operation uses short-circuit evaluation: if any argument evaluates to `true`, the operation immediately returns `true` without evaluating the remaining arguments.

## Parameters

- **`args` (list of Operation<[`Boolean`](../type-system/index.md#boolean-type)>, required):**
  - Specifies a YAML list of boolean operations to be evaluated.
  - Must contain at least one argument. However, it only makes sense to use at lest two arguments, as a single argument `AND` is can be replaced by the argument itself.
  - Each item in the list should be an operation that resolves to a [`Boolean`](../type-system/index.md#boolean-type) value.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. OR operation with mixed operations:

    ```yaml
    OR:
      args:
        - GREATER_THAN:
            left:
              FIELD:
                path: CA10__ramGb__c
            right:
              NUMBER: 32
        - GREATER_THAN:
            left:
              FIELD:
                path: CA10__vCpu__c
            right:
              NUMBER: 8
    ```

   This example checks if an instance has more the 32 GB of RAM or more than 8 vCPU.
