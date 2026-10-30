# Remediation

Migrate the knowledge base to an Active embedding model before the current model's announced retirement date. Keep the existing knowledge base and vector index available until the replacement has been tested and applications have switched to it.

If the finding is `UNDETERMINED`, resolve missing model data or any ARN or Region mismatch before making changes. An Active model elsewhere in the catalog does not establish support for the model configured on this knowledge base.

## 1. Confirm the configured embedding model

Find the affected knowledge base's ID and AWS Region in the Amazon Bedrock console. Replace `KNOWLEDGE_BASE_ID` and `REGION` in this command:

```sh
aws bedrock-agent get-knowledge-base --knowledge-base-id KNOWLEDGE_BASE_ID --region REGION
```

Review the embedding model ARN, vector store, embedding dimensions, and vector data type. Identify the data sources, agents, and applications that depend on this knowledge base.

Confirm the configured model's lifecycle status in the same Region and review its announced end-of-life date in Amazon Bedrock. Changing the generation model used by `RetrieveAndGenerate` does not replace the embedding model used to index and retrieve documents.

## 2. Choose and validate a replacement

Select an Active embedding model supported by Amazon Bedrock Knowledge Bases in the required Region. Before proceeding, confirm:

- Support for your documents' languages and content types.
- Compatible embedding dimensions, vector data type, and vector storage.
- Required access permissions, available quotas, and expected cost.
- Acceptable retrieval quality using representative documents and queries.

## 3. Build a replacement knowledge base and index

Create a replacement knowledge base with the new embedding model and compatible vector storage. Re-ingest the source documents to generate new embeddings and build a separate vector index. Do not mix embeddings from different models in the existing index.

Keep the original knowledge base, vector index, and data sources until the replacement is verified. Allow for the additional storage and ingestion costs of running both deployments during migration.

## 4. Test the replacement and switch applications

Check ingestion results and compare retrieval quality with the existing knowledge base. Test access permissions, metadata filters, and any dependent agents or applications.

Once the replacement passes these checks, update integrations to use its knowledge base ID. Monitor ingestion, retrieval, and application behavior after the switch. Keep the previous integration settings available for rollback while the old embedding model remains accessible.

Retire the old knowledge base and index only after all integrations have moved and the replacement is working as expected. Retain any source data needed by the replacement or for recovery.

## Special cases

If you use `UpdateKnowledgeBase` for supported configuration changes, include every field that must be retained. AWS documents that omitted fields are overwritten. Switching between managed and customer-provided embedding types requires a new knowledge base.

Legacy models can remain accessible before retirement, but continued access does not satisfy this policy's Active-model requirement. Review public extended access dates, pricing changes, and any private continued-access agreement when planning the migration. Migration does not happen automatically.
