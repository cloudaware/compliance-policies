# Description

Restrict invitations to users with specific administrative roles only.

## Rationale

Restricting invitations to users with specific administrator roles ensures that only authorized accounts have access to cloud resources. This helps to maintain "Need to Know" permissions and prevents inadvertent access to data.

By default the setting `Guest invite restrictions` is set to `Anyone in the organization can invite guest users including guests and non-admins`. This would allow anyone within the organization to invite guests and non-admins to the tenant, posing a security risk.

## Impact

With the option of `Only users assigned to specific admin roles can invite guest users` selected, users with specific admin roles will be in charge of sending invitations to the external users, requiring additional overhead by them to manage user accounts. This will mean coordinating with other departments as they are onboarding new users.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Then `External Identities`.
4. `External collaboration settings`.
5. Under `Guest invite settings`, for `Guest invite restrictions`, ensure that that `Only users assigned to specific admin roles can invite guest users` is selected.

**Note**: This setting has 4 levels of restriction, which include:

- Anyone in the organization can invite guest users including guests and non-admins (most inclusive).
- Member users and users assigned to specific admin roles can invite guest users including guests with member permissions.
- Only users assigned to specific admin roles can invite guest users.
- No one in the organization can invite guest users including admins (most restrictive).

## Default Value

By default, `Guest invite restrictions` is set to `Anyone in the organization can invite guest users including guests and non-admins`.

## References

1. <https://docs.microsoft.com/en-us/azure/active-directory/active-directory-b2b-delegate-invitations>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-3-manage-lifecycle-of-identities-and-entitlements>
