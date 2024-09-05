# Description

IAM password policies can prevent the reuse of a given password by the same user. It is recommended that the password policy prevent the reuse of passwords.

## Rationale

Preventing password reuse increases account resiliency against brute force login attempts.

## Audit

Perform the following to ensure the password policy is configured as prescribed:

### From Console

1. Login to AWS Console (with appropriate permissions to View Identity Access Management Account Settings).
2. Go to IAM Service on the AWS Console.
3. Click on `Account Settings` on the Left Pane.
4. Ensure `Prevent password reuse` is checked.
5. Ensure `Number of passwords to remember` is set to `24`.

### From Command Line

1. Run the following command:

```sh
aws iam get-account-password-policy
```

Ensure the output of the above command includes `"PasswordReusePrevention": 24`.

## References

1. CCE-78908-1
2. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html>
3. <https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#configure-strong-password-policy>
