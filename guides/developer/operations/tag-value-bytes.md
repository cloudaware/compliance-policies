# `TAG_VALUE_BYTES`

```yaml
TAG_VALUE_BYTES:
  name: { name } # required
  tagsJson: { tagsJson } # optional
```

## Description

The `TAG_VALUE_BYTES` operation retrieves the value of a specific tag as a `Bytes` type (case-sensitive, exact whitespace). It returns `null` if the tag does not exist. This is useful for tag values where case and exact spacing are important.

## Parameters

- **`name` (Operation<[`Text`](../type-system/index.md#text-type) | [`Bytes`](../type-system/index.md#bytes-type)>, required):**
  - The name of the tag whose value you want to retrieve.
- **`tagsJson` (string, optional):**
  - The name of the field containing the tags in JSON format.
  - Defaults to `CA10__tagsJson__c` if not specified.

## Return Type

[`Bytes`](../type-system/index.md#bytes-type)

## Example

Checking if a project code tag has the exact value "Prj-Alpha-01":

```yaml
IS_EQUAL:
  left:
    TAG_VALUE_BYTES:
      name:
        TEXT: "ProjectCode"
  right:
    BYTES: "Prj-Alpha-01"
```
