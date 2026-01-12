# Description

This policy evaluates whether there is an AWS RDS Event Subscription that is configured to send notifications for the following source type and event categories:

- **Source type:** `db-instance`
- **Event categories:** `maintenance`, `configuration change`, `failure`

Amazon RDS event notifications use Amazon SNS to notify you of changes to the availability or configuration of RDS database instances, enabling timely operational response.

## Rationale

Event monitoring is a critical component of maintaining the availability, reliability, and performance of Amazon RDS database instances. Subscribing to maintenance, configuration change, and failure events ensures that operational teams are promptly informed of changes that may impact database stability or service continuity.

## Audit

This policy flags an *AWS Account* as `INCOMPLIANT` if no *Amazon RDS Event Subscriptions* are configured to notify on `maintenance`, `configuration change`, and `failure` events for the `db-instance` source type.

## References

1. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Monitoring.html>
2. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Events.html>
3. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ListEvents.html>
