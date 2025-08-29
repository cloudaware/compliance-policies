# `RELATED_LIST_COUNT`

```yaml
RELATED_LIST_COUNT:
  status: { status } # required, string (enum: "DISAPPEARED", "INAPPLICABLE", "COMPLIANT", "INCOMPLIANT", "UNDETERMINED")
  relationshipName: { relationshipName } # required, string
```

## Description

The `RELATED_LIST_COUNT` operation returns the number of related objects in the specified `relationshipName` that satisfy the conditions defined in the corresponding `relatedLists` section of the logic file, matching the given `status`. It returns a [`Number`](../type-system/index.md#number-type) value representing this count, which can be compared to thresholds or other numeric values to enforce compliance with limits.

This operation excels at monitoring quotas, such as the maximum number of security group rules or RDS parameters, helping ensure resources stay within provider-defined or organizational limits. See the [Object Relationships](../object-relationships/index.md) section for details on configuring related lists.

## Parameters

- **`status` (string, required):**
  - The compliance status to count among related objects.
  - Valid values: `"DISAPPEARED"`, `"INAPPLICABLE"`, `"COMPLIANT"`, `"INCOMPLIANT"`, `"UNDETERMINED"`.
  - Matches the `status` assigned by the nested logic in the `relatedLists` section for the specified `relationshipName`.

- **`relationshipName` (string, required):**
  - The name of the relationship to the related objects, as defined in the Cloudaware CMDB schema for the parent `inputType`.
  - Examples: `CA10__AWS_EC2_Security_Group_Rules__r`, `CA10__AWS_IAM_Policy_User_Links__r`.
  - Must correspond to a `relationshipName` entry in the `relatedLists` section of the logic file.
  - Supports chained relationships (e.g., `CA10__parent__r.CA10__child__r`).

## Return Type

[`Number`](../type-system/index.md#number-type)

## Examples

1. **Monitoring Security Group Rule Limits:**
   - **Context:** AWS limits security groups to 60 inbound rules by default; this enforces a practical limit of 50.
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsSecurityGroup__c"
    conditions:
      - status: "INCOMPLIANT"
        currentStateMessage: "Security Group exceeds 50 inbound rules."
        remediationMessage: "Reduce inbound rules to 50 or fewer."
        check:
          GREATER_THAN:
            left:
              RELATED_LIST_COUNT:
                status: "COMPLIANT"
                relationshipName: "CA10__AWS_EC2_Security_Group_Rules__r"
            right:
              NUMBER: 50
    otherwise:
      status: "COMPLIANT"
      currentStateMessage: "Security Group within rule limit."
    relatedLists:
      - relationshipName: "CA10__AWS_EC2_Security_Group_Rules__r"
        importExtracts:
          - file: "/types/CA10__CaAwsSecurityGroupRule2__c/object.extracts.yaml"
        conditions:
          - status: "COMPLIANT"
            currentStateMessage: "Inbound rule exists."
            check:
              IS_EQUAL:
                left:
                  EXTRACT: "CA10__direction__c"
                right:
                  TEXT: "Inbound"
        otherwise:
          status: "INAPPLICABLE"
          currentStateMessage: "Not an inbound rule."
    ```

   - **Result:** Number of `COMPLIANT` inbound rules. Fails if > 50.
   - **Explanation:** `RELATED_LIST_COUNT` counts inbound rules, compared to a threshold of 50 to stay under AWS's 60-rule limit with a buffer.

2. **Enforcing IAM User Policy Attachment Limits:**
   - **Context:** AWS limits IAM users to 10 directly attached managed policies; this sets a cap at 8.
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsUser__c"
    conditions:
      - status: "INCOMPLIANT"
        currentStateMessage: "User exceeds 8 policy attachments."
        remediationMessage: "Limit attachments to 8 or use groups."
        check:
          GREATER_THAN:
            left:
              RELATED_LIST_COUNT:
                status: "COMPLIANT"
                relationshipName: "CA10__AWS_IAM_Policy_User_Links__r"
            right:
              NUMBER: 8
    otherwise:
      status: "COMPLIANT"
      currentStateMessage: "User within policy limit."
    relatedLists:
      - relationshipName: "CA10__AWS_IAM_Policy_User_Links__r"
        conditions: []
        otherwise:
          status: "COMPLIANT"
          currentStateMessage: "Policy is attached."
    ```

   - **Result:** Number of attached policies (all `COMPLIANT`). Fails if > 8.
   - **Explanation:** `RELATED_LIST_COUNT` counts policy links, enforcing a custom limit of 8 for safety below AWS's 10.
