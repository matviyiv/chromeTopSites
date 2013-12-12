var topSites = (function () {
  var init = function () {
    chrome.topSites.get(this.displayTopSites_);
  },

  displayTopSites_ = function (data) {
    var container = document.getElementById('content');
    var newList = document.createElement('ul');
    var favicon = '';
    var domain = '';
    var domainMap = {};

    for (var i = 0, len = data.length; i < len; i++) {
      var itemHolder = document.createElement('li');
      var link = document.createElement('a');
      var domainTitle = document.createElement('h4');
      var subList = document.createElement('ul');
      var subItem = document.createElement('li');
      var item = data[i];
      var expandIcon = '<span class="expand">+</span>';

      link.href = item.url;
      link.target = '_blank';
      link.innerHTML = item.title;
      favicon = buildFavicon_(item.url);

      domain = getUrlDomain(item.url);
      if (domain in domainMap) {
        itemHolder = domainMap[domain];
        subList = itemHolder.querySelector('ul');
      } else {
        domainTitle.innerHTML = domain;
        itemHolder.innerHTML = expandIcon + favicon;
        itemHolder.appendChild(domainTitle);
        itemHolder.appendChild(subList);
        domainMap[domain] = itemHolder;

        subList.style.display = 'none';
        itemHolder.onclick = expandSubList;

        subItem.appendChild(link);
        subList.appendChild(subItem);
      }

      
      
      
      newList.appendChild(itemHolder);
    }
    container.innerHTML = '';
    container.appendChild(newList);
  },

  buildFavicon_ = function (url) {
    var iconService = 'http://www.google.com/s2/favicons?domain=';
    var newIcon = '<img src="' + iconService + url + '" >';
      //'height="20" width="20">';
    return newIcon
  },

  getUrlDomain = function (url) {
    var a = document.createElement('a');
    a.href = url;
    return a.hostname;
  },

  expandSubList = function (evt) {
    var itemHolder = evt.target;
    var subList;
    if (itemHolder.tagName.toLowerCase() == 'li') {
      subList = itemHolder.querySelector('ul');
    } else {
      subList = itemHolder.parentNode.querySelector('ul');
    }
    
    if (subList.style.display == 'block') {
      subList.style.display = 'none';
    } else {
      subList.style.display = 'block';
    }
    
    return false
  };

  return {
    init: init,
    displayTopSites_: displayTopSites_,
    getUrlDomain: getUrlDomain
  }
})();

document.addEventListener('DOMContentLoaded', function () {
  //topSites.init();
  var data = [{"title":"Dashboard | GitLab","url":"http://git.sethq.com/"},{"title":"http://dmp.acxm.sethq.com:8080/campaign-analytics/ is not available","url":"http://dmp.acxm.sethq.com:8080/campaign-analytics/"},{"title":"Datamart LLC Mail","url":"http://gmail.com/"},{"title":"People aren't born good or bad. Maybe they're born with tendencies either way, but its the way you live your life that matters.”","url":"http://getinspired365.com/"},{"title":"Error 503 SERVICE_UNAVAILABLE","url":"http://dmp.acxm.sethq.com:8080/"},{"title":"MyAcxiom.com Login","url":"http://dmp.acxm.sethq.com:8080/campaign-analytics/index.html"},{"title":"Новини","url":"http://vk.com/"},{"title":"Gmail: Email from Google","url":"https://accounts.google.com/ServiceLogin?service=mail&passive=true&rm=false&continue=https://mail.google.com/mail/ca/&ss=1&scc=1<mpl=default<mplcache=2&emr=1"},{"title":"Oops! Google Chrome could not connect to dmp.acxm.sethq.com:8080","url":"http://dmp.acxm.sethq.com:8080/index.html"},{"title":"MyAcxiom.com Login","url":"http://localhost:8080/"},{"title":"YouTube","url":"http://www.youtube.com/"},{"title":"▶ A Day To Remember - \"All I Want\" Acoustic (High Quality) - YouTube","url":"https://www.youtube.com/watch?v=8MFIj9XpqkA&list=RD02jXkI1sTDoEg"},{"title":"Dashboard | GitLab","url":"https://git.sethq.com/"},{"title":"Datamart contacts v.1.2. - Google Drive","url":"https://docs.google.com/a/sethq.com/document/d/1WA6FmzGuejwGfA0Zxgs2X8jGxxMJka1HSkeB0ZT-ugs/edit"},{"title":"GitLab","url":"https://git.sethq.com/users/sign_in"},{"title":"Cheap flights – Book cheap flights to Europe - easyJet.com","url":"http://www.easyjet.com/"},{"title":"Campaign Analytics | Acxiom","url":"https://helios.myacxiom.com/campaign-analytics/index.html"},{"title":"Mozilla Developer Network","url":"https://developer.mozilla.org/"},{"title":"Roman Tershak / dmp-web | GitLab","url":"https://git.sethq.com/roman.tershak/dmp-web/issues"},{"title":"Electronic library. Download books free. Finding boooks","url":"http://en.bookfi.org/"}];
  topSites.displayTopSites_(data);
});