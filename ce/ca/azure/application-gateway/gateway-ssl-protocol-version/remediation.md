# Remediation

## From Azure Portal

1. Go to `Application gateways`.
2. Select the name of an application gateway.
3. Under `Settings`, click `Listeners`.
4. Under `SSL Policy`, next to the `Selected SSL Policy` name, click `Change`.
5. Select an appropriate SSL policy with a `Min protocol version` of `TLSv1_2` or higher.
6. Click `Save`.
7. Repeat steps 1-6 for each application gateway requiring remediation.

## From Azure CLI

Run the following command to list available SSL policy options:

```sh
az network application-gateway ssl-policy list-options
```

Run the following command to list available predefined SSL policies:

```sh
az network application-gateway ssl-policy predefined list
```

For each application gateway requiring remediation, run the following command to set a predefined SSL policy:

```sh
az network application-gateway ssl-policy set \
    --resource-group {{resource-group-name}} \
    --gateway-name {{application-gateway-name}} \
    --name {{ssl-policy-name}} \
    --policy-type Predefined
```

Alternatively, run the following command to set a custom SSL policy:

```sh
az network application-gateway ssl-policy set \
    --resource-group {{resource-group-name}} \
    --gateway-name {{application-gateway-name}} \
    --policy-type Custom \
    --min-protocol-version {{min-protocol-version}} \
    --cipher-suites {{cipher-suites}}
```
