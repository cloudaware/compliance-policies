# `DATE_TIME_FROM`

```yaml
DATE_TIME_FROM:
  arg: { arg } # required
  format: { format } # required
  nullValues: # optional
    - { nullValue1 }
    - { nullValue2 }
  undeterminedIf: # required
    invalidFormat: { message } # required
    isEmpty: { message } # optional
```

## Description

The `DATE_TIME_FROM` operation converts a text (string) value into a [`DateTime`](../type-system/index.md#datetime-type) value. This is essential when dealing with date and time information represented as strings, allowing you to perform date-time comparisons and range checks within your policies. This operation ensures robust error handling by requiring you to specify outcomes for invalid or empty input strings.

## Parameters

- **`arg` (Operation<[`Text`](../type-system/index.md#text-type)>, required):**
  - Specifies the text value to be converted. This should be an operation that resolves to a [`Text`](../type-system/index.md#text-type) value, such as [`FIELD`](field.md) or [`EXTRACT`](extract.md).
- **`format` (string, required):**
  - Specifies the expected format of the `arg` string.
  - Currently supported value: `"ISO_8601"`. This indicates the string is in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format (e.g., `2023-10-26T10:00:00Z`, `2023-10-26`).
- **`nullValues` (list of strings, optional):**
  - A list of custom strings that should be treated as `null`. If the `arg` matches any string in this list (case-insensitively), the operation returns a `null` [`DateTime`](../type-system/index.md#datetime-type) value, which is then treated as empty. This is useful for handling data that uses placeholders like "N/A" or "Not Applicable".
- **`undeterminedIf` (object, required):**
  - A required block that defines how to handle potential errors during conversion, ensuring policies return an `UNDETERMINED` status instead of failing.
  - **`invalidFormat` (string, required):** The message to return if the `arg` value cannot be parsed as a valid [`DateTime`](../type-system/index.md#datetime-type) according to the specified `format`. This is crucial for handling malformed data.
  - **`isEmpty` (string, optional):** The message to return if the `arg` value is empty (`null`, `""`, or whitespace-only). If this is not provided, an empty `arg` will be treated as an invalid format.

## Return Type

[`DateTime`](../type-system/index.md#datetime-type)

## Examples

1. **Basic Conversion**

    Converts a valid ISO 8601 string to a `DateTime` object.

    ```yaml
    DATE_TIME_FROM:
      arg:
        EXTRACT: CA10__createdDate__c # Assumes extract returns an ISO 8601 string
      format: "ISO_8601"
      undeterminedIf:
        invalidFormat: "The 'Created Date' is not in a valid ISO 8601 format."
    ```

2. **Handling All Error Conditions**

    This example shows a complete implementation that handles empty inputs and invalid formats separately.

    ```yaml
    DATE_TIME_FROM:
      arg:
        FIELD:
          path: CA10__expirationDate__c
      format: "ISO_8601"
      undeterminedIf:
        isEmpty: "The expiration date is missing."
        invalidFormat: "The expiration date has an invalid format."
    ```

3. **Using `nullValues` to Handle Placeholders**

    This example correctly handles an input that might be a valid date, the string "N/A", or an invalid format.

    ```yaml
    IS_EMPTY:
      arg:
        DATE_TIME_FROM:
          arg:
            FIELD:
              path: CA10__lastLogin__c # Field might contain a date or "N/A"
          format: "ISO_8601"
          nullValues:
            - "N/A"
            - "Not Applicable"
          undeterminedIf:
            invalidFormat: "The last login date has an invalid format."
    ```
