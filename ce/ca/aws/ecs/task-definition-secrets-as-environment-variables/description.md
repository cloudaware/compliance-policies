# Description

This policy identifies AWS ECS Task Definitions that contain environment variables potentially holding sensitive information. It inspects the `environment` parameters within container definitions for variable names that include keywords such as `PASSWORD`, `SECRET`, `API_KEY`, `ACCESS_KEY`, or `TOKEN`.

Passing secrets as plaintext environment variables is insecure because these values are visible to anyone with access to the ECS Task Definition, via the AWS Console, CLI, or API, and may also appear in CloudFormation templates, logs, or audit records.

## Rationale

Sensitive data should never be hardcoded directly into application manifests or configuration files. Environment variables are frequently exposed in logs, dashboards, or version histories. Changes to task definitions create new immutable revisions, potentially preserving plaintext secrets indefinitely.

AWS offers secure alternatives for handling sensitive values, such as AWS Secrets Manager and AWS Systems Manager Parameter Store, both of which allow applications to retrieve secrets at runtime without embedding them directly in task definitions.

## Impact

Exposure of credentials can lead to unauthorized access to databases, APIs, or cloud resources, resulting in data loss, service disruption, or account compromise.

## Audit

This policy flags an **AWS ECS Task Definition** as `INCOMPLIANT` if the `Environment` variables of any related *ECS Container Definition* contain keywords such as **ECS_ENGINE_AUTH_DATA**, **PASSWORD**, **SECRET**, **API_KEY**, **ACCESS_KEY**, or **TOKEN**.

Inactive *Task Definitions* are marked as `INAPPLICABLE`.
