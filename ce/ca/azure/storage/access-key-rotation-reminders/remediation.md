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
$rgName = <resource group name for the storage> $accountName = <storage account name> $account = Get-AzStorageAccount -ResourceGroupName $rgName -Name $accountName if ($account.KeyCreationTime.Key1 -eq $null -or $account.KeyCreationTime.Key2 -eq $null){ Write-output ("You must regenerate both keys at least once before setting expiration policy") } else { $account = Set-AzStorageAccount -ResourceGroupName $rgName -Name $accountName -KeyExpirationPeriodInDay 90 } $account.KeyPolicy.KeyExpirationPeriodInDays
```
