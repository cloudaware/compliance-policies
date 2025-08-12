# `IS_BEFORE_TODAY`

```yaml
IS_BEFORE_TODAY:
  arg: { arg } # required
```

## Description

The `IS_BEFORE_TODAY` operation checks if a [`DateTime`](../type-system/index.md#datetime-type) value, provided as the argument `arg`, is strictly before the current day (today). The comparison is based on the current date at UTC midnight. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if the `arg` DateTime is before today, and `false` otherwise.

## Parameters

- **`arg` (Operation<[`DateTime`](../type-system/index.md#datetime-type)>, required):**
  - Specifies the [`DateTime`](../type-system/index.md#datetime-type) value to be checked.
  - This should be an operation that resolves to a [`DateTime`](../type-system/index.md#datetime-type) value, such as [`FIELD`](field.md), [`EXTRACT`](extract.md), [`DATE_TIME_FROM`](date-time-from.md), or [`DATE_TIME`](date-time.md).

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Checking if a date field is before today:

    ```yaml
    IS_BEFORE_TODAY:
      arg:
        FIELD:
          path: CA10__dueDate__c # Assume this field returns a DateTime value
    ```

   This example checks if the date in the `CA10__dueDate__c` field is before the current day.

2. Using `IS_BEFORE_TODAY` in a Condition:

    ```yaml
    - status: INCOMPLIANT
      currentStateMessage: "The expiration date is in the past."
      remediationMessage: "Review and update the expiration date to a future date."
      check:
        IS_BEFORE_TODAY:
          arg:
            EXTRACT: CA10__expirationDate__c # Assume 'CA10__expirationDate__c' is an extract returning DateTime
    ```

   This condition flags a resource as `INCOMPLIANT` if its expiration date, obtained from the `CA10__expirationDate__c` extract, is before today.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-before-today/unit-test.logic.yaml.md)
