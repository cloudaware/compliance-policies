# `TAG_EXISTS`

```yaml
TAG_EXISTS:
  name: { name } # required
  tagsJson: { tagsJson } # optional
```

## Description

The `TAG_EXISTS` operation checks if a tag with a specific name exists on a resource.

## Parameters

- **`name` (Operation<[`Text`](../type-system/index.md#text-type) | [`Bytes`](../type-system/index.md#bytes-type)>, required):**
  - The name of the tag to check for. Use `Text` for case-insensitive matching and `Bytes` for case-sensitive matching.
- **`tagsJson` (string, optional):**
  - The name of the field containing the tags in JSON format.
  - Defaults to `CA10__tagsJson__c` if not specified.

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Example

Checking if a resource has an "Owner" tag (case-insensitive):

```yaml
TAG_EXISTS:
  name:
    TEXT: "Owner"
```
