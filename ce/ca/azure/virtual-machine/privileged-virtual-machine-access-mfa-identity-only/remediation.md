# Remediation

## From Azure Portal

1. Log in to the Azure portal.
2. This can be remediated by enabling MFA for user, Removing user access or Reducing access of managed identities attached to virtual machines.

- **Case I** : Enable MFA for users having access on virtual machines.
    1. Navigate to `Azure AD` from the left pane and select `Users` from the Manage section.
    2. Click on `Per-User MFA` from the top menu options and select each user with `MULTI-FACTOR AUTH STATUS` as `Disabled` and can login to virtual machines:
        - From `quick steps` on the right side select `enable`.
        - Click on `enable multi-factor auth` and share the link with the user to setup MFA as required.
- **Case II** : Removing user access on a virtual machine.
    1. Select the `Subscription`, then click on `Access control (IAM)`.
    2. Select `Role assignments` and search for `Virtual Machine Administrator Login` or `Virtual Machine User Login` or any role that provides access to log into virtual machines.
    3. Click on `Role Name`, Select `Assignments`, and remove identities with no MFA configured.
- **Case III** : Reducing access of managed identities attached to virtual machines.
    1. Select the `Subscription`, then click on `Access control (IAM)`.
    2. Select `Role Assignments` from the top menu and apply filters on `Assignment type` as `Privileged administrator roles` and `Type` as `Virtual Machines`.
    3. Click on `Role Name`, Select `Assignments`, and remove identities access make sure this follows the least privileges principal.
