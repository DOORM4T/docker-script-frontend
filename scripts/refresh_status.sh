#!/bin/bash
# For updating the server status in is_up.txt file 
# runs when frontend refreshes

# get the name of the command (e.g. gets "java" from "java -jar ..."")
command=`cat ./command.txt` 
command_name=`echo "$command" | cut -d " " -f1` 
is_up_path="./is_up.txt" # status file path

# get number of instances of the command running (Multiple instances aren't a problem since this software is containerized)
instances=`pgrep "$command_name" | wc | xargs | cut -d " " -f1` 

echo "Is [$command_name] running: $instances"

if [ "$instances" -eq "0" ] 
    then 
        echo Not running
        echo "0" > $is_up_path
    else 
        echo Running
        echo "1" > $is_up_path
fi