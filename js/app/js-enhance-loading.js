// global vars
// ---------------

var CookieUtils = {
  getCookieValue: function (a, b) {
    b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
  }
};







// function calls
// ---------------

addPrototypeModal();
// addLoadingOverlay();






// functions
// ---------------

function addLoadingOverlay() {
    var body = document.getElementsByTagName('body')[0];
    var overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    // overlay.style['width'] = '100%';
    // overlay.style['height'] = '100%';
    // overlay.style['position'] = 'fixed';
    // overlay.style['display'] = 'table';
    // overlay.style['top'] = '0';
    // overlay.style['bottom'] = '0';
    // overlay.style['left'] = '0';
    // overlay.style['right'] = '0';
    // overlay.style['background'] = '#ffffff';
    // overlay.style['z-index'] = '110';
    // overlay.style['right'] = '0';

    var loader = document.createElement('div');
    loader.innerHTML = '<p>Loading...</p>';
    loader.className = 'loader print--hide';

    overlay.appendChild(loader);
    body.appendChild(overlay);
}



function addPrototypeModal() {

    // console.log(CookieUtils.getCookieValue('onsBetaDisclaimer'));

    var body = document.getElementsByTagName('body')[0];
    var overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    // overlay.style['width'] = '100%';
    // overlay.style['height'] = '100%';
    // // overlay.style['position'] = 'fixed';
    // overlay.style['display'] = 'table';
    // overlay.style['top'] = '0';
    // overlay.style['bottom'] = '0';
    // overlay.style['left'] = '0';
    // overlay.style['right'] = '0';
    // // overlay.style['background'] = 'rgba(255,255,255,0.95)';
    // overlay.style['background'] = '#ffffff';
    // overlay.style['z-index'] = '100';
    // overlay.style['right'] = '0';

    var modal = document.createElement('div');
    modal.innerHTML = '<div class="prototype-modal"><header><h1>ONS Beta <span class="modal-beta">&beta;</span</h1></header><section><p>Welcome to an experimental prototype (beta) for the Office for National Statistics website.</p><p>PLEASE BE AWARE – this is a test website. It may contain inaccuracies or be misleading.</p><p><a href="http://www.ons.gov.uk" title="ONS web site">www.ons.gov.uk</a> remains the official website for ONS information.</p><p>Your suggestions will help us make this site better, so if you have any comments please send us <a href="mailto:web.comments@ons.gov.uk" title="Feedback">feedback</a>.</p><ul class="modal-nav"><li><a href="#" onclick="prototypeModalButtons();" class="btn-modal-continue">Proceed</a></li><li><a class="btn-modal-cancel" href="http://www.ons.gov.uk">Cancel</a></li></ul></section></div>';
    modal.className = 'modal-scrollable print-hidden';

    if(!CookieUtils.getCookieValue('onsBetaDisclaimer')) {
        // console.log('no cookie');

        overlay.appendChild(modal);
        body.appendChild(overlay);
    } else {
        // console.log('has cookie'); 
        try {
            body.removeChild(overlay);
        }catch(err) {
            // console.log(err);
            // console.log('tried removing #modal-overlay but not in dom to remove :)');
        }
    }
}

function prototypeModalButtons() {
    // e.preventDefault();
    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie='onsBetaDisclaimer=true; ' + expires + ';path=/';
    
    //can use jquery as this function will only be aclled when modal is visible, and modal will only be visible when window has loaded meaning jQuery has loaded (at the bottom of the body)
    $('#modal-overlay').fadeOut(300);
}


// moved function to js-enhance to make use of jquery fade functionality
// function acceptBetaDiscalimer() {
//     document.cookie='onsBetaDisclaimer=true';

//     var body = document.getElementsByTagName('body')[0];
//     var overlay = document.getElementById('modal-overlay');
    
//     body.removeChild(overlay);
// }



