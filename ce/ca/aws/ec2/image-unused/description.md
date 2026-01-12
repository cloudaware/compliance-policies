# Description

This policy identifies Amazon Machine Images (AMIs) that appear to be unused. An AMI is considered unused when all of the following conditions are met:

1. The AMI is in the **Available** state.
2. The AMI was created more than **90 days** ago.
3. The AMI was last used more than **90 days** ago.
4. The AMI is **not associated** with any AWS EC2 Instances in the CMDB.

Removing unused AMIs helps reduce unnecessary storage costs. The AMI cleanup process consists of two steps: deregistering the unused AMI and deleting the associated snapshots.

## Rationale

AMIs stored in your AWS account incur ongoing storage charges, regardless of whether they are actively used. Over time, AMIs created from previous deployments, testing, or backup processes can accumulate. If an AMI is no longer required for launching instances, compliance, or recovery purposes, retaining it results in unnecessary cost and operational overhead.

## Audit

This policy flags an *AWS EC2 Image* as `INCOMPLIANT` if all of the following conditions are met:

- `State` is **available**,
- `Creation Date` is older than **90 days**,
- `Last Launched Time` is older than **90 days**, and
- No related *AWS EC2 Instance* exists.

Images that are not in the **available** State or were created within the last **90 days** are marked as `INAPPLICABLE`.
