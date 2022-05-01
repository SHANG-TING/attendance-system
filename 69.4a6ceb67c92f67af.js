"use strict";(self.webpackChunkattendance_system=self.webpackChunkattendance_system||[]).push([[69],{1069:(O,c,a)=>{a.r(c),a.d(c,{LoginModule:()=>M});var s=a(6362),g=a(5693),n=a(6723),p=a(8951),u=a(3266),r=a(1876);function d(t,i){1&t&&n._UZ(0,"i",11)}function f(t,i){1&t&&(n.ynx(0),n._uU(1,"Authenticating"),n.BQk())}function m(t,i){1&t&&(n.ynx(0),n._uU(1,"Welcome Back!"),n.BQk())}function h(t,i){1&t&&(n.ynx(0),n._uU(1,"Please login again"),n.BQk())}function x(t,i){1&t&&(n.ynx(0),n._uU(1," Log in "),n.BQk())}const C=[{path:"",component:(()=>{class t{constructor(e,o,l,_){this.authService=e,this.accountService=o,this.fb=l,this.router=_,this.className="d-flex flex-column justify-content-center align-items-center w-100",this.form=this.fb.group({username:[],password:[]}),this.loginStatus=null}ngOnInit(){this.authService.removeAll()}onSubmit(e){this.loginStatus="Authenticating",this.accountService.signIn(e).subscribe(({token:o})=>{this.loginStatus="ok",setTimeout(()=>{this.authService.setToken(o),this.router.navigateByUrl("/")},500)},o=>{this.loginStatus="fail",setTimeout(()=>{this.loginStatus=null},500)})}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(p.e),n.Y36(u.B),n.Y36(r.qu),n.Y36(g.F0))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-login"]],hostVars:1,hostBindings:function(e,o){2&e&&n.Ikx("className",o.className)},decls:14,vars:13,consts:[[1,"login","shadow-lg",3,"formGroup","ngSubmit"],[1,"title","text-center"],["type","text","placeholder","Username","formControlName","username","autofocus",""],[1,"fa","fa-user"],["type","password","placeholder","Password","formControlName","password"],[1,"fa","fa-key"],[3,"disabled"],["class","spinner",4,"ngIf"],[1,"state",3,"ngSwitch"],[4,"ngSwitchCase"],[4,"ngSwitchDefault"],[1,"spinner"]],template:function(e,o){1&e&&(n.TgZ(0,"form",0),n.NdJ("ngSubmit",function(){return o.onSubmit(o.form.getRawValue())}),n.TgZ(1,"h1",1),n._uU(2,"Attendance System"),n.qZA(),n._UZ(3,"input",2)(4,"i",3)(5,"input",4)(6,"i",5),n.TgZ(7,"button",6),n.YNc(8,d,1,0,"i",7),n.TgZ(9,"span",8),n.YNc(10,f,2,0,"ng-container",9),n.YNc(11,m,2,0,"ng-container",9),n.YNc(12,h,2,0,"ng-container",9),n.YNc(13,x,2,0,"ng-container",10),n.qZA()()()),2&e&&(n.ekj("loading",null!==o.loginStatus)("ok","ok"===o.loginStatus)("fail","fail"===o.loginStatus),n.Q6J("formGroup",o.form),n.xp6(7),n.Q6J("disabled",!!o.loginStatus),n.xp6(1),n.Q6J("ngIf",!!o.loginStatus),n.xp6(1),n.Q6J("ngSwitch",o.loginStatus),n.xp6(1),n.Q6J("ngSwitchCase","Authenticating"),n.xp6(1),n.Q6J("ngSwitchCase","ok"),n.xp6(1),n.Q6J("ngSwitchCase","fail"))},directives:[r._Y,r.JL,r.sg,r.Fj,r.JJ,r.u,s.O5,s.RF,s.n9,s.ED],styles:["@keyframes spinner{0%{transform:rotate(0)}to{transform:rotate(359deg)}}[_nghost-%COMP%]{min-height:100%;padding:20px}.login[_ngcontent-%COMP%]{border-radius:2px 2px 5px 5px;padding:10px 20px 80px;width:90%;max-width:320px;background:#ffffff;position:relative;box-shadow:0 1px 5px #0000004d}.login.loading[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{max-height:100%;padding-top:50px}.login.loading[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%]{opacity:1;top:40%}.login.ok[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:var(--success)}.login.fail[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:var(--danger)}.login.ok[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%], .login.fail[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%]{border-radius:0;border-top-color:transparent;border-right-color:transparent;height:20px;animation:none;transform:rotate(-45deg)}.login[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{display:block;padding:15px 10px;margin-bottom:10px;width:100%;border:1px solid #ddd;transition:border-width .2s ease;border-radius:2px;color:#ccc}.login[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] + i.fa[_ngcontent-%COMP%]{color:#fff;font-size:1em;position:absolute;margin-top:-47px;opacity:0;left:0;transition:all .1s ease-in}.login[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none;color:#444;border-color:var(--secondary);border-left-width:35px}.login[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus + i.fa[_ngcontent-%COMP%]{opacity:1;left:30px;transition:all .25s ease-out}.login[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:.8em;color:var(--primary);text-decoration:none}.login[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:var(--primary);font-size:1.2em;font-weight:700;margin:10px 0 30px;border-bottom:1px solid #eee}.login[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;height:100%;padding:10px;background-color:var(--secondary);color:#fff;display:block;border:none;margin-top:20px;position:absolute;left:0;bottom:0;max-height:60px;border:0px solid rgba(0,0,0,.1);border-radius:0 0 2px 2px;transform:rotate(0);transition:all .1s ease-out;border-bottom-width:7px}.login[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%]{display:block;width:40px;height:40px;position:absolute;border:4px solid #ffffff;border-top-color:#ffffff4d;border-radius:100%;left:50%;top:0;opacity:0;margin-left:-20px;margin-top:-20px;animation:spinner .6s infinite linear;transition:top .3s .3s ease,opacity .3s .3s ease,border-radius .3s ease;box-shadow:0 1px #0003}.login[_ngcontent-%COMP%]:not(.loading)   button[_ngcontent-%COMP%]:hover{box-shadow:0 1px 3px var(--primary)}.login[_ngcontent-%COMP%]:not(.loading)   button[_ngcontent-%COMP%]:focus{border-bottom-width:4px}footer[_ngcontent-%COMP%]{display:block;padding-top:50px;text-align:center;color:#ddd;font-weight:400;text-shadow:0px -1px 0px rgba(0,0,0,.2);font-size:.8em}footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:link{color:#fff;text-decoration:none}"]}),t})()}];let b=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[g.Bz.forChild(C)],g.Bz]}),t})(),M=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[s.ez,r.UX,b]]}),t})()}}]);
//# sourceMappingURL=69.4a6ceb67c92f67af.js.map