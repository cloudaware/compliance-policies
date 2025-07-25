# Remediation

## From Azure Portal

1. Log in to the Azure portal.
2. This can be remediated by enabling MFA for user, Removing user access or Reducing access of managed identities attached to virtual machines.

- **Case I** : Enable MFA for users having access on virtual machines.

1. Go to `Microsoft Entra ID`.
2. For `Per-user MFA`:

    a. Under `Manage`, click `Users`.

    b. Click `Per-user MFA`.

    c. For each user requiring remediation, check the box next to their name.

    d Click `Enable MFA`, then Click `Enable`.

3. For `Conditional Access`:

    a. Under `Manage`, click `Security`.

    b. Under `Protect`, click `Conditional Access`.

    c. Update the Conditional Access policy requiring MFA for all users, removing each user requiring remediation from the `Exclude` list.

- **Case II** : Removing user access on a virtual machine.
    1. Select the `Subscription`, then click on `Access control (IAM)`.
    2. Select `Role assignments` and search for `Virtual Machine Administrator Login` or `Virtual Machine User Login` or any role that provides access to log into virtual machines.
    3. Click on `Role Name`, Select `Assignments`, and remove identities with no MFA configured.
- **Case III** : Reducing access of managed identities attached to virtual machines.
    1. Select the `Subscription`, then click on `Access control (IAM)`.
    2. Select `Role Assignments` from the top menu and apply filters on `Assignment type` as `Privileged administrator roles` and `Type` as `Virtual Machines`.
    3. Click on `Role Name`, Select `Assignments`, and remove identities access make sure this follows the least privileges principal.
