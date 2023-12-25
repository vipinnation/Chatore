#!/bin/bash

# Set the source and destination paths
# src_path="./api-doc"
# dest_path="./dist/api-doc/"

# # # Set the filename of the file to be copied
# filename="api.yaml"

# # # Copy the file from the source folder to the destination folder
# cp "$src_path/$filename" "$dest_path/"
 


# src_dir="./app/emails/templates"
# dest_dir="./dist/app/emails/templates"
# Set the list of files and directories to exclude
# exclude_list=( "file1.txt" "dir1" "dir2" )
# Copy the directory, excluding the specified files and directories
# rsync -av --exclude "${exclude_list[@]}" "$src_dir/" "$dest_dir/"
# rsync -av  "$src_dir/" "$dest_dir/"


views_dir="./views"
views_dest_dir="./dist/views"

cp -r  "$views_dir/" "$views_dest_dir/"
