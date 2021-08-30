---
title: Reimplementing Git Clone with Scala / ZIO
date: 2021-08-29T03:43:15-04:00
---

SWE practices I'll follow:
TDD 
Only function-level comments (not in-function comments)
Self-commenting code (will likely follow naming convensions from the Haskell implementation)
Git commit often (no set rule, but after every function and major milestone)

I'll break the project up into phases. Phase 1 is completing the following:
```
1. Parse the clone url to extract the host, port and repository path information.
2. Connect to the git server via TCP using the native git transport protocol.
3. Negotiate the objects that need to be transferrered from the server to the client. This includes receiving the current state of the remote repository (in the form of a ref advertisement) that includes the refs the server has and for each ref the commit hash it points to.
```
## Phase 1

Step 1: Read post and understand at a high level
Half way through, the post became overwhelming. I decided to skim for a high level overview for the rest, and focus on a deep understanding of [git transport and pack wire protocal](https://stefan.saasen.me/articles/git-clone-in-haskell-from-the-bottom-up/#git-transport-and-pack-wire-protocol) so that I can start implementing that part of it.

Step 2: Understand first requirement, and build one test for it - Ref discovery
This will complete step 1 - 3 of the git clone process

Step 3: Write code to pass test
Done. I should probably write more tests for better coverage, but my goal is to get a working program quickly, not one that will be put in production / care about resiliency.

Step 4: Write ls-remote function. This uses IO. I'll start using zio-test instead of scalatest.
I moved all tests to use the zio-test framework. I'll still figure out what the test for this should look like.

Step 5: ls-remote sends a message over TCP. I'll have to learn a bit about how TCP works, the actor model, etc.
I'm reading about TCP / Akka actors on [stackoverflow](https://stackoverflow.com/questions/33747858/akka-tcp-client-how-can-i-send-a-message-over-tcp-using-akka-actor) and from the [official docs](https://doc.akka.io/docs/akka/snapshot/io-tcp.html?language=scala) to understand how I can send a TCP message in Scala. I think the ZIO environments I'll need are System and maybe Blocking. I haven't worked with either of these ZIO environments, so that'll be fun to learn about!

