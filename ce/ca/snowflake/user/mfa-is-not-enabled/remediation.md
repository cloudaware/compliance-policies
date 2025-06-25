# Remediation

Multi-Factor Authentication (MFA) is configured on a per-user basis in Snowflake. However, user enrollment is not automatic, each user must complete the enrollment process individually.

## Enforcing MFA Enrollment

The strategy for requiring MFA depends on whether your Snowflake account existed prior to the activation of the `2024_08` behavior change bundle.

1. Accounts Created *Before* the 2024_08 Bundle Activation

    For accounts provisioned prior to this behavior change, you must explicitly configure an authentication policy to require MFA for users authenticating with passwords.

   ### Example

    To enforce MFA for all users authenticating via password, execute the following:

    ```sql
    CREATE AUTHENTICATION POLICY require_mfa_with_password_authentication_policy
        MFA_AUTHENTICATION_METHODS = ('PASSWORD')
        MFA_ENROLLMENT = REQUIRED;
    ```

    After creating the policy, apply it at the desired scope (user, role, or account level).

2. Accounts Created *After* the 2024_08 Bundle Activation

    For accounts created after the 2024_08 bundle was enabled, MFA enrollment is required by default for all human users.

    To relax MFA enforcement (e.g., for service accounts or testing scenarios), create a custom authentication policy with MFA_ENROLLMENT = OPTIONAL, and assign it accordingly.

    **Note**: Changes to authentication policies should align with your organization’s identity and access management standards, and any regulatory compliance requirements.
