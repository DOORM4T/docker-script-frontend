#!/bin/bash
# Update server status
#   - used when frontend refreshes
if [ `ps aux | grep -i java | wc | awk '{print $1}'` -eq "0" ] 
    then echo "0" > server_is_up.txt
    else echo "1" > server_is_up.txt
fi