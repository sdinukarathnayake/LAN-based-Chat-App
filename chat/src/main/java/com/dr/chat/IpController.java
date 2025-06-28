package com.dr.chat;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Enumeration;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IpController {

    @GetMapping("/api/ip")
    public String getLocalIp() {
        try {
            // Gets all network interfaces on the machine
            Enumeration<NetworkInterface> n = NetworkInterface.getNetworkInterfaces();

            // Loops through each network interface and get its associated IP addresses
            while (n.hasMoreElements()) {
                NetworkInterface e = n.nextElement();
                Enumeration<java.net.InetAddress> a = e.getInetAddresses();

                // Loops through each address assigned to that interface
                while (a.hasMoreElements()) {
                    InetAddress addr = a.nextElement();

                    // Check for a Valid Local IPv4 Address.
                    // Not a loopback address and No colon
                    if (!addr.isLoopbackAddress() && addr.getHostAddress().indexOf(":") == -1) {
                        return addr.getHostAddress();
                    }
                }
            }
        } catch (Exception e) {
            return "Unable to obtain IP address";
        }

        return "Not Found";
    }
}