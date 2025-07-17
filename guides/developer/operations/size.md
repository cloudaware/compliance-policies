# `SIZE`

```yaml
SIZE:
  arg: { arg } # required
```

## Description

The `SIZE` operation returns the number of elements in a given collection. It returns a `Number` representing the size of the collection.

## Parameters

- **`arg` (Operation<[`List`](../type-system/index.md#list-type) | [`Set`](../type-system/index.md#set-type)>, required):**
  - The collection whose size you want to determine.
  - This should be an operation that resolves to a `List` or `Set`.

## Return Type

[`Number`](../type-system/index.md#number-type)

## Examples

1. Checking if a security group has more than 5 rules:

    ```yaml
    GREATER_THAN:
      left:
        SIZE:
          arg:
            FIELD:
              path: CA10__securityGroupRules__r # This is a related list
      right:
        NUMBER: 5
    ```
