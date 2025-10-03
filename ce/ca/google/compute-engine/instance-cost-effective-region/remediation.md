# Remediation

## Prerequisites

- Ensure you have sufficient quotas in the destination region (disk, snapshot, VM quotas).
- Verify that persistent disks attached to the VM are not currently mounted elsewhere.
- Consider local SSDs or ephemeral storage: data on local SSDs will not survive termination, so replicate or back up any needed data.
- If the VM has GPUs, ensure equivalent GPU types are available in the target region/zone.
- If moving across regions, you may need to choose a new subnetwork in the target region (cross-region VMs cannot keep existing subnetworks).
- Recognize that internal/external IPs may change. Intra-region moves preserve external IPs; cross-region moves require new external IPs.

## Migrate a Google GCE Instance

### 1. Identify Disks Associated with the Instance

```sh
gcloud compute instances describe {{instance-name}} \
  --zone {{old-zone}} \
  --format="list(name,status,disks)"
```

### 2. Disable Auto-Delete on Disks

Prevent the disks from being deleted when the VM is removed:

```sh
gcloud compute instances set-disk-auto-delete {{instance-name}} \
  --zone {{old-zone}} \
  --disk {{boot-disk}} --no-auto-delete

gcloud compute instances set-disk-auto-delete {{instance-name}} \
  --zone {{old-zone}} \
  --disk {{data-disk}} --no-auto-delete
```

### 3. (Optional) Save VM Metadata

Export VM metadata to a file so it can be reapplied later:

```sh
gcloud compute instances describe {{instance-name}} \
  --zone {{old-zone}} > {{instance-name}}.describe
```

### 4. Create Backup Snapshots

Create initial backup snapshots of the disks:

```sh
gcloud compute disks snapshot {{boot-disk}} {{data-disk}} \
  --snapshot-names {{backup-boot-disk}},{{backup-data-disk}} \
  --zone {{old-zone}}
```

### 5. Delete the VM

Stop and delete the VM (disks are preserved because auto-delete was disabled):

```sh
gcloud compute instances delete {{instance-name}} \
  --zone {{old-zone}}
```

### 6. Create Final Snapshots

Create new snapshots after deletion:

```sh
gcloud compute disks snapshot {{boot-disk}} {{data-disk}} \
  --snapshot-names {{snapshot-boot-disk}},{{snapshot-data-disk}} \
  --zone {{old-zone}}
```

### 7. Delete Old Disks

If you plan to reuse the same disk names, delete the original disks:

```sh
gcloud compute disks delete {{boot-disk}} {{data-disk}} \
  --zone {{old-zone}}
```

### 8. Create New Disks in Target Zone

Create new persistent disks in `{{new-zone}}` from snapshots:

```sh
gcloud compute disks create {{boot-disk}} \
  --source-snapshot {{snapshot-boot-disk}} \
  --zone {{new-zone}}

gcloud compute disks create {{data-disk}} \
  --source-snapshot {{snapshot-data-disk}} \
  --zone {{new-zone}}
```

### 9. Recreate the VM in the Target Zone

Recreate the VM and attach the new disks:

```sh
gcloud compute instances create {{instance-name}} \
  --machine-type n1-standard-4 \
  --zone {{new-zone}} \
  --disk name={{boot-disk}},boot=yes,mode=rw \
  --disk name={{data-disk}},mode=rw
```

### 10. (Optional) Delete Temporary Snapshots

Clean up snapshots to reduce storage costs:

```sh
gcloud compute snapshots delete {{snapshot-boot-disk}} {{snapshot-data-disk}}
gcloud compute snapshots delete {{backup-boot-disk}} {{backup-data-disk}}
```
