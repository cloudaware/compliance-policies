# Remediation

Perform the following to configure CloudTrail to use SSE-KMS:

## From Console

1. Sign in to the AWS Management Console and open the CloudTrail console at <https://console.aws.amazon.com/cloudtrail>.
2. In the left navigation pane, choose `Trails`.
3. Click on a Trail.
4. Under the `S3` section click on the edit button (pencil icon).
5. Click `Advanced`.
6. Select an existing CMK from the `KMS key Id` drop-down menu.

- **Note**: Ensure the CMK is located in the same region as the S3 bucket.
- **Note**: You will need to apply a KMS Key policy on the selected CMK in order for CloudTrail as a service to encrypt and decrypt log files using the CMK provided. Steps are provided [here](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/create-kms-key-policy-for-cloudtrail.html) for editing the selected CMK Key policy.

7. Click `Save`.
8. You will see a notification message stating that you need to have decrypt permissions on the specified KMS key to decrypt log files.
9. Click `Yes`.

## From Command Line

Run the following command to specify a KMS key ID to use with a trail:

```sh
aws cloudtrail update-trail --name <trail-name> --kms-id <cloudtrail-kmskey>
```

Run the following command to attach a key policy to a specified KMS key:

```sh
aws kms put-key-policy --key-id <cloudtrail-kms-key> --policy <cloudtrailkms-key-policy>
```
