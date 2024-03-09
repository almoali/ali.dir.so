#!/bin/bash

# Create files named 35.html to 114.html
for i in {35..114}; do
    echo "This is file number $i" > "$i.html"
done
