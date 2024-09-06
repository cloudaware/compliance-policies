# Remediation

Perform the following to rotate access keys:

## From Console

1. Go to [Management Console](https://console.aws.amazon.com/iam).
2. Click on `Users`.
3. Click on `Security Credentials`.
4. As an Administrator:
    - Click on `Make Inactive` for keys that have not been rotated in `90` Days.
5. As an IAM User:
    - Click on `Make Inactive` or `Delete` for keys which have not been rotated or used in `90` Days.
6. Click on `Create Access Key`.
7. Update programmatic call with new Access Key credentials.

## From Command Line

1. While the first access key is still active, create a second access key, which is active by default. Run the following command:

```sh
aws iam create-access-key
```

At this point, the user has two active access keys.

2. Update all applications and tools to use the new access key.
3. Determine whether the first access key is still in use by using this command:

```sh
aws iam get-access-key-last-used
```

4. One approach is to wait several days and then check the old access key for any use before proceeding.

Even if step Step 3 indicates no use of the old key, it is recommended that you do not immediately delete the first access key. Instead, change the state of the first access key to Inactive using this command:

```sh
aws iam update-access-key
```

5. Use only the new access key to confirm that your applications are working. Any applications and tools that still use the original access key will stop working at this point because they no longer have access to AWS resources. If you find such an application or tool, you can switch its state back to Active to reenable the first access key. Then return to step Step 2 and update this application to use the new key.
6. After you wait some period of time to ensure that all applications and tools have been updated, you can delete the first access key with this command:

```sh
aws iam delete-access-key
```
