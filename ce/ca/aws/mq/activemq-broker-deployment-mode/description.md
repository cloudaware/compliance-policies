# Description

This policy identifies AWS MQ ActiveMQ Brokers that are configured with the **single-instance** deployment mode.

For high availability, AWS MQ brokers should use the **active/standby deployment mode**, which consists of two broker instances in a redundant configuration. In this model, AWS MQ deploys one broker instance in a primary Availability Zone and a standby instance in a different AZ to provide failover.

## Rationale

A single-instance deployment presents a significant risk to application reliability. If the underlying instance or its Availability Zone fails, the broker becomes unavailable, potentially halting all message processing for your application.

Additionally, during software updates or maintenance windows, a single-instance broker experiences temporary downtime because there is no standby instance to assume the workload. While Amazon MQ uses redundant storage, service availability is inherently limited in single-instance mode.

## Impact

Migrating to an active/standby configuration incurs additional costs for running a standby broker.

## Audit

This policy flags an *AWS MQ ActiveMQ Broker* as `INCOMPLIANT` when `Deployment Mode` is set to **SINGLE_INSTANCE**.

*AWS MQ Brokers for RabbitMQ* are marked as `INAPPLICABLE`.
