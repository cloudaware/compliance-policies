# Remediation

## From Command Line

### Associate an AWS WAF Web ACL with an API Gateway API Stage

You can link an AWS WAF Web ACL to an API Gateway Stage by running the `associate-web-acl` command:

```sh
aws wafv2 associate-web-acl \
--web-acl-arn  {{web-acl-arn}} \
--resource-arn {{api-gateway-stage-arn}}
```

Replace `{{web-acl-arn}}` with the ARN of your Web ACL and `{{api-gateway-stage-arn}}` with the ARN of your API Gateway Stage.
