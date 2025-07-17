# `NOT_EQUAL`

```yaml
NOT_EQUAL:
  left: { arg1 } # required
  right: { arg2 } # required
```

## Description

The `NOT_EQUAL` operation is the inverse of [`IS_EQUAL`](is-equal.md). It checks if the provided arguments `left` and `right` are *not* equal. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if the arguments are not equal, and `false` if they are considered equal.
All types are supported, behavior of equality depends on the provided type (see [Type System](../type-system/index.md)).
Both arguments are required to be the same type. Cross-type comparisons are not supported.

## Parameters

- **`left` (Operation<[Any](../type-system/index.md)>, required):**
  - Specifies the first argument for comparison.
  - This can be any operation that resolves to a supported Compliance Engine type (Text, Bytes, Number, DateTime, Collection, Boolean, etc.).

- **`right` (Operation<[Any](../type-system/index.md)>, required):**
  - Specifies the second argument for comparison.
  - **Must be of the same type as the `left` argument.**

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Checking if a text field is not equal to a text constant:

    ```yaml
    NOT_EQUAL:
      left:
        FIELD:
          path: CA10__stateName__c
      right:
        TEXT: "stopped"
    ```

2. Checking if a number field is not equal to a number constant:

    ```yaml
    NOT_EQUAL:
      left:
        FIELD:
          path: CA10__ruleCount__c
      right:
        NUMBER: 50
    ```

3. Checking inequality of boolean values:

   ```yaml
    NOT_EQUAL:
      left:
        BOOLEAN_FROM:
          arg:
            FIELD:
              path: CA10__detailedMonitoringEnabled__c
          trueValue: "yes"
      right:
        BOOLEAN: false
    ```
