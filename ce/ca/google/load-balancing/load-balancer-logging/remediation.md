# Remediation

## From Google Cloud Console

1. From Google Cloud home open the Navigation Menu in the top left.
2. Under the `Networking` heading select `Network services`.
3. Select the HTTPS load-balancer you wish to audit.
4. Select `Edit` then `Backend Configuration`.
5. Select `Edit` on the corresponding backend service.
6. Click `Enable Logging`.
7. Set `Sample Rate` to a desired value. This is a percentage as a decimal point. 1.0 is 100%.

## From Google Cloud CLI

1. Run the following command

            gcloud compute backend-services update <serviceName> --region=REGION --enable-logging --logging-sample-rate=<percentageAsADecimal>
