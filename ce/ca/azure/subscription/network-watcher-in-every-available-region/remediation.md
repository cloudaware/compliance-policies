# Remediation

Opting out of Network Watcher automatic enablement is a permanent change. Once you opt-out you cannot opt-in without contacting support. To manually enable Network Watcher in each region where you want to use Network Watcher capabilities, follow the steps below.

## From Azure Portal

1. Go to `Network Watcher`.
2. Click `Create`.
3. Select a `Region` from the drop-down menu.
4. Click `Add`.

## From Azure CLI

```sh
az network watcher configure --locations <region> --enabled true --resource-group <resource_group>
```
