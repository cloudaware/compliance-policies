# Data Types

## `BooleanType`

`true` / `false` / `null` type.

Constant `BooleanType` value can be constructed from [`BOOLEAN`](operations/BOOLEAN.md) operation.

Can be retrieved from `Checkbox` fields using [`FIELD`](operations/FIELD.md) operation.

Operations that [return](/tags/operation-returns-boolean) or [consume](/tags/operation-consumes-boolean) `BooleanType`.

## `NumberType`

`float` / `double` / `null` type. For example: `0.0`, `-1000.0`, `42`

Constant `NumberType` value can be constructed from [`NUMBER`](operations/NUMBER.md) operation.

Can be retrieved from fields, that return number, like `Number`, `Currency`, etc. using [`FIELD`](operations/FIELD.md) operation.

Operations that [return](/tags/operation-returns-number) or [consume](/tags/operation-consumes-numner) `NumberType`.

## `TextType`

`String` / `Text` / `null` type.

Constant `TextType` value can be constructed from [`TEXT`](operations/TEXT.md) operation.

Can be retrieved from fields, that return strings, like `Text`, `TextArea`, `LongTextArea`, etc. using [`FIELD`](operations/FIELD.md) operation.

Text is stored as case-sensitive, but [operations](operations) will have a have a case-sensitive and case-insensitive variants.

Operations that [return](/tags/operation-returns-text) or [consume](/tags/operation-consumes-text) `TextType`.

## `DateTimeType`

`DateTime` / `null` type. For example: `2022-02-04 23:00:00`

You can not construct constant `DateTimeType` values. This is by-design. You can only retrieve `DateTimeType` values from [`FIELD`](operations/FIELD.md) operation from `DateTime` fields.

Operations that [return](/tags/operation-returns-datetime) or [consume](/tags/operation-consumes-datetime) `DateTimeType`.

## `CollectionType`

Closes analog would be Java's `Set<String>` type.

Key properties:

- Would eliminate duplicates. `['a', 'a', 'b', 'c']` is impossible, it would be processed as `['a', 'b', 'c']`
- Order of elements does not matter. `['a', 'b', 'c']` would be functionally equal to `['c', 'a', 'b']`
- TODO: FIGURE OUT HOW CASE-SENSITIVITY WORKS
- TODO: FIGURE OUT IF `null` value inside collection is possible
- TODO: FIGURE OUT WHETHER .trim is applied to values

Currently you can not construct constant `CollectionType` values.

Operations that [return](/tags/operation-returns-collection) or [consume](/tags/operation-consumes-collection) `CollectionType`.

## `AttributesType`

Operations that [return](/tags/operation-returns-attributes) or [consume](/tags/operation-consumes-attributes) `AttributesType`.

## `JsonType`

Operations that [return](/tags/operation-returns-json) or [consume](/tags/operation-consumes-json) `JsonType`.
