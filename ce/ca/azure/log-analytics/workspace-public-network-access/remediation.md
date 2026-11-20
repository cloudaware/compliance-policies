# Remediation

Link the workspace to an Azure Monitor Private Link Scope with a private endpoint and working private DNS for every required client before disabling public access. Clients outside those networks can lose ingestion or query access, including integrations that cannot use Private Link.

In **Log Analytics workspaces > Network Isolation**, set public network access for both ingestion and queries to **No**. Alternatively:

```sh
az monitor log-analytics workspace update --resource-group {{resource-group}} --workspace-name {{workspace-name}} --public-network-access-for-ingestion Disabled --public-network-access-for-query Disabled
```

Verify both settings are `Disabled` and test ingestion and queries from each required network. If a required client loses access, restore its prior access setting while correcting Private Link connectivity.
