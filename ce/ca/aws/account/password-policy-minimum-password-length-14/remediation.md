# Remediation

Perform the following to set the password policy as prescribed:

## From Console

1. Login to AWS Console (with appropriate permissions to View Identity Access Management Account Settings).
2. Go to IAM Service on the AWS Console.
3. Click on Account Settings on the Left Pane.
4. Set `Minimum password length` to `14` or greater.
5. Click `Apply password policy`.

## From Command Line

Run the following command:

```sh
aws iam update-account-password-policy --minimum-password-length 14
```

**Note**: All commands starting with "aws iam update-account-password-policy" can be combined into a single command.
