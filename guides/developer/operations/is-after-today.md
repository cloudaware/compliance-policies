# `IS_AFTER_TODAY`

```yaml
IS_AFTER_TODAY:
  arg: { arg } # required
```

## Description

The `IS_AFTER_TODAY` operation checks if a [`DateTime`](../type-system/index.md#datetime-type) value, provided as the argument `arg`, is strictly after the current day (today). The comparison is based on the current date at UTC midnight. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if the `arg` DateTime is after today, and `false` otherwise.

## Parameters

- **`arg` (Operation<[`DateTime`](../type-system/index.md#datetime-type)>, required):**
  - Specifies the [`DateTime`](../type-system/index.md#datetime-type) value to be checked.
  - This can be any operation that resolves to a [`DateTime`](../type-system/index.md#datetime-type) value, such as [`FIELD`](field.md), [`EXTRACT`](extract.md), [`DATE_TIME_FROM`](date-time-from.md), or [`DATE_TIME`](date-time.md).

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Checking if a date field is after today:

    ```yaml
    IS_AFTER_TODAY:
      arg:
        FIELD:
          path: CA10__startTime__c # Assume this field returns a DateTime value
    ```

   This example checks if the date in the `CA10__startTime__c` field is after the current day.

2. Using `IS_AFTER_TODAY` in a Condition:

    ```yaml
    - status: COMPLIANT
      currentStateMessage: "Certificate is not expired yet."
      check:
        IS_AFTER_TODAY:
          arg:
            EXTRACT: CA10__expiration__c # Assume 'CA10__expiration__c' is an extract returning DateTime
    ```

   This condition flags a resource as `COMPLIANT` if its expiration date, obtained from the `CA10__expiration__c` extract, is in the future.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-after-today/unit-test.logic.yaml.md)
