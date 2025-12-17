# Description

Restrict invitations to either users with specific administrative roles or no one.

## Rationale

Restricting invitations to users with specific administrator roles ensures that only authorized accounts have access to cloud resources. This helps to maintain "Need to Know" permissions and prevents inadvertent access to data.

By default the setting `Guest invite restrictions` is set to `Anyone in the organization can invite guest users including guests and non-admins`. This would allow anyone within the organization to invite guests and non-admins to the tenant, posing a security risk.

## Impact

With the option of `Only users assigned to specific admin roles can invite guest users` selected, users with specific admin roles will be in charge of sending invitations to the external users, requiring additional overhead by them to manage user accounts. This will mean coordinating with other departments as they are onboarding new users.

## Audit

This policy marks an *Azure Active Directory* as `INCOMPLIANT` if the related *Active Directory Auth Policy* has `Invites From State` set to either:

- **everyone**, or
- **adminsGuestInvitersAndAllMembers**.

## Default Value

By default, `Guest invite restrictions` is set to `Anyone in the organization can invite guest users including guests and non-admins`.

## References

1. <https://learn.microsoft.com/en-us/entra/external-id/external-collaboration-settings-configure>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-3-manage-lifecycle-of-identities-and-entitlements>
5. <https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.identity.signins/update-mgpolicyauthorizationpolicy?view=graph-powershell-1.0>
