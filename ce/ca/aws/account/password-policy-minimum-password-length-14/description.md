# Description

Password policies are, in part, used to enforce password complexity requirements. IAM password policies can be used to ensure password are at least a given length. It is recommended that the password policy require a minimum password length 14.

## Rationale

Setting a password complexity policy increases account resiliency against brute force login attempts.

## Audit

Perform the following to ensure the password policy is configured as prescribed:

### From Console

1. Login to AWS Console (with appropriate permissions to View Identity Access Management Account Settings).
2. Go to IAM Service on the AWS Console.
3. Click on Account Settings on the Left Pane.
4. Ensure "Minimum password length" is set to 14 or greater.

### From Command Line

1. Run the following command:

```sh
aws iam get-account-password-policy
```

Ensure the output of the above command includes `"MinimumPasswordLength": 14` (or higher).

## References

1. CCE-78907-3
2. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html>
3. <https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#configure-strong-password-policy>

## Additional Information

Ensure the password policy also includes requirements for password complexity, such
as the inclusion of uppercase letters, lowercase letters, numbers, and special
characters:

```sh
aws iam update-account-password-policy --require-uppercase-characters --require-lowercase-characters --require-numbers --require-symbols
```
