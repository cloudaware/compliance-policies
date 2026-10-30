# Description

**Note**: This recommendation is only relevant if your subscription is using per-user MFA. If your organization is licensed to use Conditional Access, the preferred method of requiring MFA to join devices to Entra ID is to use a Conditional Access policy (see Additional Information below for the link).

Joining or registering devices to Microsoft Entra ID should require multi-factor authentication.

## Rationale

Multi-factor authentication is recommended when adding devices to Microsoft Entra ID. When set to `Yes`, users who are adding devices from the internet must first use the second method of authentication before their device is successfully added to the directory. This ensures that rogue devices are not added to the domain using a compromised user account.

## Impact

There is additional overhead, as administrators will need to approve every access to the domain.

## Audit

### From Azure Portal

1. In the Azure portal, open the portal menu.
2. Select `Microsoft Entra ID`.
3. Under `Manage`, select `Devices`.
4. Under `Manage`, select `Device settings`.
5. Under `Microsoft Entra join and registration settings`, ensure that `Require Multifactor Authentication to register or join devices with Microsoft Entra` is set to `Yes`.

## Default Value

By default, `Require Multi-Factor Authentication to register or join devices with Microsoft Entra` is set to `No`.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/conditional-access/how-to-policy-mfa-device-register-join>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-6-use-strong-authentication-controls>

## Additional Information

If Conditional Access is available, this recommendation should be bypassed in favor of the Conditional Access implementation of requiring multi-factor authentication to register or join devices with Microsoft Entra.

<https://learn.microsoft.com/en-us/entra/identity/conditional-access/how-to-policy-mfa-device-register-join>
