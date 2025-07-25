# Description

Verify identities without MFA that can log in to a privileged virtual machine using separate login credentials. An adversary can leverage the access to move laterally and perform actions with the virtual machine's managed identity. Make sure the virtual machine only has necessary permissions, and revoke the admin-level permissions according to the principle of least privilege.

## Rationale

Integrating multi-factor authentication (MFA) as part of the organizational policy can greatly reduce the risk of an identity gaining control of valid credentials that may be used for additional tactics such as initial access, lateral movement, and collecting information. MFA can also be used to restrict access to cloud resources and APIs.

An Adversary may log into accessible cloud services within a compromised environment using Valid Accounts that are synchronized to move laterally and perform actions with the virtual machine's managed identity. The adversary may then perform management actions or access cloud-hosted resources as the logged-on managed identity.

## Impact

This recommendation requires an Azure AD P2 License to implement.

Ensure that identities that are provisioned to a virtual machine utilizes an RBAC/ABAC group and is allocated a role using Azure PIM, and the Role settings require MFA or use another PAM solution (like CyberArk) for accessing Virtual Machines.

## Audit

### From Azure Portal

1. Log in to the Azure portal.
2. Select the `Subscription`, then click on `Access control (IAM)`.
3. Click `Role : All` and click `All` to display the drop-down menu.
4. Type `Virtual Machine Administrator Login` and select `Virtual Machine Administrator Login`.
5. Review the list of identities that have been assigned the `Virtual Machine Administrator Login` role.
6. Go to `Microsoft Entra ID`.
7. For `Per-user MFA`:

    a. Under `Manage`, click `Users`.

    b. Click `Per-user MFA`.

    c. Ensure that none of the identities assigned the `Virtual Machine Administrator Login` role from step 4 have `Status` set to `disabled`.

8. For `Conditional Access`:

    a. Under `Manage`, click `Security`.

    b. Under `Protect`, click `Conditional Access`.

    c. Ensure that none of the identities assigned the `Virtual Machine Administrator Login` role from step 4 are exempt from a Conditional Access policy requiring MFA for all users.
