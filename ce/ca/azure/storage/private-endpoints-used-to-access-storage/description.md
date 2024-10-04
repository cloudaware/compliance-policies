# Description

Use private endpoints for your Azure Storage accounts to allow clients and services to securely access data located over a network via an encrypted Private Link. To do this, the private endpoint uses an IP address from the VNet for each service. Network traffic between disparate services securely traverses encrypted over the VNet. This VNet can also link addressing space, extending your network and accessing resources on it. Similarly, it can be a tunnel through public networks to connect remote infrastructures together. This creates further security through segmenting network traffic and preventing outside sources from accessing it.

## Rationale

Securing traffic between services through encryption protects the data from easy interception and reading.

## Impact

A Private Endpoint costs approximately US$7.30 per month. If an Azure Virtual Network is not implemented correctly, this may result in the loss of critical network traffic.

## Audit

### From Azure Portal

1. Open the `Storage Accounts` blade.
2. For each listed Storage Account, perform the following check.
3. Under the Security + networking heading, click on `Networking`.
4. Click on the `Private Endpoint Connections` tab at the top of the networking window.
5. Ensure that for each VNet that the Storage Account must be accessed from, a unique Private Endpoint is deployed and the Connection State for each Private Endpoint is `Approved`.

Repeat the procedure for each Storage Account.

### From PowerShell

```ps
$storageAccount = Get-AzStorageAccount -ResourceGroup '<ResourceGroupName>' -Name '<storageaccountname>' Get-AzPrivateEndpoint -ResourceGroup '<ResourceGroupName>'|Where-Object {$_.PrivateLinkServiceConnectionsText -match $storageAccount.id}
```

If the results of the second command returns information, the Storage Account is using a Private Endpoint and complies with this Benchmark, otherwise if the results of the second command are empty, the Storage Account generates a finding.

### From Azure CLI

```sh
az storage account show --name '<storage account name>' --query "privateEndpointConnections[0].id"
```

If the above command returns data, the Storage Account complies with this Benchmark, otherwise if the results are empty, the Storage Account generates a finding.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [6edd7eda-6dd8-40f7-810d-67160c639cd9](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F6edd7eda-6dd8-40f7-810d-67160c639cd9) - **Name**: `Storage accounts should use private link`

## Default Value

By default, Private Endpoints are not created for Storage Accounts.

## References

1. <https://docs.microsoft.com/en-us/azure/storage/common/storage-private-endpoints>
2. <https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview>
3. <https://docs.microsoft.com/en-us/azure/private-link/create-private-endpoint-portal>
4. <https://docs.microsoft.com/en-us/azure/private-link/create-private-endpoint-cli?tabs=dynamic-ip>
5. <https://docs.microsoft.com/en-us/azure/private-link/create-private-endpoint-powershell?tabs=dynamic-ip>
6. <https://docs.microsoft.com/en-us/azure/private-link/tutorial-private-endpoint-storage-portal>
7. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-network-security#ns-2-secure-cloud-native-services-with-network-controls>

## Additional Information

A NAT gateway is the recommended solution for outbound internet access.
