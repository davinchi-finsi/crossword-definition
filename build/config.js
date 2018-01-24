// set default source and build directories
let config = {
    src: process.cwd() + "/src",
    dist: process.cwd() + "/dist",
    dist2015:process.cwd()+"/esm2015",
    header:`
    <%= pkg.name %> plugin v<%= pkg.version %>
    <%= pkg.homepage %>
    
    Copyright <%= pkg.author %> and other contributors    
    Build: <%= moment().format("DD/MM/YYYY HH:mm") %>
`
};
module.exports = config;