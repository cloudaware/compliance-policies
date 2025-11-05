# Remediation

## Enable Runtime Monitoring

### **For Multi-Account Environments**

In a multi-account environment, only the delegated GuardDuty administrator account can enable or disable Runtime Monitoring for member accounts. Member accounts cannot modify this configuration directly.

#### **From Command Line**

```sh
aws guardduty update-member-detectors \
    --detector-id {{detector-id}} \
    --account-ids {{account-id1}} {{account-id2}} ...
    --region {{region}} \
    --features 'Name=RUNTIME_MONITORING,Status=ENABLED,AdditionalConfiguration=[{Name={{EKS_ADDON_MANAGEMENT|ECS_FARGATE_AGENT_MANAGEMENT|EC2_AGENT_MANAGEMENT}},Status=ENABLED}]' 'Name=EKS_RUNTIME_MONITORING,Status=DISABLED'
```

The delegated administrator account can also automatically enable Runtime Monitoring for all accounts.

```sh
aws guardduty update-organization-configuration \
    --detector-id {{detector-id}} \
    --features 'Name=RUNTIME_MONITORING,AutoEnable={{NEW | ALL}},AdditionalConfiguration=[{ Name={{EKS_ADDON_MANAGEMENT|ECS_FARGATE_AGENT_MANAGEMENT|EC2_AGENT_MANAGEMENT}},AutoEnable={{NEW | ALL}} }]' 'Name=EKS_RUNTIME_MONITORING,AutoEnable=NONE'
    --region {{region}}
```

### **For a Standalone Account**

If your account is **not** associated with a delegated GuardDuty administrator via AWS Organizations, enable Runtime Monitoring directly:

```sh
aws guardduty update-detector \
    --detector-id {{detector-id}} \
    --region {{region}} \
    --features 'Name=RUNTIME_MONITORING,Status=ENABLED,AdditionalConfiguration=[{Name={{EKS_ADDON_MANAGEMENT|ECS_FARGATE_AGENT_MANAGEMENT|EC2_AGENT_MANAGEMENT}},Status=ENABLED}]' 'Name=EKS_RUNTIME_MONITORING,Status=DISABLED'
```

## GuardDuty Agent Management

GuardDuty requires you to manage a security agent on the resources you want to monitor. If you want to monitor multiple resource types (i.e., EC2, ECS, or EKS), ensure that the security agent is deployed and managed for each resource type.
