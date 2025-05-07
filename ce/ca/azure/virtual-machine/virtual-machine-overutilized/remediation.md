# Remediation

## Considerations

1. Virtual machines (VMs) with local temporary disks cannot be resized to VM SKUs that do not support temporary disks, and vice versa.
2. Resizing from a SCSI-based VM SKU to a remote NVMe-enabled VM SKU is not supported.

## Right-Sizing Overutilized Virtual Machine

Resizing a VM should be treated as a disruptive operation, particularly for stateful workloads. Ensure proper planning and downtime windows if required.

For VMs leveraging Premium Storage, it is critical to select an `s`-series SKU to retain support. For instance, use **Standard_E4s_v3** instead of **Standard_E4_v3** to maintain Premium disk compatibility.

### Azure CLI

```sh
resourceGroup={{resource-group-name}}
vmName={{vm-name}}
newSize={{desired-vm-size}}

# Deallocate the VM
az vm deallocate --resource-group $resourceGroup --name $vmName

# Resize the VM
az vm resize --resource-group $resourceGroup --name $vmName --size $newSize

# Start the VM
az vm start --resource-group $resourceGroup --name $vmName
```

### PowerShell

```ps
$resourceGroup = "{{resource-group-name}}"
$vmName = "{{vm-name}}"
$newSize = "{{desired-vm-size}}"

# Deallocate the VM
Stop-AzVM -ResourceGroupName $resourceGroup -Name $vmName -Force -NoWait

# Resize the VM
Update-AzVM -VM (Get-AzVM -ResourceGroupName $resourceGroup -Name $vmName | Set-AzVMSize -Size $newSize) -ResourceGroupName $resourceGroup

# Start the VM
Start-AzVM -ResourceGroupName $resourceGroup -Name $vmName
```

## Implementing Auto-Scaling

For workloads with variable resource demands, whether predictable or bursty, consider transitioning to a Virtual Machine Scale Set (VMSS) with auto-scaling rules. This allows for dynamic adjustment of VM instance count based on real-time performance metrics.

- If the existing workload is not deployed on a VMSS, migration to a VMSS-based deployment model will be required.

- Configure scaling rules to increase instance count (scale out) when metrics such as average CPU utilization exceed thresholds (e.g., 80%), and decrease count (scale in) when utilization drops below a defined baseline.
