# Object Relationships

Compliance Engine represents your cloud resources as interconnected objects, mirroring how resources are linked in your cloud environment. Understanding these relationships is key to writing effective compliance policies.

Compliance Engine uses "lookup fields" to represent connections between resources, similar to relationships in databases. These lookups primarily define **one-to-many relationships**, meaning one resource (the 'parent') can be related to multiple other resources (the 'children'). For example:

- One **AWS VPC** (Virtual Private Cloud) can contain many **AWS EC2 Instances**.
- One **Azure Key Vault** can store multiple **Azure Key Vault Secrets**.

In these relationships, one object acts as the "parent" and the others as "children". Let's examine the fields involved in the relationship between an AWS EC2 Instance and an AWS VPC. The `CA10__CaAwsInstance__c` object (representing an EC2 Instance) contains the following fields related to its VPC:

| Field API Name in `CA10__CaAwsInstance__c` | Example Value                        | Description                                                                                                                                                      |
|--------------------------------------------|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CA10__vpcId__c`                           | `vpc-01234567`                       | **Cloud-native ID** of the related VPC. This is the identifier as known in AWS.                                                                                  |
| `CA10__vpc__c`                             | `00190000000vpc1AAR`                 | **Salesforce ID** of the related VPC object within Cloudaware CMDB. This is the unique identifier used internally by Compliance Engine.                          |
| `CA10__vpc__r`                             | `{"Id":"...", "Name":"..."}`         | **Related VPC object**. This field provides access to the entire VPC object and its fields, such as `Id` and `Name`.                                             |
| `CA10__vpc__r.CA10__disappearanceTime__c`  | `null` or `2025-01-01T00:00:00.000Z` | **Deletion timestamp** of the related VPC. If not null, it indicates the VPC has been deleted in AWS, even though the Instance object might still exist in CMDB. |

Conversely, the `CA10__CaAwsVpc__c` object (representing an AWS VPC) provides access to a list of related EC2 Instances through a *related list* field:

| Related List API Name in `CA10__CaAwsVpc__c` | **Example Value**                   | **Description**                                                                                                                                                      |
|----------------------------------------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CA10__AWS_EC2_Instances__r`                 | `[{"Id":"...", "Name":"..."}, ...]` | **List of related EC2 Instances** contained within this VPC. This is accessed as a *related list* from the VPC object, not as a field on the Instance object itself. |

To illustrate how these fields work in practice, consider these example SOQL queries, used to retrieve data from Cloudaware CMDB. These queries are similar to how Compliance Engine accesses data internally.

**Query 1 - Retrieving VPC details from an EC2 Instance:**

```sql
SELECT Id, Name, CA10__vpcId__c, CA10__vpc__c, CA10__vpc__r.Id, CA10__vpc__r.Name
FROM CA10__CaAwsInstance__c
```

This query retrieves information about an EC2 Instance and its related VPC.  The results demonstrate how the different fields are populated:

| `Id`                 | `Name`         | `CA10__vpcId__c` | `CA10__vpc__c`       | `CA10__vpc__r`                                       |
|:---------------------|:---------------|:-----------------|:---------------------|:-----------------------------------------------------|
| `0029000000inst1AAD` | `i-0011223344` | `vpc-01234567`   | `00190000000vpc1AAR` | `{"Id":"00190000000vpc1AAR", "Name":"vpc-01234567"}` |
| `0029000000inst2AAB` | `i-4433221100` | `vpc-01234567`   | `00190000000vpc1AAR` | `{"Id":"00190000000vpc1AAR", "Name":"vpc-01234567"}` |

As you can see, `CA10__vpc__r` field returns an object containing fields of the related VPC object.

**Query 2 - Retrieving EC2 Instances within a VPC:**

```sql
SELECT Id, Name, (SELECT Id, Name FROM CA10__AWS_EC2_Instances__r)
FROM CA10__CaAwsVpc__c
```

| `Id`                 | `Name`         | `CA10__AWS_EC2_Instances__r`                                                                               |
|:---------------------|:---------------|:-----------------------------------------------------------------------------------------------------------|
| `00190000000vpc1AAR` | `vpc-01234567` | `[{"Id":"0029000000inst1AAD", "Name":"i-0011223344"}, {"Id":"0029000000inst2AAB", "Name":"i-4433221100"}]` |

**Important Considerations for Policy Logic:**

When writing policies, remember that these lookup fields can have different states, especially in a dynamic cloud environment:

| `CA10__vpcId__c` | `CA10__vpc__c`       | `CA10__vpc__r.CA10__disappearanceTime__c` | Scenario                                                                                                                                                                                     |
|:-----------------|:---------------------|:------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| *Empty*          | *Empty*              | *Empty*                                   | **No VPC Association**: The EC2 Instance is not currently associated with any VPC. This might be valid in some cases, but often indicates a misconfiguration.                                |
| `vpc-01234567`   | *Empty*              | *Empty*                                   | **VPC Data Missing**: The Instance is associated with VPC `vpc-01234567`, but Cloudaware has not yet collected data for this VPC, or there are permission issues preventing data collection. |
| `vpc-01234567`   | `00190000000vpc1AAR` | *Empty*                                   | **VPC Data Present**: The Instance is associated with VPC `vpc-01234567`, and Cloudaware has successfully collected and stored the VPC data.                                                 |
| `vpc-01234567`   | `00190000000vpc1AAR` | `2025-01-01T00:00:00.000Z`                | **Deleted VPC**: The Instance is associated with VPC `vpc-01234567`, but the VPC has been deleted from the cloud provider, although Cloudaware retains the historical data.                  |

## Naming Conventions and Pronunciation

In a context of a single relationship between two objects, these fields are usually referred to and pronounced as follows:

- `lookupId__c` (e.g., `CA10__vpcId__c`): "lookup ID C"
- `lookup__c` (e.g., `CA10__vpc__c`): "lookup C"
- `lookup__r` (e.g., `CA10__vpc__r`): "lookup R"
- `lookup__r.disappearanceTime__c` (e.g., `CA10__vpc__r.CA10__disappearanceTime__c`): "lookup R dot disappearance time"

## Impact on Policy Operations

Operations like [`FIELD`](../operations/field.md) and [`EXTRACT`](../operations/extract.md) rely on these relationships to navigate and retrieve data across interconnected objects.  However, it's crucial to understand that these operations will return a `null` value not only when the target field itself is `null`, but also in scenarios where the relationship path is incomplete or broken. This can happen if:

1. **Target Field is Null:** The final field in the specified path inherently contains a `null` value in the data.
2. **Missing Lookup ID:** Any `lookupId__c` field in the relationship path is empty, indicating the relationship is not established at the cloud provider level.
3. **Missing Lookup Object ID:** Any `lookup__c` field in the relationship path is empty, suggesting that Cloudaware data collection is incomplete or has encountered errors for the related object.
4. **Deleted Related Object:** Any `lookup__r.CA10__disappearanceTime__c` field in the path is *not* empty, indicating that a related object in the path has been deleted from the cloud provider. While Cloudaware retains historical data, accessing fields on deleted objects will return `null`.

## Handling Nulls and Undetermined Status

To distinguish between a legitimate `null` value from the field itself and a `null` resulting from incomplete lookups, Compliance Engine provides operations like [`IS_EMPTY_LOOKUP`](../operations/is-empty-lookup.md) and [`NOT_EMPTY_LOOKUP`](../operations/not-empty-lookup.md). These operations are designed to specifically check the health and completeness of object relationships.  Using these operations allows you to:

- Handle potential data inconsistencies gracefully and return an `UNDETERMINED` status in your policies when data is unreliable, minimizing false positives and negatives.
- Return `COMPLIANT` or `INCOMPLIANT` status, when the existence of the related object exists matters for the policy logic.
