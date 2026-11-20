# Remediation

Enable Microsoft Defender for AI Services on the affected subscription by setting the **AI** plan to the **Standard** pricing tier.

**Review the Defender for AI Services pricing and expected workload usage before enabling the plan.** Standard pricing incurs additional charges. Record the current AI plan settings and confirm that you are updating the intended subscription.

## From Azure Portal

1. Go to **Microsoft Defender for Cloud**.
2. Under **Management**, select **Environment settings**.
3. Select the affected subscription.
4. Select **Defender plans**.
5. Set **Status** to **On** for **AI services**.
6. Select **Save**.

Repeat these steps for each subscription requiring remediation.

## From Azure CLI

Replace `{{subscription-id}}` with the affected subscription ID and enable the AI plan.

```sh
az security pricing create \
    --name AI \
    --tier Standard \
    --subscription "{{subscription-id}}"
```

## From PowerShell

Select the affected subscription and enable the AI plan.

```ps
Set-AzContext -Subscription "{{subscription-id}}" -ErrorAction Stop

Set-AzSecurityPricing `
    -Name "AI" `
    -PricingTier "Standard"
```

## Verification

In **Microsoft Defender for Cloud > Environment settings > Defender plans**, confirm that **AI services** has **Status** set to **On** for each affected subscription.

Alternatively, check the AI plan's pricing tier using Azure CLI.

```sh
az security pricing show \
    --name AI \
    --subscription "{{subscription-id}}" \
    --query pricingTier \
    --output tsv
```

Confirm that the command returns `Standard`.
