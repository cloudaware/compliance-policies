# Remediation

## From Azure Portal

1. Using the search feature, go to `Virtual Machines`.
2. Select the virtual machine you would like to convert.
3. Select `Disks` in the menu for the VM.
4. At the top select `Migrate to managed disks`.
5. You may follow the prompts to convert the disk and finish by selecting `Migrate` to start the process.

**NOTE**: VMs will be stopped and restarted after migration is complete.

## From PowerShell

```ps
Stop-AzVM -ResourceGroupName $rgName -Name $vmName -Force ConvertTo-AzVMManagedDisk -ResourceGroupName $rgName -VMName $vmName Start-AzVM -ResourceGroupName $rgName -Name $vmName
```
