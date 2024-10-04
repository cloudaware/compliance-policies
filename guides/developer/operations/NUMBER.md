---
tags: 
  - operation-returns-number
  - operation-consumes-constant
---
# `NUMBER`

Constructs an operation that returns a user-specified constant `number`/`float`/`double`.

You can not construct `null` number. There is a special operation in case you need to check something is empty or null - [`IS_EMPTY`](IS_EMPTY%20or%20NOT_EMPTY.md)

**Inputs**:

- `arg` - number in YAML with decimal part, like `42.0`
  
**Output**: [`NumberType`](../data-types.md#numbertype)
