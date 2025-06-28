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
            Enumeration<NetworkInterface> n = NetworkInterface.getNetworkInterfaces();

            while (n.hasMoreElements()) {
                NetworkInterface e = n.nextElement();
                Enumeration<java.net.InetAddress> a = e.getInetAddresses();

                while (a.hasMoreElements()) {
                    InetAddress addr = a.nextElement();

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