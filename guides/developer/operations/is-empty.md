# `IS_EMPTY`

```yaml
IS_EMPTY:
  arg: { arg } # required
```

## Description

The `IS_EMPTY` operation checks if the provided argument `arg` is considered empty. What constitutes "empty" depends on the provided type (see [Type System](../type-system/index.md)). This operation returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if the argument is empty, and `false` otherwise.

## Parameters

- **`arg` (Operation<[Any](../type-system/index.md)>, required):**
  - Specifies the value to be checked for emptiness.
  - This can be any operation that resolves to a supported Compliance Engine type (Text, Bytes, Number, DateTime, Collection, etc.).

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Checking if a text field is empty:

    ```yaml
    IS_EMPTY:
      arg:
        FIELD:
          path: CA10__notes__c
    ```

    This example checks if the value of the `CA10__notes__c` field is empty (null, empty text, or text containing only spaces).

2. Checking if a collection is empty:

    ```yaml
    IS_EMPTY:
      arg:
        SET_FROM:
          arg:
            FIELD:
              path: CA10__availabilityZones__c
          separator: ","
    ```

    This example checks if the collection created from the comma-separated string in `CA10__availabilityZones__c` field is empty. The result of `true` will be produces for following values of `CA10__availabilityZones__c`: `null`, `""`, `" "`, `" , "`. See [`Set`](../type-system/index.md#set-type) type for more details.

3. Using `IS_EMPTY` in a condition:

    ```yaml
    - status: INCOMPLIANT
      currentStateMessage: "Description is missing"
      remediationMessage: "Please provide a description for this resource."
      check:
        IS_EMPTY:
          arg:
            FIELD:
              path: CA10__description__c
    ```

    This condition will be met if the `CA10__description__c` field is empty, setting the status to `INCOMPLIANT`.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-empty/text/unit-test.logic.yaml.md) for [`IS_EMPTY`](is-empty.md) operation on [`Text`](../type-system/index.md#text-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/bytes/unit-test.logic.yaml.md) for [`IS_EMPTY`](is-empty.md) operation on [`Bytes`](../type-system/index.md#bytes-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/boolean/unit-test.logic.yaml.md) for [`IS_EMPTY`](is-empty.md) operation on [`Boolean`](../type-system/index.md#boolean-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/number/unit-test.logic.yaml.md) for [`IS_EMPTY`](is-empty.md) operation on [`Number`](../type-system/index.md#number-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/date-time/unit-test.logic.yaml.md) for [`IS_EMPTY`](is-empty.md) operation on [`DateTime`](../type-system/index.md#datetime-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/set/unit-test.logic.yaml.md) for [`IS_EMPTY`](is-empty.md) operation on [`Set`](../type-system/index.md#set-type) type
