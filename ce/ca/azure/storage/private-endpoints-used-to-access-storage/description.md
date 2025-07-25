# Description

Use private endpoints for your Azure Storage accounts to allow clients and services to securely access data located over a network via an encrypted Private Link. To do this, the private endpoint uses an IP address from the VNet for each service. Network traffic between disparate services securely traverses encrypted over the VNet. This VNet can also link addressing space, extending your network and accessing resources on it. Similarly, it can be a tunnel through public networks to connect remote infrastructures together. This creates further security through segmenting network traffic and preventing outside sources from accessing it.

## Rationale

Securing traffic between services through encryption protects the data from easy interception and reading.

## Impact

If an Azure Virtual Network is not implemented correctly, this may result in the loss of critical network traffic.

Private endpoints are charged per hour of use. Refer to <https://azure.microsoft.com/en-us/pricing/details/private-link/> and <https://azure.microsoft.com/en-us/pricing/calculator/> to estimate potential costs.

## Audit

This policy flags an *Azure Storage Account* as `INCOMPLIANT` if the related *Azure Private Endpoint Connection* for **Storage Account** is either **not** linked to an existing *Private Endpoint* or its `Service Connection Status` is **not** set to **Approved**.

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

This recommendation is based on the Common Reference Recommendation `Ensure Private Endpoints are used to access {service}`, from the `Common Reference Recommendations > Networking > Private Endpoints` section.
