# Description

Turning on Microsoft Defender for AI Services enables threat protection for Azure OpenAI and Azure AI model inference workloads in Microsoft Foundry, providing runtime detection of threats such as prompt injection attacks, data leakage, and credential theft in Microsoft Defender for Cloud.

## Rationale

Enabling Microsoft Defender for AI Services allows for greater defense-in-depth. It continuously analyzes activity on supported Azure OpenAI and Azure AI model inference deployments and generates context-based security alerts for threats such as jailbreak, data leakage, and credential theft, drawing on Microsoft threat intelligence and Azure AI Content Safety Prompt Shields.

## Audit

This policy marks an *Azure Subscription* as `INCOMPLIANT` if no current AI Defender plan satisfies **Pricing Tier** `Standard`.

A qualifying AI plan is `COMPLIANT`.
