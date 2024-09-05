# Remediation

## From Azure Portal

1. Go to `Virtual machines`.
2. For each VM, open the `Networking` blade.
3. Click on `Inbound port rules`.
4. Delete the rule with:
    - Port = 80/443 OR [port range containing 80/443].
    - Protocol = TCP OR Any.
    - Source = Any (*) OR IP Addresses(0.0.0.0/0) OR Service Tag(Internet).
    - Action = Allow.

## From Azure CLI

Run below command to list network security groups:

```sh
az network nsg list --subscription <subscription-id> --output table
```

1. For each network security group, run below command to list the rules associated with the specified port:

```sh
az network nsg rule list --resource-group <resource-group> --nsg-name <nsg-name> --query "[?destinationPortRange=='80 or 443']"
```

2. Run the below command to delete the rule with:
    - Port = 80/443 OR [port range containing 80/443]
    - Protocol = TCP OR "*"
    - Source = Any (*) OR IP Addresses(0.0.0.0/0) OR Service Tag(Internet)
    - Action = Allow

```sh
az network nsg rule delete --resource-group <resource-group> --nsg-name <nsg-name> --name <rule-name>
```
