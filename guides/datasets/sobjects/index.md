# `sobjects` Dataset

The `sobjects` dataset is the foundational dataset of the Cloudaware platform, representing a complete replica of your Configuration Management Database (CMDB) in a queryable BigQuery format. It contains the detailed configuration attributes and relationships of all discovered cloud resources, mirrored from their original structure as Salesforce SObjects.

This dataset serves as the "single source of truth" for resource configuration and is the primary data source that the Compliance Engine evaluates policies against.

## Structure of the Dataset

The `sobjects` dataset contains two main categories of tables designed to offer both specialized and generalized access to your CMDB data.

## Type Tables

For every resource type in your CMDB (e.g., AWS EC2 Instance, GCP Storage Bucket), there is a corresponding table in the `sobjects` dataset. These tables provide a direct, strongly-typed way to query all resources of a specific type.

The table names directly correspond to the [Type API Name](../data-types.md#type-api-name) of the SObject and follow a standard naming convention:

- `{namespace}__{name}__c`: For types managed by Cloudaware or other packages.
  - `CA10__CaAwsInstance__c`
  - `CA10__CaGoogleGceInstance__c`
  - `CA10__CaAzureVirtualMachine__c`
  - `CA10A1__CaAwsEksCluster__c`
  - `CA10V__CaVCenterVirtualMachine__c`
- `{name}__c`: For custom types created within your organization.
- `{name}`: For standard, built-in Salesforce objects.

## Special Tables

In addition to the individual type tables, the dataset includes special tables that provide a unified or metadata-driven view of the CMDB.

- `SObjectEntities`: A normalized table that contains objects of *all types* in a single, unified structure. This table is incredibly powerful for cross-type queries, such as "find all resources across AWS, Azure, and GCP that have a specific tag."
- `MasterEntities`: Stores all objects that function as "master" or parent records in the CMDB, such as AWS Accounts, GCP Projects, or Azure Subscriptions.
- `Metadata`: A schema definition table that describes the fields and structure of all other tables in the CMDB. This is useful for programmatic discovery and building dynamic integrations.

## How to Use This Dataset

The primary use of the `sobjects` dataset is to query the configuration details of your resources. Depending on the complexity of your needs, you can either leverage Salesforce Object Query Language (SOQL) for simpler queries or write native BigQuery SQL for more advanced analysis.

### Method 1: Using SOQL

For straightforward data retrieval, such as filtering resources based on field values, you can write a standard SOQL query and use the `repo-manager` to convert it into a BigQuery-compatible format. This approach simplifies querying by leveraging the familiar SOQL syntax.

**Process:**

1. Compose your query in SOQL.
2. Use the `repo-manager soql convert` command to translate it to BigQuery SQL.
3. Execute the generated SQL in your BigQuery environment.

**Example:** To find all running AWS EC2 instances:

```sql
-- 1. Write the SOQL query
SELECT Id, Name, CA10__stateName__c FROM CA10__CaAwsInstance__c WHERE CA10__stateName__c = 'running'
```

```bash
# 2. Convert the query using repo-manager
repo-manager soql convert "SELECT Id, Name, CA10__stateName__c FROM CA10__CaAwsInstance__c WHERE CA10__stateName__c = 'running'"
```

The command will output the equivalent BigQuery SQL, which you can then run.

## Method 2: Native BigQuery Queries

For more complex scenarios that require joins across datasets, aggregations, or parsing JSON data within fields, writing a native BigQuery query is the more powerful option. This gives you access to the full suite of BigQuery's capabilities.

This dataset is most powerful when joined with others, like the [`ce` dataset](../ce/index.md), to enrich compliance findings with deep configuration context.

**Example:** To get the names and instance IDs of all EC2 instances that are currently non-compliant with the "EC2 Instance Detailed Monitoring is not enabled" policy.

```sql
SELECT
    instance.Name,
    instance.CA10__instanceId__c,
    output.remediationMessage
FROM `YOU_EXPORT_PROJECT.sobjects.CA10__CaAwsInstance__c` AS instance
         JOIN (
    SELECT policyId, runTime, objectId, status, remediationMessage
    FROM `YOU_EXPORT_PROJECT.ce.PolicyOutput`
    WHERE runTime > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 3 DAY) -- partition elimination
) AS output ON instance.Id = output.objectId
WHERE
    output.policyId = '/ce/ca/aws/ec2/instance-detailed-monitoring'
  AND output.status = 'INCOMPLIANT'
  AND output.runTime = ( -- To get the latest results only
    SELECT MAX(runTime)
    FROM `YOU_EXPORT_PROJECT.ce.PolicyOutput`
    WHERE policyId = '/ce/ca/aws/ec2/instance-detailed-monitoring'
      AND runTime > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 3 DAY) -- partition elimination
)
```

**Note:** Replace `YOU_EXPORT_PROJECT` with your export project name.
