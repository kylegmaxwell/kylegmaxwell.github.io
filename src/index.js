'use strict';

function handleLoad() {
    populateFooter();
    populateContainer();
}

var socialNetworks = {
    'linkedin': { url: 'https://www.linkedin.com/in/kylegmaxwell'},
    'facebook': { url: 'https://www.facebook.com/kyle.g.maxwell'},
    'twitter': { url: 'https://twitter.com/kylutofu'},
    'github': { url: 'https://github.com/kylegmaxwell'},
    'googleplus': { url: 'https://plus.google.com/+KyleMaxwellG'}

};

// Automatically create links and images for social networks
function populateFooter() {
    var container = document.querySelector("#networksContainer");
    var networks = Object.keys(socialNetworks);
    var len = networks.length;
    // Iterate over networks and generate tags
    for (var i=0; i<len; i++) {
        var name = networks[i];
        var url = socialNetworks[name].url;

        // Create and attach link element
        var link = document.createElement('a');
        link.href = url;
        container.appendChild(link);
        link.title = 'Kyle Maxwell on '+name+'.';

        // Create and attach image element
        var image = document.createElement('img');
        image.src = 'images/'+name+'.png';
        link.appendChild(image);
        image.classList.add("icon");
    }
}

var links = [
    {
        "url": "https://www.linkedin.com/in/kylegmaxwell",
        "title": "résumé",
        "img": "kyle-maxwell.jpg"
    },{
        "url": "https://www.flickr.com/photos/144961250@N05/albums/72157673757340230",
        "title": "photos",
        "img": "tile-flickr.png"
    },{
        "url": "https://vimeo.com/118302345",
        "title": "fx demo reel",
        "img": "tile-vimeo.png"
    },{
        "url": "demos/fractal/",
        "title": "interactive fractal app",
        "img": "tile-fractal.jpg"
    },{
        "url": "demos/ballpit/",
        "title": "box2d physics experiment",
        "img": "tile-ballpit.png"
    },{
        "url": "https://time-sweeper.herokuapp.com",
        "title": "game app with oauth login",
        "img": "tile-timesweeper.png"
    },{
        "url": "https://slice-check.herokuapp.com",
        "title": "visualize medical data",
        "img": "slice-check.png"
    }
];

function populateContainer() {

    var container = document.querySelector("#tilesContainer");
    var len = links.length;
    // Iterate over tiles and generate content
    for (var i=0; i<len; i++) {
        var title = links[i].title;
        var url = links[i].url;
        var img = links[i].img;


        // Create and attach link element
        var link = document.createElement('a');
        link.href = url;
        link.title = title;
        container.appendChild(link);

        var div = document.createElement('div');
        div.classList.add('item');
        link.appendChild(div);

        // Create and attach image element
        var image = document.createElement('img');
        image.src = 'images/'+img;
        image.classList.add('tile');
        div.appendChild(image);

        var span = document.createElement('span');
        var text = document.createTextNode(title);
        span.classList.add('title');
        span.appendChild(text);
        div.appendChild(span);
    }
}