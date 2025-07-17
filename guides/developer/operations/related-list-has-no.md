# `RELATED_LIST_HAS_NO`

```yaml
RELATED_LIST_HAS_NO:
  status: { status } # required, string (enum: "DISAPPEARED", "INAPPLICABLE", "COMPLIANT", "INCOMPLIANT", "UNDETERMINED")
  relationshipName: { relationshipName } # required, string
```

## Description

The `RELATED_LIST_HAS_NO` operation checks if no related objects in the specified `relationshipName` satisfy the conditions defined in the corresponding `relatedLists` section of the logic file, matching the given `status`. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if no related objects have the specified `status` (including when no related objects exist), and `false` if at least one does.

This operation is ideal for ensuring the absence of specific compliance states in related objects, such as verifying no unrestricted security group rules or no attached policies. See the [Object Relationships](../object-ralationships/index.md) section for details on configuring related lists.

## Parameters

- **`status` (string, required):**
  - The compliance status to check for absence among related objects.
  - Valid values: `"DISAPPEARED"`, `"INAPPLICABLE"`, `"COMPLIANT"`, `"INCOMPLIANT"`, `"UNDETERMINED"`.
  - Matches the `status` assigned by the nested logic in the `relatedLists` section for the specified `relationshipName`.

- **`relationshipName` (string, required):**
  - The name of the relationship to the related objects, as defined in the Cloudaware CMDB schema for the parent `inputType`.
  - Examples: `CA10__AWS_EC2_Security_Group_Rules__r`, `CA10__AWS_IAM_Policy_User_Links__r`.
  - Must correspond to a `relationshipName` entry in the `relatedLists` section of the logic file.
  - Supports chained relationships (e.g., `CA10__parent__r.CA10__child__r`).

## Return Type

[`Boolean`](../type-system/index.md#boolean-type)

## Examples

1. **Ensuring No Unrestricted Security Group Rules:**
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsSecurityGroup__c"
    conditions:
      - status: "COMPLIANT"
        currentStateMessage: "No unrestricted rules in Security Group."
        check:
          RELATED_LIST_HAS_NO:
            status: "INCOMPLIANT"
            relationshipName: "CA10__AWS_EC2_Security_Group_Rules__r"
    otherwise:
      status: "INCOMPLIANT"
      currentStateMessage: "Security Group has unrestricted rules."
      remediationMessage: "Restrict rule sources."
    relatedLists:
      - relationshipName: "CA10__AWS_EC2_Security_Group_Rules__r"
        conditions:
          - status: "INCOMPLIANT"
            currentStateMessage: "Rule allows all IPs."
            check:
              IS_EQUAL:
                left:
                  EXTRACT: "CA10__sourceIpRange__c"
                right:
                  TEXT: "0.0.0.0/0"
        otherwise:
          status: "COMPLIANT"
          currentStateMessage: "Rule is restricted."
    ```

   - **Result:** `true` if no rules have `CA10__sourceIpRange__c` equal to `"0.0.0.0/0"`, `false` otherwise.
   - **Explanation:** `RELATED_LIST_HAS_NO` confirms the absence of `INCOMPLIANT` rules, ensuring compliance.

2. **Verifying No Attached IAM Policies for a User:**
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsUser__c"
    conditions:
      - status: "COMPLIANT"
        currentStateMessage: "No attached policies for user."
        check:
          RELATED_LIST_HAS_NO:
            status: "INCOMPLIANT"
            relationshipName: "CA10__AWS_IAM_Policy_User_Links__r"
    otherwise:
      status: "INCOMPLIANT"
      currentStateMessage: "User has attached policies."
      remediationMessage: "Use IAM groups instead."
    relatedLists:
      - relationshipName: "CA10__AWS_IAM_Policy_User_Links__r"
        conditions: []
        otherwise:
          status: "INCOMPLIANT"
          currentStateMessage: "This is an attached policy."
    ```

   - **Result:** `true` if no policy links are `INCOMPLIANT` (i.e., no links exist), `false` if any do.
   - **Explanation:** With no conditions, all related objects are `INCOMPLIANT`. `RELATED_LIST_HAS_NO` returns `true` when the list is empty (no `INCOMPLIANT` objects), ensuring compliance.

3. **Confirming No Role Attachments for a Policy:**
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsIamPolicy__c"
    conditions:
      - status: "COMPLIANT"
        currentStateMessage: "Policy is not attached to any role."
        check:
          RELATED_LIST_HAS_NO:
            status: "INCOMPLIANT"
            relationshipName: "CA10__AWS_IAM_Role_Policy_Attachments__r"
    otherwise:
      status: "INCOMPLIANT"
      currentStateMessage: "Policy is attached to a role."
      remediationMessage: "Detach the policy."
    relatedLists:
      - relationshipName: "CA10__AWS_IAM_Role_Policy_Attachments__r"
        conditions:
          - status: "INCOMPLIANT"
            currentStateMessage: "Attached to a role."
            check:
              NOT_EMPTY_LOOKUP: "CA10__role__r"
        otherwise:
          status: "COMPLIANT"
          currentStateMessage: "Not attached."
    ```

   - **Result:** `true` if no attachments are `INCOMPLIANT` (no roles linked), `false` otherwise.
   - **Explanation:** `RELATED_LIST_HAS_NO` verifies no `INCOMPLIANT` role attachments exist, indicating compliance.
