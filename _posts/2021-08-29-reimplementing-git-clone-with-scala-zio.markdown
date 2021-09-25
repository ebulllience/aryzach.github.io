---
layout: post
title: Reimplementing 'git clone' with Scala / ZIO
date: 2021-08-29T03:43:15-04:00
categories: ZIO
permalink: reimplementing-git-clone-with-scala-zio
---
I'm reimplementing git clone in Scala based of [this reimplementation in Haskell](https://stefan.saasen.me/articles/git-clone-in-haskell-from-the-bottom-up). My goals in order are:

1. Get more comfortable in Scala and ZIO, particularly in functional-styled Scala
2. Practice more formal / rigorous SWE 'best practices'
3. Develop a better understanding of the internals of git

SWE practices I'll follow:
 - Write unit tests before writing code (kinda TDD, but really the development is driven by the original blog post)
 - Only function-level comments (no in-function comments)
 - Self-commenting code (will likely follow naming convensions from the Haskell implementation)
 - Git commit often (no set rule, but after every function, major milestone, bug fix)

I'll break the project up into phases. Phase 1 is to complete the following:

1. Parse the clone url to extract the host, port and repository path information.
2. Connect to the git server via TCP using the native git transport protocol.
3. Negotiate the objects that need to be transferrered from the server to the client. This includes receiving the current state of the remote repository (in the form of a ref advertisement) that includes the refs the server has and for each ref the commit hash it points to.

## Phase 1

#### Step 1: Read post and understand at a high level
Half way through, the post became overwhelming. I decided to skim for a high level overview for the rest, and focus on a deep understanding of [git transport and pack wire protocal](https://stefan.saasen.me/articles/git-clone-in-haskell-from-the-bottom-up/#git-transport-and-pack-wire-protocol) so that I can start implementing that part of it.

#### Step 2: Understand first requirement, and build one test for it - Ref discovery
This will complete step 1 - 3 of the git clone process detailed in the original blog post

#### Step 3: Write code to pass test
Done. I should probably write more tests for better coverage, but my goal is to get a working program quickly, not one that will be put in production / care about resiliency.

#### Step 4: Write ls-remote function. This uses IO. I'll start using zio-test instead of scalatest.
I moved all tests to use the zio-test framework. I'll still figure out what the test for this should look like.

#### Step 5: ls-remote sends a message over TCP. I'll have to learn a bit about how TCP works, the actor model, etc.
I'm reading about TCP / Akka actors on [stackoverflow](https://stackoverflow.com/questions/33747858/akka-tcp-client-how-can-i-send-a-message-over-tcp-using-akka-actor) and from the [official docs](https://doc.akka.io/docs/akka/snapshot/io-tcp.html?language=scala) to understand how I can send a TCP message in Scala. I think the ZIO environments I'll need are System and maybe Blocking. I haven't worked with either of these ZIO environments, so that'll be fun to learn about!

#### Step 6: Write test for ls-remote

#### Step 7: Breaking down ls-remote
I'm skipping the ls-remote test for now. I'm not quite sure yet how to write tests that depend on external services (like a local tcp / git server), let alone an network-dependent service. I was able to get a prototyped local version of ref discovery working with akka. AKA I can see the correct git info when I put up a local git server, and run my tcp client code. It's not type-safe / functional / ZIO'd yet. It looks like there's some ZIO socket info [out there](https://zio.github.io/zio-nio/docs/essentials/essentials_sockets). I'm not sure if I'll be able to use this, or be able to wrap my akka setup in ZIO. It seems like this is the bulk of ls-remote though. 

#### Step 8: Getting my actor to receive info (needed for lsRemote)
Before, I only had the actor 'fire-and-forget', so I wouldn't get a response back. Now, lsRemote returns a Future, which is the return type of an ask. I'm still not super clear on the setup here. I'm not even sure how many actors I have, tbh, but something is working. I'll have to dig deeper to really understand what's going on here, and I'll probably be able to prune the process from what it is now.

### This is on hold because I took a contract job building a high-frequency securities trading bot in Scala. Here's some [notes on it](https://aryzach.github.io/2021/09/10/getting-money-from-the-stock-market.html).

#### Step 8: Trying out ZIO socket channel in place of the Akka actors
The HFT bot mentioned above is on hold, so I'm continuing with this project! 

The akka actors I was using to handle the TCP messages to and from the git server weren't quite working how I needed them to. I was following [this example](https://hmn.stackfinder.net/questions/45992575/how-to-reuse-akka-tcp-connection-to-write-messages). I was sending an 'ask' to the TCP client actor from outside the client system. This is supposed to create a Future. The TCP client actor was receiving a response and the 'info' messages containted the correct response from the git server, but then that wasn't being passed to the Future outside of the actor system. When I tried to send a message to the 'sender()' (what I thought would be the outside-the-actor-system caller), I was getting a 'deadLetters' actor issue. So I moved on for now.

[This official TCP client example](https://doc.akka.io/docs/akka/current/io-tcp.html), needs a 'replies' / 'listener' of type ActorRef passed to it. My hangup was that I didn't know what to pass here, and how to use it. There's not many great docs / examples / blog posts on Akka actors, and if I go the actor route and figure this out, I might make some content.

When you send an 'ask' to an actor, you get back a Future. Because I'd like to use ZIO, the plan was to wrap the Future in a 'ZIO.fromFuture'. Well, I was having trouble with the actor model, and I found this [ZIO socket channel](https://zio.github.io/zio-nio/docs/essentials/essentials_sockets). I'm not sure if this will do what I want it to, namely connecting to the server, writing the request in packet line format to the socket, then reading the response from the socket. The source code has methods called 'write' and 'read', so I'm hoping I'm on the right track. So far, I've gotten it to compile, but the 'write' method I'm calling on [AsynchronousSocketChannel](https://github.com/zio/zio-nio/blob/master/nio/src/main/scala/zio/nio/channels/AsynchronousChannel.scala) doesn't match the method call in the source code. Very suspicious!

I also made my first pull request to ZIO! It's just a minor documentation fix! [Here it is](https://github.com/zio/zio-nio/pull/410).

