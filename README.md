# Bartender
A single-page React web app where users can search a drinks and cocktails database for ingredients and instructions to craft drinks.

**Link to Bartender:** https://bartender-pika.netlify.app/

![A video demo showing how users can use the web app Bartender](./bartender-demo.gif)

## How It's Made:

**Tech used:** <p align="left">
![react logo](https://readme-components.vercel.app/api?component=logo&fill=black&logo=react&animation=spin&svgfill=15d8fe)
![javascript logo](https://readme-components.vercel.app/api?component=logo&fill=black&logo=javascript&svgfill=f6df1c)
![tailwindcss logo](https://readme-components.vercel.app/api?component=logo&fill=black&logo=tailwindcss)
![node.js logo](https://readme-components.vercel.app/api?component=logo&fill=black&logo=node.js&svgfill=659b60)
![css3 logo](https://readme-components.vercel.app/api?component=logo&fill=black&logo=CSS3&svgfill=028dd1)
![html5 logo](https://readme-components.vercel.app/api?component=logo&fill=black&logo=html5&svgfill=f06629)
</p>

This cocktailsDB api is quite popular, but I noticed that most implementations move in this same flow: user text input, user submit, api call is fired, data is received, page is reloaded with the data. However, I wanted to create something a bit more fluid and user-friendly.

I wanted to make this web app work with zero page reloads using React, and I decided to also add a “search by letter” functionality using a button group so the user can find new drinks more easily. Instead of having the user manually submit their text input, I set up a 1 second timer between the last user input and the api call. This way it's more user friendly while still not firing a bunch of api calls.

As for Pikachu, well... my girlfriend and I are rewatching the original Indigo League series and I just really like Pikachu :)

## Optimizations

Initially, I had the fetch request set up to fetch data every single time the user input box changed. I quickly realized that this meant a request was made for every single letter typed out. If a user typed out "strawberry mojito" for example, that resulted in 17 fetch requests! And that’s assuming they typed perfectly.

To fix this, I set up a timer to wait 1 second after the most recent change in the user text input field before firing the fetch request. In doing this, I still held on to the user-friendliness and fluidity I wanted without piling on endless unnecessary fetch requests.

## Lessons Learned:

Way back at the beginning of my programming journey, I utilized solely HTML and CSS. Before I knew anything about tools like Bootstrap or MaterialUI, I created my styles from scratch using CSS. Fast forward to more recently and, admittedly, it had been quite a while since I wrote CSS from scratch.

For this project, I made use of Tailwind CSS. While this tool does make styling far quicker and more intuitive, it is no replacement for actual CSS knowledge. I believe the biggest lesson I learned from this project is that these styling tools and libraries are incredibly useful, however, a solid foundational knowledge of how CSS works and real experience using CSS is irreplaceable.
