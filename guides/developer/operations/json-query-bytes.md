# `JSON_QUERY_BYTES`

```yaml
JSON_QUERY_BYTES:
  arg: { arg } # required, Operation<JSON>
  expression: { expression } # required, string (JMESPath expression)
  undeterminedIf:
    evaluationError: { message } # required, string
    resultTypeMismatch: { message } # required, string
    resultIsEmpty: { message } # optional, string
```

## Description

The `JSON_QUERY_BYTES` operation evaluates a JMESPath expression against a JSON object and returns the result as a `Bytes` type value - a case-sensitive, whitespace-preserving text string. It enables the extraction of specific text data from JSON structures where exact string representation matters, leveraging the JMESPath query language to navigate and select data from JSON documents stored in fields or extracts.

## Parameters

- **`arg` (Operation<[`Json`](../type-system/index.md#json-type)>, required):**
  - The JSON object against which the JMESPath expression is evaluated.
  - Typically, sourced using `JSON_FROM` to convert a text field containing JSON data into a JSON object, or directly from an extract providing a JSON type.

- **`expression` (string, required):**
  - The JMESPath expression defining the data to extract from the JSON object.
  - Must result in a string value; otherwise, the operation returns an undetermined status with the `resultTypeMismatch` message.
  - The returned string is treated as a `Bytes` type, preserving its exact case and whitespace (including spaces, tabs, newlines, and carriage returns) without normalization.
  - JMESPath supports operations like selecting fields, filtering arrays, and applying functions (e.g., `join`). Refer to the [JMESPath documentation](https://jmespath.org/) for syntax and capabilities.

- **`undeterminedIf` (object, required):**
  - Specifies conditions under which the operation returns an undetermined status instead of a value.

    - **`evaluationError` (string, required):**
      - Message returned if the JMESPath expression evaluation fails, such as due to a syntax error.

    - **`resultTypeMismatch` (string, required):**
      - Message returned if the expression's result is not a string (e.g., a number, boolean, or array).

    - **`resultIsEmpty` (string, optional):**
      - Message returned if the result is an empty string (`""`). When provided, an empty result triggers an undetermined status with this message. If omitted, an empty string is returned as a `Bytes` value.

## Return Type

[`Bytes`](../type-system/index.md#bytes-type)

## Examples

1. **Extracting a Case-Sensitive Key:**
   - **Field:** `CA10__configJson__c` contains `{"apiKey": "AbCdEf123"}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BYTES:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__configJson__c
              returnType: BYTES  
          undeterminedIf:
            isEmpty: "Config JSON is empty"
            isInvalid: "Config JSON is invalid"
      expression: "apiKey"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a string"
    ```

   - **Result:** `"AbCdEf123"` (as a `Bytes` type, preserving exact case).
   - **Explanation:** Extracts the `"apiKey"` value, maintaining its original casing.

2. **Extracting a Whitespace-Sensitive Value:**
   - **Field:** `CA10__detailsJson__c` contains `{"format": "  indent: 4\n"}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BYTES:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__detailsJson__c
              returnType: BYTES  
          undeterminedIf:
            isEmpty: "Details JSON is empty"
            isInvalid: "Details JSON is invalid"
      expression: "format"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a string"
    ```

   - **Result:** `"  indent: 4\n"` (as a `Bytes` type, preserving spaces and newline).
   - **Explanation:** Retrieves the `"format"` field, keeping all whitespace intact.

3. **Using JMESPath Functions with Exact Output:**
   - **Field:** `CA10__itemsJson__c` contains `{"items": [{"id": "A1"}, {"id": "B2"}]}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BYTES:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__itemsJson__c
              returnType: BYTES  
          undeterminedIf:
            isEmpty: "Items JSON is empty"
            isInvalid: "Items JSON is invalid"
      expression: "join(' - ', items[].id)"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a string"
    ```

   - **Result:** `"A1 - B2"` (as a `Bytes` type, preserving exact output).
   - **Explanation:** Uses the `join` function to concatenate `"id"` values with a separator, retaining the exact string as a `Bytes` type.

4. **Handling Empty Results:**
   - **Field:** `CA10__configJson__c` contains `{"description": ""}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BYTES:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__configJson__c
              returnType: BYTES  
          undeterminedIf:
            isEmpty: "Config JSON is empty"
            isInvalid: "Config JSON is invalid"
      expression: "description"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a string"
        resultIsEmpty: "Description is empty"
    ```

   - **Result:** Undetermined status with message `"Description is empty"`.
   - **Explanation:** The empty string result triggers the `resultIsEmpty` condition. Without this, it would return `""` as a `Bytes` value.
