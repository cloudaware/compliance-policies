# Remediation

## From Command Line

To revoke public access to an EBS snapshot, run the following command:

```sh
aws ec2 modify-snapshot-attribute \
    --snapshot-id {{snapshot-id}} \
    --attribute createVolumePermission \
    --operation-type remove \
    --group-names all
```

If you need to share the snapshot with specific AWS accounts (instead of making it public), you can grant access to individual account IDs using:

```sh
aws ec2 modify-snapshot-attribute \
    --snapshot-id {{snapshot-id}} \
    --attribute createVolumePermission \
    --operation-type add \
    --user-ids {{123456789012}} {{111122223333}}
```

Replace `{{user-ids}}` with the appropriate AWS account IDs.
