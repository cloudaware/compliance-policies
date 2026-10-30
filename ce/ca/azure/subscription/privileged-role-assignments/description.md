# Description

Perform periodic reviews of privileged role assignments to ensure that privileged roles assigned to users are accurate and appropriate.

## Rationale

Privileged roles are crown jewel assets that can be used by malicious insiders, threat actors, and even through mistake to significantly damage an organization in numerous ways. These roles should be periodically reviewed to:

- identify lingering permission assignments, for example, an administrator has been terminated, the account is retained, but permissions are no longer necessary and have not been removed
- detect lateral movement through privilege escalation, for example, an account with administrative permission has been compromised and is elevating other accounts to bypass detection mechanisms

## Impact

Increased administrative effort to manage and remove role assignments appropriately.

## Audit

### From Azure Portal

1. From Azure Home, select the Portal Menu.
2. Select `Subscriptions`.
3. Select a subscription.
4. Select `Access control (IAM)`.
5. Look for the number under the word `Privileged` accompanied by a link titled `View Assignments`. Click the `View assignments` link.
6. For each privileged role listed, evaluate whether the assignment is appropriate and current for each User, Group, or App assigned to each privileged role.

**NOTE**: The judgement of what constitutes 'appropriate and current' assignments requires a clear understanding of your organization's personnel, systems, policy, and security requirements. This cannot be effectively prescribed in procedure.

## References

1. <https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles>
