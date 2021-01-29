(this["webpackJsonpspend-analyzer-frontend"]=this["webpackJsonpspend-analyzer-frontend"]||[]).push([[0],{159:function(e,t,n){},168:function(e,t,n){},169:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(1),s=n.n(c),r=n(47),i=n.n(r),o=(n(159),n(31)),l=n(4),d=n(11),j=function(e,t){var n=0;return e.forEach((function(e){return e["Transaction Type"]===t&&(n+=Number(e.Amount))})),Number(n.toFixed(2))},u=function(e,t){var n=[];t.forEach((function(e){return e.active&&n.push(e.name)}));var a=[];return e.forEach((function(e){Object.keys(e).length>1&&!n.includes(e.Category)&&a.push({Date:e.Date?e.Date:"",Description:e.Description?e.Description:"",Amount:e.Amount?e.Amount:"","Transaction Type":e["Transaction Type"],Category:e.Category?e.Category:""})})),a},b=function(e,t,n){var a=d.h("svg.".concat(t));if(a&&e){a.selectAll("*").remove();var c=a.append("g").attr("transform","translate(".concat(80,", ").concat(80,")")),s=d.g().range([500,0]).domain([0,d.e(e,(function(e){return e.y}))]);c.append("g").call(d.b(s));var r=d.f().rangeRound([0,900]).domain(e.map((function(e){return e.x}))).padding(.2).align(.5).round(!0);e.forEach((function(e){e.scale=r(e.x)})),c.append("g").attr("transform","translate(0, ".concat(500,")")).call(d.a(r)).selectAll("text").style("text-anchor","end").attr("dx","-.8em").attr("dy",".15em").attr("transform","rotate(-65)");var i=c.selectAll("group").data(e).enter();if(i.append("rect").style("fill","#00d9ad").style("rx","5").attr("x",(function(e){return e.scale})).attr("y",(function(e){return s(e.y)})).attr("height",(function(e){return 500-s(e.y)})).attr("width",r.bandwidth()),n){var o=r.bandwidth(),l=d.d().x((function(e){return e.scale+80+o/2})).y((function(e){return s(e.y)+80})).curve(d.c);a.append("path").datum(e).attr("fill","none").attr("stroke","hsl(0, 0%, 17%)").attr("stroke-width",1.5).attr("d",l),i.append("text").attr("x",(function(e){return e.scale})).attr("y",(function(e){return s(e.y)-10})).attr("dx",o/2).text((function(e){return"$".concat(h(e.y.toFixed(2)))})).attr("font-size","14px").attr("text-anchor","middle").attr("fill","hsl(0, 0%, 17%)").attr("font-weight","800")}}},h=function(e){var t="0";e&&(t=parseFloat(e).toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,","));return t},m=function(e){var t=e.breakdown;return Object(c.useEffect)((function(){if(t){var e=function(e){var t=[];return Object.keys(e).forEach((function(n){t.push({x:n,y:Math.abs(e[n]),scale:0})})),t}(t);b(e,"spending-breakdown",!1)}}),[t]),Object(a.jsx)("div",{className:"bar-chart",children:Object(a.jsx)("svg",{className:"spending-breakdown",preserveAspectRatio:"xMinYMin meet",viewBox:"0 0 1040 680"})})},O=function(e){var t=e.breakdown,n=e.summary;return Object(a.jsx)("div",{className:"dashboard-summary",children:Object(a.jsx)("div",{className:"summary",children:Object.keys(t).sort((function(e,n){return t[e]-t[n]})).map((function(e,c){return Object(a.jsxs)("div",{className:"card",children:[Object(a.jsx)("h3",{children:e}),Object(a.jsxs)("p",{className:"red-warning",children:["$",h(Math.abs(t[e]))]}),Object(a.jsxs)("p",{children:[(Math.abs(t[e])/n.totalIncome*100).toFixed(2),"% of total income"]})]},c)}))})})},x=function(e){var t=e.breakdown,n=e.dates,c=e.summary;return Object(a.jsxs)("div",{children:[Object(a.jsxs)("h2",{children:["Spending Breakdown",(null===n||void 0===n?void 0:n.length)?": ".concat(n[0]," - ").concat(n[n.length-1]):""]}),(null===n||void 0===n?void 0:n.length)?Object(a.jsxs)("div",{children:[Object(a.jsx)(m,{breakdown:t}),Object(a.jsx)(O,{breakdown:t,summary:c})]}):Object(a.jsx)("p",{className:"error-message",children:"There is no data available. Please upload a CSV to view spending breakdown."})]})},v=n(13),p=n(6),f=n(7),g=function(){return Object(a.jsx)("aside",{className:"sidebar",children:Object(a.jsxs)("ul",{children:[Object(a.jsx)("li",{className:"sidebar-item",children:Object(a.jsxs)(v.b,{exact:!0,to:"/spending-analysis/",children:[Object(a.jsx)(p.a,{icon:f.f})," Home"]})}),Object(a.jsx)("li",{className:"sidebar-item",children:Object(a.jsxs)(v.b,{to:"/spending-analysis/breakdown",children:[Object(a.jsx)(p.a,{icon:f.b})," Spending Breakdown"]})}),Object(a.jsx)("li",{className:"sidebar-item",children:Object(a.jsxs)(v.b,{to:"/spending-analysis/monthly",children:[Object(a.jsx)(p.a,{icon:f.a})," Monthly Data"]})}),Object(a.jsx)("li",{className:"sidebar-item",children:Object(a.jsxs)(v.b,{to:"/spending-analysis/transactions",children:[Object(a.jsx)(p.a,{icon:f.g})," Transaction List"]})})]})})},y=function(){return Object(a.jsxs)("div",{className:"header",children:[Object(a.jsx)("div",{className:"custom-shape-divider",children:Object(a.jsxs)("svg",{"data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1200 120",preserveAspectRatio:"none",fill:"#00d9ad",children:[Object(a.jsx)("path",{d:"M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",opacity:".25",className:"shape-fill"}),Object(a.jsx)("path",{d:"M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z",opacity:".5",className:"shape-fill"}),Object(a.jsx)("path",{d:"M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z",className:"shape-fill"})]})}),Object(a.jsx)("h1",{children:"SpendAnalyzer"})]})},N=n(49),w=n.n(N),S=function(e){var t=e.dates,n=e.summary;return Object(a.jsxs)("div",{className:"home-summary",children:[Object(a.jsx)("h2",{children:(null===t||void 0===t?void 0:t.length)?"".concat(t[0]," - ").concat(t[t.length-1]):""}),Object(a.jsxs)("div",{className:"spending-summary",children:[Object(a.jsxs)("div",{className:"card",children:[Object(a.jsx)("h3",{children:"Total Income +"}),Object(a.jsxs)("p",{className:"green-success",children:["$",h(n.totalIncome)]})]}),Object(a.jsxs)("div",{className:"card",children:[Object(a.jsx)("h3",{children:"Total Spent -"}),Object(a.jsxs)("p",{className:"red-warning",children:["$",h(n.totalSpent)]})]}),Object(a.jsxs)("div",{className:"card",children:[Object(a.jsx)("h3",{children:"Total Saved"}),Object(a.jsxs)("p",{className:"green-success",children:["$",h(n.totalSaved)]})]}),Object(a.jsxs)("div",{className:"card",children:[Object(a.jsx)("h3",{children:"Percent Saved"}),Object(a.jsxs)("p",{className:n.percentSaved>50?"green-success":"red-warning",children:[n.percentSaved,"%"]})]})]})]})},k=function(e){var t=e.categories,n=e.toggleCategory,s=Object(c.useState)(!1),r=Object(l.a)(s,2),i=r[0],o=r[1],d=t.filter((function(e){return e.active}));return Object(a.jsxs)("div",{className:"category-container",children:[Object(a.jsxs)("h2",{className:"pointer",onClick:function(){return o(!i)},children:[Object(a.jsxs)("span",{children:["Exclude Categories (",d.length,")"]}),i?Object(a.jsx)(p.a,{className:"icon",icon:f.h}):Object(a.jsx)(p.a,{className:"icon",icon:f.i})]}),i?Object(a.jsxs)("div",{children:[Object(a.jsx)("p",{children:"Select a category to exclude it from your list of transactions"}),Object(a.jsx)("div",{className:"category-exclusion",children:t.map((function(e,t){return Object(a.jsxs)("div",{className:"category-option  pointer ".concat((null===e||void 0===e?void 0:e.active)?"selected":""),onClick:function(){return n(e)},children:[Object(a.jsx)(p.a,{icon:f.j}),Object(a.jsx)("span",{className:"category-label",children:e.name})]},t)}))})]}):Object(a.jsx)("div",{className:"category-exclusion",children:d.map((function(e,t){return Object(a.jsxs)("div",{className:"category-option ".concat((null===e||void 0===e?void 0:e.active)?"selected":""),onClick:function(){return n(e)},children:[Object(a.jsx)(p.a,{icon:f.j}),Object(a.jsx)("span",{className:"category-label",children:e.name})]},t)}))})]})},C=function(e){var t=e.onFileLoad,n=e.transactions,c=e.dates,s=e.summary,r=e.file,i=e.error,o=e.categories,l=e.toggleCategory;return Object(a.jsxs)("div",{className:"home",children:[Object(a.jsx)("h2",{children:"Welcome!"}),(null===n||void 0===n?void 0:n.length)?null:Object(a.jsx)("p",{className:"error-message",children:"Please select a CSV file to upload."}),i?Object(a.jsx)("p",{className:"error-message",children:"Something went wrong. Please try again."}):null,Object(a.jsxs)("div",{className:"csv-upload",children:[Object(a.jsx)(w.a,{parserOptions:{header:!0},onFileLoaded:function(e,n){return t(e,n)}}),Object(a.jsx)("p",{children:r?Object(a.jsxs)("span",{className:"success-message",children:[Object(a.jsx)(p.a,{icon:f.c,className:"icon"}),"Currently reading: ",Object(a.jsx)("strong",{children:r})]}):Object(a.jsx)("span",{children:"No file selected"})})]}),(null===n||void 0===n?void 0:n.length)?Object(a.jsxs)("div",{children:[Object(a.jsx)(k,{transactions:n,categories:o,toggleCategory:l}),Object(a.jsx)(S,{dates:c,summary:s})]}):null]})},E=function(e){var t=e.transaction;return Object(a.jsx)("tr",{children:Object.keys(t).map((function(e,n){return Object(a.jsx)("td",{className:"transaction-field",children:Object(a.jsx)("p",{children:t[e]})},n)}))})},P=function(e){var t=e.totalPages,n=e.perPageStart,c=e.perPageEnd,s=e.page,r=e.transactions,i=e.prevPage,o=e.nextPage,l=(null===r||void 0===r?void 0:r.length)?r.length:0;return Object(a.jsxs)("div",{className:"transaction-toolbar",children:[Object(a.jsxs)("p",{children:["Showing",t>1&&" ".concat(n+1," - ").concat(c>l?l:c," of")," ".concat(l)," transaction",1!==l?"s":""]}),(null===r||void 0===r?void 0:r.length)?Object(a.jsxs)("div",{className:"pagination",children:[Object(a.jsxs)("button",{className:"prev-btn btn",onClick:function(){return i()},children:[Object(a.jsx)(p.a,{icon:f.d,className:"icon"}),"Prev"]}),Object(a.jsxs)("p",{children:["Page ",s," of ",t]}),Object(a.jsxs)("button",{className:"next-btn btn",onClick:function(){return o()},children:["Next",Object(a.jsx)(p.a,{icon:f.e,className:"icon"})]})]}):null]})},M=function(e){var t=e.transactions,n=e.dates,s=Object(c.useState)(1),r=Object(l.a)(s,2),i=r[0],o=r[1],d=Object(c.useState)(0),j=Object(l.a)(d,2),u=j[0],b=j[1],h=Object(c.useState)(20),m=Object(l.a)(h,2),O=m[0],x=m[1],v=Math.ceil(t.length/20);return Object(c.useEffect)((function(){}),[i]),Object(a.jsxs)("div",{className:"transactions-list",children:[Object(a.jsxs)("h2",{children:["Transaction List",(null===n||void 0===n?void 0:n.length)?": ".concat(n[0]," - ").concat(n[n.length-1]):""]}),Object(a.jsx)(P,{transactions:t,totalPages:v,perPageStart:u,perPageEnd:O,nextPage:function(){if(i<v){o(i+1);var e=u+20,t=e+20;b(e),x(t)}},prevPage:function(){if(i>1){o(i-1);var e=u;b(u-20),x(e)}},page:i}),(null===t||void 0===t?void 0:t.length)?Object(a.jsxs)("table",{className:"transactions-table",children:[Object(a.jsx)("thead",{children:Object(a.jsx)("tr",{children:(null===t||void 0===t?void 0:t.length)>0&&Object.keys(t[0]).map((function(e,t){return Object(a.jsx)("th",{children:e},t)}))})}),Object(a.jsx)("tbody",{children:t.map((function(e,t){return t>u&&t<=O&&Object(a.jsx)(E,{transaction:e},t)}))})]}):Object(a.jsx)("p",{className:"error-message",children:"There is no data available. Please upload a CSV to view your transactions list."})]})},T=function(e){var t=e.transactions,n=e.dates,s=e.breakdown,r=Object.keys(s),i=Object(c.useState)(r[0]),o=Object(l.a)(i,2),d=o[0],j=o[1];return Object(c.useEffect)((function(){if(t){var e=function(e,t){var n={},a=[];return e.forEach((function(e){if(e.Category===t){var a=e.Date.split("/"),c="".concat(a[0],"/").concat(a[2]),s=Number(e.Amount);Object.keys(n).includes(c)?n[c]=Number(n[c])+s:n[c]=s}})),Object.keys(n).forEach((function(e){a.push({x:e,y:Number(n[e].toFixed(2)),scale:0})})),a.reverse()}(t,d);b(e,"monthly-breakdown",!0)}}),[t,d]),Object(a.jsxs)("div",{className:"monthly-chart",children:[Object(a.jsxs)("h2",{children:["Monthly Data",(null===n||void 0===n?void 0:n.length)?": ".concat(n[0]," - ").concat(n[n.length-2]):""]}),(null===t||void 0===t?void 0:t.length)?Object(a.jsxs)("div",{children:[Object(a.jsxs)("div",{className:"monthly-select",children:[Object(a.jsxs)("div",{className:"select-container pointer",children:[Object(a.jsx)("select",{onChange:function(e){var t=e.target.value;j(t)},value:d,className:"monthly-dropdown",children:r.map((function(e){return Object(a.jsx)("option",{value:e,children:e},e)}))}),Object(a.jsx)("span",{className:"focus"})]}),Object(a.jsx)("h3",{children:d})]}),Object(a.jsx)("svg",{className:"monthly-breakdown",preserveAspectRatio:"xMinYMin meet",viewBox:"0 0 1040 660"})]}):Object(a.jsx)("p",{className:"error-message",children:"There is no data available. Please upload a CSV to view monthly spending summary."})]})},A=n(3),D=(n(168),[]),F=[],V=function(){var e=Object(c.useState)(D),t=Object(l.a)(e,2),n=t[0],s=t[1],r=Object(c.useState)(D),i=Object(l.a)(r,2),d=i[0],b=i[1],h=Object(c.useState)({}),m=Object(l.a)(h,2),O=m[0],p=m[1],f=Object(c.useState)({}),N=Object(l.a)(f,2),w=N[0],S=N[1],k=Object(c.useState)(F),E=Object(l.a)(k,2),P=E[0],V=E[1],B=Object(c.useState)(""),I=Object(l.a)(B,2),L=I[0],$=I[1],z=Object(c.useState)(!1),R=Object(l.a)(z,2),Y=R[0],Z=R[1],J=Object(c.useState)(F),H=Object(l.a)(J,2),W=H[0],q=H[1],G=function(e){var t=function(e){var t=[],n={};return e.map((function(e){return!t.includes(e.Category)&&t.push(e.Category)})),t.forEach((function(t){n[t]=0,e.filter((function(e){return e.Category===t})).forEach((function(e){"credit"===e["Transaction Type"]?n[t]+=Number(e.Amount):n[t]-=Number(e.Amount)}));var a=Number(n[t].toFixed(2));a<0?n[t]=a:delete n[t]})),n}(e);p(t);var n=function(e){var t=[];e.map((function(e){return t.push(new Date(e.Date))})),t.sort((function(e,t){return e-t}));var n=[];return t.forEach((function(e){var t=e.getFullYear(),a=(1+e.getMonth()).toString();a=a.length>1?a:"0"+a;var c=e.getDate().toString();c=c.length>1?c:"0"+c,n.push("".concat(a,"/").concat(c,"/").concat(t))})),n}(e);V(n);var a=function(e){var t={},n=j(e,"credit");t.totalIncome=n;var a=j(e,"debit");return t.totalSpent=a,t.percentSaved=Math.round((t.totalIncome-t.totalSpent)/t.totalIncome*100),t.totalSaved=n-a,t}(e);S(a)};return Object(a.jsx)(v.a,{children:Object(a.jsxs)("div",{className:"main",children:[Object(a.jsx)(y,{}),Object(a.jsxs)("div",{className:"main-container",children:[Object(a.jsx)(g,{}),Object(a.jsx)("main",{className:"dashboard-container",children:Object(a.jsxs)(A.c,{children:[Object(a.jsx)(A.a,{path:"/spending-analysis/breakdown",children:Object(a.jsx)(x,{breakdown:O,dates:P,summary:w})}),Object(a.jsx)(A.a,{path:"/spending-analysis/monthly",children:Object(a.jsx)(T,{transactions:d,dates:P,breakdown:O})}),Object(a.jsx)(A.a,{path:"/spending-analysis/transactions",children:Object(a.jsx)(M,{transactions:d,dates:P})}),Object(a.jsx)(A.a,{path:"/",children:Object(a.jsx)(C,{onFileLoad:function(e,t){if(e){$(t.name);var n=u(e,W);b(n),s(n),G(n);var a=[],c=[];n.forEach((function(e){if(!a.includes(e.Category)){var t=e.Category;a.push(t),c.push({name:t,active:!1})}})),q(c)}else Z(!0)},transactions:d,dates:P,summary:w,file:L,error:Y,categories:W,toggleCategory:function(e){var t=[];W.forEach((function(n){n.name===e.name?t.push(Object(o.a)(Object(o.a)({},n),{},{active:!n.active})):t.push(n)})),q(t);var a=u(n,t);b(a),G(a)}})})]})})]})]})})};i.a.render(Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(V,{})}),document.getElementById("root"))}},[[169,1,2]]]);
//# sourceMappingURL=main.395725d3.chunk.js.map