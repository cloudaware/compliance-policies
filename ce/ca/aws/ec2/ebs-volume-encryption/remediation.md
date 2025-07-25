# Remediation

AWS EBS does not support in-place encryption of existing unencrypted volumes. To encrypt an unencrypted volume, you must create a snapshot of the volume and then use that snapshot to create a new encrypted volume.

Optionally, you can enable encryption by default to ensure that all future EBS volumes are automatically encrypted, including those created from unencrypted snapshots.

## From Command Line

### Enable Default Encryption

This ensures that all new volumes created in the specified region are encrypted by default:

```sh
aws ec2 enable-ebs-encryption-by-default --region {{region}}
```

### Create a Snapshot of the Unencrypted Volume

```sh
aws ec2 create-snapshot \
    --volume-id {{volume-id}} \
    --description "{{Snapshot description}}"
```

Wait until the snapshot status is `completed` before proceeding.

### Create a New Encrypted Volume from the Snapshot

```bash
aws ec2 create-volume 
    --snapshot-id {{snapshot-id}}
    --availability-zone {{us-east-1a}}
    --encrypted
```
