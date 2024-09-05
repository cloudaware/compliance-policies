# Remediation

## From Console

1. Sign in to the AWS Management Console and open the KMS console at: <https://console.aws.amazon.com/kms>.
2. In the left navigation pane, click `Customer-managed keys`.
3. Select a key where `Key spec = SYMMETRIC_DEFAULT` that does not have automatic rotation enabled.
4. Select the `Key rotation` tab.
5. Check the `Automatically rotate this KMS key every year` checkbox.
6. Click `Save`.
7. Repeat steps 3–6 for all customer-managed CMKs that do not have automatic rotation enabled.

## From Command Line

1. Run the following command to enable key rotation:

```sh
aws kms enable-key-rotation --key-id <kms_key_id>
```
