# Remediation

## If utilizing Block Public Access (bucket settings)

### From Console

1. Login to AWS Management Console and open the Amazon S3 console using <https://console.aws.amazon.com/s3/>.
2. Select the Check box next to the Bucket.
3. Click on `Edit public access settings`.
4. Click `Block all public access`.
5. Repeat for all the buckets in your AWS account that contain sensitive data.

### From Command Line

1. List all of the S3 Buckets:

```sh
aws s3 ls
```

2. Set the Block Public Access to true on that bucket:

```sh
aws s3api put-public-access-block --bucket <name-of-bucket> --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

## If utilizing Block Public Access (account settings)

### From Console

If the output reads `true` for the separate configuration settings then it is set on the account.

1. Login to AWS Management Console and open the Amazon S3 console using <https://console.aws.amazon.com/s3/>.
2. Choose `Block Public Access (account settings)`.
3. Choose `Edit` to change the block public access settings for all the buckets in your AWS account.
4. Choose the settings you want to change, and then choose `Save`. For details about each setting, pause on the `i` icons.
5. When you're asked for confirmation, enter `confirm`. Then Click `Confirm` to save your changes.

### From Command Line

To set Block Public access settings for this account, run the following command:

```sh
aws s3control put-public-access-block --public-access-block-configuration BlockPublicAcls=true, IgnorePublicAcls=true, BlockPublicPolicy=true, RestrictPublicBuckets=true --account-id <value>
```
