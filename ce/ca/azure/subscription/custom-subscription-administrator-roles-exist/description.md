# Description

The principle of least privilege should be followed and only necessary privileges should be assigned instead of allowing full administrative access.

## Rationale

Custom roles in Azure with administrative access can obfuscate the permissions granted and introduce complexity and blind spots to the management of privileged identities. For less mature security programs without regular identity audits, the creation of Custom roles should be avoided entirely. For more mature security programs with regular identity audits, Custom Roles should be audited for use and assignment, used minimally, and the principle of least privilege should be observed when granting permissions.

## Impact

Subscriptions will need to be handled by Administrators with permissions.

## Audit

This policy marks an *Azure Subscription* as `INCOMPLIANT` if it has a Custom Role that grants administrative privileges at the subscription level. This is detected by the wildcard ("__*__") action in the role’s `Permissions Json` alongside a __/subscriptions/__ entry in its `Assignable Scopes Json`.

## Default Value

By default, no custom owner roles are created.

## References

1. <https://docs.microsoft.com/en-us/azure/billing/billing-add-change-azure-subscription-administrator>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-1-separate-and-limit-highly-privilegedadministrative-users>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-3-manage-lifecycle-of-identities-and-entitlements>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-7-follow-just-enough-administration-least-privilege-principle>
