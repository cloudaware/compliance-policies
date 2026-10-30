# Description

Elastic Block Store (EBS) encryption by default should be enabled in every active AWS Region so new EBS volumes are encrypted automatically at creation.

## Rationale

Encrypting EBS volumes at rest reduces the likelihood that stored data is unintentionally exposed and can reduce the impact of unauthorized access to the underlying storage.

## Impact

Losing access to or deleting the KMS key used by EBS volumes can make the volumes inaccessible.

## Audit

### From Console

1. Sign in to the AWS Management Console and open the Amazon EC2 console using <https://console.aws.amazon.com/ec2/>.
2. Under `Account attributes`, click `EBS encryption`.
3. Verify `Always encrypt new EBS volumes` displays `Enabled`.
4. Review every active region.

**Note**: EBS volume encryption is configured per region.

### From Command Line

1. Run:

    ```sh
    aws --region {{region-name}} ec2 get-ebs-encryption-by-default
    ```

2. Verify that `"EbsEncryptionByDefault": true` is displayed.
3. Review every active region.

**Note**: EBS volume encryption is configured per region.

## References

1. <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html>
2. <https://aws.amazon.com/blogs/aws/new-opt-in-to-default-encryption-for-new-ebs-volumes/>

## Additional Information

Default EBS volume encryption only applies to newly created EBS volumes. Existing EBS volumes are **not** converted automatically.
