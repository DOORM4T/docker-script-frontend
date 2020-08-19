#!/bin/bash

# check if server is running
# update status file so UI frontend displays the correct status message
#   - in case the server is closed independently of the web frontend, such as killing it in the command line
# CHANGE GREP TO PGREP IN VM
if [ `ps aux | grep -i java | wc | awk '{print $1}'` -eq "0" ] 
    then 
        server_is_up=0
    else 
        server_is_up=1
fi

if [ $server_is_up == "0" ]
    then
        echo "Server is now running."
        java -Xmx8G -Xms2G -jar forge-1.12.2-14.23.5.2847-universal.jar > stuff.log #sample_server.jar #nogui # Change 'sample_server.jar' to the correct jar file name in production
    else 
        echo "Turned off server."                      
        os=`uname`
        if [ "$os" == "MINGW64_NT-10.0" ]
            then 
                for pid in `ps aux | grep -i java | awk '{print $4}'`   # Get Windows process ID of Minecraft Server; on Windows with Git Bash
                do
                    TASKKILL //PID "$pid"                               # Kill in Windows
                done
            else 
                for pid in `ps aux | grep -i java | awk '{print $2}'`   # Get process ID of Minecraft Server; on a Linux system (tested on Ubuntu & CentOS)
                do
                    kill -2 "$pid"                                      # Kill the Minecraft Server (NOT FORCE KILL; -2 = SIGINT/interrupt)
                done
        fi

fi