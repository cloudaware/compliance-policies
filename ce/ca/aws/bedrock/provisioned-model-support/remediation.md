# Remediation

Migrate workloads that use a Legacy foundation model to an Active model before the announced retirement date. Keep the existing capacity until the replacement is ready and applications have switched to it.

## 1. Confirm the current model

Use the Provisioned Throughput ARN and AWS Region from the Cloudaware finding. Replace `PROVISIONED_MODEL_ARN` and `REGION` in this command:

```sh
aws bedrock get-provisioned-model-throughput --provisioned-model-id PROVISIONED_MODEL_ARN --region REGION
```

Check the returned `modelArn`, `status`, and commitment expiration time. Identify the applications and integrations that use this Provisioned Throughput.

Use the returned `modelArn` as `CURRENT_FOUNDATION_MODEL_ARN` to check the model in the same Region:

```sh
aws bedrock get-foundation-model --model-identifier CURRENT_FOUNDATION_MODEL_ARN --region REGION
```

Confirm its lifecycle status and review the retirement date in the [AWS lifecycle documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html) or the model card. During an update, `desiredModelArn` identifies the requested model; the old model can continue serving until deployment finishes.

For a `Creating` or `Failed` deployment, investigate its status and any `failureMessage` separately. These states are excluded from this policy and do not establish model support or absence of traffic.

## 2. Choose and validate a replacement

Select an Active model listed in the [supported models and Regions for Provisioned Throughput](https://docs.aws.amazon.com/bedrock/latest/userguide/prov-thru-supported.html). Use the required model variant, including its context-length suffix where applicable.

Before purchasing capacity, confirm:

- Model access, IAM permissions, and KMS permissions if applicable.
- Available Model Unit quotas, commitment terms, and cost.
- Compatibility with your input and output formats, guardrails, and application integrations.
- Acceptable response quality, latency, and throughput under representative traffic.

## 3. Provision replacement capacity

Create a new Provisioned Throughput for the replacement model. A Provisioned Throughput by Model Units associated with a base model cannot switch models in place.

Wait for the new capacity to reach `InService`, then test inference before changing application settings. Allow for the cost of running both deployments during migration.

## 4. Move traffic and retire the old capacity

Update applications and integrations to use the new Provisioned Throughput ARN. Monitor errors, response quality, latency, and capacity after the switch. Keep the previous application settings available for rollback while the old model remains accessible.

Delete the old capacity only after all callers have moved and its commitment term permits deletion. Billing continues until deletion; do not delete capacity that still serves callers.

## Special cases

Continued access to a Legacy model does not satisfy this policy's Active-model requirement. Review public extended access dates, pricing changes, and any private continued-access agreement when planning the migration.

Custom-model configurations are excluded as `INAPPLICABLE`; review their support terms separately. AWS permits an existing custom-model association to change only to its original base model or another custom model derived from that base. Moving to a different model family requires replacement capacity. See [Modify a Provisioned Throughput](https://docs.aws.amazon.com/bedrock/latest/userguide/prov-thru-edit.html).
