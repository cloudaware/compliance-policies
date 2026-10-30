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
    --user-ids {{user-id-1}} {{user-id-2}}
```

Replace `{{user-id-1}}` and `{{user-id-2}}` with the appropriate AWS account IDs.
