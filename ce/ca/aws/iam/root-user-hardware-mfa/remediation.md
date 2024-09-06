# Remediation

Perform the following to establish a hardware MFA for the root user account:

1. Sign in to the AWS Management Console and open the IAM console at <https://console.aws.amazon.com/iam/>.
    Note: to manage MFA devices for the AWS root user account, you must use your root account credentials to sign in to AWS. You cannot manage MFA devices for the root account using other credentials.
2. Choose `Dashboard` , and under `Security Status` , expand `Activate MFA` on your root account.
3. Choose `Activate MFA`.
4. In the wizard, choose `A hardware MFA` device and then choose `Next Step`.
5. In the `Serial Number` box, enter the serial number that is found on the back of the MFA device.
6. In the `Authentication Code 1` box, enter the six-digit number displayed by the MFA device. You might need to press the button on the front of the device to display the number.
7. Wait 30 seconds while the device refreshes the code, and then enter the next six-digit number into the `Authentication Code 2` box. You might need to press the button on the front of the device again to display the second number.
8. Choose `Next Step`. The MFA device is now associated with the AWS account. The next time you use your AWS account credentials to sign in, you must type a code from the hardware MFA device.

Remediation for this recommendation is not available through AWS CLI.
