# mumbotsPuppies
pupeteer prac n play

## scrapping data from morgan library website with number of tombs, location, and tomb types.

scrapping data from penn library website with number of tombs, location of tombs, dates of tombs, sales price of tombs, seller, and sold date

The two main scripts ran for web scrapping are available `scr/utils/background.js`, https://github.com/thebabellibrarybot/mumbotsPuppies/blob/main/src/utils/background.js and `scr/utils/priceBackground.js`, https://github.com/thebabellibrarybot/mumbotsPuppies/blob/main/src/utils/priceBackground.js.

*This code will not run since I removed the .env, although some functions will still work.

## background.js

- used to scrap data from the morgan library

- formats meta-data on library resources and uploads it to mongoDB for use in react projects

## priceBackground.js

- used to scrap data from U Penn library

- baseLink sets focus on the sales record of a single contributer

- uploads individual tomb info as well as formats meta-data on library resources

- I never got around to uploading this data or using it in the react project...
