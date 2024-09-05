# Description

Microsoft Defender for IoT acts as a central security hub for IoT devices within your organization.

## Rationale

IoT devices are very rarely patched and can be potential attack vectors for enterprise networks. Updating their network configuration to use a central security hub allows for detection of these breaches.

## Impact

Enabling Microsoft Defender for IoT will incur additional charges dependent on the level of usage.

## Audit

### From Azure Portal

1. Go to `IoT Hub`.
2. Select an `IoT Hub` to validate.
3. Select `Overview` in `Defender for IoT`.
4. The Threat prevention and Threat detection screen will appear, if `Defender for IoT` is Enabled.

## Default Value

By default, Microsoft Defender for IoT is not enabled.

## References

1. <https://azure.microsoft.com/en-us/services/iot-defender/#overview>
2. <https://docs.microsoft.com/en-us/azure/defender-for-iot/>
3. <https://azure.microsoft.com/en-us/pricing/details/iot-defender/>
4. <https://docs.microsoft.com/en-us/security/benchmark/azure/baselines/defender-for-iot-security-baseline>
5. <https://docs.microsoft.com/en-us/cli/azure/iot?view=azure-cli-latest>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-1-enable-threat-detection-capabilities>
7. <https://learn.microsoft.com/en-us/azure/defender-for-iot/device-builders/quickstart-onboard-iot-hub>

## Additional Information

There are additional configurations for Microsoft Defender for IoT that allow for types of deployments called hybrid or local. Both run on your physical infrastructure. These are complicated setups and are primarily outside of the scope of a purely Azure benchmark. Please see the references to consider these options for your organization.
