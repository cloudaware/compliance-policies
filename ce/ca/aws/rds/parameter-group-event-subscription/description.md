# Description

This control evaluates whether Amazon RDS event subscriptions are configured to send notifications for the following source type and event category:

* **Source type:** `db-parameter-group`
* **Event category:** `configuration change`

Amazon RDS event notifications use Amazon SNS to inform you of changes to the configuration or availability of RDS parameter groups, enabling timely operational awareness.

## Rationale

RDS parameter groups define the behavior and performance of your database instances. Changes to parameters—such as buffer sizes, timeout settings, or SSL enforcement—can significantly impact database stability, performance, and security. Subscribing to event notifications ensures that operations and security teams are immediately aware of modifications, allowing verification or rapid remediation of unintended changes.

## Audit

This policy flags an *AWS Account* as `INCOMPLIANT` if no *Amazon RDS Event Subscriptions* are configured to notify on `configuration change` events for the `db-parameter-group` source type.

## References

1. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Monitoring.html>
2. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Events.html>
3. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ListEvents.html>
