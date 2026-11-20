# Description

Microsoft Defender for AI Services alerts either include the suspicious segments of user prompts and model responses as evidence, with sensitive data redacted, or mask that content. The Enable user prompt evidence setting of the plan's suspicious prompt evidence component selects between them, with values On and Off. Prerequisites: Complete the recommendation Ensure That Microsoft Defender for AI Services Is Set To 'On' first, because this component can be configured only while the plan is on.

## Rationale

With the component off, Defender for Cloud still detects AI threats but masks prompt and response content in alerts, so analysts cannot see what was sent to the model or what it returned. A jailbreak or data-leakage alert then cannot be confirmed or scoped from its evidence, delaying response and obscuring what data was disclosed.

## Audit

This policy marks an *Azure Subscription* as `INCOMPLIANT` if no current AI Defender plan satisfies Standard pricing with the `AIPromptEvidence` extension set to the API value `True`.

A qualifying AI plan is `COMPLIANT`.
