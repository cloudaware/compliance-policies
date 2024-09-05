# Description

The root user account is the most privileged user in an AWS account. Multi-factor Authentication (MFA) adds an extra layer of protection on top of a username and password. With MFA enabled, when a user signs in to an AWS website, they will be prompted for their username and password as well as for an authentication code from their AWS MFA device.

Note: When virtual MFA is used for root accounts, it is recommended that the device used is NOT a personal device, but rather a dedicated mobile device (tablet or phone) that is managed to be kept charged and secured independent of any individual personal devices. ("non-personal virtual MFA") This lessens the risks of losing access to the MFA due to device loss, device trade-in or if the individual owning the device is no longer employed at the company.

## Rationale

Enabling MFA provides increased security for console access as it requires the authenticating principal to possess a device that emits a time-sensitive key and have knowledge of a credential.

## Audit

Perform the following to determine if the root user account has MFA setup:

### From Console

1. Login to the AWS Management Console.
2. Click `Services`.
3. Click `IAM`.
4. Click on `Credential Report`.
5. This will download a `.csv` file which contains credential usage for all IAM users within an AWS Account - open this file.
6. For the `<root_account>` user, ensure the `mfa_active` field is set to `TRUE`.

### From Command Line

1. Run the following command:

```sh
aws iam get-account-summary | grep "AccountMFAEnabled"
```

2. Ensure the AccountMFAEnabled property is set to 1

## References

1. CCE-78911-5
2. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa>
3. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root>

## Additional Information

IAM Root User account for us-gov cloud regions does not have console access. This recommendation is not applicable for us-gov cloud regions.
