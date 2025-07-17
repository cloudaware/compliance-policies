# `TAG_VALUE_TEXT`

```yaml
TAG_VALUE_TEXT:
  name: { name } # required
  tagsJson: { tagsJson } # optional
```

## Description

The `TAG_VALUE_TEXT` operation retrieves the value of a specific tag as a `Text` type (case-insensitive, whitespace-normalized). It returns `null` if the tag does not exist.

## Parameters

- **`name` (Operation<[`Text`](../type-system/index.md#text-type) | [`Bytes`](../type-system/index.md#bytes-type)>, required):**
  - The name of the tag whose value you want to retrieve.
- **`tagsJson` (string, optional):**
  - The name of the field containing the tags in JSON format.
  - Defaults to `CA10__tagsJson__c` if not specified.

## Return Type

[`Text`](../type-system/index.md#text-type)

## Example

Checking if the value of the "environment" tag is "production":

```yaml
IS_EQUAL:
  left:
    TAG_VALUE_TEXT:
      name:
        TEXT: "environment"
  right:
    TEXT: "production"
```
