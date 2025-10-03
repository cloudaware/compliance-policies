# Remediation

Before deleting a persistent disk, confirm that it is not required for current or planned services. Coordinate with application owners or your operations team to ensure the disk is not reserved for a future deployment or used for failover, archival, or compliance purposes.

## Archive the Disk

### **Using gcloud CLI**

If the disk must be retained for compliance or future recovery, create an image or snapshot before deletion:

```sh
gcloud compute disks snapshot {{disk-name}} \
    --zone {{zone}} \
    --snapshot-names {{snapshot-name}} \
    --project {{project-id}}
```

## Release an Unused Persistent Disk

### **Using gcloud CLI**

Permanently remove an unused persistent disk

   ```sh
   gcloud compute disks delete {{disk-name}} \
       --zone {{zone}} \
       --project {{project-id}}
   ```
