# Remediation

Before taking any action, confirm that the instance is no longer required for production, development, or periodic workloads.

## Verify the Instance is Unused

* Confirm with application owners and relevant teams that the SQL instance is no longer needed.
* Check for periodic jobs to ensure the instance is not used for infrequent tasks such as monthly or quarterly reporting.
* Review dependent services to verify that no applications or services still have connection strings pointing to this instance.

## Stop the Instance (Recommended First Step)

### **From glcoud CLI**

Stopping an instance preserves data and configuration while stopping billing for vCPU and memory.

```bash
gcloud sql instances patch {{instance-name}} --activation-policy=NEVER --region={{region}}
```

## Delete the Instance (Permanent)

If the instance is confirmed to be unnecessary, deleting it stops all associated costs. **This action is irreversible.**

### Create a Final Backup (Recommended)

#### **From glcoud CLI**

```bash
gcloud sql backups create \
    --instance={{instance-name}} \
    --description={{description}}
```

### Delete the Instance

#### **From glcoud CLI**

```bash
gcloud sql instances delete {{instance-name}} \
    --async \
    --enable-final-backup \
    --final-backup-description={{description}} \
    --final-backup-retention-days={{90}}
```

## Resize the Instance

### **From glcoud CLI**

If the instance is not completely idle but underutilized, consider resizing to a smaller machine type to reduce costs:

```sh
gcloud sql instances patch {{instance-name}} \
    --cpu={{new-cpu}} 
    --memory={{new-memory}}
    [--tier={{new-machine-type}}] \
    --region={{region}}
```

### Considerations

* Resizing may trigger a restart. Schedule changes during a maintenance window to minimize impact on availability.
* The `--cpu` and `--memory` flags are not compatible with the **Enterprise Plus** edition. For **Enterprise Plus** instances, the machine configuration is determined solely by the `--tier` flag and these flags should not be used.
