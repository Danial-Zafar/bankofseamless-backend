import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import FormData = require('form-data');
import { parse } from 'node-html-parser';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class IbanService {
  constructor(private httpService: HttpService) {}

  validateIban(iban: string) {
    const dom = this.sendVerificationRequest(iban);
    return this.findImageNode(dom);
  }

  sendVerificationRequest(iban: string) {
    const dom = `<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Success! This is a correct IBAN - Wise</title>
    <meta property="og:title" content="Success! This is a correct IBAN - Wise" />
    <meta name="twitter:title" content="Success! This is a correct IBAN - Wise" />
    <meta name="description" content="Check and verify any IBAN. Our IBAN checker and calculator will tell you if an IBAN is right, and find the name, branch and address for the bank it belongs to." />
    <meta property="og:description" content="Check and verify any IBAN. Our IBAN checker and calculator will tell you if an IBAN is right, and find the name, branch and address for the bank it belongs to." />
    <meta name="twitter:description" content="Check and verify any IBAN. Our IBAN checker and calculator will tell you if an IBAN is right, and find the name, branch and address for the bank it belongs to." />
    <meta name="format-detection" content="telephone=no">
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Wise" />
    <meta property="fb:app_id" content="274548709260402" />
    <meta name="twitter:widgets:csp" content="on" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@wise" />
    <meta name="twitter:creator" content="@wise" />
    
    <meta property="og:image" content="https://lienzo.s3.amazonaws.com/images/d3f19f57d991f2c202ae4372a8458bf5-og-image-iban.png" />
    <meta name="twitter:image" content="https://lienzo.s3.amazonaws.com/images/d3f19f57d991f2c202ae4372a8458bf5-og-image-iban.png" />
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://wise.com/us/iban/checker" />
    <meta property="og:url" content="https://wise.com/us/iban/checker" />
    <link href="https://wise.com/cz/iban/checker" hreflang="cs" rel="alternate" />
    <link href="https://wise.com/de/iban/checker" hreflang="de" rel="alternate" />
    <link href="https://wise.com/ch/iban/checker" hreflang="de-CH" rel="alternate" />
    <link href="https://wise.com/gr/iban/checker" hreflang="el" rel="alternate" />
    <link href="https://wise.com/au/iban/checker" hreflang="en-AU" rel="alternate" />
    <link href="https://wise.com/ca/iban/checker" hreflang="en-CA" rel="alternate" />
    <link href="https://wise.com/gb/iban/checker" hreflang="en-GB" rel="alternate" />
    <link href="https://wise.com/hk/iban/checker" hreflang="en-HK" rel="alternate" />
    <link href="https://wise.com/ie/iban/checker" hreflang="en-IE" rel="alternate" />
    <link href="https://wise.com/in/iban/checker" hreflang="en-IN" rel="alternate" />
    <link href="https://wise.com/nz/iban/checker" hreflang="en-NZ" rel="alternate" />
    <link href="https://wise.com/sg/iban/checker" hreflang="en-SG" rel="alternate" />
    <link href="https://wise.com/us/iban/checker" hreflang="en-US" rel="alternate" />
    <link href="https://wise.com/es/iban/checker" hreflang="es" rel="alternate" />
    <link href="https://wise.com/fr/iban/checker" hreflang="fr" rel="alternate" />
    <link href="https://wise.com/hu/iban/checker" hreflang="hu" rel="alternate" />
    <link href="https://wise.com/it/iban/checker" hreflang="it" rel="alternate" />
    <link href="https://wise.com/jp/iban/checker" hreflang="ja" rel="alternate" />
    <link href="https://wise.com/nl/iban/checker" hreflang="nl" rel="alternate" />
    <link href="https://wise.com/pl/iban/checker" hreflang="pl" rel="alternate" />
    <link href="https://wise.com/br/iban/checker" hreflang="pt-BR" rel="alternate" />
    <link href="https://wise.com/ro/iban/checker" hreflang="ro" rel="alternate" />
    <link href="https://wise.com/ru/iban/checker" hreflang="ru" rel="alternate" />
    <link href="https://wise.com/se/iban/checker" hreflang="sv" rel="alternate" />
    <link href="https://wise.com/tr/iban/checker" hreflang="tr" rel="alternate" />
    <link href="https://wise.com/zh-hk/iban/checker" hreflang="zh-Hant" rel="alternate" />
    <link href="https://wise.com/gb/iban/checker" hreflang="x-default" rel="alternate" />
    <link rel="shortcut icon" href="/iban-resources/img/favicon.ico" />
    <link type="text/css" rel="stylesheet" href="/iban-resources/css/iban.css" />
    <script>
          config = window.config || {};
          config.lang = "en_US"
        </script>
    <script src="/cookie-consent.js"></script>
    <script type="text/javascript" src="/iban-resources/js/cookie-consent-utils.js"></script>
    <script type="text/javascript" src="/iban-resources/js/vendor.js" defer></script>
    <script type="text/javascript" src="/iban-resources/js/iban.js" defer></script>
    <script>
        //<![CDATA[
        (function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
            0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
            for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
        var optOut = !hasValidCookieConsent();
        window.mixpanel.init("e605c449bdf99389fa3ba674d4f5d919", {
          opt_out_tracking_by_default: optOut,
          opt_out_persistence_by_default: optOut
        });
        optOut && window.addEventListener("accepttwcookieconsent", function() {
          window.mixpanel.opt_in_tracking();
        });
        //]]>
    </script>
    <script>
        //<![CDATA[
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push([{
            'pageName': "Success! This is a correct IBAN",
            'url': window.location.href
        }]);
        //]]>
    </script>
    <script>
        // Begin Google Tag Manager (Live)
        //<![CDATA[
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://gtm.wise.com/wisetag?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer',"GTM-M7V2XH");
        //]]>
        // End Google Tag Manager
    </script>
    <script>
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'event': 'ibanSuccessPage',
              'ibanBankName': "RAIFFEISEN BANK SH.A.",
              'ibanCountryCode': "AL"
            });
        </script>
    <script type="text/javascript" src="/iban-resources/js/comparison-table.js" defer></script>
    </head>
    <body>
    <noscript>
        <!-- Google Tag Manager (Live) -->
        <iframe src="https://gtm.wise.com/ns.html?id=GTM-M7V2XH"
                          height="0" width="0" style="display:none;visibility:hidden"></iframe>
        <!-- End Google Tag Manager -->
    </noscript>
    <div id="public-navigation" data-reactroot=""><a href="#main" class="btn btn-primary tw-public-navigation-btn-skip">Skip to main content</a><header class="navbar navbar-static-top navbar--redesign navbar--wise navbar--redesign-en_US navbar--inverse navbar--submenu" data-tracking-id="public-navigation"><div class="container"><div class="tw-public-navigation-menu__header pull-lg-left"><button class="tw-public-navigation-menu__menu-toggle visible-md visible-xs visible-sm collapsed" aria-controls="navbar" aria-expanded="false" type="button"><div><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></div></button><div class="pull-xs-left tw-public-navigation__logo  "><a href="/" class="navbar-brand-logo hidden-lg"><img src="https://wise.com/public-resources/assets/logos/wise/brand_logo_inverse.svg" alt="Wise" /></a><a href="/" class="navbar-fast-flag visible-lg"><img src="https://wise.com/public-resources/assets/logos/wise/brand_flag.svg" alt="Wise" /></a></div><ul class="pull-right visible-md visible-xs visible-sm tw-public-navigation-menu__buttons"><li class="navbar-btn"><a href="/register/" class="btn text-ellipsis btn-default" title="Register" target="_top">Register</a></li></ul></div><nav id="navbar" class="tw-public-navigation-menu navbar-collapse navbar-collapse-with-panel collapse"><div class="tw-public-navigation-menu__sidebar navbar-collapse-panel"><div class="tw-public-navigation-menu__header pull-lg-left"><button class="tw-public-navigation-menu__menu-toggle visible-md visible-xs visible-sm pull-xs-right sidebar-closeBtn collapsed" aria-controls="navbar" aria-expanded="false" type="button"><span class="tw-icon tw-icon-cross " aria-hidden="true" role="presentation"><svg width="24" height="24" fill="currentColor" focusable="false"><path d="M12 13.414l7.293 7.293 1.414-1.414L13.414 12l7.293-7.293-1.414-1.414L12 10.586 4.707 3.293 3.293 4.707 10.586 12l-7.293 7.293 1.414 1.414L12 13.414z"></path></svg></span></button><div class="pull-xs-left tw-public-navigation__logo  hidden-lg hidden-xl"><a href="/" class="navbar-brand-logo hidden-lg"><img src="https://wise.com/public-resources/assets/logos/wise/brand_logo_inverse.svg" alt="Wise" /></a><a href="/" class="navbar-fast-flag visible-lg"><img src="https://wise.com/public-resources/assets/logos/wise/brand_flag.svg" alt="Wise" /></a></div></div><ul class="nav navbar-nav navbar-nav--tabs"><li class="navbar-btn"><a href="/us/" class="btn text-ellipsis btn-active btn-link btn-tab" title="Personal">Personal</a></li><li class="navbar-btn navbar-btn--divider" aria-hidden="true"> </li><li class="navbar-btn"><a href="/us/business/" class="btn text-ellipsis btn-link btn-tab" title="Business">Business</a></li></ul><div class="navbar-item-wrapper"><ul class="nav navbar-nav navbar-right"><li class="dropdown" tabindex="-1"><button class="dropdown-toggle tw-link-with-chevron" type="button"><span class="tw-public-navigation-item-content__text text-ellipsis">Money transfer</span><span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></button><ul class="dropdown-menu tw-public-navigation-menu__dropdown-menu "><li class="dropdown-cta"><a href="/us/send-money/" class="callout-container dropdown-content"><img class="m-b-3  visible-lg visible-xl" src="https://daw291njkc3ao.cloudfront.net/conversion/navigation/send-money.svg" alt="" /><strong class="tw-link-with-chevron ">Send money<span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon hidden" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></strong><p class="m-t-1 m-b-0 visible-lg visible-xl">Make a one-off payment. You&#x27;ll get the real exchange rate with the low fee we&#x27;re known for.</p></a></li><li class=""><a href="/us/large-amounts/" class="callout-container dropdown-content"><strong class="tw-link-with-chevron ">Send large amounts<span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon hidden" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></strong></a></li><li class=""><a href="/us/about/our-story" class="callout-container dropdown-content"><strong class="tw-link-with-chevron ">About Wise<span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon hidden" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></strong></a></li></ul></li><li class="dropdown" tabindex="-1" data-analytics-id="receive"><button class="dropdown-toggle tw-link-with-chevron" type="button"><span class="tw-public-navigation-item-content__text text-ellipsis">Multi-currency account</span><span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></button><ul class="dropdown-menu tw-public-navigation-menu__dropdown-menu "><li class="dropdown-cta"><a href="/us/multi-currency-account/" class="callout-container dropdown-content"><img class="m-b-3 mca visible-lg visible-xl" src="https://wise.com/public-resources/assets/public-navigation/multi_currency_account_v2.svg" alt="" /><strong class="tw-link-with-chevron ">Multi-currency account<span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon hidden" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></strong><p class="m-t-1 m-b-0 visible-lg visible-xl">Manage your money across 50+ currencies. Send at the real exchange rate, and spend with a Wise debit card.</p></a></li><li class=""><a href="/us/multi-currency-account/#features" class="callout-container dropdown-content"><strong class="tw-link-with-chevron ">Product features<span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon hidden" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></strong></a></li><li class=""><a href="/us/multi-currency-account/pricing" class="callout-container dropdown-content"><strong class="tw-link-with-chevron ">Pricing<span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon hidden" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></strong></a></li><li class=""><a href="/us/multi-currency-account/#use-case" class="callout-container dropdown-content"><strong class="tw-link-with-chevron ">Use cases<span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon hidden" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></strong></a></li><li class=""><a href="/us/multi-currency-account/#getting-started" class="callout-container dropdown-content"><strong class="tw-link-with-chevron ">Getting started<span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon hidden" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></strong></a></li><li class=""><a href="/us/multi-currency-account/#protecting-your-money" class="callout-container dropdown-content"><strong class="tw-link-with-chevron ">Protecting your money<span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon hidden" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></strong></a></li><li class=""><a href="/us/multi-currency-account/#coverage" class="callout-container dropdown-content"><strong class="tw-link-with-chevron ">Coverage<span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon hidden" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></strong></a></li></ul></li><li class="tw-public-navigation-menu__help" tabindex="-1"><a href="/help/" class="tw-link-with-chevron" target="_blank"><span class="tw-public-navigation-item-content__text text-ellipsis">Help</span><span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon visible-xs-inline-block visible-sm-inline-block visible-md-inline-block" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></a></li></ul><ul class="nav navbar-nav navbar--submenu-menu"><li class="" tabindex="-1"><a href="/us/iban/" class="navbar-title-link tw-link-with-chevron"><span class="tw-public-navigation-item-content__text text-ellipsis"><span>IBAN</span></span><span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon visible-xs-inline-block visible-sm-inline-block visible-md-inline-block" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></a></li><li class="active" tabindex="-1"><a href="/us/iban/checker" class="tw-link-with-chevron"><span class="tw-public-navigation-item-content__text text-ellipsis"><span>Check an IBAN</span></span><span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon visible-xs-inline-block visible-sm-inline-block visible-md-inline-block" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></a></li><li class="" tabindex="-1"><a href="/us/iban/calculator" class="tw-link-with-chevron"><span class="tw-public-navigation-item-content__text text-ellipsis"><span>Calculate an IBAN</span></span><span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon visible-xs-inline-block visible-sm-inline-block visible-md-inline-block" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></a></li><li class="" tabindex="-1"><a href="/us/iban/example" class="tw-link-with-chevron"><span class="tw-public-navigation-item-content__text text-ellipsis"><span>Search by country</span></span><span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon visible-xs-inline-block visible-sm-inline-block visible-md-inline-block" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></a></li><li class="" tabindex="-1"><a href="https://wise.com/us/swift-codes/" class="tw-link-with-chevron"><span class="tw-public-navigation-item-content__text text-ellipsis"><span>Find a SWIFT/BIC code</span></span><span class="tw-icon tw-icon-chevron-right tw-link-with-chevron-icon visible-xs-inline-block visible-sm-inline-block visible-md-inline-block" aria-hidden="true" role="presentation"><svg width="16" height="16" fill="currentColor" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 8L5.347 1.4 4.2 2.537 9.707 8 4.2 13.463 5.347 14.6 12 8z"></path></svg></span></a></li></ul><ul class="nav navbar-nav navbar-right button-items-nav-wrapper"><li class="navbar-btn"><a href="/login/" class="btn text-ellipsis btn-link" title="Log in" target="_top">Log in</a></li><li class="navbar-btn"><a href="/register/" class="btn text-ellipsis btn-default" title="Register" target="_top">Register</a></li></ul></div></div></nav></div></header></div>
    <script>window.publicNavigation_PRELOADED_STATE_ = {"language":"en-US","locale":"us","activePath":"/us/iban/checker","variant":"wise","skipToContentHref":"#main","submenuItems":[{"link":"/us/iban/","translatedText":"IBAN","isTitle":true},{"link":"/us/iban/checker","translatedText":"Check an IBAN","isTitle":false},{"link":"/us/iban/calculator","translatedText":"Calculate an IBAN","isTitle":false},{"link":"/us/iban/example","translatedText":"Search by country","isTitle":false},{"link":"https://wise.com/us/swift-codes/","translatedText":"Find a SWIFT/BIC code","isTitle":false}]}</script>
    <section id="main">
    <section class="section p-b-0">
    <div class="container">
    <div class="row text-xs-center text-md-left m-b-4">
    <div class="col-xs-12 col-md-6">
    <img class="m-b-2" src="/iban-resources/img/success-icon.svg" alt="">
    <h1 class="colored-dot">This IBAN looks right</h1>
    <p>Remember to check it with your recipient or bank though. We can’t tell you if it’s real, or if it’s the right IBAN for a particular account.</p>
    <div class="form-group js-copy-input" data-copy-tooltip-message="Copied">
    <label class="small visible-md visible-lg visible-xl" for="success-iban-number">IBAN</label>
    <div class="input-group">
    <input value="AL35202111090000000001234567" type="text" class="form-control" id="success-iban-number">
    <span class="input-group-btn">
    <button id="success-copy-btn" class="btn btn-primary" type="submit">Copy</button>
    </span>
    </div>
    </div>
    <div class="bg-default p-a-4">
    <p class="m-b-0">Valid IBAN details:</p>
    <h3 class="m-b-2">AL35 2021 1109 0000 0000 0123 4567</h3>
    <p class="small">RR &#39;DESHMORET E 4 SHKURTIT&#39; 6, TIRANA, 1010</p>
    <img class="d-block m-b-4 bank-logo" src="https://dq8dwmysp7hk1.cloudfront.net/logos/raiffeisen-bank.svg" alt="RAIFFEISEN BANK SH.A.">
    <a href="#comparison-section" class="d-flex align-items-center">
    <span>Compare prices for sending money abroad</span>
    <span class="tw-icon tw-link-with-chevron-icon m-l-1">
    <svg width="10" height="10" fill="currentColor">
    <path fill-rule="evenodd" d="M7.913 5L3.235.064 2.087 1.275 5.616 5l-3.53 3.725 1.149 1.211z"></path>
    </svg>
    </span>
    </a>
    </div>
    </div>
    <div class="col-xs-12 col-md-5 col-md-offset-1">
    <div>
    <div class="card text-xs-center">
    <img class="header-cta__image m-b-2" src="/iban-resources/img/header-cta.jpg" alt="">
    <h3 class="m-b-2">Got the right IBAN? Now get a better deal for sending money.</h3>
    <p>Wise is the cheaper, faster and easier way to get the best possible exchange rate. Join over 12 million people who save when they send money with us.</p>
    <a class="btn btn-success m-b-2 btn-block" href="/us">Get started for free</a>
    <a class="btn btn-default btn-play text-wrap btn-block video" href="https://www.youtube.com/watch?v=MLKKzRvOsLQ" target="_blank" rel="noopener">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.1 22.5" class="btn-play__icon">
    <path d="M15.1 10.6c.3.1.5.5.4.9v.1c-.1.1-.2.3-.3.4L2.8 20.3c-.5.4-1 .1-1-.5V2.7c0-.7.5-.9 1-.5l12.3 8.4" fill="#fff" />
    </svg>
    <span>How we send money — watch now</span>
    </a>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    <section class="section p-b-0" id="breakdown">
    <div class="container">
    <div class="row">
    <div class="col-xs-12 col-md-10 col-md-offset-1">
    <h2 class="m-b-2 text-xs-center">What is an IBAN number?</h2>
    <p class="text-xs-center">IBAN stands for International Bank Account Number. It’s an internationally-agreed code made up of up to 34 letters and numbers that helps banks to process transfers around the world.</p>
    <p class="text-xs-center">Each set of characters represents a different detail for your bank account. You can see the breakdown of this IBAN number below.</p>
    <div class="row">
    <div class="col-md-6 col-md-offset-3 text-xs-center">
    <div class="form-group js-copy-input" data-copy-tooltip-message="Copied">
    <label class="small" for="breakdown-iban-number">IBAN</label>
    <div class="input-group">
    <input value="AL35202111090000000001234567" type="text" class="form-control" id="breakdown-iban-number" />
    <span class="input-group-btn">
    <button class="btn btn-primary" type="submit" id="breakdown-copy-btn">Copy</button>
    </span>
    </div>
    </div>
    </div>
    </div>
    <div class="row">
    <div class="col-md-6 col-md-offset-3 text-xs-center">
    <div class="form-group">
    <label class="small p-b-1" for="iban-number-print">IBAN in print format</label>
    <div class="input-group">
    <input value="AL35 2021 1109 0000 0000 0123 4567" type="text" class="form-control" id="iban-number-print" readonly />
    </div>
    </div>
    </div>
    </div>
    <div class="card m-t-4">
    <div class="iban-breakdown">
    <div class="iban-breakdown__item">
    <span class="iban-breakdown__code">AL</span>
    <span class="iban-breakdown__label">Country code</span>
    </div>
    <div class="iban-breakdown__item">
    <span class="iban-breakdown__code">35</span>
    <span class="iban-breakdown__label">Check digits</span>
    </div>
    <div class="iban-breakdown__item">
    <span class="iban-breakdown__code">202</span>
    <span class="iban-breakdown__label">Bank code</span>
    </div>
    <div class="iban-breakdown__item">
    <span class="iban-breakdown__code">1110</span>
    <span class="iban-breakdown__label">Branch code</span>
    </div>
    <div class="iban-breakdown__item">
    <span class="iban-breakdown__code">9</span>
    <span class="iban-breakdown__label">National check digit</span>
    </div>
    <div class="iban-breakdown__item">
     <span class="iban-breakdown__code">0000000001234567</span>
    <span class="iban-breakdown__label">Bank account number</span>
    </div>
    </div>
    <div class="row">
    <div class="col-md-8 col-md-offset-2 text-xs-center m-t-4 p-a-1 bg-default">
    <span class="small m-r-1">IBAN in print format</span>
    <span class="small">AL35 2021 1109 0000 0000 0123 4567</span>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    <section class="section bg--light">
    <div class="container text-xs-center">
    <h2 class="m-b-5 m-t-0 colored-dot colored-dot-info">A cheaper, faster way to send money abroad</h2>
    <div class="row vertical-align-center">
    <div class="hidden-xs hidden-sm col-md-offset-0 col-md-6">
    <img src="/iban-resources/img/mathu.jpg" alt="??iban.review.image_en_US??" class="img-responsive img-max-height center-block" />
    </div>
    <div class="hidden-xs hidden-sm col-md-offset-0 col-md-6 review-story-box text-md-left">
    <div class="img-responsive bg--dark img-max-height center-block">
    <div class="review-story">
    <h2 class="m-b-1 inverse-text">I use Wise to send money to my family in India.</h2>
    <h4 class="m-b-1 inverse-text">Mathu, London, UK</h4>
    <a class="tw-video-button btn btn-default m-t-2 video" href="https://www.youtube.com/watch?v=cARPPZQZJ0I" target="_blank" rel="noopener nofollow noreferrer">
    <div class="tw-video-button__icon hidden-xs">
    <svg class="tw-play-icon" width="30" height="30" xmlns="http://www.w3.org/2000/svg"><path d="M15 0c8.284 0 15 6.624 15 14.796v.408C30 23.376 23.284 30 15 30 6.716 30 0 23.376 0 15.204v-.408C0 6.624 6.716 0 15 0zm4.655 14.796l-7.241-5.612v11.224l7.241-5.612z" fill-rule="nonzero"></path></svg>
    </div>
    <span class="tw-video-button__text">See Mathu’s story</span>
    </a>
    </div>
    </div>
    <span class="review-circle"></span>
    </div>
    <div class="col-xs-10 col-xs-offset-1 col-sm-10 col-md-6 col-md-offset-3 text-xs-left">
    <img src="/iban-resources/img/mathu.jpg" alt="??iban.review.image_en_US??" class="img-responsive img-max-height center-block hidden-md hidden-lg hidden-xl" />
    <div class="hidden-md hidden-lg hidden-xl review-story-box-mobile">
    <div class="bg--dark img-max-height center-block">
    <div class="review-story">
    <h2 class="m-b-1 inverse-text">I use Wise to send money to my family in India.</h2>
    <h4 class="m-b-1 inverse-text">Mathu, London, UK</h4>
    <a class="tw-video-button btn btn-default m-t-2 video" href="https://www.youtube.com/watch?v=cARPPZQZJ0I" target="_blank" rel="noopener">
    <div class="tw-video-button__icon hidden-xs">
    <svg class="tw-play-icon" width="30" height="30" xmlns="http://www.w3.org/2000/svg"><path d="M15 0c8.284 0 15 6.624 15 14.796v.408C30 23.376 23.284 30 15 30 6.716 30 0 23.376 0 15.204v-.408C0 6.624 6.716 0 15 0zm4.655 14.796l-7.241-5.612v11.224l7.241-5.612z" fill-rule="nonzero"></path></svg>
    </div>
    <span class="tw-video-button__text">See Mathu’s story</span>
    </a>
    </div>
    </div>
    <span class="review-circle"></span>
    </div>
    </div>
    </div>
    </div>
    </section>
    <section class="section" id="reviews">
    <div class="container text-xs-center">
    <div class="row">
    <div class="col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8">
    <h2 class="m-b-2">We have a 4.6 out of 5 rating on Trustpilot</h2>
    <p class="m-b-5">It’s your money. You can trust us to get it where it needs to be, but don’t take our word for it. Read our reviews at Trustpilot.com</p>
    </div>
    </div>
    <div class="d-flex flex-column flex-row--md">
    <div class="m-b-5 m-a-1 flex__inner center-block">
    <div>
    <p class="m-b-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
    <path fill="#FFA600" fill-rule="evenodd" d="M8.6 12.9l-5 2.6.9-5.6-4.1-4 5.7-.8L8.6 0l2.6 5.1 5.6.8-4.1 4 1 5.6z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
    <path fill="#FFA600" fill-rule="evenodd" d="M8.6 12.9l-5 2.6.9-5.6-4.1-4 5.7-.8L8.6 0l2.6 5.1 5.6.8-4.1 4 1 5.6z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
    <path fill="#FFA600" fill-rule="evenodd" d="M8.6 12.9l-5 2.6.9-5.6-4.1-4 5.7-.8L8.6 0l2.6 5.1 5.6.8-4.1 4 1 5.6z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
    <path fill="#FFA600" fill-rule="evenodd" d="M8.6 12.9l-5 2.6.9-5.6-4.1-4 5.7-.8L8.6 0l2.6 5.1 5.6.8-4.1 4 1 5.6z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
    <path fill="#FFA600" fill-rule="evenodd" d="M8.6 12.9l-5 2.6.9-5.6-4.1-4 5.7-.8L8.6 0l2.6 5.1 5.6.8-4.1 4 1 5.6z" />
    </svg>
    </p>
    <h5 class="m-t-3" title="Very easy to use money transfer app. Best exchange rates and low fees. Only drawback for me is the time it takes for my transfer to get into my bank account, I.e. it takes the next day">Very easy to use money transfer app. Best exchange rates and low fees. Only drawback for me is the time it takes for my transfer to get into my bank a...</h5>
    <h6 class="m-t-2">George Abeiku Koomson</h6>
    <h6>Published 21 minutes ago</h6>
    </div>
    </div>
    <div class="m-b-5 m-a-1 flex__inner center-block">
    <div>
    <p class="m-b-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
    <path fill="#FFA600" fill-rule="evenodd" d="M8.6 12.9l-5 2.6.9-5.6-4.1-4 5.7-.8L8.6 0l2.6 5.1 5.6.8-4.1 4 1 5.6z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
    <path fill="#FFA600" fill-rule="evenodd" d="M8.6 12.9l-5 2.6.9-5.6-4.1-4 5.7-.8L8.6 0l2.6 5.1 5.6.8-4.1 4 1 5.6z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
    <path fill="#FFA600" fill-rule="evenodd" d="M8.6 12.9l-5 2.6.9-5.6-4.1-4 5.7-.8L8.6 0l2.6 5.1 5.6.8-4.1 4 1 5.6z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
    <path fill="#FFA600" fill-rule="evenodd" d="M8.6 12.9l-5 2.6.9-5.6-4.1-4 5.7-.8L8.6 0l2.6 5.1 5.6.8-4.1 4 1 5.6z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
    <path fill="#FFA600" fill-rule="evenodd" d="M8.6 12.9l-5 2.6.9-5.6-4.1-4 5.7-.8L8.6 0l2.6 5.1 5.6.8-4.1 4 1 5.6z" />
    </svg>
    </p>
    <h5 class="m-t-3" title="The best leading distributor around the worldever, I give more than 5 🌟">The best leading distributor around the worldever, I give more than 5 🌟</h5>
    <h6 class="m-t-2">MUHAMMAD ISHAQ MUHAMMAD</h6>
    <h6>Published 24 minutes ago</h6>
    </div>
    </div>
    <div class="m-b-5 m-a-1 flex__inner center-block">
    <div>
    <p class="m-b-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
    <path fill="#FFA600" fill-rule="evenodd" d="M8.6 12.9l-5 2.6.9-5.6-4.1-4 5.7-.8L8.6 0l2.6 5.1 5.6.8-4.1 4 1 5.6z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
    <path fill="#FFA600" fill-rule="evenodd" d="M8.6 12.9l-5 2.6.9-5.6-4.1-4 5.7-.8L8.6 0l2.6 5.1 5.6.8-4.1 4 1 5.6z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
    <path fill="#FFA600" fill-rule="evenodd" d="M8.6 12.9l-5 2.6.9-5.6-4.1-4 5.7-.8L8.6 0l2.6 5.1 5.6.8-4.1 4 1 5.6z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
    <path fill="#FFA600" fill-rule="evenodd" d="M8.6 12.9l-5 2.6.9-5.6-4.1-4 5.7-.8L8.6 0l2.6 5.1 5.6.8-4.1 4 1 5.6z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
    <path fill="#FFA600" fill-rule="evenodd" d="M8.6 12.9l-5 2.6.9-5.6-4.1-4 5.7-.8L8.6 0l2.6 5.1 5.6.8-4.1 4 1 5.6z" />
    </svg>
    </p>
    <h5 class="m-t-3" title="First service">First service</h5>
    <h6 class="m-t-2">Radhey Sham</h6>
    <h6>Published 25 minutes ago</h6>
    </div>
    </div>
    </div>
    <div class="row text-xs-center">
    <a href="/us" class="btn btn-success m-t-3">Start saving with Wise</a>
    </div>
    </div>
    </section>
    </section>
    <footer>
    <footer class="footer footer-inverse">
    <div class="container">
    <div class="row">
    <div class="col-md-3 text-xs-center text-md-left">
    <a href="/us" class="center-block m-b-4 hidden-md hidden-lg hidden-xl">
    <img src="https://wise.com/public-resources/assets/logos/wise/brand_logo_inverse.svg" alt="Wise" />
    </a>
    <h5 class="footer-title m-b-2">Company and team</h5>
    <ul class="list-unstyled">
    <li><a class="footer-link" href="/us/about/our-story">Company and team</a></li>
    <li><a class="footer-link" href="/us/blog/">News and blog</a></li>
    <li><a class="footer-link" href="/gb/press">Press</a></li>
    <li><a class="footer-link" href="/jobs/">Careers</a></li>
    <li><a class="footer-link" href="/gb/partnerwise">Affiliates and partnerships</a></li>
    </ul>
    </div>
    <div class="col-md-3 text-xs-center text-md-left">
    <h5 class="footer-title m-b-2">Help and support</h5>
    <ul class="list-unstyled">
    <li><a class="footer-link" href="/help/">Help centre</a></li>
    <li><a class="footer-link" href="/us/mid-market-rate">Mid-market rate</a></li>
    <li><a class="footer-link" href="/pricing">Pricing</a></li>
    </ul>
    </div>
    <div class="col-md-3 text-xs-center text-md-left">
    <h5 class="footer-title m-b-2">Learn more</h5>
    <ul class="list-unstyled">
    <li><a class="footer-link" href="/us/send-money/">Send money abroad</a></li>
    <li><a class="footer-link" href="/us/swift-codes/">Swift/BIC codes</a></li>
    <li><a class="footer-link" href="/us/currency-converter/">Currency converter</a></li>
    <li><a class="footer-link" href="/us/iban/">IBAN codes</a></li>
    <li><a class="footer-link" href="/tools/exchange-rate-alerts">Rate alerts</a></li>
    <li><a class="footer-link" href="/us/compare/">Compare exchange rates</a></li>
    <li><a class="footer-link" href="/us/business-templates/">Business templates</a></li>
    </ul>
    </div>
    <div class="col-md-3 text-xs-center text-md-left">
    <h5 class="footer-title m-b-2">Follow us</h5>
    <ul class="d-flex justify-content-center justify-content-start--md list-unstyled">
    <li>
    <a href="https://www.facebook.com/wise" class="link-icon tw-icon" target="_blank" rel="noopener noreferrer">
    <svg width="24" height="24" role="img" aria-label="Facebook" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.9,2H3.1a1.07,1.07,0,0,0-.43.09,1,1,0,0,0-.58.58A1.07,1.07,0,0,0,2,3.1V20.9a1.07,1.07,0,0,0,.09.43,1,1,0,0,0,.58.58A1.07,1.07,0,0,0,3.1,22h9.58V14.25h-2.6v-3h2.6V9A4.71,4.71,0,0,1,13,7.3a3.3,3.3,0,0,1,2-2A4.62,4.62,0,0,1,16.56,5h.8l.68,0,.53,0,.32,0v2.7H17.3a2.33,2.33,0,0,0-.77.11,1,1,0,0,0-.45.3,1,1,0,0,0-.22.46,2.26,2.26,0,0,0-.06.6v1.93h3l-.1.75-.1.76-.09.75-.1.75H15.8V22h5.1a1.07,1.07,0,0,0,.43-.09,1,1,0,0,0,.58-.58A1.07,1.07,0,0,0,22,20.9V3.1a1.07,1.07,0,0,0-.09-.43,1,1,0,0,0-.58-.58A1.07,1.07,0,0,0,20.9,2Z" /></svg>
    </a>
    </li>
    <li>
    <a href="https://twitter.com/wise" class="link-icon tw-icon" target="_blank" rel="noopener noreferrer">
    <svg width="24" height="24" role="img" aria-label="Twitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23,5.18a9,9,0,0,1-2.59.71,4.52,4.52,0,0,0,2-2.5,9.18,9.18,0,0,1-2.86,1.1,4.51,4.51,0,0,0-7.81,3.08,4.93,4.93,0,0,0,.11,1,12.82,12.82,0,0,1-9.3-4.71,4.45,4.45,0,0,0-.61,2.27,4.51,4.51,0,0,0,2,3.75,4.45,4.45,0,0,1-2.05-.56V9.4A4.52,4.52,0,0,0,5.5,13.83,4.54,4.54,0,0,1,4.32,14a4.63,4.63,0,0,1-.85-.08A4.5,4.5,0,0,0,7.68,17,9,9,0,0,1,2.08,19,9.51,9.51,0,0,1,1,18.91a12.79,12.79,0,0,0,6.92,2A12.76,12.76,0,0,0,20.76,8.1c0-.2,0-.39,0-.59A9.23,9.23,0,0,0,23,5.18Z" /></svg>
    </a>
    </li>
    <li>
    <a href="https://www.instagram.com/wiseaccount" class="link-icon tw-icon" target="_blank" rel="noopener noreferrer">
    <svg width="24" height="24" role="img" aria-label="Instagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.2-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8c0-1.2.2-1.9.3-2.3.2-.6.5-1 .9-1.4.5-.4.9-.6 1.4-.9.4-.1 1.1-.3 2.3-.4H12M12 0C8.7 0 8.3 0 7.1.1c-1.3 0-2.2.2-3 .5C3.4.9 2.7 1.3 2 2 1.3 2.7.9 3.4.6 4.1c-.3.8-.5 1.7-.5 3C0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.1 1.3.3 2.1.6 2.9.2.8.6 1.5 1.3 2.2.7.7 1.3 1.1 2.1 1.4.8.3 1.6.5 2.9.6h5c3.3 0 3.7 0 4.9-.1 1.3-.1 2.1-.3 2.9-.6.8-.3 1.5-.7 2.1-1.4.7-.7 1.1-1.3 1.4-2.1.3-.8.5-1.6.6-2.9.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.3-2.1-.6-2.9-.2-.8-.6-1.5-1.3-2.2-.7-.7-1.3-1.1-2.1-1.4C19.1.3 18.3.1 17 0h-5z" /><path d="M12 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zM12 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" /><circle cx="18.4" cy="5.6" r="1.4" /></svg>
    </a>
    </li>
    <li>
    <a href="https://www.youtube.com/c/wiseaccount" class="link-icon tw-icon" target="_blank" rel="noopener noreferrer">
    <svg width="24" height="24" role="img" aria-label="Youtube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.3505 4.50834C22.3825 4.78562 23.199 5.60205 23.4763 6.63415C23.9846 8.51348 24 12.4108 24 12.4108C24 12.4108 24 16.3235 23.4917 18.1874C23.2144 19.2195 22.3979 20.0359 21.3659 20.3132C19.5019 20.8216 12 20.8216 12 20.8216C12 20.8216 4.49807 20.8216 2.63415 20.3132C1.60205 20.0359 0.785623 19.2195 0.508344 18.1874C0 16.3081 0 12.4108 0 12.4108C0 12.4108 0 8.51348 0.49294 6.64955C0.770218 5.61746 1.58665 4.80103 2.61874 4.52375C4.48267 4.0154 11.9846 4 11.9846 4C11.9846 4 19.4865 4 21.3505 4.50834ZM15.8203 12.4108L9.59692 16.0154V8.80616L15.8203 12.4108Z" /></svg>
    </a>
    </li>
    </ul>
    </div>
    </div>
    <hr class="m-t-0" />
    <div class="row m-b-5">
    <div class="col-md-3">
    <a href="/us" class="hidden-xs hidden-sm">
    <img src="https://wise.com/public-resources/assets/logos/wise/brand_logo_inverse.svg" alt="Wise" />
    </a>
    </div>
    <div class="col-md-3 text-xs-center text-md-left footer-title">
    <a class="footer-link" href="/us/terms-of-use">Legal</a>
    </div>
    <div class="col-md-3 text-xs-center text-md-left footer-title">
    <a class="footer-link" href="/us/privacy-policy">Privacy policy</a>
    </div>
    <div class="col-md-3 text-xs-center text-md-left footer-title">
    <a class="footer-link" href="/us/local-sites/">Country site map</a>
    </div>
    </div>
    <div class="row text-xs-center m-t-5">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
    <p class="tiny">© TransferWise Ltd <span>2022</span></p>
    <p class="tiny">Wise is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011, Firm Reference <a rel="noopener" class="footer-link" href="https://register.fca.org.uk/ShPo_FirmDetailsPage?id=001b000001EjC6SAAV" target="_blank">900507</a>, for the issuing of electronic money.</p>
    </div>
    </div>
    </div>
    </footer>
    </footer>
    </body>
    </html>
    `;
    // const form = new FormData();
    // form.append('userInputIban', iban);

    // const headersRequest = {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // };

    // try {
    //   const res = this.httpService
    //     .post('https://wise.com/us/iban/checker', form, {
    //       headers: headersRequest,
    //     })
    //     .subscribe((value) => console.log(value));

    // const res = await lastValueFrom(
    //   this.httpService.post('https://wise.com/us/iban/checker', form, {
    //     headers: {
    //       ...form.getHeaders(),
    //     },
    //   }),
    // );

    return dom;
    // } catch (err) {
    //   return err;
    // }

    //return dom;
  }

  findImageNode(dom: string) {
    const keyTofind = '.bank-logo';
    const root = parse(dom);

    const res = root.querySelector(keyTofind);
    console.log(res.attrs.src);

    return {
      code: 200,
      data: {
        bank: 'MASHREQBANK PSC.',
        logo: res,
      },
    };
  }
}
