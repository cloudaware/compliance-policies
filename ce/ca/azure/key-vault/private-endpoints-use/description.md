# Description

Use private endpoints to allow clients and services to securely access data over a network via an encrypted Private Link. The private endpoint uses an IP address from the VNet for each service, and traffic between services is encrypted over the VNet. A VNet can also extend address space to enable access to resources and can provide a tunnel through public networks to connect remote infrastructure. This adds security by segmenting network traffic and preventing outside sources from accessing it.

Private endpoints secure network traffic between Azure Key Vault and the resources requesting secrets and keys.

## Rationale

Securing traffic between services through encryption protects the data from easy interception and reading.

Private endpoints limit Azure Key Vault access to endpoints attached to approved resources. Assigning the Key Vault to a network without an endpoint can allow other resources on that network to view traffic from the Key Vault to its destination. Despite the configuration complexity, this is recommended for high-security secrets.

## Impact

If an Azure Virtual Network is not implemented correctly, this may result in the loss of critical network traffic.

Private endpoints are charged per hour of use. Refer to <https://azure.microsoft.com/en-us/pricing/details/private-link/> and <https://azure.microsoft.com/en-us/pricing/calculator/> to estimate potential costs.

## Audit

This policy flags an *Azure Key Vault* as `INCOMPLIANT` if the related *Azure Private Endpoint Connection* for **Key Vault** is either **not** linked to an existing *Private Endpoint* or its `Service Connection Status` is **not** set to **Approved**.

## Default Value

By default, Private Endpoints are not enabled for any services within Azure.

## References

1. <https://docs.microsoft.com/en-us/azure/private-link/private-endpoint-overview>
2. <https://docs.microsoft.com/en-us/azure/storage/common/storage-private-endpoints>
3. <https://azure.microsoft.com/en-us/pricing/details/private-link/>
4. <https://docs.microsoft.com/en-us/azure/key-vault/general/private-link-service?tabs=portal>
5. <https://docs.microsoft.com/en-us/azure/virtual-network/quick-create-portal>
6. <https://docs.microsoft.com/en-us/azure/private-link/tutorial-private-endpoint-storage-portal>
7. <https://docs.microsoft.com/en-us/azure/bastion/bastion-overview>
8. <https://docs.microsoft.com/azure/dns/private-dns-getstarted-cli#create-an-additional-dns-record>
9. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-data-protection#dp-8-ensure-security-of-key-and-certificate-repository>

## Additional Information

This recommendation assumes that you have created a resource group containing a virtual network that services are already associated with and that private DNS is configured. A Bastion on the virtual network is also required, and the service you are connecting to must already have a Private Endpoint. For setup details, see the referenced documentation.

Microsoft's own documentation lists the requirements as: A Key Vault. An Azure virtual network. A subnet in the virtual network. Owner or contributor permissions for both the Key Vault and the virtual network.
