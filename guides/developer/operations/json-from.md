# `JSON_FROM`

```yaml
JSON_FROM:
  arg: { arg } # required
  undeterminedIf: # required
    isEmpty: { message } # optional
    isInvalid: { message } # required
```

## Description

The `JSON_FROM` operation parses a `Bytes` (string) value and converts it into a structured `Json` type. This operation is essential for handling semi-structured data, such as policy documents or configuration details, that are often stored as JSON strings within CMDB fields.

It is crucial to use a `Bytes` type as the input (`arg`) to ensure the string is parsed exactly as it is stored, preserving all characters, whitespace, and case, which is critical for a successful and reliable JSON conversion. Using the `Text` type can lead to parsing errors due to its normalization behavior.

## Parameters

- **`arg` (Operation<[`Bytes`](../type-system/index.md#bytes-type)>, required):**
  - Specifies the `Bytes` value containing the JSON string to be parsed. This should be an operation that resolves to a `Bytes` value.
  - A common pattern is to use a [`FIELD`](field.md) operation with `returnType: BYTES` or an [`EXTRACT`](extract.md) that is configured to return a `Bytes` type.
- **`undeterminedIf` (object, required):**
  - A mandatory block that defines conditions for gracefully handling parsing failures by returning an `UNDETERMINED` status.
  - **`isEmpty` (string, optional):** If provided, the operation will return an `UNDETERMINED` status with the specified message if the input `arg` is empty or null.
  - **`isInvalid` (string, required):** A mandatory check that returns an `UNDETERMINED` status with the specified message if the input `arg` string is not a valid JSON document. This ensures that malformed JSON is handled gracefully without causing policy errors.

## Return Type

[`Json`](../type-system/index.md#json-type)

## Example

This example demonstrates parsing an AWS IAM policy document, which is stored as a JSON string in the `CA10__policyDocument__c` field.

```yaml
# The JSON_FROM operation converts the string from the field into a queryable JSON object.
JSON_FROM:
  # The 'arg' must resolve to a Bytes type. We use FIELD with 'returnType: BYTES' to ensure the exact string is used.
  arg:
    FIELD:
      path: CA10__policyDocument__c
      returnType: BYTES
  # The 'undeterminedIf' block is required for robust error handling.
  undeterminedIf:
    # (Optional) Handle cases where the policy document field is empty.
    isEmpty: "The policy document field is empty."
    # (Required) Handle cases where the string is not valid JSON.
    isInvalid: "The policy document is not a valid JSON document."
```
