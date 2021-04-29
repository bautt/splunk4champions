var initHash = location.hash;
require([
    'jquery',
    'underscore',
    'models/services/data/ui/View',
    'splunkjs/mvc'
    
], function($, _, ViewModel, mvc) {
    debugger;
    $(document).ready(function() {
        var codelements = $('code');
        _.each(codelements, function($element) {
            var code = $element.textContent;
            var $linkSearch = $('<a style="padding-left: 10px" href="search?display.page.search.mode=fast&amp;q='+encodeURIComponent($element.textContent)+'" target="_blank">').append('<img src="/static/app/splunk4champions/images/open-in-browser.png"/>');
            var $linkClipboard = $('<a style="padding-left: 6px" onclick="copyClipboard(\''+encodeURIComponent($element.textContent)+'\');">').append('<img src="/static/app/splunk4champions/images/clipboard.png"/>');
            $element.append($linkSearch[0]);
            $element.append($linkClipboard[0]);
        });
        var h1 = $('h1.dashboard-title');
        _.each(h1, function(element){
            $('#'+element.id).hide();
        });
        window.copyClipboard = function(data) {
            console.log(decodeURIComponent(data));
            navigator.clipboard.writeText(decodeURIComponent(data)).then(function() {
                console.log('Async: Copying to clipboard was successful!');
              }, function(err) {
                console.error('Async: Could not copy text: ', err);
              });
        }
    });
})