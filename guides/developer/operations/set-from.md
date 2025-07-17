# `SET_FROM`

```yaml
SET_FROM:
  arg: { arg } # required
  separator: { separator } # required
```

## Description

The `SET_FROM` operation converts a string (`arg`) into a [`Set`](../type-system/index.md#set-type) by splitting it using a specified `separator`. The resulting set contains unique items, and its behavior regarding uniqueness, case sensitivity, and whitespace handling depends on whether the input `arg` is a `Text` or `Bytes` type.

This operation is fundamentally different from the `LIST_FROM` operation because it creates an unordered collection of unique elements, whereas `LIST_FROM` preserves order and duplicates.

A key behavior of `SET_FROM` is that it **discards empty string elements** generated during the split process. However, what is considered an "empty string" varies between `Text` and `Bytes` inputs.

## Parameters

- **`arg` (Operation<[`Text`](../type-system/index.md#text-type) | [`Bytes`](../type-system/index.md#bytes-type)>, required):**
  - The string value to be split into a set. This should be an operation that resolves to either a `Text` or `Bytes` value.
- **`separator` (string, required):**
  - The character or string to use for splitting the `arg` string.

## Return Type

[`Set`](../type-system/index.md#set-type)

## Type-Specific Behavior

The behavior of `SET_FROM` is critically dependent on the type of the input `arg`.

- **When `arg` is `Text`:**
  - **Normalization:** Each resulting element from the split is normalized first. This means it is converted to lowercase, and all leading, trailing, and repeated internal whitespace characters (spaces, tabs, newlines) are removed or collapsed.
  - **Discarding Empty Items:** After normalization, any element that becomes an empty string (`""`) is **discarded** and not included in the final set.
  - **Uniqueness:** Uniqueness is determined after normalization, making the comparison case-insensitive.
- **When `arg` is `Bytes`:**
  - **No Normalization:** The `Bytes` type preserves case and all whitespace characters exactly as they are. No normalization occurs.
  - **Discarding Empty Items:** Only elements that are an **exact empty string (`""`)** after the split are discarded. Strings containing only whitespace (e.g., `" "`) are considered valid, non-empty items and are included in the set.
  - **Uniqueness:** Uniqueness is determined based on the exact, case-sensitive byte sequence.

## Examples

1. **Creating a Set of Unique Tags (Text)**

    This example demonstrates how `SET_FROM` with a `Text` input handles duplicates, case differences, and extra whitespace.

    ```yaml
    SET_FROM:
      arg:
        TEXT: "  TagA  , tagB, taga\n, , tagc  "
      separator: ","
    ```

    **Resulting Set**: A set containing three unique, normalized items: `{"taga", "tagb", "tagc"}`.

    **Explanation**:

    - `"  TagA  "` and `"taga\n"` both normalize to `"taga"`, and only one is kept.
    - `" tagB"` normalizes to `"tagb"`.
    - `" tagc  "` normalizes to `"tagc"`.
    - The empty elements resulting from `,,` and the trailing comma are discarded.

2. **Creating a Set from a List of IDs (Bytes)**

    This example shows how `SET_FROM` with a `Bytes` input preserves case and whitespace, while still discarding strictly empty elements.

    ```yaml
    SET_FROM:
      arg:
        BYTES: "ID-A,id-a,ID-B,, ID-C "
      separator: ","
    ```

    **Resulting Set**: A set containing four unique, exact items: `{"ID-A", "id-a", "ID-B", " ID-C "}`.

    **Explanation**:

    - `"ID-A"` and `"id-a"` are treated as two distinct items due to case sensitivity.
    - The empty string between the two commas (`,,`) is discarded.
    - `" ID-C "` is included with its leading and trailing spaces intact.

## Relevant Unit Tests

- Unit tests for `SET_FROM` with `Text` items can be found here: [/ce/unit-test/set-from/text-items/unit-test.logic.yaml](../../../ce/unit-test/set-from/text-items/unit-test.logic.yaml.gen.md).
- Unit tests for `SET_FROM` with `Bytes` items can be found here: [/ce/unit-test/set-from/bytes-items/unit-test.logic.yaml](../../../ce/unit-test/set-from/bytes-items/unit-test.logic.yaml.gen.md).
