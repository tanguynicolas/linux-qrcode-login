#!/bin/bash

echo "Content-type: text/plain; charset=iso-8859-1"
echo

# Comment QRauthent in PAM config
sed -i '/^auth sufficient pam_oauth2_device/ s/^/# /' /etc/pam.d/lightdm-autologin

