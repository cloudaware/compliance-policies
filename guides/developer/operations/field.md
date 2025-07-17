# `FIELD`

```yaml
FIELD:
  path: { fieldPath } # required
  undeterminedIf: # optional
    isEmpty: { message } # optional
    noAccessDelegate: # optional
      path: { fieldPath } # required
      currentStateMessage: { message } # required
```

## Description

The `FIELD` operation allows you to access the value of a specific field within your input object. You specify the field using a path, which can traverse relationships (lookups) to access fields on
related objects.

The `FIELD` operation is primarily intended for use within [extract definition files](../index.md#extracts) or for rapid development and testing. In production-ready policy logic, `FIELD` should be avoided in favor of the [`EXTRACT`](extract.md) operation, which provides a stable and reusable abstraction layer.

## Parameters

- **`path` (string, required):**
  - Specifies the path to the field you want to access.
  - The path is a string that can include:
    - Field names within the input object (e.g., `CA10__status__c`).
    - Relationship names to traverse lookups, followed by field names on the related object (e.g., `CA10__account__r.CA10__accountId__c`). Relationship names typically end with `__r`.
  - Example paths:
    - `CA10__status__c`
    - `CA10__policyDocument__c`
    - `CA10__vpc__r.CA10__isDefault__c`
    - `CA10__securityGroup__r.CA10__account__r.CA10__accountId__c`

- **`undeterminedIf` (object, optional):**
  - Allows you to define conditions under which the `FIELD` operation should return an `UNDETERMINED` status instead of a value. This is useful for handling scenarios where a field might be empty or
    inaccessible due to permissions.
  - Properties:
    - **`isEmpty` (string, optional):**
      - If provided, and the field value at the specified `path` is considered empty by [`IS_EMPTY`](is-empty.md) operation, the operation will return `UNDETERMINED` status.
      - The string value is used as the `currentStateMessage` in the condition when the field is empty and `UNDETERMINED` is returned.
    - **`noAccessDelegate` (object, optional):**
      - Used as a temporary workaround until a dedicated "NO_ACCESS" check is available.
      - It checks if a *delegate field* is empty. If the delegate field is empty, it implies potential access issues to the primary field.
      - Primary field and delegate field can match.
      - Properties:
        - **`path` (string, required):** The path to the *delegate field* to check for emptiness.
        - **`currentStateMessage` (string, required):** The `currentStateMessage` to return if the delegate field is empty and `UNDETERMINED` status is returned.

## Return Type

Depending on the type of the field:

| Salesforce Field Type                      | Return Type                |
|--------------------------------------------|----------------------------|
| `ID`, `Lookup`, `MasterDetail`             | [`Text`](../type-system/index.md#text-type)         |
| `Text`, `TextArea`, `EncryptedText`        | [`Text`](../type-system/index.md#text-type)         |
| `LongTextArea`, `RichTextArea`             | [`Text`](../type-system/index.md#text-type)         |
| `URL`, `Email`, `Phone`                    | [`Text`](../type-system/index.md#text-type)         |
| `Time`                                     | [`Text`](../type-system/index.md#text-type)         |
| `Picklist`                                 | [`Text`](../type-system/index.md#text-type)         |
| `Number`, `Percent`, `Currency`, `Summary` | [`Number`](../type-system/index.md#number-type)     |
| `Checkbox`                                 | [`Boolean`](../type-system/index.md#boolean-type)   |
| `DateTime`                                 | [`DateTime`](../type-system/index.md#datetime-type) |
| `Date`                                     | [`DateTime`](../type-system/index.md#datetime-type) |

## Examples

1. Accessing field value:

    ```yaml
    FIELD:
      path: CA10__multiRegionTrail__c
    ```

2. Using `undeterminedIf` with `isEmpty`

    ```yaml
    FIELD:
      path: CA10__accountId__c
      undeterminedIf:
        isEmpty: "Account ID can not be empty. Possibly corrupted data."
    ```

3. Using `undeterminedIf` with `noAccessDelegate`:

    ```yaml
    FIELD:
      path: "CA10__versioningMfaDeleteEnabled__c"
      undeterminedIf:
        noAccessDelegate:
          path: "CA10__versioningStatus__c"
          currentStateMessage: "Unable to determine versioning status. Possible permission issue with s3:GetBucketVersioning"
    ```
