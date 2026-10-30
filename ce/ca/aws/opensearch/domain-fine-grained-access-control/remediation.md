# Remediation

## Enable Fine-Grained Access Control

Fine-grained access control requires the following security settings on the domain:

- HTTPS enforcement and the latest TLS policy. See [`AWS OpenSearch Domain is not encrypted with the latest TLS policy`](../domain-tls-policy/).
- Encryption at rest. See [`AWS OpenSearch Domain is not encrypted at rest`](../domain-encryption/).
- Node-to-node encryption. See [`AWS OpenSearch Domain Node To Node Encryption is not enabled`](../domain-node-to-node-encryption/).

Decide whether the domain will use the internal user database or an external identity source such as IAM or SAML. Configure a master user and review the domain access policy so it does not conflict with the fine-grained authorization model.

### Option 1: Use the Internal User Database

Enable fine-grained access control and configure an internal master user:

```sh
aws opensearch update-domain-config \
    --domain-name {{domain-name}} \
    --domain-endpoint-options EnforceHTTPS=true \
    --encryption-at-rest-options Enabled=true \
    --node-to-node-encryption-options Enabled=true \
    --advanced-security-options Enabled=true,InternalUserDatabaseEnabled=true,MasterUserOptions={MasterUserName={{master-user-name}},MasterUserPassword={{master-user-password}}}
```

### Option 2: Use an IAM Principal as the Master User

Enable fine-grained access control and assign an IAM principal as the master user:

```sh
aws opensearch update-domain-config \
    --domain-name {{domain-name}} \
    --domain-endpoint-options EnforceHTTPS=true \
    --encryption-at-rest-options Enabled=true \
    --node-to-node-encryption-options Enabled=true \
    --advanced-security-options Enabled=true,InternalUserDatabaseEnabled=false,MasterUserOptions={MasterUserARN={{master-user-arn}}}
```

### Additional Guidance

- Review existing domain access policies, IAM permissions, and Dashboards authentication flows before applying the change.
- For existing domains, plan the change during a maintenance window because OpenSearch Service can require configuration processing and application-side updates.
- If role mappings must be introduced gradually on an existing domain, use a staged migration approach before fully enforcing the new access model.
- After fine-grained access control is enabled, it cannot be disabled on the existing domain.
