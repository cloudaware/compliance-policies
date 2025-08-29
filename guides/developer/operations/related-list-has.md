# `RELATED_LIST_HAS`

```yaml
RELATED_LIST_HAS:
  status: { status } # required, string (enum: "DISAPPEARED", "INAPPLICABLE", "COMPLIANT", "INCOMPLIANT", "UNDETERMINED")
  relationshipName: { relationshipName } # required, string
```

## Description

The `RELATED_LIST_HAS` operation checks if at least one related object in the specified `relationshipName` satisfies the conditions defined in the corresponding `relatedLists` section of the logic file, matching the given `status`. It returns a [`Boolean`](../type-system/index.md#boolean-type) value: `true` if at least one related object has the specified `status`, and `false` otherwise (including when no related objects exist).

This operation is useful for validating parent objects based on the presence of specific compliance states in related objects, such as security group rules or IAM policy attachments. See the [Object Relationships](../object-relationships/index.md) section for details on configuring related lists.

## Parameters

- **`status` (string, required):**
  - The compliance status to check for among related objects.
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

1. **Checking for Unrestricted Security Group Rules:**
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsSecurityGroup__c"
    conditions:
      - status: "INCOMPLIANT"
        currentStateMessage: "Security Group has unrestricted rules."
        remediationMessage: "Restrict rule sources."
        check:
          RELATED_LIST_HAS:
            status: "INCOMPLIANT"
            relationshipName: "CA10__AWS_EC2_Security_Group_Rules__r"
    otherwise:
      status: "COMPLIANT"
      currentStateMessage: "No unrestricted rules."
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

   - **Result:** `true` if any rule has `CA10__sourceIpRange__c` equal to `"0.0.0.0/0"`, `false` otherwise.
   - **Explanation:** `RELATED_LIST_HAS` detects `INCOMPLIANT` rules using a type-safe `IS_EQUAL` check on the text field `CA10__sourceIpRange__c`.

2. **Detecting Attached IAM Policies for a User:**
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsUser__c"
    conditions:
      - status: "INCOMPLIANT"
        currentStateMessage: "User has attached policies."
        remediationMessage: "Use IAM groups instead."
        check:
          RELATED_LIST_HAS:
            status: "COMPLIANT"
            relationshipName: "CA10__AWS_IAM_Policy_User_Links__r"
    otherwise:
      status: "COMPLIANT"
      currentStateMessage: "No attached policies."
    relatedLists:
      - relationshipName: "CA10__AWS_IAM_Policy_User_Links__r"
        conditions: []
        otherwise:
          status: "COMPLIANT"
          currentStateMessage: "This is an attached policy."
    ```

   - **Result:** `true` if the user has any policy links (counting `COMPLIANT` objects), `false` otherwise (including zero related objects).
   - **Explanation:** With no conditions, all related objects are `COMPLIANT` by default. `RELATED_LIST_HAS` returns `false` if no related objects exist, ensuring compliance when the count is zero.

3. **Verifying Policy Attachments to Roles:**
   - **Logic Snippet:**

    ```yaml
    inputType: "CA10__CaAwsIamPolicy__c"
    conditions:
      - status: "INCOMPLIANT"
        currentStateMessage: "Policy is attached to a role."
        remediationMessage: "Detach the policy."
        check:
          RELATED_LIST_HAS:
            status: "INCOMPLIANT"
            relationshipName: "CA10__AWS_IAM_Role_Policy_Attachments__r"
    otherwise:
      status: "COMPLIANT"
      currentStateMessage: "Policy is not attached."
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

   - **Result:** `true` if the policy is attached to any role, `false` otherwise.
   - **Explanation:** `RELATED_LIST_HAS` identifies `INCOMPLIANT` attachments based on a non-empty role lookup.
