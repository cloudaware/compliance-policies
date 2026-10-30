# Description

This policy identifies AWS MQ for ActiveMQ Brokers that do not have audit logging enabled.

## Rationale

Audit logging provides visibility into administrative actions performed on the broker, including changes made through the Amazon MQ console, AWS CLI, or Amazon MQ API. Enabling audit logs is a security best practice that helps detect unauthorized or unexpected configuration changes and supports compliance and governance requirements by maintaining a detailed audit trail of management activity.

## Audit

This policy flags an *AWS MQ Broker* running **ActiveMQ** as `INCOMPLIANT` when the **Logs: Audit** field is set to **Disabled**.

*AWS MQ Brokers* running **RabbitMQ** are marked as `INAPPLICABLE`.
