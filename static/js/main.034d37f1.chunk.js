(this["webpackJsonpgithub-live"]=this["webpackJsonpgithub-live"]||[]).push([[0],{103:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),i=n(19),s=n.n(i),o=(n(71),n(9)),c=n(14),l=n(10),u=n(11),d=(n(72),n(111)),p=n(105),h=n(2),b=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(h.jsx)(d.a,{bg:"dark",variant:"dark",children:Object(h.jsx)(p.a,{children:Object(h.jsx)(d.a.Brand,{children:"GithubLIVE"})})})}}]),n}(r.a.Component),j=n(13),O=n.n(j),f=n(18),v=n(3),x=n(16),g=(n(77),n(78),n(106)),m=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){var e=this,t=this.props.icon;return Object(h.jsxs)(g.a,{pill:!0,style:{fontSize:14},ref:function(t){return t&&t.style.setProperty("background-color",e.props.color,"important")},children:[Object(h.jsx)(t,{size:18})," ",this.props.content]})}}]),n}(r.a.Component),y=n(107);function E(e){return function(e){return e.login.endsWith("[bot]")}(e)?"https://github.com/apps/".concat(e.login.substr(0,e.login.length-5)):"https://github.com/".concat(e.login)}var S=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){var e=this.props.eventInfo;return null===e?"":Object(h.jsxs)("div",{className:"event",children:[Object(h.jsx)(m,{color:e.color,icon:e.icon,content:e.type}),Object(h.jsxs)("div",{className:"mt-3 d-flex",children:[Object(h.jsxs)("div",{className:"me-4 d-flex flex-column",children:[Object(h.jsx)("a",{href:E(e.event.actor),children:Object(h.jsx)(y.a,{height:"80px",style:{minHeight:"80px"},src:e.event.actor.avatar_url+"?size=80",rounded:!0})}),Object(h.jsx)("small",{className:"text-center mt-1",children:"5 minutes ago"})]}),Object(h.jsx)("div",{children:e.header})]})]})}}]),n}(r.a.Component),C=n(58);function R(e){return k.apply(this,arguments)}function k(){return(k=Object(f.a)(O.a.mark((function e(t){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){return setTimeout(e,t)})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var T,N=n(8);!function(e){e.COMMIT_COMMENT="Commit Comment",e.CREATE_TAG="Create Tag",e.CREATE_BRACH="Create Branch",e.CREATE_REPO="Create Repository",e.DELETE_TAG="Delete Tag",e.DELETE_BRACH="Delete Branch",e.DELETE_REPO="Delete Repository",e.FORK_REPO="Fork",e.STAR_REPO="Star",e.COLLABORATOR_ADD="Collaborator Add",e.PUSH="Push",e.WIKI_EDIT="Wiki Edit",e.ISSUE="Issue",e.ISSUE_COMMENT="Issue Comment",e.PR="Pull Request",e.PR_COMMENT="Pull Request Comment",e.PR_REVIEW="Pull Request Review",e.PR_REVIEW_COMMENT="Pull Request Review Comment",e.PUBLIC="Public",e.RELEASE="Release",e.OTHER="Other"}(T||(T={}));var M,_=T;function I(e){var t={event:e},n=function(e){var t=e.actor;return Object(h.jsx)("a",{className:"font-weight-bold",href:E(t),children:t.display_login||t.login})}(e),a=function(e){var t=e.repo;return Object(h.jsx)("a",{href:"https://github.com/"+t.name,children:t.name})}(e),r=function(e){return Object(h.jsxs)("span",{children:[Object(h.jsx)("code",{children:e.payload.ref})," (",e.payload.ref_type,")"]})}(e);if("CommitCommentEvent"===e.type){var i=function(e){var t=e.payload.comment.commit_id;return Object(h.jsx)("a",{href:"https://github.com/".concat(e.repo.name,"/commit/").concat(t),children:Object(h.jsx)("code",{children:t.substr(0,8)})})}(e);return Object(v.a)(Object(v.a)({},t),{},{type:_.COMMIT_COMMENT,icon:N.b,color:M.COMMENT,header:Object(h.jsxs)("span",{children:[n," commented on ",i," in ",a]})})}if("CreateEvent"===e.type){if("tag"===e.payload.ref_type)return Object(v.a)(Object(v.a)({},t),{},{type:_.CREATE_TAG,color:M.SUCCESS,icon:N.q,header:Object(h.jsxs)("span",{children:[n," created ",r," in ",a]})});if("branch"===e.payload.ref_type)return Object(v.a)(Object(v.a)({},t),{},{type:_.CREATE_BRACH,color:M.SUCCESS,icon:N.d,header:Object(h.jsxs)("span",{children:[n," created ",r," in ",a]})});if("repository"===e.payload.ref_type)return Object(v.a)(Object(v.a)({},t),{},{type:_.CREATE_REPO,color:M.SUCCESS,icon:N.m,header:Object(h.jsxs)("span",{children:[n," created new repository ",a]})})}else if("DeleteEvent"===e.type){if("tag"===e.payload.ref_type)return Object(v.a)(Object(v.a)({},t),{},{type:_.DELETE_TAG,color:M.DANGER,icon:N.r,header:Object(h.jsxs)("span",{children:[n," deleted ",r," in ",a]})});if("branch"===e.payload.ref_type)return Object(v.a)(Object(v.a)({},t),{},{type:_.DELETE_BRACH,color:M.DANGER,icon:N.r,header:Object(h.jsxs)("span",{children:[n," deleted ",r," in ",a]})});if("repository"===e.payload.ref_type)return Object(v.a)(Object(v.a)({},t),{},{type:_.DELETE_REPO,color:M.DANGER,icon:N.r,header:Object(h.jsxs)("span",{children:[n," deleted ",a]})})}else{if("ForkEvent"===e.type){var s=function(e){var t=e.payload.forkee;return Object(h.jsx)("a",{href:t.html_url,children:t.full_name})}(e);return Object(v.a)(Object(v.a)({},t),{},{type:_.FORK_REPO,color:M.INFO,icon:N.n,header:Object(h.jsxs)("span",{children:[n," forked ",s," from ",a]})})}if("PushEvent"===e.type){var o=function(e){var t=e.payload.commits;if(0===t.length)return null;if(1===t.length){var n=t[0].sha;return Object(h.jsx)("a",{href:"https://github.com/".concat(e.repo.name,"/commit/").concat(n),children:Object(h.jsx)("code",{children:n.substr(0,8)})})}return Object(h.jsxs)("span",{children:[Object(h.jsx)("code",{children:t.length})," commits"]})}(e);return null===o?null:Object(v.a)(Object(v.a)({},t),{},{type:_.PUSH,color:M.MISC,icon:N.o,header:Object(h.jsxs)("span",{children:[n," pushed ",o," into ",a]})})}if("WatchEvent"===e.type){if("started"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.STAR_REPO,color:M.STAR,icon:N.p,header:Object(h.jsxs)("span",{children:[n," starred ",a]})})}else if("IssueCommentEvent"===e.type){var c,l=P(e);if(void 0!==(null===(c=e.payload.issue)||void 0===c?void 0:c.pull_request)){if("created"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.PR_COMMENT,color:M.COMMENT,icon:N.b,header:Object(h.jsxs)("span",{children:[n," commented on pull request ",l," in ",a]})});if("deleted"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.PR_COMMENT,color:M.DANGER,icon:N.b,header:Object(h.jsxs)("span",{children:[n," deleted comment on pull request ",l," in ",a]})});if("edited"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.PR_COMMENT,color:M.EDIT,icon:N.b,header:Object(h.jsxs)("span",{children:[n," edited comment on pull request ",l," in ",a]})})}else{if("created"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.ISSUE_COMMENT,color:M.COMMENT,icon:N.b,header:Object(h.jsxs)("span",{children:[n," commented on issue ",l," in ",a]})});if("deleted"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.ISSUE_COMMENT,color:M.DANGER,icon:N.b,header:Object(h.jsxs)("span",{children:[n," deleted comment on issue ",l," in ",a]})});if("edited"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.ISSUE_COMMENT,color:M.EDIT,icon:N.b,header:Object(h.jsxs)("span",{children:[n," edited comment on issue ",l," in ",a]})})}}else if("IssuesEvent"===e.type){var u=P(e);if("opened"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.ISSUE,color:M.SUCCESS,icon:N.h,header:Object(h.jsxs)("span",{children:[n," opened issue ",u," in ",a]})});if("reopened"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.ISSUE,color:M.SUCCESS,icon:N.i,header:Object(h.jsxs)("span",{children:[n," reopened issue ",u," in ",a]})});if("closed"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.ISSUE,color:M.MERGE,icon:N.g,header:Object(h.jsxs)("span",{children:[n," closed issue ",u," in ",a]})});if("assigned"===e.payload.action){var d,p,b,j,O=Object(h.jsx)("a",{href:null===(d=e.payload.issue)||void 0===d||null===(p=d.assignee)||void 0===p?void 0:p.html_url,children:null===(b=e.payload.issue)||void 0===b||null===(j=b.assignee)||void 0===j?void 0:j.login});return Object(v.a)(Object(v.a)({},t),{},{type:_.ISSUE,color:M.EDIT,icon:N.k,header:Object(h.jsxs)("span",{children:[n," assigned ",O," to issue ",u," in ",a]})})}if("unassigned"===e.payload.action){var f,x,g,m,y=Object(h.jsx)("a",{href:null===(f=e.payload.issue)||void 0===f||null===(x=f.assignee)||void 0===x?void 0:x.html_url,children:null===(g=e.payload.issue)||void 0===g||null===(m=g.assignee)||void 0===m?void 0:m.login});return Object(v.a)(Object(v.a)({},t),{},{type:_.ISSUE,color:M.EDIT,icon:N.k,header:Object(h.jsxs)("span",{children:[n," unassigned ",y," from issue ",u," in ",a]})})}if("labeled"===e.payload.action){var S=Object(h.jsx)("code",{children:e.payload.label.name});return Object(v.a)(Object(v.a)({},t),{},{type:_.ISSUE,color:M.EDIT,icon:N.q,header:Object(h.jsxs)("span",{children:[n," added label ",S," to issue ",u," in ",a]})})}if("unlabeled"===e.payload.action){var C=Object(h.jsx)("code",{children:e.payload.label.name});return Object(v.a)(Object(v.a)({},t),{},{type:_.ISSUE,color:M.EDIT,icon:N.q,header:Object(h.jsxs)("span",{children:[n," removed label ",C," to issue ",u," in ",a]})})}}else if("PullRequestReviewEvent"===e.type){var R=U(e);if("created"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.PR_REVIEW,color:M.INFO,icon:N.c,header:Object(h.jsxs)("span",{children:[n," reviewed ",R," in ",a]})})}else if("PullRequestReviewCommentEvent"===e.type){var k=U(e);if("created"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.PR_REVIEW_COMMENT,color:M.COMMENT,icon:N.b,header:Object(h.jsxs)("span",{children:[n," commented on review of ",k," in ",a]})})}else{if("PublicEvent"===e.type)return Object(v.a)(Object(v.a)({},t),{},{type:_.PUBLIC,color:M.SUCCESS,icon:N.m,header:Object(h.jsxs)("span",{children:[n," published new repository ",a]})});if("PullRequestEvent"===e.type){var T=U(e);if("opened"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.PR,color:M.SUCCESS,icon:N.f,header:Object(h.jsxs)("span",{children:[n," opened pull request ",T," in ",a]})});if("reopened"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.PR,color:M.SUCCESS,icon:N.f,header:Object(h.jsxs)("span",{children:[n," reopened pull request ",T," in ",a]})});if("closed"===e.payload.action&&e.payload.pull_request.merged)return Object(v.a)(Object(v.a)({},t),{},{type:_.PR,color:M.MERGE,icon:N.e,header:Object(h.jsxs)("span",{children:[n," merged pull request ",T," in ",a]})});if("closed"===e.payload.action&&!e.payload.pull_request.merged)return Object(v.a)(Object(v.a)({},t),{},{type:_.PR,color:M.DANGER,icon:N.f,header:Object(h.jsxs)("span",{children:[n," closed pull request ",T," in ",a]})})}else if("ReleaseEvent"===e.type){var I=function(e){var t=e.payload.release,n=t.name&&t.name.length>0?t.name:t.tag;return Object(h.jsx)("a",{href:t.html_url,children:Object(h.jsx)("code",{children:n})})}(e);if("published"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.RELEASE,color:M.INFO,icon:N.j,header:Object(h.jsxs)("span",{children:[n," published ",I," (release) in ",a]})})}else if("MemberEvent"===e.type){var A=function(e){var t=e.payload.member;return Object(h.jsx)("a",{href:t.html_url,children:t.login})}(e);if("added"===e.payload.action)return Object(v.a)(Object(v.a)({},t),{},{type:_.COLLABORATOR_ADD,color:M.EDIT,icon:N.k,header:Object(h.jsxs)("span",{children:[n," added ",A," as collaborator to ",a]})})}else if("GollumEvent"===e.type)return Object(v.a)(Object(v.a)({},t),{},{type:_.WIKI_EDIT,color:M.EDIT,icon:N.a,header:Object(h.jsxs)("span",{children:[n," updated wiki for ",a]})})}}return Object(v.a)(Object(v.a)({},t),{},{type:_.OTHER,color:M.DANGER,icon:N.l,header:Object(h.jsxs)("span",{style:{color:M.DANGER,fontWeight:600},children:["This event could not be loaded!",Object(h.jsx)("br",{}),Object(h.jsx)("code",{children:JSON.stringify(e)})]})})}function U(e){var t=e.payload.pull_request;return Object(h.jsxs)("a",{href:t.html_url,className:"font-weight-bold",children:["#",t.number]})}function P(e){var t=e.payload.issue;return Object(h.jsxs)("a",{href:null===t||void 0===t?void 0:t.html_url,className:"font-weight-bold",children:["#",null===t||void 0===t?void 0:t.number]})}!function(e){e.SUCCESS="#27ae60",e.DANGER="#c0392b",e.COMMENT="#2c3e50",e.STAR="#f1c40f",e.EDIT="#f39c12",e.MERGE="#9b59b6",e.INFO="#2980b9",e.MISC="#95a5a6"}(M||(M={}));var A=n(108);function w(e){var t,n,a,r=2;for("undefined"!==typeof Symbol&&(n=Symbol.asyncIterator,a=Symbol.iterator);r--;){if(n&&null!=(t=e[n]))return t.call(e);if(a&&null!=(t=e[a]))return new D(t.call(e));n="@@asyncIterator",a="@@iterator"}throw new TypeError("Object is not async iterable")}function D(e){function t(e){if(Object(e)!==e)return Promise.reject(new TypeError(e+" is not an object."));var t=e.done;return Promise.resolve(e.value).then((function(e){return{value:e,done:t}}))}return D=function(e){this.s=e,this.n=e.next},D.prototype={s:null,n:null,next:function(){return t(this.n.apply(this.s,arguments))},return:function(e){var n=this.s.return;return void 0===n?Promise.resolve({value:e,done:!0}):t(n.apply(this.s,arguments))},throw:function(e){var n=this.s.return;return void 0===n?Promise.reject(e):t(n.apply(this.s,arguments))}},new D(e)}var G,F=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={events:[],animationDuration:100},a.abortController=new AbortController,a.onResetFilters=a.onResetFilters.bind(Object(x.a)(a)),a}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=Object(f.a)(O.a.mark((function e(){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.props.settings.running){e.next=4;break}return e.next=3,this.updateFeed(this.abortController);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){var e=Object(f.a)(O.a.mark((function e(t){var n,a;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.settings,a=this.props.settings,n.running===a.running){e.next=12;break}if(!a.running){e.next=11;break}return this.props.onStatusUpdate(G.STARTING),this.abortController=new AbortController,e.next=8,this.updateFeed(this.abortController);case 8:return e.abrupt("return",e.sent);case 11:this.abortController.abort();case 12:if(n.filter===a.filter){e.next=20;break}if(this.setState({events:[]}),!a.running){e.next=20;break}return this.abortController.abort(),this.abortController=new AbortController,e.next=19,this.updateFeed(this.abortController);case 19:return e.abrupt("return",e.sent);case 20:n.poolingSpeed!==a.poolingSpeed&&this.props.onMissRateClear();case 21:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){this.abortController.abort()}},{key:"updateFeed",value:function(){var e=Object(f.a)(O.a.mark((function e(t){var n,a,r,i,s,o,c,l,u,d,p,h,b,j,f,v,x=this;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=this.props.settings,a=0;case 2:if(t.signal.aborted){e.next=58;break}return this.props.onStatusUpdate(G.FETCHING),i=this.props.settings.poolingSpeed,e.next=7,this.props.octokit.activity.listPublicEvents({per_page:100});case 7:if(s=e.sent.data,o=s.map((function(e){return I(e)})).filter((function(e){return!!e})),c=Number(null===(r=o[o.length-1])||void 0===r?void 0:r.event.id),a>0&&0!==(l=c-a)&&this.props.onMissRateUpdate(100/(l+100)),a=c,o=o.filter((function(e){return!n.filter.includes(Object.keys(_)[Object.values(_).indexOf(e.type)])})),o=o.filter((function(e){return-1===x.state.events.findIndex((function(t){return t.event.id===e.event.id}))})),0!==o.length){e.next=18;break}return this.props.onStatusUpdate(G.NO_NEW_EVENTS),e.next=18,R(this.props.settings.poolingSpeed);case 18:u=!1,d=!1,e.prev=20,h=w(o);case 22:return e.next=24,h.next();case 24:if(!(u=!(b=e.sent).done)){e.next=40;break}if(j=b.value,this.props.onStatusUpdate(G.RUNNING),!t.signal.aborted){e.next=29;break}return e.abrupt("break",40);case 29:return(f=this.state.events.slice()).unshift(j),f.length>100&&f.pop(),this.props.settings.poolingSpeed!==i&&(a=0),v=this.props.settings.poolingSpeed/o.length,this.setState({events:f,animationDuration:Math.min(v-10,250)}),e.next=37,R(v);case 37:u=!1,e.next=22;break;case 40:e.next=46;break;case 42:e.prev=42,e.t0=e.catch(20),d=!0,p=e.t0;case 46:if(e.prev=46,e.prev=47,!u||null==h.return){e.next=51;break}return e.next=51,h.return();case 51:if(e.prev=51,!d){e.next=54;break}throw p;case 54:return e.finish(51);case 55:return e.finish(46);case 56:e.next=2;break;case 58:case"end":return e.stop()}}),e,this,[[20,42,46,56],[47,,51,55]])})));return function(t){return e.apply(this,arguments)}}()},{key:"onResetFilters",value:function(e){var t=Object.assign({},this.props.settings);t.filter=["PUSH"],this.props.onSettingsUpdate(t)}},{key:"render",value:function(){if(this.state.events.length>0)return Object(h.jsx)(C.a,{enterAnimation:"none",duration:this.state.animationDuration<240?0:this.state.animationDuration,children:this.state.events.map((function(e){return Object(h.jsx)(S,{eventInfo:e},e.event.id)}))});var e=Object.values(_).length-1,t=this.props.settings.filter.length;return Object(h.jsxs)("p",{className:"lead text-center",style:{marginTop:"100px"},children:[t>=e?"You have excluded all of the events. ":"Waiting for new events... ",t>12?Object(h.jsxs)(a.Fragment,{children:[Object(h.jsx)("span",{children:"You can try to "}),Object(h.jsx)(A.a,{variant:"link",className:"p-0",onClick:this.onResetFilters,style:{fontSize:"1.25rem",fontWeight:300,verticalAlign:"baseline"},children:"reset your filters"}),"."]}):""]})}}]),n}(r.a.Component),q=n(66),H=n(15),L=(n(79),n(65)),V=n(110),W=n(61),B=n(112),z=n(59),K=n.n(z),J=n(113),Y=n(109),Q=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){var e=this.props.missRate,t=60/(this.props.poolingSpeed/1e3)*100,n=t/e;return Object(h.jsx)(J.a,{variant:"secondary",children:e>0?Object(h.jsxs)(h.Fragment,{children:["Using the current pooling speed, this feed display only around "," ",Object(h.jsxs)("b",{children:[Math.round(100*e*10)/10,"%"]})," "," ","of the total Github activity. That's "," ",Object(h.jsxs)("b",{children:[Math.round(t)," events per minute"]})," "," ","out of total of around "," ",Object(h.jsxs)("b",{children:[Math.round(100*Math.ceil(n/100))," events per minute"]}),"! "," "]}):Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(Y.a,{animation:"border",size:"sm"})," ",Object(h.jsx)("span",{children:"Calculating statistics..."})]})})}}]),n}(r.a.Component),X=(n(81),n(53)),Z=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(h.jsxs)("div",{className:"d-flex justify-content-end align-items-center mt-3",children:[Object(h.jsxs)("span",{className:"text-muted me-2",children:[this.props.showSpinner?Object(h.jsx)(Y.a,{animation:"border",size:"sm"}):""," ",this.props.status]}),Object(h.jsx)(A.a,{className:"float-right",size:"sm",style:{width:42,height:42},variant:this.props.running?"success":"danger",onClick:this.props.onClick,children:this.props.running?Object(h.jsx)(X.a,{size:24}):Object(h.jsx)(X.b,{size:24})})]})}}]),n}(r.a.Component),$=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleRunningClick=a.handleRunningClick.bind(Object(x.a)(a)),a.handleFilterChange=a.handleFilterChange.bind(Object(x.a)(a)),a.handlePoolingChange=a.handlePoolingChange.bind(Object(x.a)(a)),a.handleTokenChange=a.handleTokenChange.bind(Object(x.a)(a)),a}return Object(c.a)(n,[{key:"render",value:function(){var e=this.props.settings;return Object(h.jsxs)(p.a,{className:"settings",children:[Object(h.jsx)("h3",{className:"mb-4",children:"Settings"}),Object(h.jsxs)(V.a,{xs:1,md:2,children:[Object(h.jsxs)(W.a,{className:"col-md-6",children:[Object(h.jsxs)(B.a.Label,{children:["Github Personal Token "," - ",Object(h.jsx)("a",{href:"https://github.com/settings/tokens/new?description=GithubLIVE",target:"_blank",rel:"noreferrer",children:"generate new token"})]}),Object(h.jsx)(B.a.Control,{type:"password",placeholder:"ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",isInvalid:""!==e.githubToken&&!e.githubTokenValid,isValid:""!==e.githubToken&&e.githubTokenValid,onChange:this.handleTokenChange}),Object(h.jsx)(B.a.Text,{className:"text-muted",children:"Providing authentication token is not required but highly recommended."})]}),Object(h.jsxs)(W.a,{className:"col-md-6",children:[Object(h.jsx)(B.a.Label,{children:"Pooling speed"}),Object(h.jsxs)("div",{className:"d-flex align-items-center",children:[Object(h.jsx)("span",{children:"Fast"}),Object(h.jsx)(K.a,{min:15,max:100,step:5,disabled:!e.githubTokenValid,value:e.poolingSpeed/1e3,onChange:this.handlePoolingChange}),Object(h.jsx)("span",{children:"Slow"})]})]})]}),Object(h.jsx)(V.a,{className:"mt-2",children:Object(h.jsxs)(W.a,{className:"col-md-12",children:[Object(h.jsx)(B.a.Label,{children:"Events to exclude"}),Object(h.jsx)(L.a,{options:Object.entries(_).filter((function(e){var t=Object(H.a)(e,2);t[0];return t[1]!==_.OTHER})).map((function(e){var t=Object(H.a)(e,2);return{value:t[0],label:t[1]}})),value:e.filter.map((function(e){return{value:e,label:_[e]}})),isMulti:!0,onChange:this.handleFilterChange})]})}),Object(h.jsx)(V.a,{className:"mt-3",children:Object(h.jsx)(W.a,{className:"col-md-12",children:Object(h.jsx)(Q,{missRate:this.props.missRate,poolingSpeed:e.poolingSpeed})})}),Object(h.jsx)(Z,{running:e.running,status:this.props.status,showSpinner:[G.FETCHING,G.STARTING].includes(this.props.status),onClick:this.handleRunningClick})]})}},{key:"handleFilterChange",value:function(e){var t=Object.assign({},this.props.settings);t.filter=e.map((function(e){return e.value})),this.props.onSettingsUpdate(t)}},{key:"handlePoolingChange",value:function(e){var t=Object.assign({},this.props.settings);t.poolingSpeed=1e3*e.target.valueAsNumber,this.props.onSettingsUpdate(t)}},{key:"handleTokenChange",value:function(e){var t=Object.assign({},this.props.settings);t.githubToken=e.target.value,this.props.onSettingsUpdate(t)}},{key:"handleRunningClick",value:function(e){var t=Object.assign({},this.props.settings);t.running=!t.running,this.props.onSettingsUpdate(t)}}]),n}(r.a.Component);!function(e){e.STARTING="starting",e.PAUSED="paused",e.RUNNING="running",e.FETCHING="fetching",e.NO_NEW_EVENTS="no new events"}(G||(G={}));var ee=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={octokit:a.newOctokit(),missRateHistory:[],settings:{poolingSpeed:6e4,githubToken:"",githubTokenValid:!1,filter:["PUSH"],running:!0},status:G.STARTING},a.onMissRateUpdate=a.onMissRateUpdate.bind(Object(x.a)(a)),a.onSettingsUpdate=a.onSettingsUpdate.bind(Object(x.a)(a)),a.onMissRateClear=a.onMissRateClear.bind(Object(x.a)(a)),a.onStatusUpdate=a.onStatusUpdate.bind(Object(x.a)(a)),a}return Object(c.a)(n,[{key:"newOctokit",value:function(e){return new q.a({request:{fetch:function(e){function t(t,n){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e,t){return fetch(e,Object(v.a)(Object(v.a)({},t),{},{cache:"no-cache"}))}))},auth:e})}},{key:"onMissRateUpdate",value:function(e){var t=this.state.missRateHistory.slice();t.push(e),t.length>5&&t.shift(),this.setState({missRateHistory:t})}},{key:"onMissRateClear",value:function(){this.setState({missRateHistory:[]})}},{key:"onSettingsUpdate",value:function(){var e=Object(f.a)(O.a.mark((function e(t){var n,a;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=Object.assign({},this.state),this.state.settings.githubToken===t.githubToken){e.next=6;break}return a=this.newOctokit(t.githubToken),e.next=5,a.rateLimit.get().then((function(e){var n=e.data.resources.core.limit>1e3;t.githubTokenValid=n})).catch((function(){t.githubTokenValid=!1}));case 5:t.githubTokenValid&&(n.octokit=a);case 6:t.githubTokenValid||(t.poolingSpeed=6e4),t.running||(n.status=G.PAUSED),n.settings=t,this.setState(n);case 10:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"onStatusUpdate",value:function(e){(this.state.settings.running||this.state.status!==G.PAUSED)&&this.setState({status:e})}},{key:"getMissRate",value:function(){var e=this.state.missRateHistory;return 0===e.length?-1:Number(e.reduce((function(e,t){return e+t}),0))/e.length}},{key:"render",value:function(){return Object(h.jsxs)(p.a,{className:"mt-4",children:[Object(h.jsx)($,{missRate:this.getMissRate(),settings:this.state.settings,status:this.state.status,onSettingsUpdate:this.onSettingsUpdate}),Object(h.jsx)(F,{octokit:this.state.octokit,settings:this.state.settings,onMissRateUpdate:this.onMissRateUpdate,onMissRateClear:this.onMissRateClear,onSettingsUpdate:this.onSettingsUpdate,onStatusUpdate:this.onStatusUpdate})]})}}]),n}(r.a.Component),te=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return Object(h.jsxs)(a.Fragment,{children:[Object(h.jsx)(b,{}),Object(h.jsx)(ee,{})]})}}]),n}(r.a.Component);s.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(te,{})}),document.getElementById("root"))},71:function(e,t,n){},72:function(e,t,n){},77:function(e,t,n){},78:function(e,t,n){},79:function(e,t,n){},81:function(e,t,n){}},[[103,1,2]]]);
//# sourceMappingURL=main.034d37f1.chunk.js.map