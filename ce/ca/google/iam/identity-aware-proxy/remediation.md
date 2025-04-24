# Remediation

## From Google Cloud Console

1. Go to the Cloud Console VPC network > Firewall rules.
2. Select the checkbox next to the following rules:

    o default-allow-http

    o default-allow-https

    o default-allow-internal

3. Click `Delete`.
4. Click `Create firewall rule` and set the following values:

    o Name: allow-iap-traffic

    o Targets: All instances in the network

    o Source IP ranges (press Enter after you paste each value in the box, copy each full CIDR IP address):

        ▪ IAP Proxy Addresses 35.235.240.0/20
        ▪ Google Health Check 130.211.0.0/22
        ▪ Google Health Check 35.191.0.0/16

    o Protocols and ports:

        ▪ Specified protocols and ports required for access and management of your app. For example most health check connection protocols would be covered by;
        ▪ tcp:80 (Default HTTP Health Check port)
        ▪ tcp:443 (Default HTTPS Health Check port) 
        
        Note: if you have custom ports used by your load balancers, you will need to list them here
5. When you're finished updating values, click `Create`.
