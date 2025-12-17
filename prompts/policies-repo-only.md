# Working With Policies

This guide provides instructions for interacting with and managing the Cloudaware Compliance Engine v2 policy repository. Adhere strictly to these guidelines to ensure consistency and proper functioning of the automation toolchain.

## 1. Task Execution Protocol

For every user request, you MUST follow this protocol to ensure transparency, reproducibility, and clear communication. This is your primary operational loop.

1. **Create a Task Directory**: Upon receiving a new task, immediately create a dedicated directory for it within the `tmp` directory. Name the directory descriptively (e.g., `tmp/task-add-s3-encryption-policy`).

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

- [ ] 0. Prepare repository (cleanup and import types)
- [ ] 1. Research similar existing policies
- [ ] 2. Read relevant guides documentation
- [ ] 3. Create the policy directory structure
- [ ] 4. Create the `policy.yaml` file
- [ ] 5. Create the `description.md` and `remediation.md` files
- [ ] 6. Implement the logic in `wip.logic.yaml` (WITHOUT testData section)
- [ ] 7. Run capture-test-data command to generate test-data.json
- [ ] 8. Add testData section to wip.logic.yaml
- [ ] 9. Modify captured test-data.json to cover all scenarios
- [ ] 10. Run tests and verify the logic
- [ ] 11. Rename `wip.logic.yaml` to `prod.logic.yaml`
- [ ] 12. Ask user if they want documentation generated (optional)

## Execution Log

### Step 1: Research Similar Policies

I am searching for existing S3 bucket policies to understand the structure...

**Command:**
`ls /ce/ca/aws/s3/`

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
- **Extract**: A reusable, validated piece of information extracted from an input object. Extracts are defined in `types/{type}/{name}.extracts.yaml` and are used in logic files to abstract away direct field access. **Always prefer `EXTRACT` over `FIELD` in production logic.**
- **Entity ID**: The unique identifier for any entity (Policy, Folder, Section, etc.) is its **absolute Linux-style path** from the repository root. For example, the ID for a policy in `/ce/ca/aws/ec2/my-policy/policy.yaml` is `/ce/ca/aws/ec2/my-policy`.

## 3. Repository Structure

- `ce`: Root directory for all policies.
  - `ce/ca`: Cloudaware's public policies.
  - `ce/unit-test`: **Unit tests for Compliance Engine operations. This is the most up-to-date reference for how operations work, including all edge cases. Consult this directory when implementing complex logic.**
- `frameworks`: Contains compliance framework definitions. Each subdirectory is a framework.
- `types`: Contains CMDB SObject type definitions and associated `extracts.yaml` files.
- `guides`: **IMPORTANT: Contains comprehensive documentation. Read relevant guides BEFORE implementing policies.**
- `schema`: Contains JSON schemas for IDE validation.
- `flags`: Contains auto-generated lists of policies for maintenance (e.g., policies without tests).

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

**IMPORTANT: Always start by preparing the repository, then research similar existing policies and read relevant guides.**

#### Step 0: Prepare Repository

Before starting work on a new policy, ensure the repository is in a clean, working state:

```bash
# Clean up any problematic files that might break parsing
repo-manager cleanup

# Restore type descriptors that were removed by cleanup
repo-manager types import -p REFERENCED
```

This removes any files that could cause parsing errors and restores all type definitions referenced in the repository, putting it in a clean working state.

#### Step 1: Research and Learn

1. **Find Similar Policies**: Search for existing policies similar to what you're creating.
   ```bash
   # Example: Find instance-related policies
   ls -la /ce/ca/aws/ec2/

   # Example: Find policies using specific operations
   grep -r "RELATED_LIST_COUNT" /ce/ca/ --include="*.logic.yaml"
   ```

2. **Examine a Similar Policy**: Read at least one similar policy completely:
   - The `policy.yaml` file for metadata structure
   - The `prod.logic.yaml` file for logic patterns
   - The `test-data.json` file for test data format
   - The `description.md` and `remediation.md` for documentation style

3. **Read Relevant Guides**: Based on your task, read the appropriate guides:
   - For logic operations: `guides/developer/operations/index.md`
   - For specific operations (e.g., RELATED_LIST_COUNT): `guides/developer/operations/related-list-count.md`
   - For type system: `guides/developer/type-system/index.md`
   - For object relationships: `guides/developer/object-relationships/index.md`

4. **Check Unit Tests for Edge Cases**: If implementing complex logic, check `ce/unit-test/` for unit tests of the operations you're using. These tests show all edge cases and are the most up-to-date reference.

5. **Find Available Extracts**: Check what extracts are already available for your input type:
   ```bash
   # Example: Check available extracts for EC2 instances
   cat /types/CA10__CaAwsInstance__c/object.extracts.yaml
   ```

#### Step 2: Understand Relationships (if needed)

If your policy needs to check related objects (e.g., volumes attached to instances):

1. **Find the Relationship Name**: Search the type definition:
   ```bash
   # Example: Find volume relationships in instance type
   grep -i "volume" /types/CA10__CaAwsInstance__c/type.json
   ```

2. **Understand the Foreign Key**: Related objects need a foreign key field. Check the child type:
   ```bash
   # Example: Find how volumes reference instances
   grep -i "attachmentInstance" /types/CA10__CaAwsVolume__c/type.json
   ```

3. **Read Related List Operations Guide**:
   ```bash
   cat /guides/developer/operations/related-list-count.md
   ```

#### Step 3: Determine Policy Categories

Valid categories are: `PERFORMANCE`, `RELIABILITY`, `COST`, `SECURITY`
**Do not use any other categories** (e.g., "BEST_PRACTICES" is invalid).

#### Step 4: Create Policy Structure

1. **Identify Path**: Determine the correct path for the new policy under `ce`. For example: `ce/ca/aws/ec2/new-instance-policy`.

2. **Create Folders**: Ensure all parent directories exist and each contains a `folder.yaml` file with `names.contextual` and `names.full` properties.

3. **Create Policy Directory**: Create the final directory for your policy.

4. **Create `policy.yaml`**: Create the main descriptor file. Populate `names`, `description`, `type`, and valid `categories`.

5. **Create Documentation**: Create `description.md` and `remediation.md` with detailed content based on similar policies.

#### Step 5: Implement Logic

1. **Create `wip.logic.yaml`** (WITHOUT testData section):
   - Define `inputType` (the CMDB object to check)
   - Use `importExtracts` to reference the object's extracts file
   - Define `conditions` sequentially. Each condition has:
     - `check`: The logical test
     - `status`: One of `DISAPPEARED`, `INAPPLICABLE`, `COMPLIANT`, `INCOMPLIANT`, `UNDETERMINED`
     - `currentStateMessage`: Description of the current state
     - `remediationMessage`: How to fix (for INCOMPLIANT status)
   - Define the `otherwise` block as a fallback
   - **IMPORTANT: Do NOT add a `testData` section yet** - add it only after you have captured actual test data

2. **For Related Lists**:
   - Add a `relatedLists` section after the main conditions
   - Specify the `relationshipName` (e.g., `CA10__AWS_EBS_Volumes__r`)
   - Import the related object's extracts
   - Define conditions for the related objects
   - Use `RELATED_LIST_COUNT`, `RELATED_LIST_HAS`, or `RELATED_LIST_HAS_NO` in your main conditions

#### Step 6: Create Test Data

**IMPORTANT: Always use the `capture-test-data` command to generate test data. Never write test-data.json manually.**

**Workflow:**

1. **Capture Test Data** (no testData section needed in logic.yaml yet):
   ```bash
   repo-manager policies capture-test-data /path/to/wip.logic.yaml
   ```
   This command does everything in one step:
   - Generates the SQL query and saves it to `.generated/capture_test_data.sql`
   - Executes the query against BigQuery
   - Saves the results directly to `test-data.json`

2. **Add testData section to wip.logic.yaml**:
   Now that you have actual test data, add the testData reference to your `wip.logic.yaml` file:
   ```yaml
   testData:
     - file: "test-data.json"
   ```
   Place this after `inputType` and before or after `importExtracts`.

3. **Examine the Test Data**:
   Open `test-data.json` to see what data was captured. The format will be obvious from the results.

4. **Modify Test Data** to cover all scenarios:
   - Edit the captured data to ensure coverage of all conditions (INAPPLICABLE, INCOMPLIANT, COMPLIANT)
   - Add or modify test cases to cover edge cases (0 items, exactly at limit, over limit)
   - Update `expectedResult` for each test case with the correct status and conditionIndex
   - You may need to capture more data or create additional test cases by duplicating and modifying existing entries
   - The captured data will have the correct structure for all fields automatically

#### Step 7: Test and Debug

1. **Run Tests**:
   ```bash
   repo-manager policies test /path/to/wip.logic.yaml
   ```

2. **Fix Common Issues**:
   - **Invalid category**: Check that categories are from the valid list (PERFORMANCE, RELIABILITY, COST, SECURITY)
   - **Wrong conditionIndex**: Update expectedResult to match actual
   - **Test data issues**: Check the captured data format matches what similar policies use

3. **Review Test Results**: The output shows which tests passed/failed. The `.test-results.yaml` file contains detailed results.

4. **Iterate**: Fix issues and re-run tests until all pass.

#### Step 8: Finalize

1. **Rename Logic File**: Once all tests pass:
   ```bash
   mv /path/to/policy/wip.logic.yaml /path/to/policy/prod.logic.yaml
   mv /path/to/policy/wip.test-results.yaml /path/to/policy/prod.test-results.yaml
   ```

2. **Verify Production Tests**:
   ```bash
   repo-manager policies test /path/to/policy/prod.logic.yaml
   ```

3. **Ask User About Documentation Generation**:
   Documentation generation is optional and can be time-consuming. Ask the user:
   "Would you like me to generate repository documentation? This updates cross-references but may take some time."

   If yes:
   ```bash
   repo-manager docs generate
   ```
   Note: This may fail if there are unrelated repository issues. Failure is not critical for the policy itself.

### Workflow: Testing a Policy

1. **Run Tests**:
    - Execute `repo-manager policies test /path/to/your/prod.logic.yaml` for a single policy or `repo-manager policies test all` for all policies.
    - This command validates the logic against `test-data.json` and creates a `.test-results.yaml` file.

2. **Review Results**: Check the output for failures. Look for:
    - Status mismatches (expected INCOMPLIANT but got COMPLIANT)
    - ConditionIndex mismatches (wrong condition was triggered)
    - ConditionText mismatches (actual logic differs from expected)

3. **Common Test Failures and Fixes**:
    - **"FAIL conditionIndex"**: Your test expected a different condition to match. Update the expectedResult or fix the logic order.
    - **"FAIL status"**: The logic returned a different status. Check your conditions and test data values.
    - **"Can't deserialize" errors**: Invalid category name or wrong data type in YAML.
    - **Other errors**: Check similar policies' test-data.json format and consult unit tests in `ce/unit-test/`.

### Workflow: Debugging a Policy

1. **Generate Debug Query**:
    - Run `repo-manager policies generate DEBUG path/to/your/logic.yaml`.
    - This creates a `debug.sql` file in a `.generated` directory.

2. **Execute Query**: Run the generated SQL queries against BigQuery to inspect how the logic evaluates against real data. This helps understand which objects match which conditions.

### Workflow: Managing Documentation

- **Before Committing**: Always run `repo-manager docs generate` to create/update the `*.gen.md` files which provide cross-references between entities.
- **Before Pulling Changes**: Run `repo-manager docs cleanup` to remove all generated files to avoid merge conflicts.
- **To Fix Parsing Errors or Repository Issues**: Prepare the repository:
    1. `repo-manager cleanup` (comprehensive cleanup)
    2. `repo-manager types import -p REFERENCED` (restore type definitions)
    3. `repo-manager policies test all` (verify everything works)
    4. `repo-manager docs generate` (regenerate documentation if needed)

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

- **`repo-manager policies capture-test-data <id>`**: Captures test data for a policy in one step.
  - **`<id>`**: The absolute path ID of the policy or logic file (e.g., `ce/ca/aws/ec2/instance-detailed-monitoring/wip.logic.yaml`).
  - This command automatically generates the SQL query, executes it against BigQuery, and saves results to test-data.json.
  - **`-o` or `--output-file`**: Optional path to the output file (default: `POLICY_DIR/test-data.json`).
- **`repo-manager policies generate <kind> <id>`**: Generates a BigQuery script for a policy.
  - **`<id>`**: The absolute path ID of the policy or logic file (e.g., `ce/ca/aws/ec2/instance-detailed-monitoring/prod.logic.yaml`).
  - **`<kind>`**: The type of script to generate. Valid values are:
    - `DEBUG`: For debugging the policy against live data.
    - `CAPTURE_TEST_DATA`: Generates a SQL query to capture real data from BigQuery for creating test-data.json. Note: prefer using `repo-manager policies capture-test-data` instead, which executes the query automatically.
    - `TESTS`: To generate a script for running tests from `test-data.json`.
- **`repo-manager policies test <id>`**: Runs tests for policies.
  - **`<id>`**: The ID of a specific policy/logic file, or `'all'` to test every policy in the repository, or `'unit-tests'` for all unit tests.

#### `types` - CMDB Type Management

- **`repo-manager types import`**: Imports or updates SObject definitions from Salesforce into the `types` directory. This also updates the master list in `types/types.json`. Use this if a policy requires a new object type or field that is not yet present.
  - `-t <api_name>` or `--type <api_name>`: Specify a single type to import. Can be used multiple times.
  - `-p <preset_name>` or `--preset <preset_name>`: Import a group of types. Can be used multiple times.
    - `REFERENCED`: All types referenced in the repository (recommended for preparing repository)
    - `CLOUDAWARE`: All Cloudaware types
- **`repo-manager types delete`**: Removes imported type data from the `types` directory.

#### `cleanup` - Repository Cleanup

- **`repo-manager cleanup`**: Performs a comprehensive cleanup of the repository, removing generated files and potentially problematic files. More extensive than `docs cleanup`. **Note**: This will delete type JSON descriptors, which must be restored with `repo-manager types import -p REFERENCED`.

#### `schema` - Schema Management

- **`repo-manager schema update`**: Updates the JSON schema files in the `schema` directory. This ensures IDEs and validation tools have the latest information for autocompletion and correctness checks.

#### `auth` - Authentication

- The agent's environment should be pre-configured with an active authorization profile. The primary commands for this are `repo-manager auth add` and `repo-manager auth activate`. You will likely not need to use these, but be aware that API communication depends on a valid profile.

## 7. Quick Reference: Common Tasks

### Finding Relationship Names

```bash
# Find relationships in a type (e.g., volumes on instances)
grep -i "relationshipName" types/CA10__CaAwsInstance__c/type.json | grep -i "volume"

# Or search for the child object name
grep "CA10__CaAwsVolume__c" types/CA10__CaAwsInstance__c/type.json
```

### Understanding Complex Operations

For complex operations or edge cases:

```bash
# Check unit tests for the operation you're using
ls ce/unit-test/
cat ce/unit-test/some-operation/prod.logic.yaml
cat ce/unit-test/some-operation/test-data.json
```

Unit tests are the most up-to-date reference for how operations behave.

### Valid Policy Categories

Only these values are allowed in `policy.yaml`:
- `PERFORMANCE`
- `RELIABILITY`
- `COST`
- `SECURITY`

### Capturing Test Data

Always use the `capture-test-data` command to capture test data in one step:

```bash
# Step 1: Capture test data (wip.logic.yaml should NOT have testData section yet)
repo-manager policies capture-test-data path/to/wip.logic.yaml

# This command automatically:
# - Generates the SQL query to .generated/capture_test_data.sql
# - Executes it against BigQuery
# - Saves results to test-data.json

# Step 2: Add testData section to wip.logic.yaml now that you have actual test data
# Add this to wip.logic.yaml:
#   testData:
#     - file: "test-data.json"

# Step 3: Edit test-data.json to add expectedResult for each test case
```

## 8. Answering Data-Related Questions

As an AI agent, one of your key roles is to help users retrieve data from their Cloudaware CMDB. When a user asks a question about their cloud resources, you should generate and then execute a BigQuery query to get the answer.

The environment has `bq` command properly configured. Use `bq query` for executing BigQuery SQL queries.

### Scenario 1: General Data Queries

For ad-hoc questions not directly related to an existing compliance policy.

1. **Analyze the User's Question**: Determine the resources, properties, and conditions in the user's request.
2. **Find CMDB API Names**: Find the precise API names for the object and its fields by searching locally available type information in the `types` directory.
    - **Hint**: Cloudaware CMDB names often mirror the original cloud provider's names. Use variations of the user's terms in your search.
    - **Search Strategy**: To find a candidate object API name, you must search the master list of types in `types/types.json`. To find the API names for specific fields, you must search the object's definition file (e.g., `types/CA10__CaAwsVpc__c/type.json`).
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
    repo-manager soql convert -i tmp/task-name/my-query.soql -o tmp/task-name/my-query.initial.bqsql
    ```

5. **Modify BigQuery SQL for Aggregation**:
    1. Read the generated `my-query.initial.bqsql` file.
    2. Modify the SQL to add the necessary aggregation functions (`COUNT`, `GROUP BY`, etc.) to satisfy the user's request.
    3. Save the new, final query to a separate file (e.g., `my-query.final.bqsql`). This provides a clear audit trail for the user.
6. **Execute the Final BigQuery Query**:
    1. Ask the user for their preferred output format. Suggest "CSV" (for spreadsheets) or "JSON" (for programmatic use).
    2. Execute the final query using `bq query`, adding the appropriate format flag and redirecting the output to a file in the task directory.
        - For CSV: `bq query --format=csv --use_legacy_sql=false < tmp/task-name/my-query.final.bqsql > tmp/task-name/results.csv`
        - For JSON: `bq query --format=json --use_legacy_sql=false < tmp/task-name/my-query.final.bqsql > tmp/task-name/results.json`
    3. Inform the user that the results have been saved to the specified file (e.g., `tmp/task-name/results.csv`) in their chosen format.

### Scenario 2: Policy-Related Data Queries

For questions about which objects are compliant or non-compliant with a specific policy.

1. **Identify the Policy**: From the user's request, determine the relevant policy ID (e.g., `/ce/ca/aws/ec2/instance-detailed-monitoring`).
2. **Generate Debug Script**: Use the `repo-manager policies generate DEBUG` command with the policy's logic file path.

    ```bash
    repo-manager policies generate DEBUG ce/ca/aws/ec2/instance-detailed-monitoring/prod.logic.yaml
    ```

3. **Execute the Debug Query**:
    1. The command creates a `debug.sql` file in a `.generated` directory.
    2. Ask the user for their preferred output format for the query results (e.g., CSV or JSON).
    3. Execute the debug query using `bq query`, adding the format flag and redirecting the output to a file in your task directory.
        - For CSV: `bq query --format=csv --use_legacy_sql=false < ce/ca/aws/ec2/instance-detailed-monitoring/.generated/debug.sql > tmp/task-name/debug-results.csv`
        - For JSON: `bq query --format=json --use_legacy_sql=false < ce/ca/aws/ec2/instance-detailed-monitoring/.generated/debug.sql > tmp/task-name/debug-results.json`
    4. Inform the user that the results of the debug query have been saved to the specified file.

## 9. Reference Documentation

**IMPORTANT: Always consult the guides directory BEFORE implementing policies.**

Depending on the task, you must read the relevant documentation in the `guides` directory:

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
- [Numerical Comparison](./guides/developer/operations/index.md#numerical-comparison) - GREATER_THAN, LESS_THAN, etc.
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

## 10. Learning Resources (in order of priority)

1. **Similar existing policies**: The repository contains hundreds of working policies - use them as your primary reference
2. **Unit tests** (`ce/unit-test/`): Most up-to-date examples of how operations work, including edge cases
3. **Guides** (`guides/developer/`): Comprehensive documentation for operations, type system, and concepts
4. **Captured test data**: Use CAPTURE_TEST_DATA to see actual data structure

When implementing a policy:
1. Find 2-3 similar policies and study them completely
2. Check unit tests for any complex operations you're using
3. Use CAPTURE_TEST_DATA to get real test data structure
4. Test iteratively and fix one issue at a time
5. Log everything in the task readme for future reference

## 11. Environment Assumptions

The agent environment is assumed to have:
- **bq CLI**: Properly configured for BigQuery access
- **repo-manager**: Installed and authenticated with Cloudaware API
- No need to manually specify project IDs or configure authentication
