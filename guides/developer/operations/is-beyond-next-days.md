# `IS_BEYOND_NEXT_DAYS`

```yaml
IS_BEYOND_NEXT_DAYS:
  arg: { arg } # required
  offsetDays: { offsetDays } # required
```

## Description

The `IS_BEYOND_NEXT_DAYS` operation checks if a [`DateTime`](../type-system/index.md#datetime-type) value, provided as the argument `arg`, is strictly later than a date calculated by adding a specified number of days (`offsetDays`) to the current day (today). The comparison is based on the current date at UTC midnight. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if the `arg` DateTime is beyond the next `offsetDays`, and `false` otherwise.

## Parameters

- **`arg` (Operation<[`DateTime`](../type-system/index.md#datetime-type)>, required):**
  - Specifies the [`DateTime`](../type-system/index.md#datetime-type) value to be checked.
  - This can be any operation that resolves to a [`DateTime`](../type-system/index.md#datetime-type) value, such as [`FIELD`](field.md), [`EXTRACT`](extract.md), [`DATE_TIME_FROM`](date-time-from.md), etc.

- **`offsetDays` (number, required):**
  - Specifies the number of days to add to the current date for the comparison.
  - Must be a non-negative integer.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Checking if a date field is beyond the next 7 days:

    ```yaml
    IS_BEYOND_NEXT_DAYS:
      arg:
        FIELD:
          path: CA10__expiryDate__c # Assume this field returns a DateTime value
      offsetDays: 7
    ```

   This example checks if the date in the `CA10__expiryDate__c` field is later than 7 days from now.

2. Using `IS_BEYOND_NEXT_DAYS` in a Condition:

    ```yaml
    - status: COMPLIANT
      currentStateMessage: "The resource is valid for more than 30 days."
      check:
        IS_BEYOND_NEXT_DAYS:
          arg:
            EXTRACT: CA10__validUntil__c # Assume 'CA10__validUntil__c' is an extract returning DateTime
          offsetDays: 30
    ```

   This condition flags a resource as `COMPLIANT` if its validity date, obtained from the `CA10__validUntil__c` extract, is beyond the next 30 days.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-beyond-next-days/unit-test.logic.yaml.md)
