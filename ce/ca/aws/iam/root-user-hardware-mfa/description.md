# Description

The root user account is the most privileged user in an AWS account. MFA adds an extra layer of protection on top of a user name and password. With MFA enabled, when a user signs in to an AWS website, they will be prompted for their user name and password as well as for an authentication code from their AWS MFA device. For Level 2, it is recommended that the root user account be protected with a hardware MFA.

## Rationale

A hardware MFA has a smaller attack surface than a virtual MFA. For example, a hardware MFA does not suffer the attack surface introduced by the mobile smartphone on which a virtual MFA resides.

**Note**: Using hardware MFA for many, many AWS accounts may create a logistical device management issue. If this is the case, consider implementing this Level 2 recommendation selectively to the highest security AWS accounts and the Level 1 recommendation applied to the remaining accounts.

## Audit

Perform the following to determine if the root user account has a hardware MFA setup:

1. Run the following command to determine if the root account has MFA setup:

    ```sh
    aws iam get-account-summary | grep "AccountMFAEnabled"
    ```

    The `AccountMFAEnabled` property is set to `1` will ensure that the root user account has MFA (Virtual or Hardware) Enabled.
    
    If `AccountMFAEnabled` property is set to `0` the account is not compliant with this recommendation.

2. If `AccountMFAEnabled` property is set to `1`, determine root account has Hardware MFA enabled.

    Run the following command to list all virtual MFA devices:

    ```sh
    aws iam list-virtual-mfa-devices
    ```

    If the output contains one MFA with the following Serial Number, it means the MFA is virtual, not hardware and the account is not compliant with this recommendation: `"SerialNumber": "arn:aws:iam::_<aws_account_number>_:mfa/root-account-mfa-device"`.

## References

1. CCE-78911-5
2. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html>
3. <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_physical.html#enable-hw-mfa-for-root>

## Additional Information

IAM User account root for us-gov cloud regions does not have console access. This control is not applicable for us-gov cloud regions.
