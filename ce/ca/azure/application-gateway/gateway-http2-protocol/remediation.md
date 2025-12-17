# Remediation

## From Azure Portal

1. Go to `Application gateways`.
2. Click the name of an application gateway.
3. Under `Settings`, click `Configuration`.
4. Under `HTTP2`, click `Enabled`.
5. Click `Save`.
6. Repeat steps 1-5 for each application gateway requiring remediation.

## From Azure CLI

For each application gateway requiring remediation, run the following command to enable HTTP2:

```sh
az network application-gateway update --resource-group {{resource-group}} --name {{application-gateway}} --http2 Enabled
```

## From PowerShell

Run the following command to get the application gateway in a resource group with a given name:

```ps
$gateway = Get-AzApplicationGateway -ResourceGroupName {{resource-group}} -Name {{application-gateway}}
```

Run the following command to enable HTTP2:

```ps
$gateway.EnableHttp2 = $true
```

Run the following command to apply the update:

```ps
Set-AzApplicationGateway -ApplicationGateway $gateway
```

Repeat for each application gateway requiring remediation.
