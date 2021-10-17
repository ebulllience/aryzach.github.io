---
layout: post
title: Quicklearn Networking
date: 2021-10-09T12:31:26-07:00
categories: work networking
permalink: quicklearn-networking
---

## Background 
I just started a new job! We mostly work with [MANET networks](https://en.wikipedia.org/wiki/Wireless_ad_hoc_network). These are wireless networks with non-stationary and unreliable nodes. There are generally no dedicated routers, and all devices are both clients and participate in routing.

Anyway, because this is government contract work, we need to jump through lots of hoops to get certified with some security protocols including network security. The company is just three full-time people, one of those is me, and I probably have the most experience with networks and security, which isn't much! (besides the two days / week contractor who seems very smart and capable) 

So short story, I need to get more familiar with networks. Both for app development and our internal IT. 

Side note: for our internal IT required security, there are a few resources we should tap into before trying to do this in-house:
1. People have had to set up and follow these specific security requirements before. There are probably people we could hire with very deep domain expertise on how to set this up. Likely experts who have worked with companies of similar size before, too
2. The owners are part of a government incubator group, and they talk to the other companies. We could consult with them how they set up their systems for compliance. Setting up closed-source networking systems meant for large institutions seems daunting and like you can't solve the problems from first principles.

In the past, I've set up what is essentially a home network on steroids, with mesh WiFi over 130 acres, VLANs, a VPN, multiple ISPs, wireless Ethernet connections, etc. I've also worked in government cybersecurity for a short contract. That said, I still don't have a solid grasp of networking and security, and have a lot of knowledge gaps.

Here I'm going to make a stream of consciousness post about what I learn as I quickly read through [Julia Evans computer networking posts](https://jvns.ca/#computer-networking). I'm choosing to learn this way because she
1. is an excellent writer 
2. uses both concrete practical examples (with tooling demos) and explains some theory
3. is very honest about what she knows and doesn't, which makes it both approachable to learn from, and feels more like I'm learning this with a friend
4. I'm in a time crunch and they're generally short posts
5. I don't have a specific end goal yet, and this covers lots of topics in a non-abstract way
6. I want to have seen a lot of problems and solutions / tools before, so when I come across something similar, I know where to look

At work, all I know so far is that we have to setup a physical firewall, and that we can't get a VPN (currently NordVPN) to work. And that these two combined are likely to cause more issues. This is my third day!

## Current questions
- Why do we need a physical firewall? 
- How is this different from other firewalls? 
- What do firewalls do, more specifically? 
- Do most home networks have firewalls? 
- How do firewalls interact with a VPN?
- Why do we need a VPN for security?

I'll research these more thoroughly if the blog posts I'm reading don't cover them.

### From firewall wiki:
- Seemingly three types:
	* software run on general purpose hardware
	* hardware-based (what does this mean?!)
	* virtual (maybe this is data that goes between a VM and native OS?)
- Firewalls can be on a general purpose user computer and might be part of the operating system to handle incoming network packets
- A packet filter is a basic firewall. It inspects packets and does one of three things:
	* silent discard
	* discard with ICMP (protocol for network devices (generally not end user devices), which can, I think, send a message back to the sender say it discarded the packet) or TCP reset (which is part of the TCP protocol, telling the sender to stop sending TCP messages)
	* forward packet to next hop
- A packet filter can decide what to do based on info in the headers (source and destination IPs, protocol used, and ports)
- There are also application-level firewalls called socket filters


## Post summaries 

### [CDNs aren't just for caching](https://jvns.ca/blog/2016/04/29/cdns-arent-just-for-caching/)
- A content delivery network (CDN) can cache. It sounds like the main use case is having multiple servers around the world hosting your website to shorten time required on the network to reach them. They have other uses, too, like:
	* speed up TLS / SSL (which I don't know much about, but is a security protocol that requires a lot of back and forth between client and server)

### [What are SSL ciphers & session keys?](https://jvns.ca/blog/2016/05/06/what-are-ssl-ciphers-and-session-keys/)
- RSA is a way to encrypt, but is very slow. Instead, we (SSL / TLS) use other encryption for messages called AES. Maybe we only use RSA to encrypt the keys, so that we only do the slow process once in a session, instead of for every message. This might be wrong!
- When reading more about SSL / TLS:
	* Two goals: confidentiality - nobody else reads our messages, and integrity - both parties want to ensure the message is coming from who they think it is
	* symmetric means both sides have the same key, which is needed for the two goals above
	* asymmetric means the sides have different private keys. To do this they need to agree on a method for generating private keys. 
	* in addition to the two goals, we also have to prevent an attacker resending a message twice. To do this, you need a new set of symmetric keys for each message.

### [Why do we use the Linux kernel's TCP stack?](https://jvns.ca/blog/2016/06/30/why-do-we-use-the-linux-kernels-tcp-stack/)
- the kernel has it's own TCP stack that is generally used. You could also write your own TCP stack in 'userspace'. I've wrote software to send TCP messages before. Was I doing this in 'userspace'? My OS knowledge is also filled with holes (so I've been reading through [this short OS book](https://pdos.csail.mit.edu/6.828/2019/xv6/book-riscv-rev0.pdf))
- it seems like a roll-your-own TCP stack can be faster because you have direct control how it runs. You can pick a CPU and just run it through. When dealing with the built-in kernel TCP stack, the OS can decide to run other processes concurrently, which means holding up the TCP process. I'm not sure if this is correct!

### [How do HTTP requests get sent to the right place?](https://jvns.ca/blog/2016/07/14/whats-sni/)
- I'm learning how to make an HTTP request without curl using netcat (or nc). First you have to manually build the HTTP headers, then nc sends it as a TCP message to the specified IP and port (I think!) 
- A web server can host many websites, and uses HTTP headers to decide which one to route it to
- NGINX and Apache are two different web servers (I kinda knew this, but have never set them up, and didn't know what nginx was)
- If web server hosts many different IPs / websites, and you have a single TCP connection, you can use the same SSL certificate for HTTP requests even if they are for different websites

### [Why do UDP packets get dropped?](https://jvns.ca/blog/2016/08/24/find-out-where-youre-dropping-packets/)
- Server network card isn't keeping up with the sending socket buffer
- Normal dropped packets over the network (which is likely due to full router buffers) 
- Client application not ingesting from the receiving socket buffer fast enough
- The socket man page was also helpful here. I didn't know sockets had buffers before this, and that they are file descriptors (currently learning about fd in the OS book mentioned above)

### [What's interesting about UDP?](https://jvns.ca/blog/2016/12/21/what-s-interesting-about-udp/)
- DNS uses UDP, mostly because DNS requests are small, so no need for multiple packets. Application side handles retransmission if there's no reply. Large DNS responses may still use TCP

### [Dissecting an SSL certificate](https://jvns.ca/blog/2017/01/31/whats-tls/)
- I have SSL certs on my computer at /etc/ssl/certs/

### [How big can a packet get?](https://jvns.ca/blog/2017/02/07/mtu/)
- UDP packet size can be really big, but Ethernet frame sizes are smaller, which is called MTU. So if you send a UDP packet bigger than the MTU, either it's dropped or it's fragmented (like TCP). Unclear how it's reassembled on other side, especially if some get dropped

### [Slow down your internet with tc](https://jvns.ca/blog/2017/04/01/slow-down-your-internet-with-tc/)
- you can add network latency (on a specific network interface)
- HTTPS/2 can be much faster than HTTP because it does more requests in parallel, even though it has the added TLS handshake
- questions: Does SSH use TCP? Or is SSH it's own protocol in the same axis as TCP?

### [netdev conference, day 1](https://jvns.ca/blog/2017/04/06/netdev-2-1/)
- one way to do DDOS mitigation: 
1. sample packets, and send those samples elsewhere to find patterns on them (unsupervised machine learning?)
2. come up with rules from those patterns, and code the rules
3. to actually block use:
 * iptables. I didn't know what this is, but turns out is has a lot to do with firewalls! (which is what I need to know about this week). From the man pages:
 	- iptables seems like a flowchart, and if packets match a certain pattern, then you send it down that flowchart branch
	- at each node, the packet can be ACCEPT, DROP, or RETURN. RETURN just goes to the next pattern to match against (this could be wrong)
	- there are 5 tables. Kernel settings determine which one(s) are active
 * userspace (not sure of upsides or pitfalls)
 * XDP which sounds like it's a new thing to do packet filtering right off of the network card. This way you avoid the kernel and userspace apparently. Good for very fast filtering 
- using XDP at Facebook for load balancing and DDOS mitigation. I don't really get load balancing (I can vaguely infer!)
- you can use tc on a router to rate limit from a certain MAC address
- you can use tc on a router to do what the kernel would normally do with packets, like checksum. This could take load off the end CPU and put it on the router
- a 'page' is a segment of memory for an OS. I think a process has virtual memory which is a page

### [How to filter packets super fast: XDP & eBPF!](https://jvns.ca/blog/2017/04/07/xdp-bpf-tutorial/)
- XDP programs use data structures from the kernel (which I remember being an uncommon thing to do, or impossible from userspace) to parse the Ethernet header
- they loaded the compiled file into the kernel from userspace somehow (I think)
- you can check if it loaded by looking at info about network interfaces. I can check it by running `ip link list`. When I run this I notice `mtu` on all interfaces, which is probably Maximum Transmission Unit. XDP is running on that interface if it says `xdp`

#### I'm going to skip netdev conf day 2 and 3 for now. Mostly because this is a reach for Julia, somebody who's familiar with networking, so it's an extra reach for me, and more of a depth than breath approach on these niche topics.

### [Iptables basics](https://jvns.ca/blog/2017/06/07/iptables-basics/)
- I'm excited about this because this relates to firewalls, which I'm trying to learn more about
- cool visual to [iptables flowchart](https://images.app.goo.gl/K9oFPe5jjF3kyTh96)
- I can look at the iptable rules with `sudo iptables -L -t nat` (replace nat with any other table)
- SNAT and MASQUERADE: I think is so when you send / receive packets outside your LAN, the firewall uses it's IP address and when packets come in, somehow it knows which LAN IP to send it to. When sending / receiving packets on WAN, it looks like they're all coming from the same IP even though you might have many IPs on your LAN. Then how does your firewall / router know which IP to send to? The WAN packets must have your LAP IP, or just some sort of ID that your router / firewall maps to your LAN IP

### [What's a network interface?](https://jvns.ca/blog/2017/09/03/network-interfaces/)
- you can create a network namespace (what does this have to do with userspace? just coincidentally similar name?)
- a network namespace is a copy of the network stack. It has it's own routes, firewall rules, and network devices
- `nc -l 8000` will just create a server(?) that listens on port 8000
- by default, ifconfig only shows active (up) interfaces
- I created a new network namespace and connected it to a network interface. But now I seem stuck inside that network namespace. Is this nested under the default network namespace? Or parallel to it? When I rebooted it disappeared and seem to be in the default network namespace 
- when sending a packet to an IP address, the route table decides which interface the packet goes through. Then if you're running tcpdump, this is where it reads from (once attached to interface)

### [Finding out if/why a server is dropping packets](https://jvns.ca/blog/2017/09/05/finding-out-where-packets-are-being-dropped/)
- `netstat -i` reports the MTU of each interface. `lo` reports MTU size of a UDP packet max size, which I though was weird because I thought the MTU for any network connection was 1500 limited by the Ethernet protocol. Turns out `lo` is for local (on your own computer) networking

### [A few things I've learned about computer networking](https://jvns.ca/blog/2018/03/05/things-ive-learned-networking/)
- this post was useful to understand how somebody else has come to understand computer networking and make me feel less bad about not knowing much about it. This exercise of going through Julia's networking posts has been super useful for building a framework, but I'm sure it helps a ton that I've had experience running into networking problems head on (even if I didn't have any framework to understand how to solve them). I had one technical co-worker and they would guide me in the right direction 
- in reading a separate post about building a tcp stack in python (building and sending SYN and ACK messages), it says you can tell your router to route packets addressed to a random IP to your computer (via your MAC address). This is so you can bypass your kernels TCP stack if your building your own application level TCP stack. And in the post it says that you computer will receive those packets meant for the random IP (but routed to your computer from the router). And supposedly your application will receive them. My question is how they get to the port? Why isn't the kernel rejecting them? Maybe LAN routing is done with MAC regardless. So the kernel doesn't process the packet because it's a different IP, but since MAC takes priority here, the packet still gets digested by the port / application TCP stack.
- I can use tcpdump to see packets dropped from iptables. This might be useful when debugging the firewall / VPN issue at work! (is a deep dive on working with tcpdump in my horizon? I've know about it for a few years but never really had to work with it)

### Reflections update:
I'm part way through, and I already feel like I've learned a ton, especially in my quest to have a framework to understand some of the questions I posted in the beginning. I'll kinda answer them now

- Why do we need a physical firewall? 
	* my guess would be to have hardware to do firewall stuff faster and maybe have software like XDP. It might also be a closed-source, no root access / no OS, government thing to both have a physical separate device before your router / modem, and so that there's a firewall that can't be tampered with, as long as it's in place.

- How is this different from other firewalls? 
	* I'd guess it doesn't work in any very different / novel way than other firewalls. Answer above covers this

- What do firewalls do, more specifically? 
	* filter packets based on rules around packet headers (I think IP and TCP headers mostly). They can do this in the kernel (iptables?), in userspace, or before the kernel and after the NIC, like XDP. Firewalls can also have systems for dynamically establishing rules based on pattern. This might be part of why we need all of our traffic to go through a VPN. Because the VPN can have the infrastructure to do dynamic firewall rules (it might require lots / fast machines to find the patterns in the packets to block). But you could also have local firewall rules, and just outsource the feature that finds malicious packet patterns and creates rules, then send those rules back to the firewall. But because that requires a network connection, you could be DDoSed or something and not be able to receive the updated rules

- Do most home networks have firewalls? 
	* I don't know, but probably? It seems like at least basic rules would exist on a router and probably even baked in to most OSes
- How do firewalls interact with a VPN?
	* A packet through a VPN probably has certain characteristics. If the firewall doesn't like that, then it'll drop

- Why do we need a VPN for security?
	* Answered above. Maybe they have their own firewall that traffic hits before it goes to us. This way you can more so guarantee that traffic in and out of the office goes through at minimum the VPN firewall

- If I have to debug firewall (and VPN) stuff, I think my main task will be to understand how people use tcpdump and other cli tools to understand why packets are being dropped by iptables (or maybe more specific physical firewall stuff like XDP, too).

### [How I use Wireshark](https://jvns.ca/blog/2018/06/19/what-i-use-wireshark-for/)
- workflow ex. use tcpdump and save output in a file. Open wireshark
with that file
- see what happened in a single TCP connection
- "cast" a packet to a certain protocol / type of traffic
- look at headers in english or as raw bytes
- search for things like `tcp.port == 443`
- uses stats to find a tcp session that was super long
- helps make networking concepts concrete because you can physically see
it happening

