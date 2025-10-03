# Remediation

Before taking any action, review the instance's usage patterns in to confirm that underutilization is consistent and does not spike temporarily.

## Downsize (Resize) the Instance

### **From gcloud CLI**

If the instance is required but over-provisioned, you can resize it to a smaller, more cost-effective machine type:

```sh
gcloud sql instances patch {{instance-name}} \
    --cpu={{new-cpu}} 
    --memory={{new-memory}}
    [--tier={{new-machine-type}}] \
    --region={{region}}
```

## Considerations

- Resizing may trigger a restart. Schedule changes during a maintenance window to minimize impact on availability.
- The `--cpu` and `--memory` flags are not compatible with the **Enterprise Plus** edition. For **Enterprise Plus** instances, the machine configuration is determined solely by the `--tier` flag and these flags should not be used.
