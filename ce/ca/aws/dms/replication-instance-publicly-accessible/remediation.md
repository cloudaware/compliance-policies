# Remediation

You cannot modify the `PubliclyAccessible` attribute of an existing DMS replication instance in‑place, you must delete the incompliant instance and recreate it with the correct setting.

## From Command Line

### Export the existing instance configuration

```sh
aws dms describe-replication-instances \
    --filters Name=replication-instance-arn,Values={{current-instance-arn}} \
    --output json > describe.json
```

### Generate a CLI payload with `PubliclyAccessible: false`

Use `jq` to extract all mutable parameters, override the public‑access flag, and produce a JSON file for creation:

```sh
jq '
  .ReplicationInstances[0]
  | {
      ReplicationInstanceIdentifier,
      ReplicationInstanceClass,
      PubliclyAccessible: false,    # enforce private-only access
      AllocatedStorage,
      EngineVersion,
      ReplicationSubnetGroupIdentifier,
      VpcSecurityGroupIds,
      MultiAZ,
      AutoMinorVersionUpgrade,
      PreferredMaintenanceWindow
    }
' describe.json > create-instance.json
```

#### Alternatively, generate a CloudFormation template

```sh
jq '
{
  AWSTemplateFormatVersion: "2010-09-09",
  Description: "Imported DMS instance (public access disabled)",
  Resources: {
    ImportedDMSInstance: {
      Type: "AWS::DMS::ReplicationInstance",
      Properties: {
        .ReplicationInstances[0]
        | {
            ReplicationInstanceIdentifier,
            ReplicationInstanceClass,
            PubliclyAccessible: false,
            AllocatedStorage,
            EngineVersion,
            ReplicationSubnetGroupIdentifier,
            VpcSecurityGroupIds,
            MultiAZ,
            KmsKeyId
          }
      }
    }
  }
}
' describe.json > cf_template.json
```

**Note**: Adjust the list inside `| { … }` to include any other mutable fields you need. Leave out `ReplicationInstanceArn`, `Status`, `EndpointArn` and other read‑only attributes.

### Provision the new replication instance

```sh
aws dms create-replication-instance \
    --cli-input-json file://{{create-instance}}.json
```

This will spin up a new DMS replication instance that mirrors the original configuration, except with public accessibility disabled.

### Delete the incompliant instance

```sh
aws dms delete-replication-instance \
    --replication-instance-arn {{current-instance-arn}}
```
