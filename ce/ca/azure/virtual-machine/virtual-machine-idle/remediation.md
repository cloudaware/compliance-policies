# Remediation

## Decommissioning Idle Virtual Machines

If a VM is no longer required or its workload has been migrated, consider the following actions to eliminate unnecessary resource costs:

### Stopping (Deallocating) the VM

This action stops the VM and releases compute resources. Billing for compute is paused, but charges for persistent resources (e.g., OS and data disks, reserved IPs) continue.

#### Azure CLI

```sh
az vm deallocate --resource-group {{resource-group-name}} --name {{vm-name}}
```

#### PowerShell

```ps
Stop-AzVM -ResourceGroupName "{{resource-group-name}}" -Name "{{vm-name}}"
```

### Terminating (Deleting) the VM

This permanently deletes the VM. Use caution—ensure data has been fully migrated or backed up prior to deletion.

To preserve the disk for future reuse, configure the OS disk's delete option to "detach":

```sh
az resource update 
    --resource-group {{resource-group-name}} \
    --name {{vm-name}} \
    --resource-type virtualMachines \
    --namespace Microsoft.Compute \
    --set properties.storageProfile.osDisk.deleteOption=detach
```

Before terminating, ensure all necessary data has been backed up or migrated.

#### Azure CLI

```sh
az vm delete --resource-group {{resource-group-name}} --name {{vm-name}} --yes
```

#### PowerShell

```ps
Remove-AzVm -ResourceGroupName "{{resource-group-name}}" -Name "{{vm-name}}" -Force
```

If there is no intention to reuse any VM resources, it is recommended to explicitly delete all associated components after the VM is removed to avoid unnecessary costs. These resources typically include:

- OS and data disks
- Network interfaces (NICs)
- Public IP addresses
- Network security groups (NSGs)
- Load balancer rules (if applicable)
- Virtual machine boot diagnostics storage (if enabled)

## Consolidating Workloads

In scenarios where multiple Idle VMs host related or complementary workloads, evaluate the feasibility of consolidating these workloads onto a single, appropriately sized VM.

- Carefully orchestrate the migration of services and data.
- Once consolidation is verified, decommission the original VMs by stopping and deleting them.
