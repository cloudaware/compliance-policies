# Remediation

Consider resizing an Google GCE Instance to a smaller, more cost-effective machine type that aligns with its workload requirements or terminating it if it's no longer required.

## Resize the Instance

### **Using gcloud CLI**

1. Stop the instance:

```bash
gcloud compute instances stop {{instance-name}} --zone=ZONE
```

2. Change the machine type:

```bash
gcloud compute instances set-machine-type {{instance-name}} \
    --machine-type={{new-machine-type}} \
    --zone={{zone}}
```

3. Start the instance:

```bash
gcloud compute instances start {{instance-name}} --zone={{zone}}
```

### Considerations

- Ensure a recent snapshot or backup of the instance’s disks before resizing.
- Validate that the selected machine type provides sufficient performance for the application’s needs.

## Terminate the Instance

### **Using gcloud CLI**

If the instance is consistently underutilized and no longer required, terminate it to fully eliminate costs.

```sh
gcloud compute instances delete {{instance-name}} --zone={{zone}}
```

### Considerations

- Termination is permanent and deletes all associated resources that are not separately preserved (e.g., disks if not set to retain).
- If long-term retention is needed, consider creating an image or snapshot before deletion.
