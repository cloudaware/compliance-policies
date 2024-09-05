# Best Practices

The goal is to write policies that:

- Are easy to read
- Are easy to understand
- Are easy to maintain and update
- Would produce meaningful messages for the user
- Would survive the updates in the cloud without loosing the functionality or even worse: produce false-positives or false-negatives

To achieve this it's recommended to:

## Understand that the policy here is not a "code", there are no variable, no loops, no branching.
  
What you're composing as a "policy" is a declaratory description of how you'd like to assign a [`Status`](#status) to each object.

Keeping that in mind it is very important to design the [operations](#operations) that will enable this declaratory approach.

Therefore if what you're trying to achieve in the policy seems:
- hard to implement
- or implementation looks ugly
- or it looks too complicated
- or just feels wrong

Stop. Contact developers. Describe them your use-case and depending on the response you might have to change the approach or open a Feature Request for a new [operation](#operations)

## Do not re-write policies. Rethink policies

A lot of old, existing and competitor policies are:

- Out of date
- Poorly written (because they themselves are a carbon copy of a bad outsourced policy)
- Check only for `INCOMPLIANT` state, without proper checks for `INAPPLICABLE` or especially `UNDETERMINED`
- Implement a concept that does not make sense in the first place.

So when you're writing a policy:

- Make sure that it actually makes sense
- Try to utilize all available [statuses](#status)
- Have an understanding for a complete final `COMPLIANT`/`INCOMPLIANT` state and plan to get to this state with multiple smaller checks.
- Add checks for `UNDETERMINED` status along the way.

## There is no `WHERE` statement

All policies check all objects all the time.

CEv1 policies use `WHERE` a lot to filter objects. With CEv2 policies you need to add conditions to assign statuses to all the objects that were filtered out in CEv1 policies.

Additionally, if CEv1 policy had a subselect in `WHERE`, new policy will have subselect in `SELECT`, which is implemented as an element in [`relatedLists`](#relatedlist-object) array.

## Keep the conditions small
  
Smaller conditions are easy to read and understand.

The smaller the condition, the more precise messages you can supply to the user.

Instead of writing one big condition with multiple `AND` and `OR` operations to get directly to `INCOMPLIANT`, split the logic into multiple conditions and gradually chip away the objects that are not relevant for this policy, narrowing down the field of possibilities for `INCOMPLIANT` objects.

## Use the best [operation](#operations) for the job to keep the amount of nested conditions under control

CEv2 adds a lot of very specific operations for a very specific use-cases

- Use proper `IS_*` or `NOT_*` operation instead of nesting it into the [`NOT`](#not-operation)
- [`BETWEEN`](#between-operation) instead of [`LOGICAL (AND)`](#logical-operation) with two [`COMPARISON`](#comparison-operation)
- In case of [`RELATED_LIST_AGGREGATE`](#related_list_aggregate-operation), use `HAS` first, but if you do need actual number of objects, then use `COUNT`. Depending on the environment where the policy runs, `HAS` might have additional processing optimizations implemented.
- TODO: ADD MORE EXAMPLES

## Use code suggestion (Ctrl+Space) while writing the policy

Schema is always up-to-date with available functionality. All the properties and operation nesting is defined in the schema. Schema is also aware of the types of input parameters and outputs (some operations have multiple output types, like [`RELATED_LIST_AGGREGATE`](#related_list_aggregate-operation) or [`FIELD`](#field-operation)) and will suggest relevant operations. So, suggestions should be accurate. 

## Write simple, understandable and precise `currentStatusMessage`s and `remediationMessage`s
  
`currentStatusMessage` should:

- Reference only state checked in the current condition. Leave it to the platform to explain how the object got to this specific condition and what conditions it did not satisfy along the way
- TODO: WRITE ABOUT HOW TO COMPOSE `currentStatusMessage`

`remediationMessage` should:

- Keep it brief. Give detailed instructions for remediation (if available) in the policy itself and give a reference to it (or a specific remediation path) from the condition.
- TODO: WRITE ABOUT HOW TO COMPOSE `remediationMessage`

## **WRITE COMMENTS**

YAML is not JSON, you can and **SHOULD** write comments. **Comments are not visible** to the consumer of the findings, they are for the next developer that's going to look into your policy.

- Write what is that your policy is trying to achieve.
- How is it going to achieve this physically.
- Write any relevant information you found during research of the policy. 
- Store links to the sources you've found in the comments
- Copy-paste the relevant information you've found during research
- Comment individual conditions with the info you've seen during debug.
- Write `TODO:` for the things that must be implemented or re-implemented in the future.
- Do not comment obvious stuff for the sake of commenting.
  
By the end you probably going to be at least 50/50 for code/comments
