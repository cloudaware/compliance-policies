# Description

Access keys consist of an access key ID and secret access key, which are used to sign programmatic requests that you make to AWS. AWS users need their own access keys to make programmatic calls to AWS from the AWS Command Line Interface (AWS CLI), Tools for Windows PowerShell, the AWS SDKs, or direct HTTP calls using the APIs for individual AWS services. It is recommended that all access keys be regularly rotated.

## Rationale

Rotating access keys will reduce the window of opportunity for an access key that is associated with a compromised or terminated account to be used.

Access keys should be rotated to ensure that data cannot be accessed with an old key which might have been lost, cracked, or stolen.

## Audit

Perform the following to determine if access keys are rotated as prescribed:

### From Console

1. Go to [Management Console](https://console.aws.amazon.com/iam).
2. Click on `Users`.
3. Click `setting` icon.
4. Select `Console last sign-in`.
5. Click `Close`.
6. Ensure that `Access key age` is less than 90 days ago.
Note: `None` in the `Access key age` means the user has not used the access key.

### From Command Line

1. Run the following command:

```sh
aws iam generate-credential-report
```

```sh
aws iam get-credential-report --query 'Content' --output text | base64 -d
```

The `access_key_1_last_rotated` and the `access_key_2_last_rotated` fields in this file notes The date and time, in ISO 8601 date-time format, when the user's access key was created or last changed. If the user does not have an active access key, the value in this field is N/A (not applicable).

## References

1. CCE-78902-4
2. <https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#rotate-credentials>
3. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_finding-unused.html>
4. <https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html>
5. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html>
