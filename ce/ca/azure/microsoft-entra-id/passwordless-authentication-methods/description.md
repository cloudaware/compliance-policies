# Description

Passwordless authentication methods improve security and user experience by replacing passwords with something you have (e.g., a hardware key), something you are (biometrics), or something you know, offering a convenient and secure way to access resources.

Microsoft Entra ID and Azure Government integrate the following passwordless authentication options:

- Windows Hello for Business
- Platform Credential for macOS
- Platform single sign-on (PSSO) for macOS with smart card authentication
- Microsoft Authenticator
- Passkeys (FIDO2)
- Certificate-based authentication

## Rationale

Using passwordless authentication makes sign-in easier and more secure by removing passwords, helping to protect organizations from attacks and improving the user experience.

## Impact

Implementing passwordless authentication requires administrative effort and may incur costs for some methods. It has the potential to save time and money by improving user convenience and productivity and by reducing the need for password support.

## Audit

### From Azure Portal

1. Go to `Microsoft Entra ID`.
2. Click `Authentication methods`.
3. Under `Manage`, click `Policies`.
4. If appropriate for your organization, ensure a passwordless authentication method policy is configured.

## Default Value

Passwordless authentication is not enabled by default.

## References

1. <https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods>
2. <https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passwordless>
