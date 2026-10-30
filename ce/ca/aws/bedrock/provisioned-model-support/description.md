# Description

Identify Amazon Bedrock Provisioned Throughputs in the `InService` or `Updating` state whose current foundation model is in the `LEGACY` lifecycle state. This preventive requirement is to use an Active model and prepare migration before retirement.

## Rationale

A Legacy foundation model is scheduled for retirement. Moving inference workloads to an Active model before the regional EOL date reduces the risk of requests failing when the old model becomes unavailable. AWS does not migrate callers automatically.

## Impact

Migration can change response quality, latency, model behavior, capacity requirements, and cost. Provisioned Throughput by Model Units associated with a base model cannot have its model changed in place; provision a replacement as needed, validate it, and update inference callers. Review existing commitments before purchasing or retiring capacity.

## Audit

This policy marks an *AWS Bedrock Provisioned Model Throughput* as `INCOMPLIANT` if its **Status** is `InService` or `Updating` and its current **Model** resolves to an *AWS Bedrock Foundation Model* whose **Model Lifecycle: Status** is `LEGACY`. It is `COMPLIANT` when that lifecycle status is `ACTIVE`. The related **Model ARN** must exactly match the throughput's current **Model ARN**, including the AWS Region and any context-length suffix. Legacy means deprecated and scheduled for retirement; it does not establish EOL, paid extended access, or actual request traffic. Existing Legacy endpoints may still be valid for inference; the finding calls for migration planning rather than declaring an outage or an invalid deployment.

Deployments with **Status** `Creating` or `Failed` are `INAPPLICABLE`; creation has not completed or a deployment operation has failed, so deployment health must be assessed separately. This exclusion does not prove that a failed update stopped all inference or that its retained model is supported. `Updating` remains in scope because AWS permits inference during updates and the old model can continue serving until deployment completes. Missing or unrecognized statuses are `UNDETERMINED`. Disappeared throughputs are automatically `DISAPPEARED`.

Custom current model ARNs are `INAPPLICABLE`, including the CMDB route with an empty **Model ARN** and a populated **Custom Model ARN**. This excludes custom endpoints, including imported custom-model routes, from the foundation-model requirements.
