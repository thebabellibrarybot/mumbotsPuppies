# mumbotsPuppies
pupeteer prac n play

## scrapping data from morgan library and u-penn library website with number of tombs, location, sales records and tomb types.

scrapping data from penn library website with number of tombs, location of tombs, dates of tombs, sales price of tombs, seller, and sold date. 

## overview
I used two very similare websites that had different data fields available as a way to try to make the webscrapping process re-usable for different websites. My first thought was to make scappers where each websiste was it's own class component with function that allow a user to dictate very specific data that they want scrapped for exculivly that one website. After reading up on puppeteer best practices I realized that it might be more benificial to make functions that were re-usable for a variety of websites that extract very general data. I suppose that the very general and messy data that is able to be scrapped with this second approach can be filtered when uploading data to the database, or in controllers during axios calls (although formatting data in a controller seems to really slow down the process so I'm a little unsure about this).

## code location
The two main scripts ran for web scrapping are available at the following locations:
#### background.js: data from morgan library
`scr/utils/background.js`, https://github.com/thebabellibrarybot/mumbotsPuppies/blob/main/src/utils/background.js 
#### priceBackground.js: data from u-penn library
`scr/utils/priceBackground.js`, https://github.com/thebabellibrarybot/mumbotsPuppies/blob/main/src/utils/priceBackground.js.

*This code will not run since I removed the .env, although some functions will still work.

## on background.js

- used to scrap data from the morgan library

- formats meta-data on library resources and uploads it to mongoDB for use in react projects

## on priceBackground.js

- used to scrap data from U Penn library

- baseLink sets focus on the sales record of a single contributer

- uploads individual tomb info as well as formats meta-data on library resources

- I never got around to uploading this data or using it in the react project...
