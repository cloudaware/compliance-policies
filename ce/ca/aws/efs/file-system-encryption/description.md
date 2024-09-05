# Description

EFS data should be encrypted at rest using AWS KMS (Key Management Service).

## Rationale

Data should be encrypted at rest to reduce the risk of a data breach via direct access to the storage device.

## Audit

### From Console

1. Login to the AWS Management Console and Navigate to `Elastic File System` (EFS) dashboard.
2. Select `File Systems` from the left navigation panel.
3. Each item on the list has a visible Encrypted field that displays data at rest encryption status.
4. Validate that this field reads `Encrypted` for all EFS file systems in all AWS regions.

### From Command Line

1. Run `describe-file-systems` command using custom query filters to list the identifiers of all AWS EFS file systems currently available within the selected region:

```sh
aws efs describe-file-systems --region <region> --output table --query 'FileSystems[*].FileSystemId'
```

2. The command output should return a table with the requested file system IDs.
3. Run `describe-file-systems` command using the ID of the file system that you want to examine as identifier and the necessary query filters:

```sh
aws efs describe-file-systems --region <region> --file-system-id <file-system-id from step 2 output> --query 'FileSystems[*].Encrypted'
```

4. The command output should return the file system encryption status `true` or `false`. If the returned value is `false`, the selected AWS EFS file system is not encrypted and if the returned value is `true`, the selected AWS EFS file system is encrypted.

## Default Value

EFS file system data is encrypted at rest by default when creating a file system via the Console. Encryption at rest is not enabled by default when creating a new file system using the AWS CLI, API, and SDKs.

## References

1. <https://docs.aws.amazon.com/efs/latest/ug/encryption-at-rest.html>
2. <https://awscli.amazonaws.com/v2/documentation/api/latest/reference/efs/index.html#efs>
