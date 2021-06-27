---
layout: post
title:  "React useState() and the state monad in Haskell"
date:   2021-05-27 
permalink: react-useState-state-monad-haskell
---

### Why I've come across this
I've recently aquired a project written with React. The service is geared for people who play daily fantasy sports (DFS). I'm not familiar with the domain, but the idea is that if people think they have an insight that could give them an edge over standard DFS team or player projected perfomance tools (ex. think a player has to sit out for a game), this tool will allow custom data input, which is then sent to run a 'monte carlo simulation' on that data to get possibly more accurate game and player predictions. I'm only familiar with monte carlo simulations at a high level, but that doesn't matter, because I signed up to work on the front end. 

I've never done front-end work, and never had the interest. But I think my hesitancy has held me back, and I'd at least like to understand the technologies (and it'd be nice to have the confidence that I could build a website). The front-end is currently in beta, but had bugs. It was written with React by somebody who does front-end work. Initially, I tried to hop in as I was just barely familiar with HTML/CSS/JS. I quickly realized I was over my head, mostly unfamiliar with the seemingly convoluted structure of the app. I found [The Odin Project](https://www.theodinproject.com) which has been great to quickly get me up to speed with React / JS / CSS / HTML.

I came across the [state, setState] = useState() which immediately reminded me of the state monad in haskell. For a while, I was really interested (and still am) in learning functional programming concepts through the lense of haskell that I wasn't seeing talked about in other languages. I've spent quite a bit of time trying to grok monads, and most recently the state monad in haskell. While I've felt some level of success, I haven't used or understood it past implementing some toy examples. So I've seen it , but it's not familiar like the back of my hand. Mostly, I think I was missing context and the need for the idea wasn't motivated.

useState() feels very similar (mostly getting a function, similar to having a function inside of a type constructor like the state monad). I could be off base here, and am really only 5 hours into using useState(). How setState updates state is still very not obvious, but luckily theres a lot of practical and theoretical React resources out there that are also approachable. The same can't be said for haskell's state monad. 

I'm actually liking React a lot more than I thought I would. I like that I'm learning about functional patterns in a very applied setting, and I hope that it'll lead me to a deeper understanding of haskell / types / monads / functional programming in a roundabout way.


