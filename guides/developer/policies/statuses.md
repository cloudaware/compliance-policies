# `Status`

Enum with the statuses assignable to the input objects.

The list of values:

- `DISAPPEARED` - assigned to objects that are still available in CMDB, but were deleted from the cloud. These objects are usually characterized as `CA10__disappearanceTime__c != null`.

- `INAPPLICABLE` - assigned to objects that are inapplicable to the policy. For example if the policy makes sense only for EC2 Instance that are in VPC, but a specific instance does not belong to a VPC. It makes this instance `INAPPLICABLE` to the policy
  
- `UNDETERMINED` - assigned to the object where we can positively confirm that there is not enough data to make a conclusion whether the object is `COMPLIANT` or `INCOMPLIANT`. For example: We know that specific field is never null in the Cloud, but it's retrieved via separate API call from the object itself. In this case if the field is `null` in CMDB, we know that it's either was not collected yet or the API call failed due to permissions. In any case we have not enough information on the object to make a conclusion, therefore the object goes to `UNDETERMINED` state.
  
- `INCOMPLIANT` - assigned to objects where we positively concluded that it fails the criteria for compliance with this policy or satisfies the criteria for incompliance. Note: make sure that there are sufficient checks for `INAPPLICABLE` and `UNDETERMINED` preceding this condition.

- `COMPLIANT` - assigned to objects where we positively concluded that it satisfies the criteria for compliance with this policy or fails the criteria for incompliance. Note: make sure that there are sufficient checks for `INAPPLICABLE` and `UNDETERMINED` preceding this condition.
