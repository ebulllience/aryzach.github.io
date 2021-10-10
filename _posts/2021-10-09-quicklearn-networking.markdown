---
layout: post
title: Quicklearn Networking
date: 2021-10-09T12:31:26-07:00
categories: work networking
permalink: quicklearn-networking
---

## Background 
I just started a new job! We mostly work with [MANET networks](https://en.wikipedia.org/wiki/Wireless_ad_hoc_network). These are wireless networks with non-stationary and unreliable nodes. There are generally no dedicated routers, and all devices are both clients and participate in routing.

Anyway, because this is government contract work, we need to jump through lots of hoops to get certified with some security protocols including network security. The company is just three full-time people, one of those is me, and I probably have the most experience with networks and security, which isn't much! 

So short story, I need to get more familiar with networks. Both for app development and our internal IT. 

Side note: for our internal IT required security, there are a few resources we should tap into before trying to do this in-house:
1. People have had to set up and follow these specific security requirements before. There are probably people you could hire with very deep domain expertise on how to set this up. Likely experts who have worked with companies of similar size before, too
2. The owners are part of a government incubator group, and they talk to the other companies. We could consult with them how they set up their systems for compliance

I've set up what is essentially a home network on steroids, with mesh WiFi over 130 acres, VLANs, a VPN, multiple ISPs, wireless Ethernet connections, etc. I've also worked in government cybersecurity for a short contract. That said, I still don't have a solid grasp of networking and security, and have a lot of knowledge gaps.

Here I'm going to make a stream of consciousness post about what I learn as I quickly read through [Julia Evans computer networking posts](https://jvns.ca/#computer-networking). I'm choosing to learn this way because 
1. she's an excelent writer 
2. and uses both concrete practical examples (with tooling demos) and explains some theory
3. and is very honest about what she knows and doesn't, which makes it both approachable to learn from, and feels more like I'm learning this with a friend
4. and I'm in a time crunch and they're generally short posts
5. and I don't have a specific end goal yet, and this covers lots of topics in a non-abstract way
6. and I want to have seen a lot of problems and solutions / tools before, so when I come across something similar, I know where to look

At work, all I know so far is that we have to setup a physical firewall, and that we can't get a VPN (currently Nord VPN) to work. And that these two combined are likely to cause more issues. This is my third day!

## Current questions
- Why do we need a physical firewall? 
- How is this different from other firewalls? 
- What do firewalls do, more specifically? 
- Do most home networks have firewalls? 
- How do firewalls interact with a VPN?
- Why do we need a VPN for security?

I'll research these more throughouly if the jvns posts don't cover them.

## From firewall wiki:
- Seemingly three types:
	* software run on general purpose hardware
	* hardware-based (what does this mean?!)
	* virtual (maybe this is data that goes between a VM and native OS?)
- Firewalls can be on a general purpose user computer and might be part of the operating system to handle incoming network packets
- A packet filter is a basic firewall. It inspects packets and does one of three things:
	* silent discard
	* discard with ICMP (protocal for network devices (generally not end user devices), which can, I think, send a message back to the sender say it discarded the packet) or TCP reset (which is part of the TCP protocal, telling the sender to stop sending TCP messages)
	* forward packet to next hop
- A packet filter can decide what to do based on info in the headers (source and destination IPs, protocal used, and ports)
- There are also application-level firewalls called socket filters


## Post summaries 

### [CDNs aren't just for caching](https://jvns.ca/blog/2016/04/29/cdns-arent-just-for-caching/)
- A content delivery network (CDN) can cache. It sounds like the main use case is having multiple servers around the world hosting your website to shorten time required on the network to reach them. They have other uses, too, like:
	* speed up TLS / SSL (which I don't know much about, but is a security protocal that requires a lot of back and forth between client and server)

### [What are SSL ciphers & session keys?](https://jvns.ca/blog/2016/05/06/what-are-ssl-ciphers-and-session-keys/)
- RSA is a way to encrypt, but is very slow. Instead, we (SSL / TLS) use other encryption for messages called AES. Maybe we only use RSA to encrypt the keys, so that we only do the slow process once in a session, insead of for every message. This might be wrong!
- When reading more about SSL / TLS:
	* Two goals: confidentiality - nobody else reads our messages, and integrety - both parties want to ensure the message is coming from who they think it is
	* symmetric means both sides have the same key, which is needed for the two goals above
	* asymmetric means the sides have different private keys. To do this they need to agree on a method for generating private keys. 
	* in addition to the two goals, we also have to prevent an attacker resending a message twice. To do this, you need a new set of symmetric keys for each message.

### [Why do we use the Linux kernel's TCP stack?](https://jvns.ca/blog/2016/06/30/why-do-we-use-the-linux-kernels-tcp-stack/)
- the kernal has it's own TCP stack that is generally used. You could also write your own TCP stack in 'userspace'. I've wrote software to send TCP messages before. Was I doing this in 'userspace'? My OS knowledge is also filled with holes (so I've been reading through [this short OS book](https://pdos.csail.mit.edu/6.828/2019/xv6/book-riscv-rev0.pdf))
- it seems like a roll-your-own TCP stack can be faster because you have direct control how it runs. You can pick a CPU and just run it through. When dealing with the built-in kernal TCP stack, the OS can decide to run other processes concurrently, which means holding up the TCP process. I'm not sure if this is correct!

### [How do HTTP requests get sent to the right place?](https://jvns.ca/blog/2016/07/14/whats-sni/)
- I'm learning how to make an HTTP request without curl using netcat (or nc). First you have to manually build the HTTP headers, then nc sends it as a TCP message to the specified IP and port (I think!) 
- A webserver can host many websites, and uses HTTP headers to decide which one to route it to
- NGINX and Apache are two different web servers (I kinda knew this, but have never set them up, and didn't know what nginx was)
- If web server hosts many different IPs / websites, and you have a single TCP connection, you can use the same SSL certificate for HTTP requests even if they are for different websites

### Why do UDP packets get dropped?
- Server network card isn't keeping up with the sending socket buffer
- Normal dropped packets over the network (which is likely due to full router buffers) 
- Client application not ingesting from the receiving socket buffer fast enough
- The socket man page was also helpful here. I didn't know sockets had buffers before this, and that they are file descriptors (currently learning about fd in the OS book mentioned above)

### [What's interesting about UDP?](https://jvns.ca/blog/2016/12/21/what-s-interesting-about-udp/)
- DNS uses UDP, mostly because DNS requests are small, so no need for multiple packets. Application side handles retransmission if there's no reply. Large DNS responses may still use TCP

### [Dissecting an SSL certificate](https://jvns.ca/blog/2017/01/31/whats-tls/)
- I have SSL certs on my computer at /etc/ssl/certs/
