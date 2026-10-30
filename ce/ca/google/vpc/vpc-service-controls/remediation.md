# Remediation

## From Google Cloud CLI

1. Create an Access Context Manager policy if one does not already exist:

    ```sh
    gcloud access-context-manager policies create \
        --organization={{organization-id}} \
        --title="VPC Service Controls Policy"
    ```

2. Create a service perimeter in dry-run mode for the sensitive projects and services:

    ```sh
    gcloud access-context-manager perimeters create {{perimeter-name}} \
        --title="{{perimeter-title}}" \
        --resources=projects/{{project-number}} \
        --restricted-services={{service-api}} \
        --policy={{policy-id}} \
        --perimeter-type=regular
    ```

3. Add required ingress rules, egress rules, access levels, and perimeter bridges.
4. Review dry-run violations and application behavior.
5. Enforce the perimeter only after expected access paths are validated.
