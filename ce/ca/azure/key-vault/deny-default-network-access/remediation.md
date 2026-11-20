# Remediation

Before restricting the vault, add permitted virtual networks, IP rules, or private endpoints for every required client. Test private DNS and access from application and administrative networks.

In **Key vaults > Networking**, allow access from specific virtual networks and IP addresses, or disable public access. To change only the default firewall action:

```sh
az keyvault update --resource-group {{resource-group}} --name {{vault-name}} --default-action Deny
```

Retain existing allow rules and required trusted-service exceptions. Verify the resulting default action and test required data-plane operations. Unexpected loss of access requires reviewing the allow rules or restoring the prior default action while repairing connectivity.
