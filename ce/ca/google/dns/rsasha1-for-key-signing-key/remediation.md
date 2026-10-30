# Remediation

## From Google Cloud CLI

1. If it is necessary to change the settings for a managed zone where it has been enabled, DNSSEC must be turned off and re-enabled with different settings. To turn off DNSSEC, run the following command:

    ```sh
    gcloud dns managed-zones update {{zone-name}} \
        --dnssec-state off
    ```

2. To update key-signing for a reported managed DNS Zone, run the following command:

    ```sh
    gcloud dns managed-zones update {{zone-name}} \
        --dnssec-state on \
        --ksk-algorithm {{ksk-algorithm}} \
        --ksk-key-length {{ksk-key-length}} \
        --zsk-algorithm {{zsk-algorithm}} \
        --zsk-key-length {{zsk-key-length}} \
        --denial-of-existence {{denial-of-existence}}
    ```

    Supported algorithm options and key lengths are as follows.

    Algorithm           KSK Length          ZSK Length
    ---------           ----------          ----------
    RSASHA1             1024,2048           1024,2048
    RSASHA256           1024,2048           1024,2048
    RSASHA512           1024,2048           1024,2048
    ECDSAP256SHA256     256                 256
    ECDSAP384SHA384     384                 384
