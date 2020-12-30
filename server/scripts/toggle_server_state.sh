#!/bin/bash
command=`cat ./command.txt` # get the full command to run
command_name=`echo "$command" | cut -d " " -f1` # get the name of the command (e.g. gets "java" from "java -jar ..."")

# check if the command is already running
# update status file so UI frontend displays the correct status message
#  --this is just in case the server is closed independently of the web frontend, such as killing it in the command line
./refresh_status.sh
is_up=`cat ./is_up.txt`
echo $is_up

if [ $is_up == "0" ]
    then # run the command if it isn't already running
        echo "Starting."
        cd "./script_dependencies"
        $command > "./logs/output.log"
    else # stop the command if it is already running
        pkill -2 "$command_name"
        echo "Stopped."                      
fi