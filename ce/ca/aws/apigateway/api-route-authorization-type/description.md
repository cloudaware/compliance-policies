# Description

Ensure that each AWS API Gateway API Route is configured with a mechanisms for controlling and managing access to the API. API Gateway supports the following mechanisms:

- **Lambda authorizers** - Leverage custom AWS Lambda functions to evaluate incoming requests and determine access.
- **JWT authorizers** - Validate JSON Web Tokens (JWTs) issued by trusted identity providers to control access.
- **AWS IAM** - Use standard AWS Identity and Access Management (IAM) roles and policies to authorize requests.

## Rationale

1. **Enhance API Security:** Enforcing authorization at the route level is essential to ensure that only authenticated and authorized clients can access your API endpoints. This mitigates the risk of unauthorized access, abuse, and exposure of internal services.

2. **Protect Sensitive Data and Functionality:** APIs often handle sensitive data or critical business logic. Without proper authorization, malicious actors could exploit unsecured endpoints, leading to data leaks, service interruptions, or unauthorized operations.

## Audit

This policy targets the **httpApi** `Record Type` which includes **HTTP** and **WEBSOCKET** `Protocol Types`.

An *API Gateway API* is flagged as `INCOMPLIANT` when at least one associated *API Gateway Route* has the `Authorization Type` set to **NONE**.
