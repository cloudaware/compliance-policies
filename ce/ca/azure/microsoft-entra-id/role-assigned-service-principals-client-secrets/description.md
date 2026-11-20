# Description

A service principal that holds an Azure role assignment signs in with a client secret, a certificate, or a federated credential, unless it is a managed identity, which has no readable credential. Prerequisites: Move each workload that signs in with a client secret to a managed identity, a federated credential, or a certificate, and confirm it works before removing the secret.

## Rationale

A client secret is a long-lived string that the workload sends to Microsoft Entra ID, so anyone who copies it from code, configuration, or a pipeline can sign in as the application from anywhere. The holder inherits every Azure role the service principal holds until the secret expires or is removed, and the sign-ins look like the workload's own.

## Audit

This requirement needs manual assessment. Service-principal password credentials and their absence are not collected; certificate inventory does not establish absence of client secrets.
