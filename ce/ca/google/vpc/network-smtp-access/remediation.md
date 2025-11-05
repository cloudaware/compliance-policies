# Remediation

## From Google Cloud Console

1. Go to `VPC Network`.
2. Go to the `Firewall Rules`.
3. Click the `Firewall Rule` to be modified.
4. Click `Edit`.
5. Modify `Source IP ranges` to specific `IP`.
6. Click `Save`.

## From Google Cloud CLI

1. **Identify Firewall Rules Allowing Public Access**

    ```sh
    gcloud compute networks get-effective-firewalls default \
        --format="table(NAME, DIRECTION, IP_RANGES)" \
        --filter="IP_RANGES:0.0.0.0/0 AND DIRECTION:INGRESS"
    ```

2. **Restrict the Source Range**

    Once you have identified the firewall rules, update each one to restrict access to trusted CIDR ranges:

    ```sh
    gcloud compute firewall-rules update {{firewall-rule-name}} \
        --source-ranges={{cidr-range1}},{{cidr-range2}}
    ```
