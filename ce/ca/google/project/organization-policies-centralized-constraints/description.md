# Description

Configure baseline Google Cloud Organization Policies at the organization or folder level to enforce centralized constraints across projects. Examples include requiring OS Login, restricting public IP addresses on VMs, limiting resource locations, enforcing uniform bucket-level access, and restricting IAM member domains.

## Rationale

Organization Policies provide preventive guardrails that apply across the resource hierarchy. Without baseline constraints, projects can configure resources inconsistently, use unapproved regions, allow external sharing, or bypass security expectations even when IAM permissions are otherwise limited.

## Impact

Organization Policies can block existing or planned resource configurations. Test policies in dry-run mode or in non-production folders before broad enforcement, and define an exception process for approved use cases.

## Audit

### From Google Cloud Console

1. Open the Google Cloud Console at <https://console.cloud.google.com>.
2. Select the organization.
3. Go to `IAM & Admin` > `Organization Policies`.
4. Review policies configured at the organization level.
5. Compare configured policies against the documented baseline security requirements.
6. Review folders and critical projects to confirm that baseline policies are not overridden or disabled.
