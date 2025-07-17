# `JSON_QUERY_BOOLEAN`

```yaml
JSON_QUERY_BOOLEAN:
  arg: { arg } # required, Operation<JSON>
  expression: { expression } # required, string (JMESPath expression)
  undeterminedIf:
    evaluationError: { message } # required, string
    resultTypeMismatch: { message } # required, string
    resultIsEmpty: { message } # optional, string
```

## Description

The `JSON_QUERY_BOOLEAN` operation evaluates a JMESPath expression against a JSON object and returns the result as a boolean value. It enables the extraction of specific boolean data from JSON structures, leveraging the JMESPath query language to navigate and query JSON documents stored in fields or extracts.

## Parameters

- **`arg` (Operation<[`Json`](../type-system/index.md#json-type)>, required):**
  - The JSON object against which the JMESPath expression is evaluated.
  - Typically, sourced using `JSON_FROM` to convert a text field containing JSON data into a JSON object, or directly from an extract providing a JSON type.

- **`expression` (string, required):**
  - The JMESPath expression that defines what data to extract from the JSON object.
  - Must result in a boolean value (e.g., `true` or `false`); otherwise, the operation returns an undetermined status with the `resultTypeMismatch` message.
  - JMESPath supports logical operations, comparisons, and functions that can produce boolean results (e.g., `contains`, `length() > 0`). Refer to the [JMESPath documentation](https://jmespath.org/) for supported syntax and functions.

- **`undeterminedIf` (object, required):**
  - Specifies conditions under which the operation returns an undetermined status instead of a value.

    - **`evaluationError` (string, required):**
      - Message returned if the JMESPath expression evaluation fails, such as due to a syntax error.

    - **`resultTypeMismatch` (string, required):**
      - Message returned if the expression's result is not a boolean (e.g., a string, number, or array).

    - **`resultIsEmpty` (string, optional):**
      - Message returned if the result is empty (e.g., `null` or an empty array when expecting a boolean). When provided, an empty result triggers an undetermined status with this message. If omitted, an empty result may still return a boolean if valid, or trigger `resultTypeMismatch` if invalid.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. **Extracting a Boolean Field:**
   - **Field:** `CA10__configJson__c` contains `{"enabled": true, "name": "test"}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BOOLEAN:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__configJson__c
              returnType: BYTES  
          undeterminedIf:
            isEmpty: "Config JSON is empty"
            isInvalid: "Config JSON is invalid"
      expression: "enabled"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a boolean"
    ```

   - **Result:** `true`
   - **Explanation:** Extracts the boolean value of the `"enabled"` key from the JSON object.

2. **Checking for Presence of an Element:**
   - **Field:** `CA10__tagsJson__c` contains `{"tags": ["prod", "secure"]}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BOOLEAN:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__tagsJson__c
              returnType: BYTES  
          undeterminedIf:
            isEmpty: "Tags JSON is empty"
            isInvalid: "Tags JSON is invalid"
      expression: "contains(tags, 'secure')"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a boolean"
    ```

   - **Result:** `true`
   - **Explanation:** Uses the `contains` function to check if `"secure"` exists in the `"tags"` array, returning a boolean.

3. **Comparing Array Length:**
   - **Field:** `CA10__rulesJson__c` contains `{"rules": [{"id": 1}, {"id": 2}]}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BOOLEAN:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__rulesJson__c
              returnType: BYTES  
          undeterminedIf:
            isEmpty: "Rules JSON is empty"
            isInvalid: "Rules JSON is invalid"
      expression: "length(rules) > `1`"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a boolean"
    ```

   - **Result:** `true`
   - **Explanation:** Evaluates if the length of the `"rules"` array is greater than 1, returning a boolean.

4. **Handling Type Mismatch:**
   - **Field:** `CA10__configJson__c` contains `{"status": "active"}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_BOOLEAN:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__configJson__c
              returnType: BYTES  
          undeterminedIf:
            isEmpty: "Config JSON is empty"
            isInvalid: "Config JSON is invalid"
      expression: "status"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a boolean"
    ```

   - **Result:** Undetermined status with message `"Result is not a boolean"`
   - **Explanation:** The `"status"` field is a string, not a boolean, triggering the `resultTypeMismatch` condition.
