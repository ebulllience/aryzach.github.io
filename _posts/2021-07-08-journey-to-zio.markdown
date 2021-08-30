---
layout: post
title: Journey to ZIO
date: 2021-07-08T11:35:05-04:00
permalink: journey-to-zio
---

I have a job lined up working in Scala and will make heavy use of ZIO. This is a brief and working post about how I'm learning Scala and ZIO. Maybe it can be useful for somebody else wanting to learn.

#### Prior experience / understanding:
 - I'm comfortable with the basics of FP from Haskell including a theoretical understanding of monads, functors, applicative. I can work with the IO monad, bind operator, 'do' syntax. I also understand that list and maybe are also monads. I'd never heavily applied these concepts outside of making small CLI apps, and I was basically writing lisp style code in Haskell. 

#### So far:
- Read and did exercises from [Essential Scala by Noel Welsh and Dave Gurnell](https://books.underscore.io/essential-scala/essential-scala.html#getting-started)
 - Built a sloppy, unfinished hangman to get used to language. [Link to file](https://github.com/aryzach/scalaPracticeProjects/blob/main/Hangman.scala)
 - Followed [this tutorial](https://scalac.io/blog/introduction-to-programming-with-zio-functional-effects/). The first time through without deep understanding just to understand the structure and thought process. I then rebuilt it mostly to build muscle memory, get a deeper understanding of the program structure and types
 - Built the game from [FP to the Max](https://www.youtube.com/watch?app=desktop&v=sxudIMiOo68) with ZIO before watching how John De Goes does it. Then I followed along as he built App1, which I understood fairly comfortably. In App2 he builds monads from scratch, which, before he said it, I thought I'd seen it before (just defining map and flatMap / bind on a data structure), and I recognized that the TestIO was similar to the state monad. When he started breaking down IO into Console and Random, that looked like the ZIO environment types. While I was already beyond my comfort level at this point, I really like the idea of getting to this level of understanding of working in FP and types. While I only understand App2 and App3 at a high level, it makes me excited to work towards this level of understanding, and I think I'll get there much faster if I'm building real world applications with the FP mindset. 
 - I'm getting side tracked and started watching and following along with the series [ZIO from DevInsideYou](https://www.youtube.com/watch?v=XwMKw03w8bs&list=PLJGDHERh23x-ammk-n2XuZWhoRVB-wAF) which I'm finding insightful and demystifying, but lost at the covarience / contravarience discussion.
 - Started building a Tic Tac Toe game with ZIO, but stopped when I felt I wasn't learning much more.  
 - Follow [FP to the Min](https://www.signifytechnology.com/blog/2021/01/fp-to-the-min-by-john-de-goes-scala-in-the-city-conference)
 - Finished Tic Tac Toe and extended it to have an optional bot. I ran into an issue when trying to generalize a function which I think has to do with polymorphic methods. For now, I'm moving on, but I'd still like to clean this up, and make a smarter bot. Here's the [repo](https://github.com/aryzach/scala-ZIO-ticTacToe)
 - I found a [tetris game written with Cats](https://github.com/lpld/simple-games). I wanted to build a game so I could focus on ZIO instead learning other tech / libraries. I had a hard time finding ZIO games that use streams, so I'm especially excited about this because it'll help me learn about working with streams in general, with the bonus of learning some Cats. Maybe I'll try to port the app to use ZIO instead of Cats. I've also never had to deal with drawing to the console. The rendering approach in this repo seems like it's less mature than something like curses in Python, so I'm hoping to learn something about that, too. Hacking this project will also hopefully help me understand larger pure FP scala code bases and learn about structuring larger pure FP scala projects in general! This is a bigger project, so I'll track it [in this blog post](https://aryzach.github.io/ZIO-snake). And here's my [repo](https://github.com/aryzach/snake-console-game-scala-ZIO).
 - I found a post about [cloning 'git clone' in Haskell](https://stefan.saasen.me/articles/git-clone-in-haskell-from-the-bottom-up/). This is a #realworld FP app, and I'm super excited to implement it with Scala/ZIO. My primary learning goal is to get more practice with ZIO. My secondary goals are to practice much better SWE practices (agile, comments, good git practices) and to gain a better understanding of how git works. TDD, Kanban, git practices, Extreme Programming, Scrum.



#### Todo:
 - Create small real world ZIO app, ideally something that needs concurrency / async
 - Create online multiplayer CLI game (or browser game? scalaJS?) using Play framework and ZIO
 - Think about this: https://rcoh.svbtle.com/no-magic-regular-expressions

Commonly used resources / people to follow:
 - ZIO benevolent dictator for life? [John De Goes](https://degoes.net/)
 - ZIO discord
 - [Scalac / ZIO](https://scalac.io/zio/)
 - General scala: [Alvin Alexander](https://alvinalexander.com/)

ZIO seems more like an ecosystem than a tooling library, similar to React (middle ground between a framework and a library). I could be totally off base here!
