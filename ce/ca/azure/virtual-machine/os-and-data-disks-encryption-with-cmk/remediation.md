# Remediation

## From Azure Portal

**Note**: Disks must be detached from VMs to have encryption changed.

1. Go to `Virtual machines`.
2. For each virtual machine, go to `Settings`.
3. Click on `Disks`.
4. Click the ellipsis (...), then click `Detach` to detach the disk from the VM.
5. Now search for `Disks` and locate the unattached disk.
6. Click the disk then select `Encryption`.
7. Change your encryption type, then select your encryption set.
8. Click `Save`.
9. Go back to the VM and re-attach the disk.

## From PowerShell

```ps
$KVRGname = 'MyKeyVaultResourceGroup'; $VMRGName = 'MyVirtualMachineResourceGroup'; $vmName = 'MySecureVM'; $KeyVaultName = 'MySecureVault'; $KeyVault = Get-AzKeyVault -VaultName $KeyVaultName -ResourceGroupName $KVRGname; $diskEncryptionKeyVaultUrl = $KeyVault.VaultUri; $KeyVaultResourceId = $KeyVault.ResourceId; Set-AzVMDiskEncryptionExtension -ResourceGroupName $VMRGname -VMName $vmName -DiskEncryptionKeyVaultUrl $diskEncryptionKeyVaultUrl -DiskEncryptionKeyVaultId $KeyVaultResourceId;
```

**NOTE**: During encryption it is likely that a reboot will be required. It may take up to 15 minutes to complete the process.

**NOTE 2**: This may differ for Linux machines as you may need to set the -skipVmBackup parameter.
