# `GREATER_THAN_EQUAL`

```yaml
GREATER_THAN_EQUAL:
  left: { arg1 } # required
  right: { arg2 } # required
```

## Description

The `GREATER_THAN_EQUAL` operation performs a numerical comparison to check if the `left` argument is greater than or equal to the `right` argument. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if `left` is greater than or equal to `right`, and `false` otherwise.
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

1. Checking if a number field is greater than or equal to a number constant:

    ```yaml
    GREATER_THAN_EQUAL:
      left:
        FIELD:
          path: CA10__ruleCount__c
      right:
        NUMBER: 50
    ```

   This example checks if the value of the `CA10__ruleCount__c` field is greater than or equal to the number constant `50`.

2. Using `GREATER_THAN_EQUAL` with `RELATED_LIST_COUNT`:

    ```yaml
      GREATER_THAN_EQUAL:
        left:
          RELATED_LIST_COUNT:
            status: "COMPLIANT"
            relationshipName: "CA10__AWS_EC2_Security_Group_Rules__r"
        right:
          NUMBER: 1
    ```

   This example checks if the related list has at least 1 `COMPLIANT` object.

See more details in:

- [Unit Tests](../../../ce/unit-test/greater-than-equal/unit-test.logic.yaml.md)
