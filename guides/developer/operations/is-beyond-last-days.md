# `IS_BEYOND_LAST_DAYS`

```yaml
IS_BEYOND_LAST_DAYS:
  arg: { arg } # required
  offsetDays: { offsetDays } # required
```

## Description

The `IS_BEYOND_LAST_DAYS` operation checks if a [`DateTime`](../type-system/index.md#datetime-type) value, provided as the argument `arg`, is strictly earlier than a date calculated by subtracting a specified number of days (`offsetDays`) from the current day (today). The comparison is based on the current date at UTC midnight. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if the `arg` DateTime is beyond the last `offsetDays`, and `false` otherwise.

## Parameters

- **`arg` (Operation<[`DateTime`](../type-system/index.md#datetime-type)>, required):**
  - Specifies the [`DateTime`](../type-system/index.md#datetime-type) value to be checked.
  - This should be an operation that resolves to a [`DateTime`](../type-system/index.md#datetime-type) value, such as [`FIELD`](field.md), [`EXTRACT`](extract.md), [`DATE_TIME_FROM`](date-time-from.md), etc.

- **`offsetDays` (number, required):**
  - Specifies the number of days to subtract from the current date for the comparison.
  - Must be a non-negative integer.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Checking if a date field is beyond the last 30 days:

    ```yaml
    IS_BEYOND_LAST_DAYS:
      arg:
        FIELD:
          path: CA10__lastModifiedDate__c # Assume this field returns a DateTime value
      offsetDays: 30
    ```

   This example checks if the date in the `CA10__lastModifiedDate__c` field is earlier than 30 days ago.

2. Using `IS_BEYOND_LAST_DAYS` in a Condition:

    ```yaml
    - status: INCOMPLIANT
      currentStateMessage: "The resource has not been modified in the last 90 days and is considered stale."
      remediationMessage: "Review and update the resource or consider archiving it."
      check:
        IS_BEYOND_LAST_DAYS:
          arg:
            EXTRACT: CA10__lastModified__c # Assume 'CA10__lastModified__c' is an extract returning DateTime
          offsetDays: 90
    ```

   This condition flags a resource as `INCOMPLIANT` if its last modification date, obtained from the `CA10__lastModified__c` extract, is beyond the last 90 days.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-beyond-last-days/unit-test.logic.yaml.gen.md)
