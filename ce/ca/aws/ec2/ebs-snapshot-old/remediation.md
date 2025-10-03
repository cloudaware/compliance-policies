# Remediation

To manage old EBS snapshots, you can either delete them or move them to a lower-cost archive tier. The following steps outline both options, as well as an automated solution using Amazon Data Lifecycle Manager (DLM).

## Option 1: Deleting the Snapshot

### From Command Line

```sh
aws ec2 delete-snapshot --snapshot-id {{snapshot-id}}
```

## Option 2: Archiving the Snapshot

### From Command Line

Use this option if the snapshot must be retained for compliance or audit purposes but does not require immediate access. Archiving significantly reduces storage costs.

```sh
aws ec2 modify-snapshot-tier \
    --snapshot-id {{snapshot-id}} \
    --storage-tier archive
```

## Automated Remediation with Amazon Data Lifecycle Manager (DLM)

For proactive management, consider Amazon Data Lifecycle Manager to automate snapshot creation, retention, archiving, and deletion.

### From Command Line

#### **To create a default policy for EBS snapshots**

```sh
aws dlm create-lifecycle-policy \
    --state {{ENABLED | DISABLED}} \
    --description "{{policy-description}}" \
    --execution-role-arn {{role-arn}} \
    --default-policy VOLUME \
    --policy-details file://{{policy-details.json}}
```

Where `{{policy-details.json}}` includes the following:

```json
{
    "PolicyLanguage": "SIMPLIFIED",
    "PolicyType": "EBS_SNAPSHOT_MANAGEMENT",
    "ResourceType": "VOLUME",
    "CopyTags": true | false,
    "CreateInterval": creation_frequency_in_days (1-7),
    "RetainInterval": retention_period_in_days (2-14),
    "ExtendDeletion": true | false, 
    "CrossRegionCopyTargets": [{"TargetRegion":"destination_region_code"}],
    "Exclusions": {
        "ExcludeBootVolume": true | false,
        "ExcludeVolumeTypes": ["standard | gp2 | gp3 | io1 | io2 | st1 | sc1"],
        "ExcludeTags": [{ 
            "Key": "exclusion_tag_key",
            "Value": "exclusion_tag_value"
        }]
    }
}
```
