Below is the relationship between ASG and other types of ELB (except Classic LB).

Currently we cannot compare AGS AZ and ELB AZ in case it's not Classic LB because then it's a related list inside of a related list.

ASG -> Target Group Link.Target Group -> Load Balancer Link.(Application)Load Balancer

```yaml
  - relationshipName: "CA10__AWS_EC2_Auto_Scaling_Group_ELB_TG_Links__r"
    conditions:
      - status: "INCOMPLIANT"
        currentStateMessage: "LB TG is incompliant." 
        check:
          RELATED_LIST_HAS:
            status: "INCOMPLIANT"
            relationshipName: "CA10__targetGroup__r.CA10__AWS_EC2_Load_Balancer_Target_Group_Links__r"
    otherwise:
      status: "COMPLIANT"
      currentStateMessage: "TG LB is compliant."
    relatedLists:
      - relationshipName: "CA10__targetGroup__r.CA10__AWS_EC2_Load_Balancer_Target_Group_Links__r"
        importExtracts:
        - file: /types/CA10__CaAwsLoadBalancer__c/object.extracts.yaml
        conditions:
          - status: "INCOMPLIANT"
            currentStateMessage: "LB AZ is incompliant."
            check:
              NOT_EQUAL:
                left:
                #   EXTRACT: "CA10__autoScalingGroup__r.caExtract_availabilityZones_asCollection__c"
                right:
                  EXTRACT: "CA10__loadBalancer__r.caExtract_availabilityZones_asCollection__c"
        otherwise:
          status: "COMPLIANT"
          currentStateMessage: "LB is compliant."
```
