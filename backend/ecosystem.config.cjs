module.exports = {
    apps: [
       {
          name: "tickets",
          script: "app.js",
          watch: false,
          //ignore_watch: ['',],
          env: {
             PORT: 3700,
          },
       },
    ],
 };