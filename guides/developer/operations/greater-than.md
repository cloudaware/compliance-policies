# `GREATER_THAN`

```yaml
GREATER_THAN:
  left: { arg1 } # required
  right: { arg2 } # required
```

## Description

The `GREATER_THAN` operation performs a numerical comparison to check if the `left` argument is strictly greater than the `right` argument. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if `left` is greater than `right`, and `false` otherwise.
Both arguments must be of [`Number`](../type-system/index.md#number-type) type.

## Parameters

- **`left` (Operation<[`Number`](../type-system/index.md#number-type)>, required):**
  - Specifies the first argument for comparison.
  - This should be an operation that resolves to a [`Number`](../type-system/index.md#number-type) value, such as [`FIELD`](field.md), [`EXTRACT`](extract.md), [`NUMBER`](number.md), [`SIZE`](size.md), etc.

- **`right` (Operation<[`Number`](../type-system/index.md#number-type)>, required):**
  - Specifies the second argument for comparison.
  - **Must be of the same type as the `left` argument.**

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Checking if a number field is greater than a number constant:

    ```yaml
    GREATER_THAN:
      left:
        FIELD:
          path: CA10__instanceCount__c
      right:
        NUMBER: 5
    ```

   This example checks if the value of the `CA10__instanceCount__c` field is greater than the number constant `5`.

2. Using `GREATER_THAN` with `SIZE`:

    ```yaml
    GREATER_THAN:
      left:
        SIZE:
          arg:
            SET_FROM:
              arg:
                FIELD:
                  path: CA10__availabilityZones__c
              separator: "\n"
        right:
          NUMBER: 1
    ```

   This example checks if the size of the collection created from the `CA10__availabilityZones__c` field is greater than `1`.

See more details in:

- [Unit Tests](../../../ce/unit-test/greater-than/unit-test.logic.yaml.md)
