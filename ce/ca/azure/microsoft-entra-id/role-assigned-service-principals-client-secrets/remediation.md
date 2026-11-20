# Remediation

A service principal that holds an Azure role assignment signs in with a client secret, a certificate, or a federated credential, unless it is a managed identity, which has no readable credential. Prerequisites: Move each workload that signs in with a client secret to a managed identity, a federated credential, or a certificate, and confirm it works before removing the secret.

After verifying the replacement authentication method, remove the client secrets from each role-assigned application and service principal. For application credentials, use **Microsoft Entra ID > App registrations > Certificates & secrets > Client secrets**. Review credentials held directly on the service principal through Azure CLI or PowerShell as well. Confirm that dependent workloads continue to authenticate successfully.

Automated assessment is unavailable: Service-principal password credentials and their absence are not collected; certificate inventory does not establish absence of client secrets.
