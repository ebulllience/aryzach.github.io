---
layout: post
title: Work Journal
date: 2021-10-14T21:02:42-07:00
categories: hard tech career
permalink: work-journal
---

### 10/13/21
I deleted our git server!
We do some kinda secret stuff and have to meet some security standars. We can't have an unsanctioned cloud git server (haven't had permission to do it yet), so we had a local one. I was setting up a wiki to keep better docs and totally deleted /var/lib instead of /var/lib/mediawiki. Woo!

### 10/14/21
I fixed our wiki. So I really did delete everything. Luckily, we had all the repos on different peoples computers. I learned a lot today, mostly from debugging problems. `journalctl -xe` ! `systemctl status <program>` ! `nc -[some flags]` ! I also learned a little about nginx and kinda had it working how I wanted it. I've never really worked with logs before, but today, they were incredibly useful. I felt like a wizard. I'm not sure if I would've had the confidence to do this if I hadn't done the [jvns.com networking exercise](aryzach.github.io/quicklearn-networking) that I did last weekend.

### 10/15/21
I started to take on the task of making us security compliant (CMMC L3). I'm learning a bit about security and will probably learn a lot more about sys admin which is useful. Today I read through all the requirements and read about how other people have fulfilled compliance for each requirement. It's mostly large companies that have to be compliant, so we're in a somewhat new / underserved area. Windows has more or less off-the-shelf solutions for this, but we use non-Red Hat linux, so we have to figure out solutions ourselves. 
