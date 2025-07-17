# `IS_WITHIN_LAST_DAYS`

```yaml
IS_WITHIN_LAST_DAYS:
  arg: { arg } # required
  offsetDays: { offsetDays } # required
```

## Description

The `IS_WITHIN_LAST_DAYS` operation checks if a [`DateTime`](../type-system/index.md#datetime-type) value, provided as the argument `arg`, falls within the last number of days (`offsetDays`) including today. The comparison is based on the current date at UTC midnight. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if the `arg` DateTime is within the last `offsetDays`, and `false` otherwise.

## Parameters

- **`arg` (Operation<[`DateTime`](../type-system/index.md#datetime-type)>, required):**
  - Specifies the [`DateTime`](../type-system/index.md#datetime-type) value to be checked.
  - This can be any operation that resolves to a [`DateTime`](../type-system/index.md#datetime-type) value, such as [`FIELD`](field.md), [`EXTRACT`](extract.md), [`DATE_TIME_FROM`](date-time-from.md), etc.

- **`offsetDays` (number, required):**
  - Specifies the number of days to define the "last days" range, including today.
  - Must be a non-negative integer.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Checking if a last login date is within the last 7 days:

    ```yaml
    IS_WITHIN_LAST_DAYS:
      arg:
        FIELD:
          path: CA10__lastLoginDate__c # Assume this field returns a DateTime value
      offsetDays: 7
    ```

   This example checks if the date in the `CA10__lastLoginDate__c` field is within the last 7 days, including today.

2. Using `IS_WITHIN_LAST_DAYS` in a Condition:

    ```yaml
    - status: COMPLIANT
      currentStateMessage: "The user has logged in recently (within the last 30 days)."
      check:
        IS_WITHIN_LAST_DAYS:
          arg:
            EXTRACT: CA10__lastLogin__c # Assume 'CA10__lastLogin__c' is an extract returning DateTime
          offsetDays: 30
    ```

   This condition flags a resource as `COMPLIANT` if the last login date, obtained from the `CA10__lastLogin__c` extract, is within the last 30 days.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-within-last-days/unit-test.logic.yaml.gen.md)
