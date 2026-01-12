# Description

This policy identifies AWS Lambda Functions whose resource-based policies allow access to all principals (`*`).

## Rationale

AWS Lambda functions are frequently used to process sensitive data or perform administrative operations. If a function’s resource-based policy grants `lambda:InvokeFunction` permission to the public, anyone on the internet can trigger the function. This may result in unexpected compute costs or the execution of logic that was never intended to be publicly accessible.

Public access to actions such as `lambda:GetFunction` can expose function configuration details, including environment variables, which often contain sensitive information such as database connection strings or API keys.

In more severe misconfigurations, allowing public access to `lambda:UpdateFunctionCode` could enable an attacker to replace the function’s code with malicious logic, potentially compromising downstream systems and data.

## Audit

This policy flags an *AWS Lambda Function* as `INCOMPLIANT` if its resource-based `IAM Policy` allows any of the following **lambda:** actions:

- `lambda:InvokeFunction`
- `lambda:GetFunction`
- `lambda:UpdateFunctionCode`
- `lambda:DeleteFunction`
- `lambda:GetPolicy`

to all principals (that is, `*`) without appropriate access restrictions.
