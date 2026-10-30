# Remediation

## Enable Firewall Rule Logging

Enabling logging on firewall rules allows you to capture traffic information for auditing, monitoring, and troubleshooting purposes.

### **From Google Cloud CLI**

```sh
gcloud compute firewall-rules update {{firewall-rule-name}} \
    --enable-logging
```

### Considerations

After enabling logging, traffic matching this rule will be captured in Cloud Logging, which may incur additional costs.
