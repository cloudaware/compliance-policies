# `LESS_THAN`

```yaml
LESS_THAN:
  left: { arg1 } # required
  right: { arg2 } # required
```

## Description

The `LESS_THAN` operation performs a numerical comparison to check if the `left` argument is strictly less than the `right` argument. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if `left` is less than `right`, and `false` otherwise.
Both arguments must be of [`Number`](../type-system/index.md#number-type) type.

## Parameters

- **`left` (Operation<[`Number`](../type-system/index.md#number-type)>, required):**
  - Specifies the first argument for comparison.
  - This can be any operation that resolves to a [`Number`](../type-system/index.md#number-type) value, such as [`FIELD`](field.md), [`EXTRACT`](extract.md), [`NUMBER`](number.md), [`SIZE`](size.md), etc.
- **`right` (Operation<[`Number`](../type-system/index.md#number-type)>, required):**
  - Specifies the second argument for comparison.
  - **Must be of the same type as the `left` argument.**

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Checking if a number field is less than a number constant:

    ```yaml
    LESS_THAN:
      left:
        FIELD:
          path: CA10__cpuCount__c
      right:
        NUMBER: 4
    ```

   This example checks if the value of the `CA10__cpuCount__c` field is less than the number constant `4`.

2. Using `LESS_THAN` with `JSON_QUERY_NUMBER`:

    ```yaml
      LESS_THAN:
        left:
          JSON_QUERY_NUMBER:
            arg:
              JSON_FROM:
                arg: 
                  EXTRACT: "CA10__securityCenterAutoProvisioning__c"
            expression: "length([? name == 'default' && autoProvision == 'Off'])"
        right:
          NUMBER: 1
    ```

   This example checks if the number extracted from JSON is less than `1`.

See more details in:

- [Unit Tests](../../../ce/unit-test/less-than/unit-test.logic.yaml.md)
