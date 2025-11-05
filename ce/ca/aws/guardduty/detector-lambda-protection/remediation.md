# Remediation

## Enable Lambda Protection

### **For Multi-Account Environments**

In a multi-account environment, only the delegated GuardDuty administrator account can enable or disable Lambda Protection for member accounts within the organization. Member accounts cannot modify this configuration directly.

#### **From Command Line**

```sh
aws guardduty update-member-detectors \
    --detector-id {{detector-id}} \
    --account-ids {{account-id1}} {{account-id2}} \
    --region {{region}} \
    --features 'Name=LAMBDA_NETWORK_LOGS,Status=ENABLED'
```

The delegated administrator account manages member accounts using **AWS Organizations** and can choose to automatically enable Lambda network activity monitoring for all accounts as they join the organization.

```sh
aws guardduty update-organization-configuration \
    --detector-id {{detector-id}} \
    --region {{region}} \
    --features 'Name=LAMBDA_NETWORK_LOGS,AutoEnable={{NEW | ALL}}'
    
```

### **For a Standalone Account**

If your account is **not** associated with a delegated GuardDuty administrator account through AWS Organizations, enable Lambda Protection directly from your account.

```sh
aws guardduty update-detector \
    --detector-id {{detector-id}} \
    --region {{region}} \
    --features 'Name=LAMBDA_NETWORK_LOGS,Status=ENABLED'
```
