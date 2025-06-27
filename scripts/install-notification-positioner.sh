#!/bin/bash

# Default Installation Directory
installDir=~/.local/share/gnome-shell/extensions

# Extension Name and directory
extensionName=notification-positioner
extensionDir=$extensionName@leccho.com

if [ ! -z $1 ]
then
  installDir=$1
fi

if [ ! -d $installDir ]
then
  if [ -z $2 ]
  then
    echo $installDir" directory does not exist."
    echo "Would you like to create the directory  (y/n) ? "
    read response
  else
    response=$2
  fi
  
  if [ $response == "y" ]
  then
    mkdir -p $installDir
    if [ $? -eq 0 ]
    then
      echo " Directory Created "
    else
      echo " Error ! "
      exit
    fi
  else
    echo "Exiting ... ! "
    exit
  fi
fi

echo "Installing extension "$extensionDir
echo "Installation path "$installDir
echo ""
echo -ne "Removing previous version of"$extensionDir"..."
rm -rf $installDir"/"$extensionDir
echo "Previous version removed."

echo -ne "Copying new version of "$extensionDir"..."
cp -rf "extensions/"$extensionDir $installDir
echo "New version copied."

cd $installDir"/"$extensionDir
echo -ne "Compiling schemas of "$extensionDir"..."
glib-compile-schemas schemas
echo "Schemas compiled."
 
echo ""
echo "Installation complete."
echo "Restart GNOME Shell ( Alt + F2 , Press r , Press Enter )."
echo "If you are using GNOME with Wayland, you need to logout and login again."
echo "Enable this extension using Extensions by The GNOME Project."
echo ""