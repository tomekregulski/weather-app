# weather-app

* [Description ](#description)
* [What I Learned](#what-i-learned)
* [Installation and Usage](#installation-and-use)
* [License](#license)

![homepage main](assets/images/demo1.png)
![homepage main](assets/images/demo2.png)

# Description

This is a simple weather app that makes use of the Open Weather API return the current weather (temperature, humidity, wind speed, and UV Index), as well as the 5-day forecast (displaying the temperature and humidity), when a user search a city. In addition to these data points, an icon reflecting the general forecast for that day is shown, and the UV Index is displayed inside a badge that displays a color reflective of the level of severity. 

When cities are searched, they are entered into a column below the search field that shows recent searches, and allows the user to click back to them. These recent searches are saved to localStorage, and will load on future visits to the page. 

This page has been deployed on Github, and can be viewed here: https://tomekregulski.github.io/weather-app/


# What I Learned

This exercise helped solidify my understanding of the basics of working with APIs and extracting specific data points from their responses, and further solidified my understanding of creating a dynamic page that uses local storage to create a continuous experience for the user, and how this all comes together to create a more useful app.

This all took a lot of time to sort out and get working properly, so I was not able to spend quite as much time on the styling as I had hoped. It looks fine on most browser windows, but is not mobile-friendly. I hope to go back and work on this app further to see how I might rearrange things for smaller screens, and add a bit more elegance to it overall. 

# Installation and Use

Clone the repo and open the folder in the code editor of your choice. 

# License

MIT License

Copyright (c) [2021] [Tomek Regulski]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.