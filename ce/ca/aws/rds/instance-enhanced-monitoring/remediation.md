# Remediation

## Enable Enhanced Monitoring

Enhanced Monitoring requires an IAM role that allows Amazon RDS to publish OS-level metrics to Amazon CloudWatch Logs. If you already have a dedicated role, you can proceed to the [Enable Enhanced Monitoring on the DB Instance](#2-enable-enhanced-monitoring-on-the-db-instance) step.

### **From Command Line**

#### 1. Create the IAM Role for Enhanced Monitoring

Create a trust policy that allows Amazon RDS to assume the role:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
        "Effect": "Allow",
        "Principal": {
            "Service": "monitoring.rds.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
        }
    ]
}
```

Create the IAM role:

```sh
aws iam create-role \
    --role-name {{rds-monitoring-role}} \
    --assume-role-policy-document file://{{monitoring-trust-policy}}.json
```

Attach the AWS-managed policy required for Enhanced Monitoring:

```sh
aws iam attach-role-policy \
    --role-name {{rds-monitoring-role}} \
    --policy-arn arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole
```

#### 2. Enable Enhanced Monitoring on the DB Instance

Modify the DB instance to enable Enhanced Monitoring and associate the IAM role:

```sh
aws rds modify-db-instance \
    --db-instance-identifier {{db-instance-id}} \
    --monitoring-interval {{30}} \
    --monitoring-role-arn {{rds-monitoring-role}} \
    --apply-immediately
```

> **Note:** The `monitoring-interval` value can be set to 1, 5, 10, 15, 30, or 60 seconds, depending on monitoring requirements and cost considerations.
