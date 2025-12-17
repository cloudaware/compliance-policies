# `IS_EQUAL`

```yaml
IS_EQUAL:
  left: { arg1 } # required
  right: { arg2 } # required
```

## Description

The `IS_EQUAL` operation performs a deep equality check between two arguments, `left` and `right`. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if the arguments are considered equal, and `false` otherwise.

The comparison logic is dependent on the type of the arguments being evaluated. Both arguments must resolve to the same type; cross-type comparisons are not supported and will result in an error.

## Parameters

- **`left`** (Operation<[Any](../type-system/index.md)>, required):
  - The first argument for the comparison. This can be any operation that resolves to a supported Compliance Engine type.
- **`right`** (Operation<[Any](../type-system/index.md)>, required):
  - The second argument for the comparison. It must resolve to the same type as the `left` argument.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Type-Specific Behavior

The definition of "equal" varies based on the data type being compared:

- **`Text`**:
  - Comparison is **case-insensitive**.
  - Whitespace (including spaces, tabs, and newlines) at the beginning, end, and duplicates in the middle of the string are normalized before comparison. For example, `"  hello   world\n"` is equal to `"hello world"`.
  - An empty string (`""`) or a whitespace-only string is considered equal to `null`.
  - *See unit tests: [`ce/unit-test/is-equal/text/unit-test.logic.yaml`](../../../ce/unit-test/is-equal/text/unit-test.logic.yaml.md)*

- **`Bytes`**:
  - Comparison is **case-sensitive**.
  - Whitespace is preserved and treated as part of the string. For example, `"  hello "` is not equal to `"hello"`.
  - An empty string (`""`) is considered equal to `null`.
  - *See unit tests: [`ce/unit-test/is-equal/bytes/unit-test.logic.yaml`](../../../ce/unit-test/is-equal/bytes/unit-test.logic.yaml.md)*

- **`Number`**:
  - Standard numeric equality is used. For example, `10` is equal to `10.0`.
  - `null` is a distinct value and is not equal to `0`.
  - *See unit tests: [`ce/unit-test/is-equal/number/unit-test.logic.yaml`](../../../ce/unit-test/is-equal/number/unit-test.logic.yaml.md)*

- **`Boolean`**:
  - Compares `true`, `false`, and `null` as three distinct values. `true` is not equal to `null`.
  - *See unit tests: [`ce/unit-test/is-equal/boolean/unit-test.logic.yaml`](../../../ce/unit-test/is-equal/boolean/unit-test.logic.yaml.md)*

- **`DateTime`**:
  - Comparison is timezone-aware and normalized to UTC. For example, `2023-01-01T12:00:00Z` is equal to `2023-01-01T13:00:00+01:00`.
  - Comparison is precise to the millisecond.
  - *See unit tests: [`ce/unit-test/is-equal/date-time/unit-test.logic.yaml`](../../../ce/unit-test/is-equal/date-time/unit-test.logic.yaml.md)*

- **`Collection (List and Set)`**:
  - Performs a deep, element-by-element comparison.
  - For a **`List`**, the order of elements and duplicate values are significant. `["a", "b"]` is not equal to `["b", "a"]`.
  - For a **`Set`**, the order of elements and duplicate values are ignored. `{"a", "b"}` is equal to `{"b", "a", "b"}`.
  - An empty collection is considered equal to `null`.
  - *See unit tests: [`ce/unit-test/is-equal/collection/unit-test.logic.yaml`](../../../ce/unit-test/is-equal/collection/unit-test.logic.yaml.md)*

- **`JSON`**:
  - Performs a deep, recursive comparison of the JSON structure.
  - The order of keys in an object does **not** matter. `{"a": 1, "b": 2}` is equal to `{"b": 2, "a": 1}`.
  - The order of elements in an array **does** matter. `[1, 2]` is not equal to `[2, 1]`.
  - Keys with a `null` value are treated as non-existent and are ignored during comparison. `{"name": "John", "age": null}` is equal to `{"name": "John"}`.
  - An empty JSON object (`{}`) is considered equal to `null`.
  - *See unit tests: [`ce/unit-test/is-equal/json/unit-test.logic.yaml`](../../../ce/unit-test/is-equal/json/unit-test.logic.yaml.md)*

## Examples

1. **Checking if an instance state is "running" (Text comparison):**

    ```yaml
    IS_EQUAL:
      left:
        FIELD:
          path: CA10__stateName__c
      right:
        TEXT: "running"
    ```

    This will return `true` for values like `"running"`, `"Running"`, or `" RUNNING "`.

2. **Checking if a security group has exactly one rule (Number comparison):**

    ```yaml
    IS_EQUAL:
      left:
        SIZE:
          arg:
            FIELD:
              path: CA10__securityGroupRules__r
      right:
        NUMBER: 1
    ```

3. **Checking for a specific JSON policy statement (JSON comparison):**

    ```yaml
    IS_EQUAL:
      left:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__policyDocument__c
              returnType: BYTES
          undeterminedIf:
            isInvalid: "Policy document is not a valid JSON."
      right:
        JSON:
          Effect: "Allow"
          Action: "*"
    ```

    This will return `true` even if the keys in the actual policy document are in a different order (e.g., `{"Action": "*", "Effect": "Allow"}`).
