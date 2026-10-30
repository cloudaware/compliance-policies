# Description

Super Admin accounts should be used only for Google Workspace or Cloud Identity identity administration. Google Cloud administration should be performed with separate user accounts that have appropriate Google Cloud IAM roles.

## Rationale

The Super Admin role can manage users, groups, domains, and many identity settings. Combining that role with Google Cloud IAM permissions expands the blast radius of a compromised account. Separating identity administration from cloud resource administration enforces least privilege and provides clearer operational accountability.

## Impact

Organizations may need to create separate Google Cloud administrator accounts and remove IAM bindings from existing Super Admin users. Validate that administrators retain the required access through non-Super Admin accounts before removing existing IAM roles.

## Audit

### From Google Admin Console and Google Cloud Console

1. In the Google Admin Console, go to `Account` > `Admin roles`.
2. Open the `Super Admin` role and note all assigned user accounts.
3. In the Google Cloud Console, go to `IAM & Admin` > `IAM`.
4. Review IAM bindings at the organization, folder, and project levels.
5. Verify that Super Admin accounts are not granted Google Cloud IAM roles.
