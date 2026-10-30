# Remediation

## From the AWS Console

1. Record the existing environment settings and buildspec in version control. Open **AWS CodeBuild** in the project's Region, choose **Build projects**, select the affected project, and open **Build details**.
2. In **Environment**, choose **Edit**.
3. Choose **Override image**, then **Managed image**, and select a current operating system, runtime, and image version compatible with the project's architecture and compute type. AWS recommends **Always use the latest image for this runtime version** to receive image updates and benefit from caching. Confirm that the target image includes the runtimes your buildspec selects; runtime version numbers do not map directly to image tag numbers.
4. Review changes to bundled runtimes and tools. Update the buildspec, runtime selections, package dependencies, and tests as needed.
5. Preserve the remaining environment settings, choose **Update configuration**, and run a representative build without an image override. Verify its resolved image, tests, and artifacts before relying on the updated project for production delivery. Confirm that pipeline or runner overrides do not continue selecting a deprecated image.

If infrastructure as code manages the project, update its environment image there so that a later deployment does not restore the deprecated image.

If validation fails, pause production delivery and correct the buildspec or choose another maintained compatible image. Use the saved configuration for a controlled rollback only when necessary; restoring the deprecated image reintroduces the finding and its risks. After migration, verify the project image through `batch-get-projects`, allow Cloudaware inventory to refresh, and confirm that the finding clears.
