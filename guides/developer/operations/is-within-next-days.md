# `IS_WITHIN_NEXT_DAYS`

```yaml
IS_WITHIN_NEXT_DAYS:
  arg: { arg } # required
  offsetDays: { offsetDays } # required
```

## Description

The `IS_WITHIN_NEXT_DAYS` operation checks if a [`DateTime`](../type-system/index.md#datetime-type) value, provided as the argument `arg`, falls within the next number of days (`offsetDays`) including today. The comparison is based on the current date at UTC midnight. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if the `arg` DateTime is within the next `offsetDays`, and `false` otherwise.

## Parameters

- **`arg` (Operation<[`DateTime`](../type-system/index.md#datetime-type)>, required):**
  - Specifies the [`DateTime`](../type-system/index.md#datetime-type) value to be checked.
  - This can be any operation that resolves to a [`DateTime`](../type-system/index.md#datetime-type) value, such as [`FIELD`](field.md), [`EXTRACT`](extract.md), [`DATE_TIME_FROM`](date-time-from.md), etc.

- **`offsetDays` (number, required):**
  - Specifies the number of days to define the "next days" range, including today.
  - Must be a non-negative integer.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Checking if a certificate expiration date is within the next 14 days:

    ```yaml
    IS_WITHIN_NEXT_DAYS:
      arg:
        FIELD:
          path: CA10__certificateExpiryDate__c # Assume this field returns a DateTime value
      offsetDays: 14
    ```

   This example checks if the date in the `CA10__certificateExpiryDate__c` field is within the next 14 days, including today.

2. Using `IS_WITHIN_NEXT_DAYS` in a Condition:

    ```yaml
    - status: INCOMPLIANT
      currentStateMessage: "The certificate is expiring soon (within the next 30 days)."
      remediationMessage: "Renew the certificate to avoid service disruption."
      check:
        IS_WITHIN_NEXT_DAYS:
          arg:
            EXTRACT: CA10__certExpiration__c # Assume 'CA10__certExpiration__c' is an extract returning DateTime
          offsetDays: 30
    ```

   This condition flags a resource as `INCOMPLIANT` if its certificate expiration date, obtained from the `CA10__certExpiration__c` extract, is within the next 30 days.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-within-next-days/unit-test.logic.yaml.md)
