# `AND`

```yaml
AND:
  args: # required
    - { arg1 }
    - { arg2 }
    # ...
```

## Description

The `AND` operation performs a logical AND operation on a list of boolean arguments. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if **all** arguments evaluate to `true`, and `false` otherwise.
The operation uses short-circuit evaluation: if any argument evaluates to `false`, the operation immediately returns `false` without evaluating the remaining arguments.

### Parameters

- **`args` (list of Operation<[`Boolean`](../type-system/index.md#boolean-type)>, required):**
  - Specifies a YAML list of boolean operations to be evaluated.
  - Must contain at least one argument. However, it only makes sense to use at lest two arguments, as a single argument `AND` is can be replaced by the argument itself.
  - Each item in the list should be an operation that resolves to a [`Boolean`](../type-system/index.md#boolean-type) value, such as [`IS_EQUAL`](is-equal.md), [`IS_EMPTY`](is-empty.md), [`CONTAINS`](contains.md), or nested logical operations like `AND`, `OR`, `NOT`.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. AND operation with mixed operations:

    ```yaml
    AND:
      args:
        - IS_EQUAL:
            left:
              FIELD:
                path: CA10__stateName__c
            right:
              TEXT: "running"
        - NOT_EMPTY:
            arg:
              FIELD:
                path: CA10__publicIpAddress__c
    ```

   This example checks if an instance is both in the "running" state AND has a non-empty public IP address.
