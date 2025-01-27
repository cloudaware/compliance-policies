---
tags: 
  - operation-returns-text
  - operation-consumes-constant
---
# `TEXT`

Constructs an operation that returns a user-specified constant Text/String.

Strings are case-insensitive, trim the input and normalize the whitespaces inside.

You can not construct `null` string. There is a special operation in case you need to check something is empty or null - [`IS_EMPTY`](IS_EMPTY%20or%20NOT_EMPTY.md)

**Inputs**:

- `arg` - string in YAML
  
**Output**: [`TextType`](../data-types.md#texttype)
