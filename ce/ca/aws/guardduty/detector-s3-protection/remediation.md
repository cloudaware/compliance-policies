# Remediation

## Enable S3 Protection

### **For Multi-Account Environments**

In a multi-account environment, only the delegated GuardDuty administrator account can enable or disable S3 Protection for member accounts. Member accounts cannot modify this configuration directly.

#### **From Command Line**

```sh
aws guardduty update-member-detectors \
    --detector-id {{detector-id}} \
    --account-ids {{account-id1}} {{account-id2}} \
    --region {{region}} \
    --features 'Name=S3_DATA_EVENTS,Status=ENABLED'
```

The delegated administrator can also automatically enable S3 Protection for all and new accounts as they join the organization.

```sh
aws guardduty update-organization-configuration \
    --detector-id {{detector-id}} \
    --region {{region}} \
    --features 'Name=S3_DATA_EVENTS,AutoEnable={{NEW | ALL}}'
```

### **For a Standalone Account**

If your account is not associated with a delegated GuardDuty administrator via AWS Organizations, enable S3 Protection directly:

```sh
aws guardduty update-detector \
    --detector-id {{detector-id}} \
    --region {{region}} \
    --features 'Name=S3_DATA_EVENTS,Status=ENABLED'
```
