# Remediation

Enable **user prompt evidence** for Microsoft Defender for AI Services on the affected subscription. The **AI** plan must use the **Standard** pricing tier, with the **AIPromptEvidence** extension enabled.

**Review your organization's data-handling requirements and access to security alerts before enabling prompt evidence.** Alerts can contain redacted snippets of user prompts and model responses, visible to alert readers and connected integrations.

Confirm that Microsoft Defender for AI Services is enabled by following [Microsoft Defender for AI remediation](../microsoft-defender-for-ai/remediation.md). Review the plan's pricing before enabling Standard tier, and record its current settings before making changes. Use an account with permission to manage Defender plans on the affected subscription.

## From Azure Portal

1. Go to **Microsoft Defender for Cloud**.
2. Under **Management**, select **Environment settings**.
3. Select the affected subscription and open **Defender plans**.
4. Locate **AI services**, confirm that **Status** is **On**, and select **Settings**.
5. Set **Enable user prompt evidence** to **On**.
6. Select **Continue**, then **Save** on the Defender plans page.

Repeat these steps for each subscription requiring remediation. If plan management has moved to the Microsoft Defender portal, configure the component in that portal's AI services plan settings.

## From PowerShell

Replace `{{subscription-id}}` with the affected subscription ID. Retrieve the existing AI plan extensions, enable `AIPromptEvidence` or add it if absent, and submit the complete extension list.

**Preserve the other extensions and their additional properties when updating the plan.** The following commands retain those settings while enabling Standard pricing and prompt evidence.

```ps
Set-AzContext -Subscription "{{subscription-id}}" -ErrorAction Stop

$plan = Get-AzSecurityPricing -Name "AI" -ErrorAction Stop
$extensions = @()
if ($plan.Extensions) {
    $extensions = @(
        $plan.Extensions |
            ConvertFrom-Json -ErrorAction Stop |
            Select-Object name, isEnabled, additionalExtensionProperties
    )
}
$promptEvidence = $extensions | Where-Object { $_.name -eq "AIPromptEvidence" }

if ($promptEvidence) {
    $promptEvidence.isEnabled = "True"
} else {
    $extensions += [pscustomobject]@{
        name = "AIPromptEvidence"
        isEnabled = "True"
    }
}

Set-AzSecurityPricing `
    -Name "AI" `
    -PricingTier "Standard" `
    -Extension (ConvertTo-Json -InputObject $extensions -Compress -Depth 10) `
    -ErrorAction Stop
```

Repeat for each affected subscription.

## Verification

In the AI services plan settings, confirm that **Enable user prompt evidence** is **On** and save any pending changes.

Alternatively, inspect the plan using Azure CLI.

```sh
az security pricing show \
    --name AI \
    --subscription "{{subscription-id}}" \
    --query "{PricingTier:pricingTier,PromptEvidence:extensions[?name=='AIPromptEvidence'].{Name:name,IsEnabled:isEnabled}}" \
    --output json
```

Confirm that `PricingTier` is `Standard` and there is exactly one `AIPromptEvidence` entry with `IsEnabled` set to `True`. Compare the other extension settings with the recorded configuration to verify that they were preserved.
