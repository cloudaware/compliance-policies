# `IS_EMPTY_LOOKUP`

```yaml
IS_EMPTY_LOOKUP: { lookupPath }
```

## Description

The `IS_EMPTY_LOOKUP` operation specifically checks whether a lookup field, or a chain of lookups, resolves to an empty value. This operation is designed to address scenarios described in the [Object Relationships](../object-relationships/index.md) documentation, where a `FIELD` operation might return `null` not just because the field is empty, but also because a lookup in the path is broken or incomplete.

`IS_EMPTY_LOOKUP` helps distinguish between a truly empty field and a `null` value resulting from a broken lookup chain. It returns `true` if the lookup path leads to a null or empty object at any point, indicating an incomplete or broken relationship. It returns `false` if the lookup path is fully resolved and the final field is not empty (or if the final field itself is null, which is not considered an empty lookup).

This operation is crucial for policies that need to verify the existence and completeness of related objects, especially when dealing with potentially inconsistent or partially collected data in Cloudaware CMDB.

## Parameters

- **`lookupPath` (string, required):**
  - Specifies the lookup path to be checked for emptiness.
  - The path is a string that can include relationship names to traverse lookups (e.g., `CA10__vpc__r.CA10__subnet__r`).
  - The path should point to a lookup field or a chain of lookup fields. Only `lookup__r` fields can be used in the chain of lookups.
  - Example paths:
    - `CA10__vpc__r`
    - `CA10__vpc__r.CA10__subnet__r`

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. Checking if a lookup field `CA10__vpc__r` is empty:

    ```yaml
    IS_EMPTY_LOOKUP: CA10__vpc__r
    ```

   This example checks if the VPC lookup on an EC2 instance is empty, which could indicate that the instance is not associated with a VPC or that VPC data is not available.

2. Checking a chain of lookups `CA10__vpc__r.CA10__subnet__r` for emptiness:

    ```yaml
    IS_EMPTY_LOOKUP: CA10__vpc__r.CA10__subnet__r
    ```

   This example checks if the subnet lookup, accessed through the VPC lookup, is empty or the VPC lookup itself is empty. This could indicate issues at any point in the lookup chain (instance -> VPC -> subnet).

3. Using `IS_EMPTY_LOOKUP` in a condition to set status to `UNDETERMINED` when a lookup is empty:

    ```yaml
    - status: UNDETERMINED
      currentStateMessage: "VPC information is not available, status cannot be determined."
      check:
        IS_EMPTY_LOOKUP: CA10__vpc__r
    ```

   This condition sets the policy status to `UNDETERMINED` if the VPC lookup is empty, acknowledging the lack of necessary data for evaluation.
