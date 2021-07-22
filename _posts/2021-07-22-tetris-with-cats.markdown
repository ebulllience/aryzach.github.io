---
title: Tetris with Cats
date: 2021-07-22T10:53:29-04:00
---

- change scala version in build.sbt
- still wasn't running, debugged RectRegion, so now only one type of block shows
- few other small bugs to get it running

I'll start by just trying to get all piece shapes back in the game. When debugging, I cound this fragment:
 
    val allPossiblePieces: Seq[RectRegion] = { 
    // is this a monoid?
    def multF[A](f: A => A)(times: Int): A => A = 
      (1 to times).foldLeft(identity[A](_))((c, _) => c andThen f)

The comment "is this a monoid?" tells me I'm in a good place, because it shows me the original writer understands these concepts just a little better than I do, so hopefully this excersise will push me to their level.
