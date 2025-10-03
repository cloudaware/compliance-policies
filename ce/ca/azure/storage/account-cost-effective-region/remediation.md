# Remediation

## Migrate Azure Storage Account to Another Region

### **Summary Workflow**

1. Export the Resource Manager template of the existing storage account.
2. Modify the template to specify the new storage account name and target region.
3. Deploy the modified template to create a new storage account in the target region.
4. Configure the new storage account settings to match the original account.
5. Transfer data from the original storage account to the new account using AzCopy or another tool.
6. Decommission the original storage account and associated resources in the source region.

### **1. Export the Resource Manager Template**

Export the template:

```ps
$resource = Get-AzResource `
    -ResourceGroupName {{resource-group-name}} `
    -ResourceName {{storage-account-name}} `
    -ResourceType Microsoft.Storage/storageAccounts
Export-AzResourceGroup `
    -ResourceGroupName <resource-group-name> `
    -Resource $resource.ResourceId
```

This command saves a JSON template to your current directory.

### **2. Modify the Template**

- Change the storage account name in the template to the desired name for the new account.
- Update the `"location"` property in the template to the target region.

### **3. Deploy the Modified Template**

#### **From PowerShell**

```ps
$resourceGroupName = Read-Host -Prompt "Enter the Resource Group name"
$location = Read-Host -Prompt "Enter the location (i.e. centralus)"

New-AzResourceGroup `
    -Name $resourceGroupName `
    -Location "$location"
New-AzResourceGroupDeployment `
    -ResourceGroupName $resourceGroupName `
    -TemplateUri "{{name of your local template file}}"
```

### **4. Configure the New Storage Account**

- Set up the new storage account's settings to match the original account, including:

  - Access keys
  - Networking configurations
  - Replication settings
  - Firewall and virtual network rules

### **5. Transfer Data to the New Storage Account**

Use **AzCopy** or another data transfer tool to move data from the original storage account to the new account.

```sh
azcopy copy 'https://{{source-account-name}}.blob.core.windows.net/{{container-name}}?{{SAS-token}}' 'https://{{destination-account-name}}.blob.core.windows.net/{{container-name}}?{{SAS-token}' --recursive
```

### **6. Decommission the Original Storage Account**

After ensuring all data has been successfully transferred and applications are updated to use the new storage account, delete the original storage account:

```ps
Remove-AzStorageAccount `
    -ResourceGroupName  $resourceGroup `
    -AccountName $storageAccount
```

### **Considerations**

- Plan for potential downtime during data transfer and application reconfiguration.
- Verify that all data has been successfully copied before decommissioning the original storage account.
- Ensure that access control settings are replicated in the new storage account.
- Monitor costs associated with data transfer and storage in both the source and target regions.
