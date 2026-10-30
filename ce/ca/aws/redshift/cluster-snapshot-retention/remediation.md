# Remediation

## Enable Automated Snapshots

Update the configuration of the affected Redshift cluster to enable automated snapshots by setting a positive automated snapshot retention period.

The automated snapshot retention period determines how many days Amazon Redshift retains automated backups. Valid values range from **1 to 35** days. Setting this value to **0** disables automated snapshots.

### **From Command Line**

Run the following AWS CLI command to enable automated snapshots for the selected Amazon Redshift cluster:

```sh
aws redshift modify-cluster \
    --region {{region}} \
    --cluster-identifier {{cluster-id}} \
    --automated-snapshot-retention-period 7
```

Adjust the `--automated-snapshot-retention-period` value as needed to align with your organization's backup retention requirements.
