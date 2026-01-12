# Description

This control evaluates whether there is an AWS RDS Event Subscription that is configured to send notifications for the following source type and event categories:

- **Source type:** `db-cluster`
- **Event categories:** `maintenance`, `failure`

Amazon RDS event notifications use Amazon SNS to inform you of changes to the availability or configuration of RDS resources, enabling timely operational awareness.

## Rationale

Maintenance and failure events may indicate changes that directly impact the availability or configuration of DB clusters. Critical events, such as a primary instance failure, require immediate attention to maintain application availability and data integrity. Without appropriate event subscriptions, operational teams may not be alerted to these conditions in a timely manner, increasing the risk of prolonged service disruptions.

## Audit

This policy flags an *AWS Account* as `INCOMPLIANT` if no *Amazon RDS Event Subscriptions* are configured to notify on `maintenance` and `failure` events for the `db-cluster` source type.

## References

1. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Monitoring.html>
2. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Events.html>
3. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ListEvents.html>
