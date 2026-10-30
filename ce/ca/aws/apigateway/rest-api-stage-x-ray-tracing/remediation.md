# Remediation

## From Command Line

### Enable X-Ray tracing

Use the following command to update the stage settings and enable X-Ray tracing:

```sh
aws apigateway update-stage \
--rest-api-id {{rest-api-id}} \
--stage-name {{stage-name}} \
--patch-operations op=replace,path=/tracingEnabled,value=true
```

### Test API calls

Make a few API calls and verify that traces appear in AWS X-Ray. Ensure that the traces show accurate request flows and performance metrics.
