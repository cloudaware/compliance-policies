# Remediation

Old snapshots should managed through automated schedules for ongoing governance.

## Create a Snapshot Lifecycle Policy

To prevent accumulation of old snapshots, configure a snapshot schedule for your persistent disks. This schedule automates snapshot creation and cleanup, ensuring future snapshots older than a set duration (e.g., 90 days) are automatically deleted.

### **Using gcloud CLI**

1. Create a snapshot schedule:

```sh
gcloud compute resource-policies create snapshot-schedule {{schedule-name}} \
    --region={{region}} \
    --start-time={{13:00}} \
    {{--daily-schedule | --hourly-schedule={{hours}} | --weekly-schedule={{weekly-cycle}}}} \
    --max-retention-days={{90}} \
    --on-source-disk-delete=apply-retention-policy
```

2. Attach the schedule to a persistent disk:

```sh
gcloud compute disks add-resource-policies {{disk-name}} \
    --resource-policies={{schedule-name}} \
    --zone={{zone}}
```

**Note**: Existing snapshots older than 90 days are not retroactively deleted when applying a schedule, they must be handled manually.

## Delete the Snapshot

### **From gcloud CLI**

If the snapshot is no longer required, delete it to immediately reduce storage usage and costs:

```sh
gcloud compute snapshots delete {{snapshot-name}}
```

**Note**: Ensure the snapshot is not required for disaster recovery, compliance, or restoration before deleting.
