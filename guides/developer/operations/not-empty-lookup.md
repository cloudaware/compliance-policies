# `NOT_EMPTY_LOOKUP`

```yaml
NOT_EMPTY_LOOKUP: { lookupPath }
```

## Description

The `NOT_EMPTY_LOOKUP` operation is the inverse of [`IS_EMPTY_LOOKUP`](is-empty-lookup.md). It checks whether a lookup field, or a chain of lookups, is fully populated with objects. This operation is also designed to address scenarios described in the [Object Relationships](../object-relationships/index.md) documentation, focusing on ensuring that a lookup path successfully resolves to a non-empty object.

`NOT_EMPTY_LOOKUP` returns `true` if the entire lookup path is successfully resolved and leads to a non-empty object. It returns `false` if any part of the lookup path is broken, incomplete, or resolves to a null or empty object.

This operation is essential for policies that require verification of complete and valid object relationships, ensuring data integrity and reliability in policy evaluations.

## Parameters

- **`lookupPath` (string, required):**
  - Specifies the lookup path to be checked for non-emptiness.
  - The path is a string that can include relationship names to traverse lookups (e.g., `CA10__vpc__r.CA10__subnet__r`).
  - The path should point to a lookup field or a chain of lookup fields. Only `lookup__r` fields can be used in the chain of lookups.
  - Example paths:
    - `CA10__vpc__r`
    - `CA10__vpc__r.CA10__subnet__r`

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Checking if a lookup field `CA10__vpc__r` is not empty:

    ```yaml
    NOT_EMPTY_LOOKUP: CA10__vpc__r
    ```

   This example verifies that the VPC lookup on an EC2 instance is successfully resolved and the VPC data is available.

2. Checking a chain of lookups `CA10__vpc__r.CA10__subnet__r` for non-emptiness:

    ```yaml
    NOT_EMPTY_LOOKUP: CA10__vpc__r.CA10__subnet__r
    ```

   This example ensures that the entire lookup chain from instance to subnet (via VPC) is valid and data is available at each step.
