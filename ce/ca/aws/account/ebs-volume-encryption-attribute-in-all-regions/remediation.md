# Remediation

## From Console

1. Login to AWS Management Console and open the Amazon EC2 console using <https://console.aws.amazon.com/ec2/>
2. Under `Account attributes`, click `EBS encryption`.
3. Click `Manage`.
4. Click the `Enable` checkbox.
5. Click `Update EBS encryption`
6. Repeat for every region requiring the change.

**Note**: EBS volume encryption is configured per region.

## From Command Line

1. Run

```sh
aws --region <region> ec2 enable-ebs-encryption-by-default
```

2. Verify that `"EbsEncryptionByDefault": true` is displayed.
3. Repeat every region requiring the change.

**Note**: EBS volume encryption is configured per region.
