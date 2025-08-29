---
draft: true
---
# AI Agent Onboarding Guide for Compliance Policy Repository

This guide provides instructions for interacting with and managing the Cloudaware Compliance Engine v2 policy repository. Adhere strictly to these guidelines to ensure consistency and proper functioning of the automation toolchain.

## 1. Task Execution Protocol

For every user request, you MUST follow this protocol to ensure transparency, reproducibility, and clear communication. This is your primary operational loop.

1. **Create a Task Directory**: Upon receiving a new task, immediately create a dedicated directory for it within the `/export` directory. Name the directory descriptively (e.g., `/export/task-add-s3-encryption-policy`).

2. **Initialize `readme.md` Log**: Inside the new task directory, create a `readme.md` file. This file will serve as your plan, log, and report for the user.

3. **Formulate and Document the Plan**: Before taking any action, formulate a step-by-step plan to address the user's request. Write this plan at the top of the `readme.md`.

4. **Log Every Action**: As you execute each step, meticulously log your actions in the `readme.md` under a "Log" or "Execution Details" section. For each action, you must record:
    - A brief description of the action's purpose.
    - The full command you are executing (e.g., `repo-manager policies test ...`, `write_file ...`).
    - The complete output from the command.
    - Links to any files created or modified.

5. **Update the Plan**: After completing a step, update the plan section of the `readme.md` to reflect your progress (e.g., by marking items as complete).

6. **Inform the User**: Keep the user informed by referencing the `readme.md` file. When you have completed the task, notify the user that a detailed log of all actions is available in the task directory. This log is crucial for the user to understand your work and potentially automate the task later.

### Example `readme.md` Structure

```markdown
# Task: Add a New Policy for S3 Bucket Encryption

**Status:** In Progress

## Plan

- [ ] 1. Create the policy directory structure.
- [ ] 2. Create the `policy.yaml` file.
- [ ] 3. Create the `description.md` and `remediation.md` files.
- [ ] 4. Implement the logic in `wip.logic.yaml`.
- [ ] 5. Create `test-data.json`.
- [ ] 6. Run tests and verify the logic.
- [ ] 7. Rename `wip.logic.yaml` to `prod.logic.yaml`.
- [ ] 8. Generate repository documentation.

## Execution Log

### Step 1: Create Policy Directory

I am now creating the directory for the new policy at `/ce/customer/aws/s3/s3-bucket-encryption-enabled`.

**Command:**
`mkdir -p /ce/customer/aws/s3/s3-bucket-encryption-enabled`

**Output:**
...

---
*... (log continues for each step) ...*
```

## 2. Core Concepts

The repository stores compliance policies as declarative YAML files.

- **Policy**: A rule or idea to test against a cloud environment. It is a declarative description, not code. It is defined in a `policy.yaml` file.
- **Logic**: The implementation of a policy's idea. It contains the instructions for how to validate objects. It is defined in a `{name}.logic.yaml` file. A policy can have multiple logic files (e.g., `prod.logic.yaml`, `wip.logic.yaml`).
- **Folder**: A logical container for organizing policies, defined by a `folder.yaml` file.
- **Section**: A component of a compliance framework (e.g., NIST, CIS), defined by a `section.yaml` file.
- **Type**: Represents a Cloudaware CMDB SObject type (e.g., `CA10__CaAwsInstance__c`). Its directory contains `type.json` (schema) and `*.extracts.yaml` files.
- **Extract**: A reusable, validated piece of information extracted from an input object. Extracts are defined in `/types/{type}/{name}.extracts.yaml` and are used in logic files to abstract away direct field access. **Always prefer `EXTRACT` over `FIELD` in production logic.**
- **Entity ID**: The unique identifier for any entity (Policy, Folder, Section, etc.) is its **absolute Linux-style path** from the repository root. For example, the ID for a policy in `/ce/ca/aws/ec2/my-policy/policy.yaml` is `/ce/ca/aws/ec2/my-policy`.

## 3. Repository Structure

- `/ce`: Root directory for all policies.
  - `/ce/ca`: Cloudaware's public policies.
  - `/ce/unit-test`: Unit tests.
  - *Your custom policies go into new subdirectories here.*
- `/frameworks`: Contains compliance framework definitions. Each subdirectory is a framework.
- `/types`: Contains CMDB SObject type definitions and associated `extracts.yaml` files.
- `/schema`: Contains JSON schemas for IDE validation.
- `/lists`: Contains auto-generated lists of policies for maintenance (e.g., policies without tests).
- `/.ca`: Stores configuration for the `repo-manager` tool.

## 4. Naming and File Conventions

**Strict adherence is mandatory.**

- **Directory Names**: Use `lowercase-with-hyphens`.
- **Descriptor Files**:
  - Folders require `folder.yaml`.
  - Policies require `policy.yaml`.
  - Framework sections require `section.yaml`.
- **Logic Files**:
  - `prod.logic.yaml`: **Production logic.** This is executed by the engine.
  - `wip.logic.yaml`: Work-in-progress.
  - `unit-test.logic.yaml`: Unit tests.
  - `example.logic.yaml`: Examples.
- **Documentation Files**:
  - `description.md`: Detailed technical specification of the policy (Rationale, Impact, Audit).
  - `remediation.md`: Step-by-step guidance to fix non-compliance.
  - `internal.md`: Developer notes.
  - `todo.md`: Implementation tasks.
- **Test Data**:
  - `test-data.json`: Contains JSON objects for testing a logic file. It is referenced in the `testData` property of the logic YAML.

## 5. Common Workflows

### Workflow: Creating a New Policy

1. **Identify Path**: Determine the correct path for the new policy under `/ce`. For example: `/ce/my-org/aws/s3/my-new-policy`.
2. **Create Folders**: Ensure all parent directories exist and each contains a `folder.yaml` file with `names.contextual` and `names.full` properties.
3. **Create Policy Directory**: Create the final directory for your policy.
4. **Create `policy.yaml`**: Create the main descriptor file. Populate `names`, `description`, `type`, `categories`, and other metadata.
5. **Create Documentation**: Create `description.md` and `remediation.md` with detailed content.
6. **Create Logic (`wip.logic.yaml`)**: Start by creating a `wip.logic.yaml`.
    - Define `inputType` (the CMDB object to check).
    - Use `importExtracts` to reference reusable data extractions. Check existing extracts in the `/types` directory first.
    - Define `conditions` sequentially. Each condition has a `check`, `status`, `currentStateMessage`, and `remediationMessage`.
    - Define the `otherwise` block as a fallback.
7. **Debug and Test**: Follow the debugging and testing workflows below.
8. **Finalize Logic**: Once testing is complete and successful, rename `wip.logic.yaml` to `prod.logic.yaml`.
9. **Generate Documentation**: Run `repo-manager docs generate` to update navigation links.

### Workflow: Testing a Policy

1. **Generate Test Data (if needed)**:
    - Run `repo-manager policies generate CAPTURE_TEST_DATA /path/to/your/prod.logic.yaml`.
    - This creates a `.sql` file in a `.generated` directory.
    - Execute this SQL against BigQuery.
    - Save the results as `test-data.json` in the policy's directory.
    - Modify the JSON to cover all conditions and edge cases.
2. **Run Tests**:
    - Execute `repo-manager policies test /path/to/your/prod.logic.yaml` for a single policy or `repo-manager policies test all` for all policies.
    - This command validates the logic against `test-data.json` and creates a `.test-results.yaml` file.
3. **Review Results**: Check the output for failures. The test results file will be used by the documentation generator.

### Workflow: Debugging a Policy

1. **Generate Debug Query**:
    - Run `repo-manager policies generate DEBUG /path/to/your/logic.yaml`.
    - This creates a `debug.sql` file in a `.generated` directory.
2. **Execute Query**: Run the generated SQL queries against BigQuery to inspect how the logic evaluates against real data. This helps understand which objects match which conditions.

### Workflow: Managing Documentation

- **Before Committing**: Always run `repo-manager docs generate` to create/update the `*.gen.md` files which provide cross-references between entities.
- **Before Pulling Changes**: Run `repo-manager docs cleanup` to remove all generated files to avoid merge conflicts.
- **To Fix Discrepancies**: Run the following sequence:
    1. `repo-manager docs cleanup`
    2. `repo-manager policies test all`
    3. `repo-manager docs generate`

## 6. `repo-manager` CLI Tool

`repo-manager` is the primary tool for managing this repository.

### Configuration and Behavior

- **Configuration**: The tool uses authentication profiles stored in a `profiles.json` file. This file is typically located in a `.ca` directory in the repository root or your home directory. The agent must have a valid and active profile to communicate with the Cloudaware API.
- **Auto-Update**: The tool auto-updates periodically. You can force an update with `--auto-update` or suppress it with `--no-auto-update`.

### Command Reference

The following are the most critical commands for an AI agent.

#### `docs` - Documentation Management

- **`repo-manager docs generate`**: Generates/updates all `*.gen.md` and other documentation files. These files contain crucial cross-links between entities. **Run this after making changes and before committing.**
  - `--watch`: Use to keep documentation updated in real-time during development sessions.
- **`repo-manager docs cleanup`**: Removes all generated documentation files. **Run this before pulling changes from a remote repository to avoid merge conflicts.**

#### `policies` - Policy Management

- **`repo-manager policies generate <kind> <id>`**: Generates a BigQuery script for a policy.
  - **`<id>`**: The absolute path ID of the policy or logic file (e.g., `/ce/ca/aws/ec2/instance-detailed-monitoring/prod.logic.yaml`).
  - **`<kind>`**: The type of script to generate. Valid values are:
    - `DEBUG`: For debugging the policy against live data.
    - `CAPTURE_TEST_DATA`: To create a query for generating `test-data.json`.
    - `TESTS`: To generate a script for running tests from `test-data.json`.
- **`repo-manager policies test <id>`**: Runs tests for policies.
  - **`<id>`**: The ID of a specific policy/logic file, or `'all'` to test every policy in the repository, or `'unit-tests'` for all unit tests.

#### `types` - CMDB Type Management

- **`repo-manager types import`**: Imports or updates SObject definitions from Salesforce into the `/types` directory. This also updates the master list in `/types/types.json`. Use this if a policy requires a new object type or field that is not yet present.
  - `--type <api_name>`: Specify a single type to import. Can be used multiple times.
  - `--preset <preset_name>`: Import a group of types (e.g., `REFERENCED`, `CLOUDAWARE`). Can be used multiple times.
- **`repo-manager types delete`**: Removes imported type data from the `/types` directory.

#### `schema` - Schema Management

- **`repo-manager schema update`**: Updates the JSON schema files in the `/schema` directory. This ensures IDEs and validation tools have the latest information for autocompletion and correctness checks.

#### `auth` - Authentication

- The agent's environment should be pre-configured with an active authorization profile. The primary commands for this are `repo-manager auth add` and `repo-manager auth activate`. You will likely not need to use these, but be aware that API communication depends on a valid profile.

## 7. Answering Data-Related Questions

As an AI agent, one of your key roles is to help users retrieve data from their Cloudaware CMDB. When a user asks a question about their cloud resources, you should generate and then execute a BigQuery query to get the answer.

You can execute BigQuery queries using the `bq` command-line tool, provided the user has it configured in the environment. It is critical that you construct the command carefully, explicitly providing the project ID.

### Scenario 1: General Data Queries

For ad-hoc questions not directly related to an existing compliance policy.

1. **Analyze the User's Question**: Determine the resources, properties, and conditions in the user's request.
2. **Find CMDB API Names**: Find the precise API names for the object and its fields by searching locally available type information in the `/types` directory.
    - **Hint**: Cloudaware CMDB names often mirror the original cloud provider's names. Use variations of the user's terms in your search.
    - **Search Strategy**: To find a candidate object API name, you must search the master list of types in `/types/types.json`. To find the API names for specific fields, you must search the object's definition file (e.g., `/types/CA10__CaAwsVpc__c/type.json`).
    - **IMPORTANT**: Both `types.json` and the individual `type.json` files can be very large. Do NOT read them into your context. You MUST use the `jq` command-line tool to query them directly.
        - *Example: To find an object's API name in `types.json` by its label:*

            ```bash
            jq '.[] | select(.label | ascii_downcase | contains("VPC" | ascii_downcase)) | .apiName' types/types.json
            ```

        - *Example: To find the API name of the "disappearance time" field in a `type.json` file:*

            ```bash
            jq '.fields[] | select(.label | ascii_downcase | contains("Deleted From" | ascii_downcase)) | .apiName' types/CA10__CaAwsVpc__c/type.json
            ```

    - If `types.json` or a specific `type.json` file is missing, run `repo-manager types import -p REFERENCED` to download them first.
3. **Construct and Save SOQL Query**: Using the correct API names, formulate a SOQL query. Save this query to a `.soql` file inside your current task directory.
    - **IMPORTANT (Excluding Deleted Objects)**: By default, you MUST exclude objects that have been deleted from the cloud unless the user explicitly asks for them. Use the `jq` command as shown above to find the correct API name for the "disappearance time" field, and then use that field name in your `WHERE` clause (e.g., `WHERE ... AND CA10__disappearanceTime__c = null`).
    - **IMPORTANT (Aggregations)**: Do not use aggregation functions (`COUNT`, `SUM`, etc.) or `GROUP BY` in the SOQL query. The converter does not support them. You will add aggregation in a later step.
    - **Example SOQL to get raw data for a later COUNT:**

        ```soql
        SELECT Name, CA10__isDefault__c
        FROM CA10__CaAwsVpc__c
        WHERE CA10__isDefault__c = true AND CA10__disappearanceTime__c = null
        ```

4. **Convert to BigQuery SQL**: Use `repo-manager` to convert your SOQL query. Name the output file to indicate it is the initial, unmodified BigQuery query (e.g., `my-query.initial.bqsql`).

    ```bash
    repo-manager soql convert -i export/task-name/my-query.soql -o export/task-name/my-query.initial.bqsql
    ```

5. **Modify BigQuery SQL for Aggregation**:
    1. Read the generated `my-query.initial.bqsql` file.
    2. Modify the SQL to add the necessary aggregation functions (`COUNT`, `GROUP BY`, etc.) to satisfy the user's request.
    3. Save the new, final query to a separate file (e.g., `my-query.final.bqsql`). This provides a clear audit trail for the user.
6. **Execute the Final BigQuery Query**:
    1. Read the `my-query.final.bqsql` file. Inspect the query to find the fully qualified table name (e.g., `gcp-project-123.cloudaware_dataset.ca_aws_instance`).
    2. Extract the project ID (e.g., `gcp-project-123`) from the table name.
    3. Ask the user for their preferred output format. Suggest "CSV" (for spreadsheets) or "JSON" (for programmatic use).
    4. Execute the final query using the `bq` tool, adding the appropriate format flag and redirecting the output to a file in the task directory.
        - For CSV: `bq query --project_id=gcp-project-123 --format=csv --use_legacy_sql=false < export/task-name/my-query.final.bqsql > export/task-name/results.csv`
        - For JSON: `bq query --project_id=gcp-project-123 --format=json --use_legacy_sql=false < export/task-name/my-query.final.bqsql > export/task-name/results.json`
    5. Inform the user that the results have been saved to the specified file (e.g., `export/task-name/results.csv`) in their chosen format.

### Scenario 2: Policy-Related Data Queries

For questions about which objects are compliant or non-compliant with a specific policy.

1. **Identify the Policy**: From the user's request, determine the relevant policy ID (e.g., `/ce/ca/aws/ec2/instance-detailed-monitoring`).
2. **Generate Debug Script**: Use the `repo-manager policies generate DEBUG` command with the policy's logic file path.

    ```bash
    repo-manager policies generate DEBUG /ce/ca/aws/ec2/instance-detailed-monitoring/prod.logic.yaml
    ```

3. **Execute the Debug Query**:
    1. The command creates a `debug.sql` file in a `.generated` directory. Read this file.
    2. Inspect the queries inside to find the fully qualified table names and extract the project ID (e.g., `gcp-project-123`).
    3. Ask the user for their preferred output format for the query results (e.g., CSV or JSON).
    4. Execute the main query from the `debug.sql` file using the `bq` tool, adding the format flag and redirecting the output to a file in your task directory.
        - For CSV: `bq query --project_id=gcp-project-123 --format=csv --use_legacy_sql=false < /ce/ca/aws/ec2/instance-detailed-monitoring/.generated/debug.sql > export/task-name/debug-results.csv`
        - For JSON: `bq query --project_id=gcp-project-123 --format=json --use_legacy_sql=false < /ce/ca/aws/ec2/instance-detailed-monitoring/.generated/debug.sql > export/task-name/debug-results.json`
    5. Inform the user that the results of the main debug query have been saved to the specified file.

## 8. Reference Documentation

For more detailed information about specific aspects of the Compliance Engine, refer to the documentation in the `guides` directory:

### Policy Development
- [Policy Development Guide](./guides/developer/index.md) - Comprehensive guide to developing policies
- [Repository Structure](./guides/developer/index.md#repository-structure) - Understanding the repository layout
- [Naming Conventions](./guides/developer/index.md#naming-conventions) - Required naming patterns for files and directories
- [Logic Files](./guides/developer/index.md#logic) - How to write policy logic implementations
- [Extracts](./guides/developer/index.md#extracts) - Reusable data extraction rules
- [Related Lists](./guides/developer/index.md#related-lists) - Working with related objects
- [Test Data](./guides/developer/index.md#test-data) - Creating and using test data for policies

### Operations
- [Operations Reference](./guides/developer/operations/index.md) - Complete list of available operations
- [Data Access Operations](./guides/developer/operations/index.md#data-access) - FIELD and EXTRACT operations
- [Comparison Operations](./guides/developer/operations/index.md#simple-comparison) - IS_EQUAL, IS_EMPTY, etc.
- [Logical Operations](./guides/developer/operations/index.md#logical-operators) - AND, OR, NOT operations
- [Collection Operations](./guides/developer/operations/index.md#collection-operations) - Working with lists and sets
- [JSON Operations](./guides/developer/operations/index.md#json-operations) - Parsing and querying JSON data
- [Related List Operations](./guides/developer/operations/index.md#related-list-aggregates) - RELATED_LIST_HAS, RELATED_LIST_COUNT, etc.

### Type System
- [Type System Guide](./guides/developer/type-system/index.md) - Understanding Compliance Engine data types
- [Text Type](./guides/developer/type-system/index.md#text-type) - Case-insensitive string handling
- [Bytes Type](./guides/developer/type-system/index.md#bytes-type) - Case-sensitive string handling
- [Collection Types](./guides/developer/type-system/index.md#collection-types) - Lists and Sets behavior

### Object Relationships
- [Object Relationships](./guides/developer/object-relationships/index.md) - Understanding how objects are connected
- [Lookup Validation](./guides/developer/operations/index.md#lookup-validation) - IS_EMPTY_LOOKUP and NOT_EMPTY_LOOKUP operations

### Repository Management
- [repo-manager CLI Reference](./guides/developer/repo-manager/cli.md) - Complete command reference
- [Documentation Generation](./guides/developer/index.md#documentation-generation) - How to generate and maintain documentation
