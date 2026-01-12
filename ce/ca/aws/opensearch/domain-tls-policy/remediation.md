# Remediation

## Enforce HTTPS and Update TLS Policy for OpenSearch Domain

To ensure secure communications, enable HTTPS and configure the OpenSearch Service domain to use the latest TLS security policy.

### **From Command Line**

Use the `update-domain-config` command to enforce HTTPS and set the TLS security policy. Replace the placeholders with your domain name and the desired TLS policy (`Policy-Min-TLS-1-2-PFS-2023-10` or the latest supported version).

```sh
aws opensearch update-domain-config \
    --domain-name {{domain-name}} \
    --domain-endpoint-options '{
        "EnforceHTTPS": true,
        "TLSSecurityPolicy": "Policy-Min-TLS-1-2-PFS-2023-10"
    }'
```

### Considerations

- **Client Configuration:** All client applications must be updated to use the `https://` endpoint URL. Connections using `http://` will fail after this change.
