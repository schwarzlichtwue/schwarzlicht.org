/*  Copyright 2010  Stefan Strigler <stefan@strigler.de>

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

(function() {

    var scripts = document.getElementsByTagName('script');
    var baseURL = '';
    for (var i=0; i<scripts.length; i++)
        if (scripts[i].src.match(/(.*)premium\.js$/))
            baseURL = RegExp.$1;

    ProNN = {

        VERSION: '1.3.2',

        shockerz: [
           "	<p class='red'>Sie haben keinen Zugriff auf diese Inhalte!<br />\
		Ihr Provider will mehr Geld verdienen!</p>\
		<p>Jetzt auf das <strong>Superduper-XXL</strong>-Paket upgraden<br />\
		und schon k&ouml;nnen auch Sie wieder Videos online gucken!</p>",

           "	<p class='red'>Ihr Provider unterst&uuml;tzt diese \
Inhalte nicht, wir m&ouml;chten Sie daher bitten, auf andere Websites \
auszuweichen.</p>\
		<p>Jetzt auf das <strong>Superduper XXL</strong>-Paket upgraden<br />\
		und schon k&ouml;nnen auch Sie wieder Videos online gucken!</p>",
		
           "	<p class='red'>Videos kosten extra! <br>\
		 Wo kommen wir denn da hin?</p>\
		<p>Jetzt auf das <strong>Superduper XXL</strong>-Paket upgraden<br />\
		und schon k&ouml;nnen auch Sie wieder Videos online gucken!</p>"
        ],

        CSS: [''
, '.proNN { padding: 30px 0; }'

,'.proNN .container {'
,'    background: url("'+baseURL+'bg.png") no-repeat;'
,'    color: #333;'
,'    display: block;'
,'    font-family: "Helvetica", sans-serif;'
,'    font-size: 14px;'
,'    height: 162px;'
,'    line-height: 18px;'
,'    padding: 40px 40px 0;'
,'    position: relative;'
,'    width: 372px;'
,'}'

,'.proNN p { margin: 0 0 18px 0; }'

,'.proNN strong { text-transform: uppercase; }'

,'.proNN .red { '
,'    color: #c40000; '
,'    font-weight: bold;'
,'}'

,'.proNN button {'
,'    background: #fff;'
,'    border: 1px solid #ccc;'
,'    bottom: 20px;'
,'    color: #c40000;'
,'    display: block;'
,'    font-family: "Helvetica", sans-serif;'
,'    font-size: 14px;'
,'    left: 40px;'
,'    padding: 6px 10px 3px;'
,'    position: absolute;'
,'    cursor: pointer;'
,'}'
             ].join(" "),

        init: function() {
            try {
                // check for cookie
                var c = ProNN.readCookie('proNN') || 0; 
                if (c == 'clicked') return;
                var now = new Date();
                if (now.getTime() < c+3600*24*7) return;
                
                // set cookie
                if (c<10) c++;
                else // set c to current timestamp
                    c = now.getTime();

                // youtube embed as object
                var objs = ProNN.filterElements(
                    [],
                    document.getElementsByTagName('object'),
                    function(obj) {
                        return obj.innerHTML.match(/youtube/);
                    });
                // youtube embeded as embed
                objs = ProNN.filterElements(
                    objs,
                    document.getElementsByTagName('embed'),
                    function(obj) {
                        // skip those we already got
                        if (obj.src.match(/youtube/)) {
                            while (obj.parentElement && obj.tagName != 'OBJECT') obj = obj.parentElement;
                            return (obj.tagName != 'OBJECT');
                        }
                        return false;
                    });
                
                // vimeo
                objs = ProNN.filterElements(
                    objs,
                    document.getElementsByTagName('iframe'),
                    function(obj) {
                        return obj.src.match(/vimeo/);
                    });

                if (objs.length > 0)
                    ProNN.createCookie('proNN', c, 365)

                var replaced = [];
                for (var i=0; i<objs.length; i++) {
                    try {
                        var replacement  = document.createElement('div');
                        replacement.className = 'proNN';
                        replacement.id = 'proNN_'+i;
                        var container = replacement.appendChild(document.createElement('div'));
                        container.className = 'container';
                        var shockerIdx = Math.round(Math.random()*(ProNN.shockerz.length-1));
                        container.innerHTML = ProNN.shockerz[shockerIdx];
                        var button = container.appendChild(document.createElement('button'));
                        button.className = 'moreInfo';
                        button.innerHTML = 'Jetzt upgraden!';
                        button.onclick = function() { 
                            ProNN.createCookie('proNN', 'clicked', 365); 
                            open('http://pro-netzneutralitaet.de','proNN', 'width=800, height=600');
                            return true;
                        };
                        replacement.onclick = function() {
                            this.parentNode.replaceChild(replaced[this.id], this); 
                            return false;
                        };
                        replaced[replacement.id] = objs[i].parentNode.replaceChild(replacement, objs[i]);
                    } catch(e1) { }
                }
            } catch(e) { }
        },

        // quirks mode cookies -- http://www.quirksmode.org/js/cookies.html
        createCookie: function(name,value,days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        },
        
        filterElements: function(acc, elements, fun) {
            for (i=0; i<elements.length; i++) {
                if (fun(elements[i])) acc.push(elements[i]);
            }
            return acc;
        },

        readCookie: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }

    };

    var style = '<style type="text/css">' + ProNN.CSS + '</style>';
    document.write(style);

    if (typeof onload == 'function') sonload = onload;
    onload = function() {
        ProNN.init();
        
        if (typeof sonload == 'function') sonload();
    };
}());
