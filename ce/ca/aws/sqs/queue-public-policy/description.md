# Description

This policy identifies Amazon SQS queues whose resource-based policies allow public access to queue messages, queue metadata, or administrative operations.

## Rationale

Amazon SQS queues commonly carry application events, workflow instructions, and other operational data. If a queue policy grants public or otherwise overly broad external access, unauthorized parties may be able to send arbitrary messages, read or remove queued messages, or interfere with queue processing.

Public `sqs:SendMessage` access can be abused to inject malicious or spam messages, trigger downstream workflows, or increase processing costs. Public consumer access, such as `sqs:ReceiveMessage`, `sqs:DeleteMessage`, or `sqs:ChangeMessageVisibility`, can expose message contents, disrupt normal processing, or cause message loss. Administrative permissions, such as `sqs:SetQueueAttributes`, `sqs:DeleteQueue`, or `sqs:PurgeQueue`, can allow an attacker to weaken protections, remove data, or disable the queue entirely.

Access required for AWS services or trusted cross-account integrations should be scoped to explicit principals and restrictive conditions such as `aws:SourceArn`, `aws:SourceAccount`, or equivalent account or organization boundaries.

## Audit

This policy flags an *AWS SQS Queue* as `INCOMPLIANT` when the queue `Policy` grants any of the following **sqs:** actions to a public or unintended external principal without sufficient restrictions:

A queue is `COMPLIANT` when it has no resource-based policy that allows external access. In this case, the extended policy field may be empty.

### Message and Metadata Access

- `sqs:ReceiveMessage`
- `sqs:SendMessage`
- `sqs:DeleteMessage`
- `sqs:ChangeMessageVisibility`
- `sqs:GetQueueAttributes`

### Administrative Access

- `sqs:SetQueueAttributes`
- `sqs:DeleteQueue`
- `sqs:AddPermission`
- `sqs:RemovePermission`
- `sqs:PurgeQueue`
- `sqs:TagQueue`
- `sqs:UntagQueue`
