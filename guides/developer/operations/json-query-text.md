# `JSON_QUERY_TEXT`

```yaml
JSON_QUERY_TEXT:
  arg: { arg } # required, Operation<JSON>
  expression: { expression } # required, string (JMESPath expression)
  undeterminedIf:
    evaluationError: { message } # required, string
    resultTypeMismatch: { message } # required, string
    resultIsEmpty: { message } # optional, string
```

## Description

The `JSON_QUERY_TEXT` operation evaluates a JMESPath expression against a JSON object and returns the result as a text value. It enables the extraction of specific text data from JSON structures, leveraging the JMESPath query language to navigate and transform JSON documents stored in fields or extracts.

## Parameters

- **`arg` (Operation<[`Json`](../type-system/index.md#json-type)>, required):**
  - The JSON object against which the JMESPath expression will be evaluated.
  - Typically, sourced using `JSON_FROM` to convert a text field containing JSON data into a JSON object, or directly from an extract providing a JSON type.

- **`expression` (string, required):**
  - The JMESPath expression that defines what data to extract from the JSON object.
  - Must result in a text value (string); otherwise, the operation returns an undetermined status with the `resultTypeMismatch` message.
  - JMESPath is a powerful query language for JSON, supporting operations like selecting elements, filtering arrays, and applying functions (e.g., `join`).
  - For complex JSON queries, refer to the [JMESPath documentation](https://jmespath.org/) for supported syntax and functions.

- **`undeterminedIf` (object, required):**
  - Specifies conditions under which the operation returns an undetermined status instead of a value.

    - **`evaluationError` (string, required):**
      - Message returned if there is an error evaluating the JMESPath expression, such as a syntax error.

    - **`resultTypeMismatch` (string, required):**
      - Message returned if the result of the expression is not a text value (e.g., a number, boolean, or array).

    - **`resultIsEmpty` (string, optional):**
      - Message returned if the result is an empty string. When provided, an empty result triggers an undetermined status with this message. If omitted, an empty string is returned as the result.

## Return Type

[`Text`](../type-system/index.md#text-type)

## Examples

1. **Extracting a simple key from a JSON object:**
   - **Field:** `CA10__configJson__c` contains `{"name": "example", "value": "test"}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_TEXT:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__configJson__c # Assume '' contains
              returnType: BYTES  
          undeterminedIf:
            isEmpty: "Config JSON is empty"
            isInvalid: "Config JSON is invalid"
      expression: "name"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a text value"
    ```

   - **Result:** `"example"`
   - **Explanation:** Extracts the value of the `"name"` key from the JSON object.

2. **Extracting a nested value:**
   - **Field:** `CA10__detailsJson__c` contains `{"details": {"id": "123", "status": "active"}}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_TEXT:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__detailsJson__c 
              returnType: BYTES  
          undeterminedIf:
            isEmpty: "Details JSON is empty"
            isInvalid: "Details JSON is invalid"
      expression: "details.status"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a text value"
    ```

   - **Result:** `"active"`
   - **Explanation:** Accesses the nested `"status"` field within the `"details"` object.

3. **Using JMESPath functions:**
   - **Field:** `CA10__itemsJson__c` contains `{"items": [{"name": "item1"}, {"name": "item2"}]}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_TEXT:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__itemsJson__c 
              returnType: BYTES  
          undeterminedIf:
            isEmpty: "Items JSON is empty"
            isInvalid: "Items JSON is invalid"
      expression: "join(', ', items[].name)"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a text value"
      ```

   - **Result:** `"item1, item2"`
   - **Explanation:** Uses the JMESPath `join` function to concatenate the `"name"` values from the `"items"` array into a single string.

4. **Handling empty results:**
   - **Field:** `CA10__configJson__c` contains `{"description": ""}`.
   - **Operation:**

    ```yaml
   JSON_QUERY_TEXT:
     arg:
       JSON_FROM:
         arg:
           FIELD:
             path: CA10__configJson__c # 
             returnType: BYTES  
         undeterminedIf:
           isEmpty: "Config JSON is empty"
           isInvalid: "Config JSON is invalid"
     expression: "description"
     undeterminedIf:
       evaluationError: "Error in JMESPath expression"
       resultTypeMismatch: "Result is not a text value"
       resultIsEmpty: "Description is empty"
   ```

   - **Result:** Undetermined status with message `"Description is empty"`
   - **Explanation:** Since `resultIsEmpty` is specified and the result is an empty string, the operation returns undetermined. Without `resultIsEmpty`, it would return `""`.
