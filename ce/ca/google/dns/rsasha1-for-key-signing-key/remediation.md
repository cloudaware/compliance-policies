# Remediation

## From Google Cloud CLI

1. If it is necessary to change the settings for a managed zone where it has been enabled, DNSSEC must be turned off and re-enabled with different settings. To turn off DNSSEC, run the following command:

            gcloud dns managed-zones update ZONE_NAME --dnssec-state off

2. To update key-signing for a reported managed DNS Zone, run the following command:

            gcloud dns managed-zones update ZONE_NAME --dnssec-state on --ksk-algorithm KSK_ALGORITHM --ksk-key-length KSK_KEY_LENGTH --zsk-algorithm ZSK_ALGORITHM --zsk-key-length ZSK_KEY_LENGTH --denial-of-existence DENIAL_OF_EXISTENCE

Supported algorithm options and key lengths are as follows.

            Algorithm           KSK Length          ZSK Length 
            ---------           ----------          ---------- 
            RSASHA1             1024,2048           1024,2048 
            RSASHA256           1024,2048           1024,2048 
            RSASHA512           1024,2048           1024,2048 
            ECDSAP256SHA256     256                 256 
            ECDSAP384SHA384     384                 384
