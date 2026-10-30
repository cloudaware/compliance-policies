# Description

This policy identifies AWS SageMaker Endpoints that are not configured with at least two instances for each production variant.

## Rationale

AWS SageMaker endpoints are designed to support high availability and fault tolerance. However, these capabilities are only realized when multiple instances are provisioned for each production variant. If an instance fails or an Availability Zone becomes unavailable, SageMaker can automatically route traffic to the remaining healthy instances.

Additionally, during endpoint updates, SageMaker performs rolling or blue/green deployments. Configuring multiple instances ensures that sufficient capacity remains available to serve requests throughout the update process, minimizing service disruption.

## Audit

This policy marks an *AWS SageMaker Endpoint* as `INCOMPLIANT` when the associated *AWS SageMaker Endpoint Configuration* specifies an **initialInstanceCount** of `1` for any production variant.

*Endpoints* that are not in the **InService** state are marked as `INAPPLICABLE`.
