---
tags: 
  - operation-returns-boolean
  - operation-consumes-field
---
# `AWS_POLICY_ALLOWS`

## `AccessLevel`

Enum with the access levels that we use to calculate access for AWS Policy Documents.

Access levels are used in extended policy documents, usually named the same as original field with `Ext` suffix. For example `CA10__policyDocument__c` and `CA10__policyDocumentExt__c`.

To calculate the access levels Cloudaware checks `Principal`, and also anything in `Condition` that can narrow down the principals that can get the access with this statement. Some levels also use `Source`-related operations in `Condition`.

The list of values: (in order from the most restrictive to least restrictive)

- `NOBODY` - Nobody will be able to get access in this statement. This happens when there are conditions that mutually exclude each other and never evaluate as `true` together.

- `SAME_ACCOUNT` - Only principals that belong to the same account as the object that's being checked can evaluate this statement to `true`
  
- `SAME_ORG` - Only principals that belong to the same org as the object that's being checked can evaluate this statement to `true`. There also might or might not be principals from the same account.
  
- `TRUSTED_PRINCIPAL` - Only principals that belong to accounts and organizations that are being collected in CMDB can evaluate this statement to `true`.

- `AWS_SERVICE` - Only principals that belong to AWS-itself can evaluate this statement to `true`.

- `EXTERNAL_PRINCIPAL` - Some principals from accounts/orgs that we can't find in CMDB will be able to evaluate this statement to `true`.

- `ANONYMOUS_PRINCIPAL` - There is no restriction on principal present in the policy.
