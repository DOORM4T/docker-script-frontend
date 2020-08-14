#!/bin/bash
if cat "server_is_up.txt" | grep -q "0"
    then
        echo "1" > "server_is_up.txt";
        echo "Server is now running."
        java -Xmx8G -Xms2G -jar sample_server.jar #nogui # Change 'sample_server.jar' to the correct jar file name in production
    else 
        os=`uname`
        if [ "$os" == "MINGW64_NT-10.0" ]
            then 
                pid=`ps aux | grep -i java | awk '{print $4}' | head -n 1`   # Get Windows process ID of Minecraft Server; on Windows with Git Bash
                TASKKILL //PID "$pid"
            else 
                pid=`ps aux | grep -i java | awk '{print $2}'  | head -n 1`  # Get process ID of Minecraft Server; on a Linux system (tested on Ubuntu & CentOS)
                kill -2 "$pid"                                                 # Kill the Minecraft Server (NOT FORCE KILL; -2 = SIGINT/interrupt)
        fi
        echo "Turned off server."                      
        echo "0" > "server_is_up.txt";
fi