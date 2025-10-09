# Remediation

## Enable Auto Minor Version Upgrade

### **From Command Line**

```sh
aws elasticache modify-cache-cluster \
    --cache-cluster-id {{cluster-id}} \
    --auto-minor-version-upgrade
```

The `--apply-immediately` flag applies the change immediately; omit it to apply during the next maintenance window.
