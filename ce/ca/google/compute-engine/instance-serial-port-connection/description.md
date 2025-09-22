# Description

Interacting with a serial port is often referred to as the serial console, which is similar to using a terminal window, in that input and output is entirely in text mode and there is no graphical interface or mouse support.

If you enable the interactive serial console on an instance, clients can attempt to connect to that instance from any IP address. Therefore interactive serial console support should be disabled.

## Rationale

A virtual machine instance has four virtual serial ports. Interacting with a serial port is similar to using a terminal window, in that input and output is entirely in text mode and there is no graphical interface or mouse support. The instance's operating system, BIOS, and other system-level entities often write output to the serial ports, and can accept input such as commands or answers to prompts. Typically, these system-level entities use the first serial port (port 1) and serial port 1 is often referred to as the serial console.

The interactive serial console does not support IP-based access restrictions such as IP whitelists. If you enable the interactive serial console on an instance, clients can attempt to connect to that instance from any IP address. This allows anybody to connect to that instance if they know the correct SSH key, username, project ID, zone, and instance name.

Therefore interactive serial console support should be disabled.

## Audit

### From Google Cloud CLI

1. Login to Google Cloud console
2. Go to Compute Engine
3. Go to VM instances
4. Click on the Specific VM
5. Ensure the statement `Connecting to serial serial ports is disabled` is displayed at the top of the details tab, just below the `Connect to serial console` drop-down.

### From Google Cloud Console

 Ensure the below command's output shows `null`:

            gcloud compute instances describe <vmName> --zone=<region> --format="json(metadata.items[].key,metadata.items[].value)"

or `key` and `value` properties from below command's json response are equal to `serial-port-enable` and `0` or `false` respectively.

```json
{ 
    "metadata": { 
        "items": [ 
            { 
                "key": "serial-port-enable", 
                "value": "0" 
            } 
        ] 
    } 
}
```

## Prevention

You can prevent VMs from having serial port access enable by `Disable VM serial port access` organization policy: <https://console.cloud.google.com/iam-admin/orgpolicies/compute-disableSerialPortAccess>.

## Default Value

By default, connecting to serial ports is not enabled.

## References

1. <https://cloud.google.com/compute/docs/instances/interacting-with-serial-console>
