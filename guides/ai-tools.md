# AI Tools Guide

This guide explains how Cloudaware customers can leverage AI tools to interact with this repository and the data within the Cloudaware CMDB.

## Integration Requirements

To effectively use an AI agent with this repository, the following prerequisites must be met:

- **Tool Usage:** The AI agent must be capable of using tools, such as reading files and executing shell commands. An example of such a tool is the [Gemini CLI](https://github.com/google-gemini/gemini-cli).
- **Large Context Window:** The model should support a large context window (over 128K tokens). Google's Gemini family of models, with up to 1M input tokens, meets this criterion. We recommend using **Gemini 2.5 Pro**.
- **Instruction Following:** The model must be proficient at following instructions, especially within a large context. `gemini-2.5-pro` is significantly better at this than `gemini-2.5-flash`.

## How It Works

Cloudaware provides an [`agents.md`](../agents.md) file that bootstraps the AI agent with initial instructions.

Based on the user's request, the AI agent can access further documentation within this repository, including:

- Compliance Engine [developer documentation](developer/index.md) and available [operations](developer/operations/index.md).
- Commands available through the [`repo-manager`](developer/repo-manager/cli.md).

By exploring the repository, the AI agent can utilize:

- Information about [all available types](../types/all.gen.md) to select the correct one based on user queries.
- Detailed type descriptions, including available fields (e.g., [AWS EC2 Instance](../types/CA10__CaAwsInstance__c/type.json.md)).
- Available Compliance Engine policies, located in the [`/ce`](../ce/folder.yaml.md) directory.

The system also relies on the AI's built-in knowledge of:

- Salesforce Object Query Language (SOQL)
- BigQuery Query Language
- AWS, Azure, GCP, and other cloud platforms

## Example Use Cases

The following are tested use cases that demonstrate the AI agent's ability to understand and correctly query data in the Cloudaware CMDB. These examples are illustrative; AI agents can use similar methods to perform more complex tasks.

### Querying Data in the CMDB

**Example Query:**
> How many running EC2 instances do I have?

**AI Agent's Process:**

1. Determines the correct object type and its API name: `CA10__CaAwsInstance__c`.
2. Inspects available fields in either [`type.json`](../types/CA10__CaAwsInstance__c/type.json) or the [generated documentation](../types/CA10__CaAwsInstance__c/type.json.md).
3. Concludes that `CA10__stateName__c` must be `running`.
4. Filters out deleted objects by ensuring `CA10__disappearanceTime__c` is null.
5. Constructs a SOQL query.
6. Converts the SOQL query to a BigQuery query using `repo-manager soql convert`.
7. Executes the BigQuery query using the `gcloud` command and provides the answer.

**Similar questions that can be answered:**

- How many security groups open port 22 to the public internet?
- What is the largest EBS volume in my environment?
- Show me a list of all IAM users without MFA enabled.

### Handling Customer-Specific Fields

**Example Query:**
> How many EC2 instances in the `us-east-1` region are owned by `johndoe@mycompany.com`?

**AI Agent's Process:**

- The agent follows the same general process as above but correctly infers that "owned by" likely refers to the `owner` tag, which is stored in the `caTag_owner__c` field.

### Writing Compliance Policies

**Example Request:**
> Write a policy that marks S3 buckets as non-compliant if "MFA delete" is not enabled.

**AI Agent's Process:**

1. Looks up all relevant API names for types and fields.
2. Consults the [repository structure documentation](developer/index.md#repository-structure) to understand the necessary components for a new policy.
3. Creates the required [folder descriptors](developer/index.md#folder).
4. Creates the [policy descriptor](developer/index.md#policy).
5. Generates the [logic file](developer/index.md#logic) using the appropriate [operations](developer/operations/index.md) to implement the policy.
