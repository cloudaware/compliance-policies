# `NOT_EMPTY`

```yaml
NOT_EMPTY:
  arg: { arg } # required
```

## Description

The `NOT_EMPTY` operation is the inverse of [`IS_EMPTY`](is-empty.md). It checks if the provided argument `arg` is *not* considered empty based on the provided type (see [Type System](../type-system/index.md)). This operation returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if the argument is not empty, and `false` if it is empty.

## Parameters

- **`arg` (Operation<[Any](../type-system/index.md)>, required):**
  - Specifies the value to be checked for non-emptiness.
  - This can be any operation that resolves to a supported Compliance Engine type (Text, Bytes, Number, DateTime, Collection, etc.).

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Checking if a text field is not empty:

    ```yaml
    NOT_EMPTY:
      arg:
        FIELD:
          path: CA10__instanceName__c
    ```

    This example checks if the value of the `CA10__instanceName__c` field is not empty.

2. Checking if a collection is not empty:

    ```yaml
    NOT_EMPTY:
      arg:
        COLLECTION:
          - "item1"
          - "item2"
    ```

    This example checks if the constant collection containing "item1" and "item2" is not empty, which will always be true.

3. Using `NOT_EMPTY` in a condition:

    ```yaml
    - status: COMPLIANT
      currentStateMessage: "Instance name is provided"
      check:
        NOT_EMPTY:
          arg:
            FIELD:
              path: CA10__instanceName__c
    ```

    This condition will be met if the `CA10__instanceName__c` field is not empty, setting the status to `COMPLIANT`.

See more details in:

- [Unit Tests](../../../ce/unit-test/is-empty/text/unit-test.logic.yaml.md) for [`NOT_EMPTY`](not-empty.md) operation on [`Text`](../type-system/index.md#text-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/bytes/unit-test.logic.yaml.md) for [`NOT_EMPTY`](not-empty.md) operation on [`Bytes`](../type-system/index.md#bytes-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/boolean/unit-test.logic.yaml.md) for [`NOT_EMPTY`](not-empty.md) operation on [`Boolean`](../type-system/index.md#boolean-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/number/unit-test.logic.yaml.md) for [`NOT_EMPTY`](not-empty.md) operation on [`Number`](../type-system/index.md#number-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/date-time/unit-test.logic.yaml.md) for [`NOT_EMPTY`](not-empty.md) operation on [`DateTime`](../type-system/index.md#datetime-type) type
- [Unit Tests](../../../ce/unit-test/is-empty/set/unit-test.logic.yaml.md) for [`NOT_EMPTY`](not-empty.md) operation on [`Set`](../type-system/index.md#set-type) type
