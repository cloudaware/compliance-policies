# Remediation

## From Azure Portal

1. Go to `Storage Accounts`.
2. For each Storage Account that is not compliant, under `Security + networking`, go to `Access keys`.
3. Click `Set rotation reminder`.
4. Check `Enable key rotation reminders`.
5. In the `Send reminders` field select `Custom`, then set the `Remind me every` field to `90` and the period drop down to `Days`.
6. Click `Save`.

## From Powershell

```ps
$rgName = {{resource-group-name}}
$accountName = {{storage-account-name}}

# Get storage account details
$account = Get-AzStorageAccount `
    -ResourceGroupName $rgName `
    -Name $accountName

# Check if both keys have been regenerated at least once
if ($account.KeyCreationTime.Key1 -eq $null -or $account.KeyCreationTime.Key2 -eq $null) {
    Write-Output "You must regenerate both keys at least once before setting expiration policy"
}
else {
    # Set key expiration policy to 90 days
    $account = Set-AzStorageAccount `
        -ResourceGroupName $rgName `
        -Name $accountName `
        -KeyExpirationPeriodInDay 90
}

# Display the key expiration period
$account.KeyPolicy.KeyExpirationPeriodInDays
```
