# Description

The account lockout threshold determines how many failed login attempts are permitted prior to placing the account in a locked-out state and initiating a variable lockout duration.

## Rationale

Account lockout is a method of protecting against brute-force and password spray attacks. Once the lockout threshold has been exceeded, the account enters a locked-out state which prevents all login attempts for a variable duration. The lockout in combination with a reasonable duration reduces the total number of failed login attempts that a malicious actor can execute in a given period of time.

## Impact

If account lockout threshold is set too low (less than 3), users may experience frequent lockout events and the resulting security alerts may contribute to alert fatigue.

If account lockout threshold is set too high (more than 10), malicious actors can programmatically execute more password attempts in a given period of time.

## Audit

### From Azure Portal

1. From Azure Home select the Portal Menu.
2. Select `Microsoft Entra ID`.
3. Under `Manage`, select `Security`.
4. Under `Manage`, select `Authentication methods`.
5. Under `Manage`, select `Password protection`.
6. Ensure that `Lockout threshold` is set to `10` or fewer.

## Default Value

By default, Lockout threshold is set to `10`.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-smart-lockout#manage-microsoft-entra-smart-lockout-values>

## Additional Information

**NOTE**: The variable number for failed login attempts allowed before lockout is prescribed by many security and compliance frameworks. The **appropriate** setting for this variable should be determined by the most restrictive security or compliance framework that your organization follows.
