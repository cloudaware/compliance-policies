# Description

Perform a periodic review of non-privileged role assignments to ensure that the non-privileged roles assigned to users are appropriate.

**Note**: Determining 'appropriate' assignments requires a clear understanding of your organization's personnel, systems, policies, and security requirements. This cannot be effectively prescribed in a procedure.

## Rationale

To ensure the principle of least privilege is followed, non-privileged role assignments should be reviewed periodically to confirm that users are granted only the minimum level of permissions they need to perform their tasks.

## Impact

Increased administrative effort to manage and remove role assignments appropriately.

## Audit

### From Azure Portal

1. Go to `Subscriptions`.
2. Click the name of a subscription.
3. Click `Access control (IAM)`.
4. Click `Role assignments`.
5. Click `Job function roles`.
6. For each role, ensure the assignments are appropriate.
7. Repeat steps 1-6 for each subscription.

## Default Value

Users do not have non-privileged roles assigned to them by default.

## References

1. <https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments>
