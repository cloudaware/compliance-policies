# Remediation

## Cancel Key Deletion

### **From AWS CLI**

Use the following command to cancel the scheduled deletion of a KMS key:

```sh
aws kms cancel-key-deletion \
  --key-id {{key-id}}
```

This command changes the key status from **PendingDeletion** to **Disabled**.

## Disable Key

If you no longer need to use a key but want to retain it for potential future use, disable it instead of deleting it:

```sh
aws kms disable-key \
  --key-id {{key-id}}
```

Disabling a key prevents its use in cryptographic operations until it is re-enabled.
