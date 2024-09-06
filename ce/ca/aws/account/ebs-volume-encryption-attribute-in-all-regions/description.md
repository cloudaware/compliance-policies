# Description

Elastic Compute Cloud (EC2) supports encryption at rest when using the Elastic Block Store (EBS) service. While disabled by default, forcing encryption at EBS volume creation is supported.

## Rationale

Encrypting data at rest reduces the likelihood that it is unintentionally exposed and can nullify the impact of disclosure if the encryption remains unbroken.

## Impact

Losing access or removing the KMS key in use by the EBS volumes will result in no longer being able to access the volumes.

## Audit

### From Console

1. Login to AWS Management Console and open the Amazon EC2 console using <https://console.aws.amazon.com/ec2/>.
2. Under `Account attributes`, click `EBS encryption`.
3. Verify `Always encrypt new EBS volumes` displays `Enabled`.
4. Review every region in-use.

**Note**: EBS volume encryption is configured per region.

### From Command Line

1. Run:

```sh
aws --region <region> ec2 get-ebs-encryption-by-default
```

2. Verify that `"EbsEncryptionByDefault": true` is displayed.
3. Review every region in-use.

**Note**: EBS volume encryption is configured per region.

## References

1. <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html>
2. <https://aws.amazon.com/blogs/aws/new-opt-in-to-default-encryption-for-new-ebs-volumes/>

## Additional Information

Default EBS volume encryption only applies to newly created EBS volumes. Existing EBS volumes are not converted automatically.
