#!/bin/bash
cd "/app/server/scripts/"
command=`cat ./command.txt` # get the full command to run
command_name=`echo "$command" | cut -d " " -f1` # get the name of the command (e.g. gets "java" from "java -jar ..."")

echo "Grepping $command_name"

# For updating the server status in is_up text file 
# used when frontend refreshes
is_up_path="./is_up.txt" # status file path

if [ `pgrep "$command_name" | wc | xargs | cut -d " " -f1` -eq "0" ] 
    then echo "0" > $is_up_path
    else echo "1" > $is_up_path
fi