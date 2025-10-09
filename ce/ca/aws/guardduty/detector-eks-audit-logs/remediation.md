# Remediation

## Enable EKS Audit Log Monitoring

### **From Command Line**

Enable EKS Audit Log Monitoring for a specific GuardDuty detector using the following command:

```sh
aws guardduty update-detector \
    --detector-id {{detector-id}} \
    --region {{region}} \
    --data-sources "Kubernetes={AuditLogs={Enable=true}}"
```
