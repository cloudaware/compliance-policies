# Description

This control evaluates whether Amazon RDS event subscriptions are configured to send notifications for the following source type and event categories:

- **Source type:** `db-security-group`
- **Event categories:** `configuration change`, `failure`

Amazon RDS event notifications use Amazon SNS to inform you of changes to the configuration or availability of RDS security groups, enabling timely operational awareness.

## Rationale

Monitoring RDS security groups is critical for maintaining the security posture of your database instances. Event notifications provide immediate awareness when a security group's configuration is modified—which could introduce unauthorized access—or when a failure occurs related to the security group.

## Audit

This policy flags an *AWS Account* as `INCOMPLIANT` if no *Amazon RDS Event Subscriptions* are configured to notify on `configuration change` and `failure` events for the `db-security-group` source type.

## References

1. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Monitoring.html>
2. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Events.html>
3. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ListEvents.html>
