# Description

This recommendation ensures that issued tokens are only issued to the intended device.

## Rationale

When properly configured, conditional access can aid in preventing attacks involving token theft, via hijacking or reply, as part of the attack flow. Although currently considered a rare event, the impact from token impersonation can be severe.

**Important**: While this recommendation allows exceptions to specific users or groups, they should be carefully tracked and reviewed for necessity on a regular interval through an access review process. It is important that this rule includes `All Users` to ensure that all users not specifically excepted are required to use MFA to access admin portals.

## Impact

A Microsoft Entra ID P1 or P2 license is required.

Start with a Conditional Access policy in `Report only` mode prior to enforcing it for all users.

## Audit

### From Azure Portal

1. Sign in to the Microsoft Entra admin center as at least a `Conditional Access Administrator`.
2. Browse to `Protection` > `Conditional Access` > `Policies`.
3. Review existing policies to ensure that at least one policy contains the following configuration:
4. Under `Assignments`, review `Users or workload identities`, and:
    - Under `Include`, ensure the scope of the users or groups is appropriate for your organization
    - Under `Exclude`, ensure only necessary users and groups (your organization's emergency access or break-glass accounts) are excepted.
5. Under `Target resources` > `Resources` > `Include` > `Select resources`, ensure that both `Office 365 Exchange Online` and `Office 365 SharePoint Online` are selected.
6. Under `Conditions` > `Device Platforms`: Ensure `Configure` is set to `Yes` and `Include` indicates `Windows` platforms.
7. Under `Conditions` > `Client Apps`, ensure `Configure` is set to `Yes` and `Mobile Apps and Desktop Clients` is selected under Modern Authentication Clients.
8. Under `Access controls` > `Session`, ensure that `Require token protection for sign-in sessions` is selected.

## Default Value

A Token Protection Conditional Access policy does not exist by default.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-token-protection>
2. <https://www.microsoft.com/en-gb/security/business/microsoft-entra-pricing>
