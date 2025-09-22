# Remediation

## From Command Line

To remediate a VPN connection with a down tunnel, you typically need to investigate and correct the configuration on your on-premises customer gateway device.

Enabling AWS Site-to-Site VPN tunnel logs can be very helpful for troubleshooting and resolving VPN connectivity issues. Logs are published to Amazon CloudWatch Logs, where you can analyze tunnel negotiations, dropped packets, and configuration mismatches.

1. Create a CloudWatch Log Group (if one does not already exist)

```sh
aws logs create-log-group \
  --log-group-name {{log-group-name}}
```

2. Enable VPN Tunnel Logging

```sh
aws ec2 modify-vpn-tunnel-options \
    --vpn-connection-id <vpn-connection-id> \
    --vpn-tunnel-outside-ip-address <tunnel-outside-ip> \
    --tunnel-options '{
      "LogOptions": {
        "CloudWatchLogOptions": {
          "LogEnabled": true,
          "LogGroupArn": "arn:aws:logs:{{region}}:{{account-id}}:log-group:{{log-group-name}}",
          "LogOutputFormat": "json"
        }
      }
    }'
```

## Best Practices for Tunnel Stability

### 1. Use IKEv2

Prefer **IKEv2** over IKEv1 whenever possible. IKEv2 is more robust, simpler, and more secure. Use IKEv1 only if your customer gateway device does not support IKEv2.

### 2. Reset the *Don't Fragment (DF)* Flag

Some packets carry the *DF (Don’t Fragment)* flag, which can prevent fragmentation and cause ICMP *Path MTU Exceeded* messages. Applications may fail to handle these messages properly, leading to connectivity issues.
If your customer gateway device supports overriding the DF flag, configure it to allow fragmentation when needed.

### 3. Fragment Packets Before Encryption

Packets exceeding the MTU must be fragmented before encryption to avoid performance degradation. Configure your customer gateway device to fragment packets prior to encryption. Site-to-Site VPN reassembles fragmented packets before forwarding them to their destination.

### 4. Consider MTU for Destination Networks

Although Site-to-Site VPN reassembles packets before forwarding, downstream networks (e.g., AWS Direct Connect or certain protocols like RADIUS) may have different MTU constraints. Adjust configurations accordingly to prevent packet loss or fragmentation issues.

### 5. Adjust MTU and MSS Sizes Based on Encryption Algorithms

The maximum supported MTU for Site-to-Site VPN is **1446 bytes**, with a corresponding **MSS of 1406 bytes**. However, encryption algorithms and NAT-T (NAT Traversal) can introduce additional overhead, reducing achievable values.

Use the following table to configure MTU/MSS values to minimize fragmentation:

| Encryption Algorithm | Hashing Algorithm | NAT-T    | MTU  | MSS (IPv4) | MSS (IPv6-in-IPv4) |
| -------------------- | ----------------- | -------- | ---- | ---------- | ------------------ |
| AES-GCM-16           | N/A               | Disabled | 1446 | 1406       | 1386               |
| AES-GCM-16           | N/A               | Enabled  | 1438 | 1398       | 1378               |
| AES-CBC              | SHA1/SHA2-256     | Disabled | 1438 | 1398       | 1378               |
| AES-CBC              | SHA1/SHA2-256     | Enabled  | 1422 | 1382       | 1362               |
| AES-CBC              | SHA2-384          | Disabled | 1422 | 1382       | 1362               |
| AES-CBC              | SHA2-384          | Enabled  | 1422 | 1382       | 1362               |
| AES-CBC              | SHA2-512          | Disabled | 1422 | 1382       | 1362               |
| AES-CBC              | SHA2-512          | Enabled  | 1406 | 1366       | 1346               |

### 6. Disable IKE Unique IDs

Some devices enforce a setting that allows only one Phase 1 security association per tunnel configuration. This can lead to inconsistent Phase 2 states between VPN peers. If supported by your customer gateway device, disable this setting to improve stability.
