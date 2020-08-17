addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with a randomly chosen URL from the variable URLs
 * @param {Request} request
 * @returns {Response} The response of the randomly chosen URL
 */
async function handleRequest(request) {
  // Fetch a list of URLs from the specified location
  let resourcePath = "https://cfw-takehome.developers.workers.dev/api/variants";
  let urlsArray = [];
  function requestJson(response) {
    return response.json();
  }
  function getUrls(data) {
    urlsArray = data.variants;
  }
  await fetch(resourcePath).then(requestJson).then(getUrls);

  // Pick a random URL to fetch
  let r = Math.floor(Math.random() * urlsArray.length);

  // Fetch the random URL; get Response
  let UrlResponse;
  await fetch(urlsArray[r]).then(response => {UrlResponse = response});

  // Customize the Response using an HTMLWriter
  return new HTMLRewriter()
    .on('title', new Title())
    .on('h1#title', new PageTitle())
    .on('p#description', new Description())
    .on('a#url', new ActionLink())
    .transform(UrlResponse);
}

/* The below classes tell the HTMLWriter object how to customize the requested page.
 * The comments and text methods are empty because we are only editing elements.
 */

// The title of the webpage. Displayed on the broswer title.
class Title {
  element(element) {
    element.setInnerContent("A custom title!");
  }
  comments(comment) { }
  text(text) { }
}

// The title of the page (default is "Variant 1" or "Variant 2")
class PageTitle {
  element(element) {
    element.setInnerContent("Variant Page Title");
  }
  comments(comment) { }
  text(text) { }
}

// The description paragraph on the page.
class Description {
  element(element) {
    element.setInnerContent("This is a variant of the take home project, with a custom description!");
  }
  comments(comment) { }
  text(text) { }
}

// The Call to Action link with strong emphasis
class ActionLink {
  element(element) {
    element.setAttribute("href", "https://github.com/sd2048");
    element.setInnerContent("A link to my GitHub profile!");
  }
  comments(comment) { }
  text(text) { }
}
