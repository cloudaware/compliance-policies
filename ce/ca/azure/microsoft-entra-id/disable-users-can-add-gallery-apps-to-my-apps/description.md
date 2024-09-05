# Description

Require administrators to provide consent for the apps before use.

## Rationale

Unless Microsoft Entra ID is running as an identity provider for third-party applications, do not allow users to use their identity outside of your cloud environment. User profiles contain private information such as phone numbers and email addresses which could then be sold off to other third parties without requiring any further consent from the user.

## Impact

Can cause additional requests to administrators that need to be fulfilled quite often.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Then `Enterprise applications`.
4. Select `User settings`.
5. Ensure that `Users can add gallery apps to My Apps is set` to `No`.

## Default Value

By default, Users can add gallery apps to My Apps is set to No.

## References

1. <https://blogs.msdn.microsoft.com/exchangedev/2014/06/05/managing-user-consent-for-applications-using-office-365-apis/>
2. <https://nicksnettravels.builttoroam.com/post/2017/01/24/Admin-Consent-for-Permissions-in-Azure-Active-Directory.aspx>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-governance-strategy#gs-6-define-and-implement-identity-and-privileged-access-strategy>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-privileged-access#pa-1-separate-and-limit-highly-privilegedadministrative-users>
