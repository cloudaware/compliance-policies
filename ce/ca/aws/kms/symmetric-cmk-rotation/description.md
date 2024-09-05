# Description

AWS Key Management Service (KMS) allows customers to rotate the backing key which is key material stored within the KMS which is tied to the key ID of the customer-created customer master key (CMK). It is the backing key that is used to perform cryptographic operations such as encryption and decryption. Automated key rotation currently retains all prior backing keys so that decryption of encrypted data can take place transparently. It is recommended that CMK key rotation be enabled for symmetric keys. Key rotation can not be enabled for any asymmetric CMK.

## Rationale

Rotating encryption keys helps reduce the potential impact of a compromised key as data encrypted with a new key cannot be accessed with a previous key that may have been exposed. Keys should be rotated every year, or upon event that would result in the compromise of that key.

## Impact

Creation, management, and storage of CMKs may require additional time from an administrator.

## Audit

### From Console

1. Sign in to the AWS Management Console and open the KMS console at: <https://console.aws.amazon.com/kms>.
2. In the left navigation pane, click `Customer-managed keys`.
3. Select a customer managed CMK where `Key spec = SYMMETRIC_DEFAULT`.
4. Select the `Key rotation` tab.
5. Ensure the `Automatically rotate this KMS key every year` checkbox is checked.
6. Repeat steps 3–5 for all customer-managed CMKs where `Key spec = SYMMETRIC_DEFAULT`.

### From Command Line

1. Run the following command to get a list of all keys and their associated `KeyIds`:

```sh
aws kms list-keys
```

2. For each key, note the KeyId and run the following command:

```sh
describe-key --key-id <kms_key_id>
```

3. If the response contains `KeySpec = SYMMETRIC_DEFAULT`, run the following command:

```sh
aws kms get-key-rotation-status --key-id <kms_key_id>
```

4. Ensure `KeyRotationEnabled` is set to `true`.
5. Repeat steps 2–4 for all remaining CMKs.

## References

1. <https://aws.amazon.com/kms/pricing/>
2. <https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final>
3. CCE-78920-6
