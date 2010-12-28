var BodyParser = (function() {
  var findLinks = /http(s)*:\/\/[0-9a-z\,\;\_\/\.\-\&\=\?\%]+/gi;

  var findUsers = /\^\w{1,}/g;

  var findTags = /#[a-zA-Z0-9ęóąśłżźćń_\-]*/gi;

  function userLink(body, url) {
    return process(body, findUsers, function(user){
      var clean = user.replace(/\^/,'');
      return '<a data-user="'+clean+'" href="'+url+clean+'">'+user+'</a>';
    });
  }
  function tagLink(body,  url) {
    return process(body, findTags, function(tag){
      var clean = tag.replace(/^#/,'');
      return '<a data-tag="'+clean+'" href="'+url+clean+'">'+tag+'</a>';
    });
  }

  function justLink(body) {
    return process(body, findLinks, function(link){
      return '<a class="external" href="'+link+'">'+link+'</a>';
    });
  }

  function process(body, regex, processing_callback) {
    var words = body.split(regex);
    var to_process = body.match(regex);
    if(to_process) {
      var processed = to_process.map(processing_callback);
      return merge(words,processed);
    } else {
      return body;
    }
  }

  // helper function
  function merge(words, processed) {
    var new_body = [];
    for(var i=0, l = words.length;i<l;i++) {
      if(words[i]) {
        new_body.push(words[i]);
      }
      if(processed[i]) {
        new_body.push(processed[i]);
      }
    }
   return new_body.join('');
  }
  return {
   userLink : userLink,
   justLink : justLink,
   tagLink : tagLink
  };
})();