# `NOT`

```yaml
NOT:
  arg: { arg } # required
```

## Description

The `NOT` operation performs a logical NOT operation on a boolean argument. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if the argument is `false`, and `false` if the argument is `true`.

Majority of operations come in normal and negated variants (e.g. [`IS_EMPTY`](is-empty.md) and [`NOT_EMPTY`](not-empty.md)) to reduce the number of operations required to describe the logic. It is advised to use appropriate variant of the operation to eliminate unneeded use of `NOT`. `NOT` operation is primarily intended to be used with complex operation without negated variant like [`AWS_POLICY_ALLOWS`](aws-policy-allows.md), [`GCP_LOGGING_QUERY_MATCH`](gcp-logging-query-match.md), etc.

## Parameters

- **`arg` (Operation<[`Boolean`](../type-system/index.md#boolean-type)>, required):**
  - Specifies the boolean operation to be negated.
  - Should be an operation that resolves to a [`Boolean`](../type-system/index.md#boolean-type) value.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. NOT operation with another operation:

    ```yaml
    NOT:
      arg:
        FIELD:
          path: CA10__publiclyAccessible__c
    ```

   This example checks if an instance is NOT publicly accessible.
