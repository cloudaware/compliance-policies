# Remediation

## Start Service Software Update

### **From AWS CLI**

Use the following command to initiate a service software update for an OpenSearch domain:

```sh
aws opensearch start-service-software-update \
  --domain-name {{domain-name}} \
  --schedule-at "NOW"
```

The `--schedule-at` parameter allows you to queue the update immediately.

If the command fails with a `BaseException`, the specified time slot may be unavailable due to capacity constraints. In such cases, review the alternate time slot suggestions provided in the response and resubmit the request with an available time.
