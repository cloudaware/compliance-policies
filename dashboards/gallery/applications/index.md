[Back](../index.md)

# Applications

## Resources By Application

Horizontal bar chart that shows number of resources each application has attached to it. 

Based on Cloudaware CI, grouped by Application Tier → Application → Name

### Issues

- ❌ Bug when aggregate table or chart uses __r field in "Group"

## Attached Resources By Type

Pie chars that shows how many resources of each type is attached to any application.

[📊 WIP Prototype](attached-resources-by-type.mdx)

## Attached / Unattached Resources By Type

Stacked bar chart, each bar represents a type of resource. Each bar is split into "Attached" and "Unattached"

### Issues

- ❌ Currently there is no field on `CaCi__c` object that represents the attachment status clearly for grouping. Only the presence of Application Tier field value.

## Attachment Coverage

Single number in % or a gauge, representing how many resources are attached to any application out of all attachable resources.

### Issues

- ❌ Currently there is neither support for a single number graph, nor gauge
- ❌ Currently there is no field on `CaCi__c` object that represents the attachment status clearly for grouping. Only the presence of Application Tier field value.
- ❌ Currently there in no ability how to convert 2 separate columns or 2 separate rows of aggregated values into a single % value

## Historical Trend

Time series showing 2 lines for number of attached objects and number of unattached objects over time for the last 30 days.

### Issues

- ❌ Historical data is not stored in CMDB. The easiest way go accumulate this data is to create CEv2 policy that marks objects as COMPLIANT if they are attached, INCOMPLIANT if not and INAPPLICABLE if object does not support application attachment
  - This policy will most likely check use `CaCi__c`
