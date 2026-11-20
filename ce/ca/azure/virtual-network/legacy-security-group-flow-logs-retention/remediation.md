# Remediation

In **Network Watcher > Flow logs**, identify the NSG log and verify whether its workload has migrated. For a legacy log still in use, set **Status** to **On** and **Retention days** to **0** (indefinite) or at least **90**. Verify storage retention and ongoing collection.

```sh
az network watcher flow-log update \
    --location {{location}} \
    --name {{flow-log-name}} \
    --enabled true \
    --retention {{0-or-at-least-90}}
```

For a log left disabled by migration, verify that the replacement virtual network flow log covers the workload, is enabled and has suitable retention and traffic analytics. Delete the confirmed legacy leftover after verification; do not re-enable it. Disabled state alone is not proof of migration. Preserve migration records and existing stored evidence, and review the migration rollback plan before changing logging. Use the separate virtual network retention policy for the replacement. No new NSG flow log can be created after June 30, 2025.
