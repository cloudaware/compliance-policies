# Remediation

## Enable Automatic Major Version Upgrades

Enabling automatic major version upgrades ensures that the cluster receives new engine versions during its scheduled maintenance window, reducing manual maintenance overhead and improving long-term stability, performance, and security.

### **From Command Line**

Run the following AWS CLI command to enable automatic major version upgrades for the selected Redshift cluster:

```sh
aws redshift modify-cluster \
    --cluster-identifier {{cluster-id}} \
    --allow-version-upgrade
```
