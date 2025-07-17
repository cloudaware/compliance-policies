# `EXTRACT`

```yaml
EXTRACT: { path }
```

## Description

The `EXTRACT` operation allows you to retrieve a pre-defined, safe-to-use value from your input object. It references an "extract" defined in a separate [extract file](../index.md#extracts). Extracts
provide an abstraction layer, allowing you to define reusable logic for accessing and transforming data. This promotes cleaner and more maintainable logic files, especially for production use, as
changes to data access logic can be centralized in extract files rather than spread across multiple logic files. This operation should be used in [logic files](../index.md#logic) for production logic
use, while [`FIELD`](field.md) operation is recommended for development and in [extract files](../index.md#extracts) where you define the extraction logic itself.

When using `EXTRACT` it is required to add reference corresponding [extracts file](../index.md#extracts)  to `importExtracts` section. Add `importExtracts` for extracts from types used in the root of the logic to the root and for extracts used in each of `relatedLists` to the related lists' `importExtracts` section:

```yaml
inputType: CA10__CaAwsInstance__c
importExtracts:
  - file: /types/CA10__CaAwsInstance__c/object.extracts.yaml
  - file: /types/CA10__CaAwsVpc__c/object.extracts.yaml
conditions:
  - status: UNDETERMINED
    currentStateMessage: Status fields are not populated
    check:
      OR:
        args:
          - IS_EMPTY:
              arg:
                EXTRACT: CA10__stateName__c
          - IS_EMPTY:
              arg:
                EXTRACT: CA10__vpc__r.CA10__state__c
# ...
relatedLists:
  - relationshipName: CA10__AWS_EBS_Volumes__r
    importExtracts:
      - file: /types/CA10__CaAwsVolume__c/object.extracts.yaml
    conditions:
      - status: UNDETERMINED
        currentStateMessage: Attachment status is undetermined
        check:
          IS_EMPTY:
            arg:
              EXTRACT: CA10__attachmentStatus__c
      # ...
```

## Parameters

- **`path` (string, required):**
  - Specifies the path to the extract you want to access.
  - The path is a string that can include:
    - Extract names within the input object (e.g., `CA10__status__c`).
    - Relationship names to traverse lookups, followed by extract name on the related object (e.g., `CA10__account__r.CA10__accountId__c`). Relationship names typically end with `__r`.
  - The extract name must correspond to an extract defined in an available [extract file](../index.md#extracts).
  - Example paths:
    - `CA10__userName__c`
    - `CA10__user__r.CA10__credReportAttributesJson__c`
    - `CA10__account__r.CA10__accountId__c`

## Return Type

Extract can return result from any operation supported by Compliance Engine, so it can return any of supported types.

## Examples

1. Using a simple extract:

    ```yaml
    EXTRACT: CA10__userName__c
    ```

2. Using an extract from a related object:

    ```yaml
    EXTRACT: CA10__user__r.CA10__credReportPasswordLastUsed__c
    ```
