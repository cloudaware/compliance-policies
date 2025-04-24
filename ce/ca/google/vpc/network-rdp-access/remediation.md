# Remediation

## From Google Cloud Console

1. Go to `VPC Network`.
2. Go to the `Firewall Rules`.
3. Click the `Firewall Rule` to be modified.
4. Click `Edit`.
5. Modify `Source IP ranges` to specific `IP`.
6. Click `Save`.

## From Google Cloud CLI

1.Update RDP Firewall rule with new `SOURCE_RANGE` from the below command:

            gcloud compute firewall-rules update FirewallName --allow=[PROTOCOL[:PORT[-PORT]],...] --source-ranges=[CIDR_RANGE,...]
