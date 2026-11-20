# Remediation

Disable **Shareable Link** on the affected Standard or Premium Azure Bastion host.

**Coordinate with users who rely on shareable links before deleting links or disabling the feature.** Confirm that they can connect through an approved authenticated access path, such as Azure Bastion through the Azure portal, with the required Azure permissions and virtual machine credentials.

## Remove Existing Shareable Links

1. In the Azure portal, go to **Bastions** and select the affected host in the intended subscription.
2. Under **Settings**, select **Shareable links**.
3. Select the existing links and click **Delete**. Confirm the deletion and repeat until the list is empty.

Delete existing links before disabling the feature. Microsoft does not document whether disabling Shareable Link deletes stored links. Removing them first prevents those links from becoming usable again if the feature is later re-enabled.

## From Azure Portal

1. On the affected Bastion host, under **Settings**, select **Configuration**.
2. Clear **Shareable Link**.
3. Review the configuration, retaining the host's current tier and other feature settings.
4. Click **Apply** and wait for the update to complete. Bastion configuration updates can take about 10 minutes.

## From Azure CLI

After removing existing links, use Azure CLI to disable the feature. Replace the placeholders with the affected host's subscription ID, resource group, and name. Run these examples in a Bash-compatible shell.

### Review the Current Configuration

Retrieve and record the host's configuration before making the change.

```sh
az network bastion show \
    --subscription "{{subscription-id}}" \
    --resource-group "{{resource-group-name}}" \
    --name "{{bastion-host-name}}" \
    --output json
```

### Disable Shareable Link

```sh
az network bastion update \
    --subscription "{{subscription-id}}" \
    --resource-group "{{resource-group-name}}" \
    --name "{{bastion-host-name}}" \
    --shareable-link false
```

Wait for the update to complete before verifying the result.

## Verification

In the Azure portal, reopen **Configuration** and confirm that **Shareable Link** is cleared. Alternatively, query the host's configuration.

```sh
az network bastion show \
    --subscription "{{subscription-id}}" \
    --resource-group "{{resource-group-name}}" \
    --name "{{bastion-host-name}}" \
    --query "{provisioningState:provisioningState,shareableLink:enableShareableLink,sku:sku.name}" \
    --output json
```

Confirm that `provisioningState` is `Succeeded`, `shareableLink` is `false`, and the SKU matches the recorded configuration. Review the other host settings to confirm that they were preserved.

Verify that a deleted shareable URL cannot establish a new connection and that users can still connect through the approved authenticated access path.
