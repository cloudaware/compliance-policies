# Developer guide (outdated)

## How-to

### Run policy

1. In the file navigation choose a policy in `ce/ca/...`
2. Ctrl+Shift+P -> `CloudAware: Generate BigQuery`
3. _optional_ In the pop-up window choose "Open"
4. _optional_ Choose your work account in the Google Authentication window in the browser
5. _optional_ Choose "Continue"
6. _optional_ Close the tab if successful
7. New SQL window is opened in the VS Code
8. Ctrl+Shift+P -> `BigQuery Runner: Run`
9. Observe results

### Debug policy

1. In the file navigation choose a policy in `ca/ce/...`
2. Ctrl+Shift+P -> `CloudAware: Generate BigQuery with FULL and DEBUG scripts`
3. Choose the window with debug script\
   **It's normal that the whole query is highlighted in red**
4. Scroll down to commented queries
5. Uncomment the query under `### Condition hits for main objects`
6. Save file
7. Ctrl+Shift+P -> `BigQuery Runner: Run`
8. Observe results & modify queries to further research the data
9. Re-comment the query in #5
10. Choose another query and repeat steps #5-#8

### Create new policy

1. In the file navigation choose/create folder `ce/ca/{cloud}/{service}/{policyName}`
2. Create new file in this folder `policy.yaml` (refer to [Policy directory structure](#policy-directory-structure) for more information)
3. Paste following in the file: (make sure there are correct number of `../` in the path)
4. 
```yaml
---
```
5. Add required properties like `inputObject`, `name`, `description`, etc. and follow up with the "Problems" panel on the bottom.


# Developing policies
## Example of the Policy
Policy is a `yaml` document with the following structure:
```yaml
inputObject: "CA10__CaAwsSecurityGroup__c" # Use API Name with prefix
name: "AWS EC2 Security Group Rule Count" # Will be displayed to the user 
# Description of the policy. 
# Try to describe what the policy tries to achieve without getting to technical
# Make sure you describe all the important edge cases that the policy checks for
description: "Determine if there is a large number of inbound and outbound rules defined\
  \ within your AWS EC2 security groups and reduce their number by removing any unnecessary\
  \ or overlapping rules. To improve performance and efficiency CloudAware recommends\
  \ a default value of 50 for the maximum number of rules assigned to a security group,\
  \ however, this value is configurable so you can adjust it based on your requirements."

# Conditions contain the logic of the policy.
# Conditions are evaluated from first in the list to the last.
# If the condition is evaluated to "true" - the "status" is assigned to the object with the "currentStateMessage"
# If condition is set to "status": "Incompliant" additional "remediationMessage" has to be provided
conditions: 
  - status: "DISAPPEARED"
    currentStateMessage: "Object is deleted in the source"
    condition:
      IS_EMPTY:
        negate: true
        arg:
          FIELD: "CA10__disappearanceTime__c"
   # ... more conditions go here ...

# Otherwise represents the state assigned to the object if all conditions were evaluated to "false"
otherwise:
  status: COMPLIANT
  currentStateMessage: Instance is not idling  

# In case you want to evaluate related objects, you must specify the "relatedLists" property
# These are "Related Lists" that you can observe in "Related CIs" tab on the objects in CMDB
# It is that you can query with a subselect in SOQL like:
# SELECT Id, Name, (SELECT Id FROM CA10__AWS_EC2_Security_Group_Rules__r) FROM CA10__CaAwsSecurityGroup__c
# You can aggregate the results from relatedLists on the main object using operations like RELATED_LIST_AGGREGATE
relatedLists:
    # Use API name with prefix and __r suffix
  - relationshipName: "CA10__AWS_EC2_Security_Group_Rules__r"
    # Same concept as with the conditions on the main object
    conditions:
      - status: "DISAPPEARED"
        currentStateMessage: "Security group rule is deleted"
        condition:
          IS_EMPTY:
            negate: true
            arg:
              FIELD: "CA10__disappearanceTime__c"
    # Same concept as with the otherwise on the main object
    otherwise:
      status: "COMPLIANT"
      currentStateMessage: "Rule exists in the cloud"

```

# Reference

## Objects and Properties

### root object

Represents the policy

Contains:
- `inputObject` String. **Required**.
  
  The API name of the main object of the policy.

  Fully qualified name must be used with prefixes and suffixes, like `CA10__CaAwsInstance__c`

  This is the object that policy will assign the statuses to and will start processing from.
- `name` String. **Required**.
  
  The name of the policy.
  
  Should be short and descriptive. No line breaks.
- `description` String. **Required**.
  
  Description of the policy.

  Give a overall representation of what this policy is aiming to do.

  Do not get into too technical details, but cover all the important edge-cases.

  Additional information can be provided in the [`currentStateMessage`](#INSERT_LINK) and [`remediationMessage`](#INSERT_LINK) in the [`condition`](#condition-object) and [`otherwise`](#otherwise-object) objects
- `conditions` Array of [`condition`](#condition-object) objects. **Required**.
  
  Conditions are evaluated from top to bottom. When first condition is evaluated to `true`, platforms stops evaluating further and assigns all the properties of this condition to the object.
- `otherwise` Object of [`otherwise`](#otherwise-object). **Required**.
  
  If none of the `conditions` is evaluated to `true`, platform assigns all the properties of `otherwise` to the object
- `relatedLists` _optional_. Array of [`relatedList`](#relatedlist-object) objects.
  
  This section is required when you want to include results of evaluation of related objects into the main object.
  
  Typical examples would be:
  
  - Main object is `CA10__CaAwsSecurityGroup__c` but you need to evaluate its related `CA10__CaAwsSecurityGroupRule2__c`, therefore you would need to use `CA10__AWS_EC2_Security_Group_Rules__r` related list.
  - Main object is `CA10__CaAwsAccount__c` but you need to evaluate its related `CA10__CaAwsCloudTrailTrail__c`, therefor you would need to use `CA10__AWS_CloudTrail_Trails__c` related list.
  On the main object you can used [`RELATED_LIST_AGGREGATE`](#related_list_aggregate-operation) operation to aggregate the results for all the related objects in one value.

### `condition` object

Unit of logic of a policy. It assigns a status and supporting messages to an input object if the objects satisfies the condition.

Please also consult with [best practices](#best-practices) when developing conditions.

Contains:
- `status` Enum of [`Status`](#status). **Required**.
  
  The status that is assigned to the input object if `condition` evaluates to `true`
- `currentStateMessage` String. **Required**.

  Given that the `condition` is `true` for this input object, `currentStateMessage` should give brief description of the state of the object.

  Preferably short and precise text with no line breaks. 
- `remediationMessage` String. Required if `status: INCOMPLIANT`, otherwise **prohibited**.
  
  Given that the `condition` is `true` and this concision is `status: INCOMPLIANT`, `remediationMessage` should provide a brief description how to "fix the issue" or "remediate the problem" of otherwise make the input object not `INCOMPLIANT`
- `condition` Object of any of the [Operations](#operations) that return [`BooleanType`](#booleantype). Required.
  
  The logic of the condition.

  Might be as simple as one [`IS_EMPTY`](#is_empty-operation) condition or a tree of [`LOGICAL`](#logical-operation) conditions.

  See list of [operations](#operations) and [best practices](#best-practices) to avoid common mistakes.
### `otherwise` object

The catch-all or "else" condition of the policy. It assigns the status to an object if all `conditions` were evaluated to `false`.

Contains exactly the same properties as [`condition`](#condition-object), except property `condition` is not available.

### `relatedList` object

This object represents a sup-policy for related objects.

When you need to evaluate list of related objects in a context of a parent object - you need to use `relatedList` and corresponding [`RELATED_LIST_AGGREGATE` operation](#related_list_aggregate-operation).

Typical example is a policy for `AWS EC2 Security Group` that has to validate `AWS EC2 Security Group Rule` for each group.

`relatedList` as a policy itself also contains `conditions` and `otherwise` properties that work exactly the same way, but additionally has a `relationshipName` property, that should point to a API name of the related list on the `inputObject`, use full API name with prefix (`CA10__`, ...) and suffix (`__r`). The same `relationshipName` should be used to aggregate the results in the [`RELATED_LIST_AGGREGATE`](#related_list_aggregate-operation).

## Operations

### `IS_EMPTY` Operation

Constructs an operation that checks whether an argument is empty or null or undefined.

**Inputs**:
- `negate` - _optional_. Negates the operation. If not defined (preferred) or `negate: false` operation will work as `IS_EMPTY`. If `negate: true` will work as `IS_NOT_EMPTY`
- `arg` - operation of any [type](#types)

**Output**: [`BooleanType`](#booleantype)

Syntax:
```yaml
IS_EMPTY:
  negate: true
  arg:
    <op>
```

Depending on the [type](#types) of the `arg`:
- [`BooleanType`](#booleantype), [`NumberType`](#numbertype), [`DateType`](#datetype), [`DateTimeType`](#datetimetype) - checks whether the `arg` is `null` (or is not `null` for `negate: true`)
- [`TextType`](#texttype) - checks whether the `arg` is `null` or empty string or a string that contains only whitespace characters (opposite for `negate: true`)
  For example (`negate: false` or `negate` is not set) :
  ```
  null - return true
  '' - returns true
  '    ' - return true
  'a' - returns false
  ' a ' - returns false
  ```
- [`CollectionType`](#collectiontype) - checks whether the `arg` is `null` or a collection of 0 size (opposite for `negate: true`)
  
Example:
```yaml
- status: "INCOMPLIANT"
  currentStateMessage: "CloudWatch Logs are not enabled for this API Stage"
  remediationMessage: "Enable CloudWatch Logs for this API Stage"
  condition:
    IS_EMPTY:
      arg:
        FIELD: "CA10__cloudWatchLogLevel__c"
```

### `EQUAL` Operation

Constructs an operation that checks whether two arguments are equal to each other.

**Inputs**:
- `negate` - _optional_. Negates the operation. If not defined (preferred) or `negate: false` operation will work as `EQUAL`. If `negate: true` will work as `NOT_EQUAL`
- `left` - operation of any [type](#types), except [`CollectionType`](#collectiontype), must be the same type as `right`
- `right` - operation of any [type](#types), except [`CollectionType`](#collectiontype), must be the same type as `left`

**Output**: [`BooleanType`](#booleantype)

Syntax:
```yaml
EQUAL:
  negate: true
  left:
    <op>
  right:
    <op>
```

Depending on the [type](#types) of the `left` and `right` (which should match):
- [`BooleanType`](#booleantype), [`NumberType`](#numbertype), [`DateType`](#datetype), [`DateTimeType`](#datetimetype) - checks whether the `left` and `right` are:
  - equal to each other (or not equal for `negate: true`)
  - both are null (or one is null and the second one is not null for `negate: true`)
- [`TextType`](#texttype) - checks whether the `left` is equal to `right` (not equal for `negate: true`). 
  - This check is **case-insensitive**
  - `null` is equal to `''`
  - It trims both ends of a string. `'  abc  '` becomes `'abc'` before comparing
  - It does **not** normalize spaces inside the string `'a  b'` stays as `'a  b'`
  
  For example (`negate: false` or `negate` is not set) :
  ```
  null == null - returns true
  null == '' - return true
  null == ' ' - returns true
  '' == ' ' - returns true
  'a' == 'A' - returns true
  ' a ' == 'A' - returns true
  ' a  b ' == ' A  B ' - returns true
  ```
  For more granular control over case-sensitivity, handling of `null`s and trimming the string use [`TEXT_COMPARISON`](#text_comparison-operation) instead of `EQUAL`.
- [`CollectionType`](#collectiontype) - is not supported. Use [`COLLECTION_COMPARISON`](#collection_comparison-operation) instead.
  
Example:
```yaml
  - status: INAPPLICABLE
    currentStateMessage: "Instance is not running, therefore cannot be overutilized"
    condition:
      EQUAL:
        negate: true
        left:
          FIELD: CA10__stateName__c
        right:
          TEXT: running
```


### `TEXT_PATTERN` Operation

Constructs an operation that checks the input text against the specified pattern.

**Inputs**:
- `operation` - specifies the type of check to apply:
  - `REGEX` - checks whether `arg` matches the regex in `pattern`. TODO: WRITE ABOUT THE REGEX FORMAT
  - `STARTS_WITH` - checks whether `arg` starts with `pattern`
  - `STARTS_WITH_IGNORE_CASE` - checks whether `arg` starts with `pattern` and ignores case of both parameters
  - `ENDS_WITH` - checks whether `arg` ends with `pattern`
  - `ENDS_WITH_IGNORE_CASE` - checks whether `arg` ends with `pattern` and ignores case of both parameters
  - `CONTAINS` - checks whether there is a string of `pattern` in any location in `arg`
  - `CONTAINS_IGNORE_CASE` - checks whether there is a string of `pattern` in any location in `arg` and ignores case of both parameters
  - `LIKE` - analog of SQL `LIKE` statement, supports following placeholders:
    - The `%` wildcard matches zero or more characters.
    - The `_` wildcard matches exactly one character.
  - `LIKE_IGNORE_CASE` - the same as `LIKE` but ignores case of both parameters
- `arg` - operation of [TextType](#texttype). A string that the operation checks
- `pattern` - operation of [TextType](#texttype). A pattern that is being use to check against the string, different meaning for different `operation`s, for example for `STARTS_WITH` you want `arg` to start with `pattern` to evaluate the operation to `true`

**Output**: [`BooleanType`](#booleantype)

Syntax:
```yaml
TEXT_PATTERN:
  operation: "STARTS_WITH"
  arg:
    <op>
  pattern:
    <op>
```

In case you need to negate this operation (e.g. `DOES_NOT_CONTAIN`) wrap `TEXT_PATTERN` in [`NOT`](#not-operation) operation.

TODO: WRITE ABOUT `null` handling

TODO: WRITE ABOUT `.trim()` and does this operation does trim or not

Example:
```yaml
  - status: "INCOMPLIANT"
    currentStateMessage: "Certificate is issued for a wildcard (*) domain"
    remediationMessage: "Delete the wildcard certificate and add single domain certificates\
      \ for each domain you use"
    condition:
      TEXT_PATTERN:
        operation: "STARTS_WITH"
        arg:
          FIELD: "CA10__domainName__c"
        pattern:
          TEXT: "*"
```

### `TEXT_COMPARISON` Operation

TODO: WRITE WHEN IT GETS IMPLEMENTED

### `DATE_RELATIVE_RANGE` Operation

Constructs an operation that checks input [`DateType`](#datetype) or [`DateTimeType`](#datetimetype) against a sliding window relative to today.

These operations are inspired by SOQL Date Literals and should work similarly to them. Consult the documentation [here](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_dateformats.htm)

**Inputs**:
- `operation` - specifies the type of check to apply:
  - `BEFORE_TODAY` - analog to SOQL `arg < TODAY` 
  - `AFTER_TODAY` - analog to SOQL `arg > TODAY`
  - `BEYOND_NEXT_DAYS` - analog to SOQL `arg > NEXT_N_DAYS:{offsetDays}`
  - `BEYOND_LAST_DAYS` - analog to SOQL `arg < LAST_N_DAYS:{offsetDays}`
  - `WITHIN_NEXT_DAYS` - analog to SOQL `arg = NEXT_N_DAYS:{offsetDays}`
  - `WITHIN_LAST_DAYS` - analog to SOQL `arg = LAST_N_DAYS:{offsetDays}`
- `arg` - operation of [`DateType`](#datetype) or [`DateTimeType`](#datetimetype). A date for comparison with a sliding window.
- `offsetDays` - integer in YAML. A number of days to calculate the width of sliding window. Required for `BEYOND_NEXT_DAYS`, `BEYOND_LAST_DAYS`, `WITHIN_NEXT_DAYS`, `WITHIN_LAST_DAYS`. Should not be set for `BEFORE_TODAY` and `AFTER_TODAY`

**Output**: [`BooleanType`](#booleantype)

Syntax:
```yaml
DATE_RELATIVE_RANGE:
  operation: WITHIN_LAST_DAYS
  offsetDays: 30
  arg:
    <op>
```

Example:
```yaml
  - status: "INCOMPLIANT"
    currentStateMessage: "Certificate will expire in 7 days or less"
    remediationMessage: "Renew the certificate"
    condition:
      DATE_RELATIVE_RANGE:
        operation: "WITHIN_NEXT_DAYS"
        offsetDays: 7
        arg:
          FIELD: "CA10__notAfter__c"
```

### `COMPARISON` Operation

Constructs an operation that checks compares two [`NumberType`](#numbertype) arguments.

**Inputs**:
- `operation` - specifies the type of check to apply:
  - `LESS_THAN` - simple `left < right`
  - `LESS_THAN_EQUAL` - simple `left <= right`
  - `GREATER_THAN` - simple `left > right`
  - `GREATER_THAN_EQUAL` - simple `left >= right`
- `left` - operation of [`NumberType`](#numbertype)
- `right` - operation of [`NumberType`](#numbertype)

**Output**: [`BooleanType`](#booleantype)

TODO: WRITE ABOUT `null` handling

Syntax:
```yaml
COMPARISON:
  operation: GREATER_THAN
  left: 
    <op>
  right:
    <op>
```

Example:
```yaml
  - status: INCOMPLIANT
    currentStateMessage: CPU over 90%, instance is overutilized
    remediationMessage: Consider resizing the instance to adjust capacity
    condition:
      COMPARISON:
        operation: GREATER_THAN
        left: 
          FIELD: CA10__averageCpuOneWeek__c
        right:
          NUMBER: 90.0
```

### `BETWEEN` Operation

Constructs an operation that checks that a [`NumberType`](#numbertype) argument is within a specified range.\
The same can be accomplished with [`LOGICAL`](#logical-operation) and two [`COMPARISON`](#comparison-operation) operations, but the `BETWEEN` is a more easy to read way of achieving this.

**Inputs**:
- `arg` - operation of [`NumberType`](#numbertype) 
- `rangeFrom` - operation of [`NumberType`](#numbertype). Left/lower boundary of the range.
- `rangeTo` - operation of [`NumberType`](#numbertype). Right/higher boundary of the range.
- `exclusiveFrom` - _optional_ boolean in YAML. If set to `true` - lower boundary becomes exclusive (`>`). If not defined (preferred) or `false` - lower boundary is inclusive (`>=`).
- `exclusiveTo` - _optional_ boolean in YAML. If set to `true` - higher boundary becomes exclusive (`<`). If not defined (preferred) or `false` - higher boundary is inclusive (`<=`).

**Output**: [`BooleanType`](#booleantype)

Syntax:
```yaml
BETWEEN:
  arg: 
    <op>
  rangeFrom: 
    <op>
  rangeTo:
    <op>
  exclusiveFrom: true
  exclusiveTo: true
```

Example:
```yaml
TODO: FIND AND ACTUAL EXAMPLE THAT USES BETWEEN
```

### `LOGICAL` Operation

Constructs conjunction (`AND`/`&&`) or disjunction (`OR`/`||`) operation. Supports array of [`BooleanType`](#booleantype) operations, instead of just 2 operands.\
Effectively it will construct an expression that looks like `arg[0] AND arg[1] AND arg[2] AND ...` or `arg[0] OR arg[1] OR arg[2] OR ...`

**Inputs**:
- `operation` - specifies the type of check to apply:
  - `AND`
  - `OR`
- `args` - array of [`BooleanType`](#booleantype) operations

**Output**: [`BooleanType`](#booleantype)

Syntax:
```yaml
LOGICAL:
  operation: AND
  args: 
    - <op>
    - <op>
```

Example:
```yaml
  - status: UNDETERMINED
    currentStateMessage: There is not enough data in CMDB to identify if the instance is idling.
    condition:
      LOGICAL:
        operation: OR
        args:
          - IS_EMPTY:
              arg:
                FIELD: CA10__averageCpuOneWeek__c
          - IS_EMPTY:
              arg:
                FIELD: CA10__sumOneWeekNetworkInMb__c
          - IS_EMPTY:
              arg:
                FIELD: CA10__sumOneWeekNetworkOutMb__c
```

### `NOT` Operation

Constructs a negation (`NOT`/`!`) operation.

**Inputs**:
- `arg` - operation of [`BooleanType`](#booleantype)

**Output**: [`BooleanType`](#booleantype)

Syntax:
```yaml
NOT:
  arg: 
    <op>
```

Example:
```yaml
  - status: "INAPPLICABLE"
    currentStateMessage: "Requirements of this policy are applicable only to 'root' users"
    condition:
      NOT:
        arg:
          TEXT_PATTERN:
            operation: "CONTAINS_IGNORE_CASE"
            arg:
              FIELD: "CA10__credReportAttributes__c"
            pattern:
              TEXT: "<root_account>"
```

### `RELATED_LIST_AGGREGATE` Operation

Constructs the operation that aggregates the results of a specific [`relatedList`](#relatedlist-object) to be used in conditions on the main input object.

**Inputs**:
- `relationshipName` - string in YAML. The name of the relationship to aggregate. Should match one of `relationshipName` in `relatedLists` section in the policy.
- `operation` - specifies the type of aggregation to apply:
  - `HAS` - checks whether there is at least one object of `status` in `relationshipName`, returns [`BooleanType`](#booleantype)
  - `COUNT` - counts how many object in status `status` there are in `relationshipName`, return [`NumberType`](#numbertype)
- `status` - string in YAML. status of objects inside `relationshipName` to search for.

**Output**: [`BooleanType`](#booleantype) for `HAS`, [`NumberType`](#numbertype) for `COUNT`

Syntax:
```yaml
RELATED_LIST_AGGREGATE:
  relationshipName: CA10__AWS_EC2_Security_Group_Rules__r
  operation: HAS
  status: INCOMPLIANT
```

Example:
```yaml
conditions:
  ...
  - status: INCOMPLIANT
    currentStateMessage: There are rules that open common ports to the inbound connections
    remediationMessage: Remove the rules or adjust them to accept connections from narrower CIDRs
    condition:
      RELATED_LIST_AGGREGATE:
        relationshipName: CA10__AWS_EC2_Security_Group_Rules__r
        operation: HAS
        status: INCOMPLIANT
...
relatedLists:
  - relationshipName: CA10__AWS_EC2_Security_Group_Rules__r
    conditions:
      ...
```

### `COLLECTION_FROM` Operation

Constructs an operation that can generate a [`CollectionType`](#collectiontype) from [`TextType`](#texttype) and a separator.

**Inputs**:
- `arg` - operation of [`TextType`](#texttype)
- `separator` - string in YAML. The separator to split the `arg` with. For example: `, `, `|`, `\n`

**Output**: [`CollectionType`](#collectiontype)

Syntax:
```yaml
COLLECTION_FROM:
  separator: "\n"
  arg:
    <op>
```

Example:
```yaml
  - status: INCOMPLIANT
    currentStateMessage: The set of Availability Zones configured on the Auto Scaling Group does not match the set configured on Load Balancer
    remediationMessage: Adjust the set of Availability Zones either on the Auto Scaling Group or the Load Balancer to match
    condition:
      COLLECTION_COMPARISON:
        operation: NOT_EQUAL
        left:
          COLLECTION_FROM:
            separator: "\n"
            arg:
              FIELD: CA10__autoScalingGroup__r.CA10__availabilityZones__c
        right:
          COLLECTION_FROM:
            separator: \n
            arg:
              FIELD: "CA10__loadBalancer__r.CA10__availabilityZones__c"
```

### `COLLECTION_SIZE` Operation

Constructs an operation that can retrieve a size of a [`CollectionType`](#collectiontype).

**Inputs**:
- `arg` - operation of [`CollectionType`](#collectiontype)

**Output**: [`NumberType`](#numbertype)

Syntax:
```yaml
COLLECTION_SIZE:
  arg:
    <op>
```

Example:
```yaml
  - status: INCOMPLIANT
    currentStateMessage: Autoscaling group configured for a single AZ
    remediationMessage: Add more availability zones to increase reliability
    condition:
      COMPARISON:
        operation: LESS_THAN
        left:
          COLLECTION_SIZE:
            arg:
              COLLECTION_FROM:
                separator: "\n"
                arg:
                  FIELD: CA10__autoScalingGroup__r.CA10__availabilityZones__c
        right:
          NUMBER: 2.0
```

### `COLLECTION_CONTAINS` Operation

Constructs an operation that checks whether a [`CollectionType`](#collectiontype) contains and [`TextType`](#texttype) element.

**Inputs**:
- `arg` - operation of [`CollectionType`](#collectiontype)
- `search` - operation of [`TextType`](#texttype)

**Output**: [`BooleanType`](#booleantype)

Syntax:
```yaml
COLLECTION_CONTAINS:
  arg:
    <op>
  search:
    <op>
```

Example:
```yaml
TODO: FIND AN EXAMPLE FOR COLLECTION_CONTAINS
```

### `COLLECTION_COMPARISON` Operation

Constructs an operation that checks compares two [`CollectionType`](#collectiontype) arguments.

**Inputs**:
- `operation` - specifies the type of check to apply:
  - `EQUAL` - checks whether the arguments are equal. Sizes of the collections and elements in them are equal.
  - `NOT_EQUAL` - checks whether the arguments are not equal. Either sizes of the collections are different of their elements do not match.
- `left` - operation of [`CollectionType`](#collectiontype)
- `right` - operation of [`CollectionType`](#collectiontype)

**Output**: [`BooleanType`](#booleantype)

TODO: WRITE ABOUT `null` handling

TODO: WRITE ABOUT CASE SENSITIVITY

Syntax:
```yaml
COLLECTION_COMPARISON:
  operation: EQUAL
  left: 
    <op>
  right:
    <op>
```

Example:
```yaml
- status: INCOMPLIANT
  currentStateMessage: The set of Availability Zones configured on the Auto Scaling Group does not match the set configured on Load Balancer
  remediationMessage: Adjust the set of Availability Zones either on the Auto Scaling Group or the Load Balancer to match
  condition:
    COLLECTION_COMPARISON:
      operation: "NOT_EQUAL"
      left:
        COLLECTION_FROM:
          separator: "\n"
          arg:
            FIELD: "CA10__autoScalingGroup__r.CA10__availabilityZones__c"
      right:
        COLLECTION_FROM:
          separator: "\n"
          arg:
            FIELD: "CA10__loadBalancer__r.CA10__availabilityZones__c"
```

### `AWS_POLICY_ALLOWS` Operation

Constructs on operation that checks whether any of the `actions` have an [access level](#accesslevel) more permissive to outsiders than `widestAcceptableAccessLevel`.

**Inputs**:
- `policyExtField` - string in YAML with the fully qualified name of the field or chain of lookup fields to a field with extended AWS Policy Document. 
- `widestAcceptableAccessLevel` - value of [`AccessLevel`](#accesslevel) enum. Widest (most permissive) level of access, when the operation is still going to evaluate to `false`
- `actions` - array of string in YAML. The actions that the access must be evaluated. If at least 1 of actions has wider access than `widestAcceptableAccessLevel`, operation will return `true`

**Output**: [`BooleanType`](#booleantype)

Syntax:
```yaml
AWS_POLICY_ALLOWS:
  policyExtField: CA10__policyDocumentExt__c
  widestAcceptableAccessLevel: EXTERNAL_PRINCIPAL
  actions:
    - sts:AssumeRole
```

```yaml
- status: INCOMPLIANT
  currentStateMessage: Bucket allows reading object to external principals
  remediationMessage: Remove access to principals that are not visible in CMDB
  condition:
    AWS_POLICY_ALLOWS:
      policyExtField: CA10__policyDocumentExt__c
      widestAcceptableAccessLevel: EXTERNAL_PRINCIPAL
      actions:
        - s3:GetObject
        - s3:GetObjectTorrent
        - s3:GetObjectVersion
        - s3:GetObjectVersionTorrent
        - s3:GetDataAccess
```