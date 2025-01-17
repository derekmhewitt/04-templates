'use strict';

var articles = [];

function Article (opts) {
  for (key in opts) this[key] = opts[key];
};

Article.prototype.toHtml = function() {
  // TODO: Done Erica - Use handlebars to render your articles!
  //       - Select your template from the DOM.
  //       - Now "compile" your template with Handlebars.
  var source = $('#blog_article_template').html();
  var templateFunction = Handlebars.compile(source);

  // DONE: If your template will use properties that aren't on the object yet, add them.
  //   Since your template can't hold any JS logic, we need to execute the logic here.
  //   The result is added to the object as a new property, which can then be referenced
  //   by a key in the template. For example, you might want to display how old a post is,
  //   or say "(draft)" if it has no publication date:
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  // TODO: Done Erica Use the function that Handlebars gave you to return your filled-in
  //       html template for THIS article.
  return templateFunction(this);
};

ourLocalData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

ourLocalData.forEach(function(ele) {
  articles.push(new Article(ele));
});

articles.forEach(function(a){
  $('#articles').append(a.toHtml());
});
