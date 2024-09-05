# Description

Joining or registering devices to Microsoft Entra ID should require Multi-factor authentication.

## Rationale

Multi-factor authentication is recommended when adding devices to Microsoft Entra ID. When set to `Yes`, users who are adding devices from the internet must first use the second method of authentication before their device is successfully added to the directory. This ensures that rogue devices are not added to the domain using a compromised user account. Note: Some Microsoft documentation suggests to use conditional access policies for joining a domain from certain whitelisted networks or devices. Even with these in place, using Multi-Factor Authentication is still recommended, as it creates a process for review before joining the domain.

## Impact

A slight impact of additional overhead, as Administrators will now have to approve every access to the domain.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Select `Devices`.
4. Select `Device settings`.
5. Ensure that `Require Multi-Factor Authentication to register or join devices with Microsoft Entra` is set to `Yes`.

## Default Value

By default, `Require Multi-Factor Authentication to register or join devices with Microsoft Entra` is set to `No`.

## References

1. <https://blogs.technet.microsoft.com/janketil/2016/02/29/azure-mfa-for-enrollment-in-intune-and-azure-ad-device-registration-explained/>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-identity-management#im-6-use-strong-authentication-controls>
