# Remediation

## Case A: Make a snapshot private (accessible only by a current AWS Account)

### From Console

- Log in to the AWS management console and navigate to the RDS dashboard at <https://console.aws.amazon.com/rds/>.
- In the left navigation panel, click on `Snapshots`.
- Select `Manual Snapshots` from the Filter dropdown menu to display only manual database snapshots.
- Select the RDS snapshot that you want to make private.
- Click `Snapshot Actions` button from the dashboard top menu and select `Share Snapshot` option.
- On the `Manage Snapshot Permissions` page, select `Private` next to DB Snapshot Visibility to make the selected snapshot accessible only from the current AWS account. Click `Save` to apply the changes.
- Repeat steps no. 5 – 7 to restrict public access to other RDS database snapshots created within the current region.
- Change the AWS region from the navigation bar and repeat the audit process for other regions.

### From Command Line

- Run `modify-db-snapshot-attribute` command (OSX/Linux/UNIX) using the snapshot name as `--db-snapshot-identifier` to remove the permissions for restoring database instances from the selected snapshot and make it private:

```sh
aws rds modify-db-snapshot-attribute
 --region us-east-1
 --db-snapshot-identifier {{cc-prod-mvp-snapshot}}
 --attribute-name restore
 --values-to-remove all
```

- The command output should return details about the permissions to restore database instances from the selected snapshot:

```json
{
    "DBSnapshotAttributesResult": {
        "DBSnapshotIdentifier": "{{cc-prod-mvp-snapshot}}",
        "DBSnapshotAttributes": [
            {
                "AttributeName": "restore",
                "AttributeValues": []
            }
        ]
    }
}
```

- Repeat step no. 1 and 2 to restrict completely the public access to other AWS RDS snapshots available within the current region.

- Change the AWS region by updating the `--region` command parameter value and repeat steps no. 1 – 3 for other regions.

## Case B: Make a snapshot accessibly only by a specific AWS Account(s)

### From Console

- Log in to the AWS management console and navigate to the RDS dashboard at <https://console.aws.amazon.com/rds/>.
- In the left navigation panel, click on `Snapshots`.
- Select `Manual Snapshots` from the Filter dropdown menu to display only manual database snapshots.
- Select the RDS snapshot that you want to make private.
- Click `Snapshot Actions` button from the dashboard top menu and select `Share Snapshot` option.
- On the `Manage Snapshot Permissions` page, perform the following actions:
    1. Select Private to make the selected RDS snapshot private.
    2. Within the AWS Account Number box, enter the ID number (e.g. 123456789012) of the AWS account with whom you want to share the selected database snapshot and click `Add Permission` to confirm the action.
    3. Click `Save` to apply the new permission changes.
- Repeat steps no. 5 – 7 to restrict access for other RDS database snapshots available in the current region only to specific AWS accounts.
- Change the AWS region from the navigation bar and repeat the entire process for other regions.

### From Command Line

- Execute `modify-db-snapshot-attribute` command (OSX/Linux/UNIX) using `--attribute-name` restore and `--values-to-remove` all attributes to make the selected AWS RDS snapshot private (the command does not produce an output):

```sh
aws rds modify-db-snapshot-attribute
 --region us-east-1
 --db-snapshot-identifier {{cc-prod-mvp-snapshot}}
 --attribute-name restore
 --values-to-remove all
```

- The command output should return metadata about the selected snapshot permissions:

```json
{
    "DBSnapshotAttributesResult": {
        "DBSnapshotIdentifier": "{{cc-prod-mvp-snapshot}}",
        "DBSnapshotAttributes": [
            {
                "AttributeName": "restore",
                "AttributeValues": []
            }
        ]
    }
}
```

- Now run `modify-snapshot-attribute` command (OSX/Linux/UNIX) to update the permissions for restoring database instances from the selected snapshot and make it accessible only from a specific AWS account. The following command example utilizes the `--values-to-add` parameter to authorize an AWS account, identified by the ID `{{123456789012}}`, to copy or restore the selected RDS snapshot (replace the highlighted AWS account ID number with your own ID number):

```sh
aws rds modify-db-snapshot-attribute
 --region us-east-1
 --db-snapshot-identifier {{cc-prod-mvp-snapshot}}
 --attribute-name restore
 --values-to-add {{123456789012}}
```

- The command output should return the snapshot permissions metadata:

```json
{
    "DBSnapshotAttributesResult": {
        "DBSnapshotIdentifier": "{{cc-prod-mvp-snapshot}}",
        "DBSnapshotAttributes": [
            {
                "AttributeName": "restore",
                "AttributeValues": [
                    {{123456789012}}
                ]
            }
        ]
    }
}
```

## References

### AWS Documentation

[Trusted Advisor Best Practices (Checks)](https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor-check-reference.html)

[Sharing an AWS RDS Snapshot](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ShareSnapshot.html)

### AWS CLI Documentation

[RDS commands](https://docs.aws.amazon.com/cli/latest/reference/rds/)

[describe-db-snapshots](https://docs.aws.amazon.com/cli/latest/reference/rds/describe-db-snapshots.html)

[describe-db-snapshot-attributes](https://docs.aws.amazon.com/cli/latest/reference/rds/describe-db-snapshot-attributes.html)

[modify-db-snapshot-attribute](https://docs.aws.amazon.com/cli/latest/reference/rds/modify-db-snapshot-attribute.html)
