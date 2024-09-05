# Description

Restrict security group management to administrators only.

## Rationale

Restricting security group management to administrators only prohibits users from making changes to security groups. This ensures that security groups are appropriately managed and their management is not delegated to non-administrators.

## Impact

Group Membership for user accounts will need to be handled by Admins and cause administrative overhead.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Then `Groups`.
4. Select `General` in `Settings`.
5. Ensure that `Owners can manage group membership requests in the Access Panel` is set to `No`.

## Default Value

By default, `Owners can manage group membership requests in the Access Panel` is set to `No`.

## References

1. <https://docs.microsoft.com/en-us/azure/active-directory/active-directory-accessmanagement-self-service-group-management#making-a-group-available-for-end-user-self-service>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-1-separate-and-limit-highly-privilegedadministrative-users>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-3-manage-lifecycle-of-identities-and-entitlements>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-8-determine-access-process-for-cloud-provider-support>
5. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-2-define-and-implement-enterprise-segmentationseparation-of-duties-strategy>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
