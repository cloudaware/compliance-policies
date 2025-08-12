# `LESS_THAN_EQUAL`

```yaml
LESS_THAN_EQUAL:
  left: { arg1 } # required
  right: { arg2 } # required
```

## Description

The `LESS_THAN_EQUAL` operation performs a numerical comparison to check if the `left` argument is less than or equal to the `right` argument. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if `left` is less than or equal to `right`, and `false` otherwise.
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

1. Checking if a number field is less than or equal to a number constant:

    ```yaml
    LESS_THAN_EQUAL:
      left:
        FIELD:
          path: CA10__ruleCount__c
      right:
        NUMBER: 50
    ```

   This example checks if the value of the `CA10__ruleCount__c` field is less than or equal to the number constant `50`.

2. Using `LESS_THAN_EQUAL` with `JSON_QUERY_NUMBER`:

    ```yaml
      LESS_THAN_EQUAL:
        left:
          JSON_QUERY_NUMBER:
            arg: 
              EXTRACT: "caJsonFrom__firewallRules__c"
            expression: "length([? starts_with(name, 'AllowAllAzureServicesAndResourcesWithinAzureIps')])"
          right:
            NUMBER: 2
    ```

   This example checks if the size of the number extracted from JSON is less than or equal to `2`.

See more details in:

- [Unit Tests](../../../ce/unit-test/less-than-equal/unit-test.logic.yaml.md)
