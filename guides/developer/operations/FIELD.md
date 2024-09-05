---
tags: 
  - operation-returns-text
  - operation-returns-number
  - operation-returns-boolean
  - operation-returns-datetime
  - operation-consumes-field
---
# `FIELD`

Constructs an operation that returns a value of a user-specified field.

**Inputs**:

- `arg` - string in YAML with the fully qualified name of the field or chain of lookup fields to a value field.
  
**Output**: Depending on the field type, will return one of:

- [`TextType`](../data-types.md#texttype) for `ID`, `TEXT`, `MASTER_DETAIL`, `LOOKUP`, `PICKLIST`, `LONG_TEXT_AREA`, `RICH_TEXT_AREA`, `TEXT_AREA`, `ENCRYPTED_TEXT`, `SUMMARY`, `EMAIL`, `PHONE`, `TIME`, `URL`
- [`NumberType`](../data-types.md#numbertype) for `NUMBER`, `PERCENT`, `CURRENCY`
- [`BooleanType`](../data-types.md#booleantype) for `CHECKBOX`
- [`DateTimeType`](../data-types.md#datetimetype) for `DATE_TIME`
