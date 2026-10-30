# Description

Identify Amazon Bedrock knowledge bases configured to use a foundation embedding model in the `LEGACY` lifecycle state. This is a preventive retirement check of the model used to create vector embeddings, rather than an assessment of every model listed in the regional catalog or the model used to generate answers.

## Rationale

Migrating embedding workloads before model retirement protects document ingestion and retrieval. A Legacy model may remain usable, but AWS recommends moving to an Active model before its end-of-life date. Lifecycle states and dates can differ by AWS Region; the configured model's regional record is the relevant source.

## Impact

Changing embedding models can require a new knowledge base, compatible vector storage, and re-embedding and re-indexing the source documents. Migration can incur ingestion costs and affect retrieval quality, dimensions, data types, and application integrations. Validate the replacement before switching traffic.

## Audit

This policy marks an *AWS Bedrock Knowledge Base* as `INCOMPLIANT` if its configured **Foundation Embedding Model ARN** resolves to a present *AWS Bedrock Foundation Model* whose **Model Lifecycle: Status** is **LEGACY**. It is `COMPLIANT` when that status is **ACTIVE**. The related **Model ARN** must exactly match the configured ARN, including its AWS Region. Legacy means deprecated and scheduled for retirement; it does not mean that the model is already unavailable or that paid extended access applies.

A knowledge base with SQL configuration type `REDSHIFT`, a native Amazon Kendra index ARN, or status `DELETING` is `INAPPLICABLE`, unless conflicting foundation embedding configuration is detected first. Other documented statuses (`CREATING`, `ACTIVE`, `UPDATING`, `FAILED`, `DELETE_UNSUCCESSFUL`, and `UPDATE_UNSUCCESSFUL`) are evaluated against their configured embedding model. This does not establish whether the knowledge base is serving requests. Missing or unrecognized knowledge base statuses produce `UNDETERMINED` after SQL and Kendra exclusions.

Missing, unresolved, or disappeared foundation model relationships remain `UNDETERMINED` when a native embedding ARN positively requires the target. A populated foundation relationship with a missing native embedding ARN, an ARN that does not identify a foundation model, conflicting SQL, native Kendra, or SageMaker configuration together with a foundation embedding model ARN, mismatched model ARNs or Regions, missing required model identity, and missing or unrecognized lifecycle values also produce `UNDETERMINED`. Required native status, related model ARN, and lifecycle values use canonical extract diagnostics.

SageMaker endpoint embedding ARNs in **SageMaker Embedding Model ARN** or **Foundation Embedding Model ARN** are `INAPPLICABLE`. Knowledge bases with neither a native foundation embedding ARN nor its relationship helper are also `INAPPLICABLE`: their variant cannot be established reliably from the exported fields. This excludes service-managed embeddings and uncollected managed/custom embedding configurations; it is not evidence of support or non-use. A native Kendra index ARN establishes Kendra configuration even when the related index is not collected; a helper Kendra lookup ID alone is insufficient. The engine automatically marks disappeared knowledge bases as `DISAPPEARED`.
