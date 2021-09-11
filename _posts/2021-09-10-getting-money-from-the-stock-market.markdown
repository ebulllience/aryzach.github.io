----
layout: post
title: Getting money from the stock market
date: 2021-09-10T01:31:40-05:00
categories: scala zio HFT
permalink: money
---

I recently started a contract to build a high-frequency trading bot. I'll use this to document the experience, engineering workflow, daily work, exciting breakthroughs, difficult problems, etc.

### Background
Somebody saw I had some hobby Haskell experience, so he contacted me about building a HFT trading bot in a functional language. He currently has an implementation in python that he built with a small team over the last 2 - 3 years. It's a well-built code base, but ran into speed issues, so couldn't compete in the markets. He said they've tried to speed up the processes using asyncIO and PyPy, but that it hasn't been fruitful. The idea is to build it with a functional language because they better handle concurrency, and are just generally much faster languages. 

I've never done this before. I've never had to work with threads, concurrency, etc., let alone a functional project of this size. I told him all of this, and he understands what I know, but we came to a mutual understanding of expectations and mutual confidence that we can get this done. This is a huge challenge, I'll learn a lot, and somebody is paying me to do it. I'll be responsible for a highly technical engineering project. I'm super excited and grateful, and a definitely nervous. 

He has the domain expertise, experience from building something like this before, and the runway to fail smartly along the way. He's also extremely energetic and passionate about the project.

### Choice of language
He wanted me to evaluate lots of languages. He's not a functional programmer, but has read a lot about HFT and understands the project requirements and important metrics for evaluation. His requirements are that it's in a fast, functional language (for concurrency). People also write safe, concurrent programs in Go, which isn't functional, but I don't know anything about Go, and he wants something functional, so we ruled that out. Other languages include OCaml, Haskell, Erlang, Scala, Racket. His vision is to have a system written in lots of different functional languages, and become an oasis for functional programmers. Let's start with one! I won't go into details now, but we decided on Scala. I've used it a bit, it's quicker to get something prototyped (because you can do it imperatively, more or less), and has a big community. The idea is to build an MVP, understand some of the functional patterns needed, learn the domain, learn about concurrency. If we decide this language isn't right after some time, well have learned a lot and will be able to port it to another functional language fairly quickly (in theory).

### Project description / background
A high level overview, as my understanding now, is to read in real-time and historical market data about one or more [contracts](https://interactivebrokers.github.io/tws-api/contracts.html), then do some analysis that will trigger a buy or sell event, or to take no action. The core of HFT is in the analysis and minimizing latency. Because analysis complexity and latency are at odds with each other on the axis of time, the art of HFT is finding the sweet spot along the axis of analysis and latency. 

The [Trader Workstation API](https://interactivebrokers.github.io/tws-api/index.html) is an interface to programically work on the markets. It has native Python support, which made it easy for their current code base to interface. It also has a Java API, but I didn't want to deal with Java code, and found an open source Scala wrapper, [IBClient](https://github.com/openquant/ibclient). It's not documented, but matches the native API fairly closely. 

The Python code base relied on [TA-Lib](https://ta-lib.org/) for analysis. There are a few similar tools in Java, but haven't found a Scala version, or a Scala wrapper.

Interactive Brokers, or IB, allows access to something called a 'paper' account where you can make trades with fake money. This will be used for testing.


### Plumbing MVP Specification
I'm defining the MVP to have the following features:
	- connect as a client to [Interactive Brokers](https://www.interactivebrokers.com/en/index.php?f=1338&gclid=CjwKCAjwp_GJBhBmEiwALWBQk04pNFhZN2JOUWFd2qZxdH4lo_a4KR5L3wuTZop26-jMHRLA0sKHFhoCZjUQAvD_BwE) 
	- create a contract
	- recieve historical data for the contract
	- make a (dumb) buy decision
	- buy a product (what is this called? what am I buying? an option? a stock?)
	- make a (dumb) sell decision
	- sell a product

This will just be a show that the APIs are working and can be plumbed together. I'll test this by viewing a change of dollar amount in the GUI for the paper account.

### Post 1
I started with this project before I started writting this post, and up til now, I've been very sloppy with code and git. There have been many false starts as I deal with testing unsupported, open source IB client libraries. I've settled on a IB client wrapper, and have tested part of the API, so am confident that I can get something working with Scala now without having to use the native Java TWS API. I'm now at a place where I'll use better SWE practices. I'll keep a more detailed todo list in the project git repo, but here I'll overview status of features and bugs. I'll start writing tests and practice some TDD after I've delivered the MVP.

Currently, I have:
	- connect as a client to IB
	- create a contract
	- recieve historical data

Next steps:
	- make a buy and test







