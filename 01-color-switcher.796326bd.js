document.addEventListener("DOMContentLoaded",(function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=null;t.addEventListener("click",(function(){null===n&&(n=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"))}),1e3),t.disabled=!0,e.disabled=!1)})),e.addEventListener("click",(function(){clearInterval(n),n=null,t.disabled=!1,e.disabled=!0}))}));
//# sourceMappingURL=01-color-switcher.796326bd.js.map
