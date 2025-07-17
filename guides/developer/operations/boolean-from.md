# `BOOLEAN_FROM`

```yaml
BOOLEAN_FROM:
  arg: { arg }                  # required
  trueValue: { trueValue }      # optional
  undeterminedIf:               # required
    isEmpty: { message }        # required
```

## Description

The `BOOLEAN_FROM` operation converts a [`Text`](../type-system/index.md#text-type) value into a [`Boolean`](../type-system/index.md#boolean-type) value. This is useful for interpreting string representations of boolean values (such as "true", "false", "yes", "no", "1", or "0") as actual booleans within policy logic.

The operation compares the input string against the `trueValue`. If they match, it returns `true`; otherwise, it returns `false`. The check for empty input is mandatory to ensure that policies handle missing data gracefully.

## Parameters

- **`arg` (Operation<[`Text`](../type-system/index.md#text-type)>, required):**
  - Specifies the text value to be converted. This should be an operation that resolves to a `Text` value, like [`FIELD`](field.md), [`EXTRACT`](extract.md), or [`JSON_QUERY_TEXT`](json-query-text.md).
- **`trueValue` (string, optional):**
  - Defines the case-insensitive text string that should be interpreted as `true`. If not provided, this defaults to `"true"`. Any input string that does not match this value will be interpreted as `false`.
- **`undeterminedIf` (object, required):**
  - A container for checks that return an `UNDETERMINED` status if satisfied. This block is required.
  - **`isEmpty` (string, required):**
    - If the input `arg` is empty (using same logic as [`IS_EMPTY`](is-empty.md) operation), the operation will return an `UNDETERMINED` status. The string provided for this parameter is used as the `currentStateMessage` for the resulting finding. This check is mandatory.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. **Converting a field value with default `trueValue`**

    This example converts a field containing the text "true" or "false" into a boolean.

    ```yaml
    BOOLEAN_FROM:
      arg:
        FIELD: 
          path: CA10__isPublic__c
      undeterminedIf:
        isEmpty: "The 'isPublic' field is empty and cannot be converted to a boolean."
    ```

2. **Converting a field value with a custom `trueValue`**

    This example handles a field where the active state is represented by the text "ENABLED".

    ```yaml
    BOOLEAN_FROM:
      arg:
        FIELD: 
          path: CA10__encryptionStatus__c # Field contains "ENABLED" or "DISABLED"
      trueValue: "ENABLED"
      undeterminedIf:
        isEmpty: "The 'Encryption Status' field is empty and cannot be converted to a boolean."
    ```

3. **Using `BOOLEAN_FROM` in a condition**

    This example demonstrates a complete check to see if a feature, represented by the text "yes" or "no", is enabled.

    ```yaml
    IS_EQUAL:
      left:
        BOOLEAN_FROM:
          arg:
            FIELD: 
              path: CA10__detailedMonitoringEnabled__c # Field contains "yes" or "no"
          trueValue: "yes"
          undeterminedIf:
            isEmpty: "Detailed monitoring status is unknown."
      right:
        BOOLEAN: true
    ```
