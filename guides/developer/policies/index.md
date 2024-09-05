# Policies

## Policy directory structure

Each policy is represented by a directory in this repository.

The purpose of this is to store additional data beside the main policy yaml file.

Recommended structure is:

- `policy.yaml` - file-descriptor on the policy, does not contain logic
- `*.logic.yaml` - file with the policy logic (code), there are several reserved names for logic files
  - `prod.logic.yaml` - production-ready logic of the policy, Cloudaware will run this logic and store results
  - `wip.logic.yaml` - work-in-progress logic of the policy, Cloudaware will not run this file, and will reference these files in [this list](../../../lists/wip-policy.gen.md)
  - `example.logic.yaml` - reserved for example policies provided by Cloudaware
  - `unit-test.logic.yaml` - reserved for policies that self test Cloudaware Compliance Engine
  - `*.logic.yaml` - any addition version of the logic you'd like to include, for example another implementation that checks the conditions differently
- `description.md` - file with description of the policy
- `remediation.md` - file with remediation instructions for the policy
- `todo.md` - any TODO items associated with this policy, would be references from [this list](../../../lists/policy-with-todo.md.gen.md)
- `internal.md` - any additional relevant internal information. For example all the relevant research notes with sources and screenshots. would be references from [this list](../../../lists/policy-with-internal.md.gen.md)
- `*.png`, `*.jpg`, ... - screenshots from documentation, CA, etc.
- `*` - any additional relevant files
