# Remediation

## From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Under `Management`, select `Environment Settings`.
3. Click the name of a subscription.
4. Select the `Defender plans` blade.
5. Under `Cloud Workload Protection (CWP)`, in the row for `APIs`, set the toggle switch for `Status` to `On`.
6. Select a plan.
7. Click `Save` to save the plan selection.
8. Click `Save` to enable Defender for APIs.

## From Azure CLI

Run the following command to enable Defender for APIs:

```sh
az security pricing create --name Api --tier Standard --subplan <subplan>
```

Valid subplan values: `P1`, `P2`, `P3`, `P4`, and `P5`.

## From PowerShell

Run the following command to enable Defender for APIs:

```ps
Set-AzSecurityPricing -Name Api -PricingTier Standard -SubPlan <subplan>
```

Valid SubPlan values: `P1`, `P2`, `P3`, `P4`, and `P5`.
