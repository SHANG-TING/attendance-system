import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pushSubscriptionJSON!: PushSubscriptionJSON;

  constructor(private swPush: SwPush) {}

  // tslint:disable-next-line: typedef
  async ngOnInit() {
  //   if (!('Notification' in window)) {
  //     console.error('這個瀏覽器不支援 Notification');
  //     return;
  //   }

  //   if (Notification.permission !== 'granted') {
  //     const permission = await Notification.requestPermission();

  //     if (permission !== 'granted') {
  //       console.error('您拒絕了開放通知權限，我們就不能發送打卡通知');
  //       return;
  //     }
  //   }

  //   const pushSubscription = await this.swPush.requestSubscription({
  //     serverPublicKey: 'BGfr6xv-2OqB7_NmYF-Pno3UCRP7j84GfvMY9CnpLuHfUj4yXzRIEg7dBTMc7kYLM68fipFQL6mRytYS8SLPzc4'
  //   });

  //   this.pushSubscriptionJSON = pushSubscription.toJSON();
  }
}
