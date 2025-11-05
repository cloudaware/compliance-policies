# Remediation

## Enable GuardDuty in a Region

### **From Command Line**

1. To enable GuardDuty in a specific region, run the following command, replacing `{{region}}` with the target region:

    ```sh
    aws guardduty create-detector --enable --region {{region}}
    ```

2. To enable GuardDuty in all available AWS regions, you can use the following shell script:

    ```sh
    #!/bin/bash
    set -e

    REGIONS=$(aws ec2 describe-regions --query "Regions[].RegionName" --output text)

    if [ -z "$REGIONS" ]; then
        echo "Error: Unable to retrieve AWS regions"
        exit 1
    fi

    for region in $REGIONS; do
        echo "Checking GuardDuty in region: $region"
        
        # Get detector ID for the region
        DETECTOR_ID=$(aws guardduty list-detectors --region "$region" --query "DetectorIds[0]" --output text)
        
        if [ "$DETECTOR_ID" == "None" ] || [ -z "$DETECTOR_ID" ]; then
            echo "GuardDuty not found in $region. Enabling..."
            
            if aws guardduty create-detector --enable --region "$region"; then
                echo "Successfully enabled GuardDuty in $region."
            else
                echo "Failed to enable GuardDuty in $region."
            fi
        else
            echo "GuardDuty is already enabled in $region with Detector ID: $DETECTOR_ID"
        fi
        
        echo "----------------------------------------"
    done

    echo "GuardDuty enablement process completed across all regions."    
    ```
