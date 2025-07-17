# `JSON_QUERY_NUMBER`

```yaml
JSON_QUERY_NUMBER:
  arg: { arg } # required, Operation<JSON>
  expression: { expression } # required, string (JMESPath expression)
  undeterminedIf:
    evaluationError: { message } # required, string
    resultTypeMismatch: { message } # required, string
    resultIsEmpty: { message } # optional, string
```

## Description

The `JSON_QUERY_NUMBER` operation evaluates a JMESPath expression against a JSON object and returns the result as a number value. It enables the extraction of specific numeric data from JSON structures, leveraging the JMESPath query language to navigate and transform JSON documents stored in fields or extracts.

## Parameters

- **`arg` (Operation<[`Json`](../type-system/index.md#json-type)>, required):**
  - The JSON object against which the JMESPath expression is evaluated.
  - Typically, sourced using `JSON_FROM` to convert a text field containing JSON data into a JSON object, or directly from an extract providing a JSON type.

- **`expression` (string, required):**
  - The JMESPath expression that defines what data to extract from the JSON object.
  - Must result in a numeric value (e.g., integer or float); otherwise, the operation returns an undetermined status with the `resultTypeMismatch` message.
  - JMESPath supports numeric operations, such as `length()` for array sizes or direct extraction of numeric fields. Refer to the [JMESPath documentation](https://jmespath.org/) for supported syntax and functions.

- **`undeterminedIf` (object, required):**
  - Specifies conditions under which the operation returns an undetermined status instead of a value.

    - **`evaluationError` (string, required):**
      - Message returned if the JMESPath expression evaluation fails, such as due to a syntax error.

    - **`resultTypeMismatch` (string, required):**
      - Message returned if the expression's result is not a number (e.g., a string, boolean, or array).

    - **`resultIsEmpty` (string, optional):**
      - Message returned if the result is empty (e.g., `null` or an empty array when expecting a number). When provided, an empty result triggers an undetermined status with this message. If omitted, an empty result may trigger `resultTypeMismatch` if invalid.

## Return Type

[`Number`](../type-system/index.md#number-type)

## Examples

1. **Extracting a Numeric Field:**
   - **Field:** `CA10__metricsJson__c` contains `{"count": 42, "name": "test"}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_NUMBER:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__metricsJson__c
              returnType: BYTES  
          undeterminedIf:
            isEmpty: "Metrics JSON is empty"
            isInvalid: "Metrics JSON is invalid"
      expression: "count"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a number"
    ```

   - **Result:** `42`
   - **Explanation:** Extracts the numeric value of the `"count"` key from the JSON object.

2. **Calculating Array Length:**
   - **Field:** `CA10__itemsJson__c` contains `{"items": ["a", "b", "c"]}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_NUMBER:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__itemsJson__c
              returnType: BYTES  
          undeterminedIf:
            isEmpty: "Items JSON is empty"
            isInvalid: "Items JSON is invalid"
      expression: "length(items)"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a number"
    ```

   - **Result:** `3`
   - **Explanation:** Uses the `length` function to return the number of elements in the `"items"` array.

3. **Extracting a Nested Numeric Value:**
   - **Field:** `CA10__statsJson__c` contains `{"stats": {"total": 15.5}}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_NUMBER:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__statsJson__c
              returnType: BYTES  
          undeterminedIf:
            isEmpty: "Stats JSON is empty"
            isInvalid: "Stats JSON is invalid"
      expression: "stats.total"
      undeterminedIf:
        evaluationError: "Error in JMESPath expression"
        resultTypeMismatch: "Result is not a number"
    ```

   - **Result:** `15.5`
   - **Explanation:** Accesses the nested `"total"` field within the `"stats"` object, returning a float.

4. **Handling Null or Missing Field:**
   - **Field:** `CA10__configJson__c` contains `{"items": null}` or `{}`.
   - **Operation:**

    ```yaml
    JSON_QUERY_NUMBER:
      arg:
        JSON_FROM:
          arg:
            FIELD:
              path: CA10__configJson__c
              returnType: BYTES  
          undeterminedIf:
            isEmpty: "Config JSON is empty"
            isInvalid: "Config JSON is invalid"
      expression: "length(items)"
      undeterminedIf:
        evaluationError: "Failed to evaluate length: items is null or missing"
        resultTypeMismatch: "Result is not a number"
    ```

   - **Result:** Undetermined status with message `"Failed to evaluate length: items is null or missing"`
   - **Explanation:** When `"items"` is `null` or absent, `length(items)` triggers a `TypeError` in JMESPath, which is caught as an evaluation error rather than an empty result. The `resultIsEmpty` condition isn't triggered here because `0` (from an empty array) is valid, and `null` leads to an error instead.
