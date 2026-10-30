# Remediation

## Migrate the configured function runtime

1. Review the [AWS Lambda runtime schedule](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html) and choose a generally available, supported target with sufficient remaining support. Use the Lambda-specific date rather than the upstream language or Amazon Linux end-of-life date alone. For `provided` runtimes, upgrade the OS-only runtime and separately verify the support status of the custom language runtime, bootstrap, and libraries.

2. Confirm the configured runtime and package type:

   ```sh
   aws lambda get-function-configuration --function-name {{function-name}}
   ```

   Review the `Runtime` and `PackageType` values. This policy assesses the function configuration and does not require an inventory of retained published versions.

3. Update and test application code, dependencies, and layers for the selected runtime. Test representative events, permissions, native dependencies, architecture, networking, and error handling in a separate function or deployment environment before production changes.

4. Deploy the compatible code and update the existing function's runtime using the normal deployment process. For the runtime configuration change:

   ```sh
   aws lambda update-function-configuration \
       --function-name {{function-name}} \
       --runtime {{supported-runtime}}
   aws lambda wait function-updated --function-name {{function-name}}
   ```

   At deprecation, the Lambda console blocks creation and updates using the deprecated runtime. The CLI and deployment tools can continue ordinary updates until the runtime's separate update-block date. AWS permits upgrading an existing function to a supported runtime even after that date; creating a replacement function is not generally required. **Rollback to the deprecated runtime can be blocked.** Test compatibility and prepare a supported rollback version before changing production.

5. If production callers use published versions, publish a tested replacement and migrate callers using the established release process:

   ```sh
   aws lambda publish-version --function-name {{function-name}}
   ```

   Updating the function configuration does not update an existing published version. Update alias targets, weighted routing, and direct version references as required by your deployment. For Lambda@Edge, update the CloudFront association to a supported numbered version in `us-east-1` and wait for deployment. These caller configurations are outside this policy's automated scope.

6. Monitor errors, latency, and representative invocations after deployment. Refresh the function inventory and reevaluate the policy. Retained older versions do not affect this result and do not need to be deleted to resolve the finding.

For an `UNDETERMINED` result, verify required native fields, `lambda:ListFunctions` access, and collection freshness. Keep the policy's tracked deprecations aligned with current AWS documentation; new or unlisted runtime identifiers pass until a matching effective deprecation is added. Preview runtimes require a separate production-readiness decision and are not a supported migration target for this guidance.

Container-image functions require rebuilding and redeploying the image with supported base-image and language dependencies; this policy excludes those deployments.
