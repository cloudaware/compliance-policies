# Remediation

## Install the Latest Service Software Update

Before starting the update:

- confirm the domain is healthy and no conflicting configuration changes are in progress;
- schedule the change during a low-traffic maintenance window;
- notify application owners if the domain supports production workloads.

### **From AWS CLI**

Use the following command to start the service software update immediately:

```sh
aws opensearch start-service-software-update \
  --domain-name {{domain-name}} \
  --schedule-at NOW
```

Monitor the domain until the update completes and CloudAware no longer reports `Service Software: Update Available` as **true**.

If the request fails because the selected time slot is not available, review the alternate scheduling information returned by AWS and resubmit the update for an available window.
