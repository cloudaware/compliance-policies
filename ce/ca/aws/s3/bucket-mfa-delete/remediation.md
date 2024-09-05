# Remediation

## Prerequisites

### Required Configuration

- Activate an MFA device for the root user.
- Configure the AWS CLI with the root credentials (access key and secret key)

### Important Notes

- Only the bucket owner that is logged in as an AWS root account can enable MFA Delete feature.

## From Command Line

### Enable MFA Delete

The following example enables S3 Versioning and MFA delete on a bucket. Replace `{{your-bucket-name}}` with the actual name of the bucket. Replace `{{mfa-device-ARN}}` and `{{6-digit-mfa-device-code}}` with the root account MFA device ARN and authentication code:

```sh
aws s3api put-bucket-versioning --bucket {{your-bucket-name}} --versioning-configuration Status=Enabled,MFADelete=Enabled --mfa "{{mfa-device-ARN}} {{6-digit-mfa-device-code}}"
```

### Test MFA Delete

Ensure that MFA Delete is configured correctly by attempting to delete an object using the AWS CLI. Replace `{{object-key}}` with the key of the object you want to delete:

```sh
aws s3api delete-object --bucket {{your-bucket-name}} --key {{object-key}} --mfa "{{mfa-device-ARN}} {{6-digit-mfa-device-code}}"
```
