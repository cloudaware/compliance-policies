# Remediation

## From Azure Portal

1. Navigate to the `Microsoft Entra ID Conditional Access` Blade.
2. Click on the `Named locations` blade.
3. Within the `Named locations` blade, click on `IP ranges location`.
4. Enter a name for this location setting in the `Name` text box.
5. Click on the + sign.
6. Add an IP Address Range in CIDR notation inside the text box that appears.
7. Click on the `Add` button.
8. Repeat steps 5 through 7 for each IP Range that needs to be added.
9. If the information entered are trusted ranges, select the `Mark as trusted location` check box.
10. Once finished, click on `Create`.

## From PowerShell

Create a new trusted IP-based Named location policy:

```ps
[System.Collections.Generic.List`1[Microsoft.Open.MSGraph.Model.IpRange]]$ipRanges = @() $ipRanges.Add("<first IP range in CIDR notation>") $ipRanges.Add("<second IP range in CIDR notation>") $ipRanges.Add("<third IP range in CIDR notation>") New-AzureADMSNamedLocationPolicy -OdataType "#microsoft.graph.ipNamedLocation" -DisplayName "<name of IP Named location policy> -IsTrusted $true -IpRanges $ipRanges
```

Set an existing IP-based Named location policy to trusted:

```ps
Set-AzureADMSNamedLocationPolicy -PolicyId "<ID of the policy>" -OdataType "#microsoft.graph.ipNamedLocation" -IsTrusted $true
```
