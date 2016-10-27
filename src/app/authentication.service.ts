import { Injectable } from '@angular/core';
import * as google from 'googleapis';
import { googleAuth} from 'google-auth-library';
import * as gapi from 'gapi';

@Injectable()
export class AuthenticationService {

  constructor() { }
 // constants
  private CLIENT_ID = "225138397285-u0ob4kp98984q2l20sdmtj8stmg06s81.apps.googleusercontent.com";
  private userEmail = "unlv.edu_k3bqkb7tm521g33c0rmf1av3vo%40group.calendar.google.com"; //your calendar Id
  private userTimeZone = "Las Vegas";
  private scope = "https://www.googleapis.com/auth/calendar.readonly";

  checkAuth() {
    gapi.auth.authorize({client_id: this.CLIENT_ID, scope: this.scope, immediate: false}, this.handleAuthResult.bind(this));
    return false;
  }

  handleAuthResult(authResult) {
    console.log("Authentication result:");
    console.log(authResult);

    if (authResult  && !authResult.error) {

      gapi.client.load('calendar', 'v3', function () {

        var today = new Date();
        var request = gapi.client.calendar.events.list({
          'calendarId' : this.userEmail,
          'timeZone' : this.userTimeZone,
          'singleEvents': true,
          'timeMin': today.toISOString(), //gathers only events not happened yet
          'maxResults': 10,
          'orderBy': 'startTime'});

        request.execute(function (resp) {

          if(resp.error) {
            console.log('request.execute error:'  );
            console.log(resp.error);
          }
          for (var i = 0; i < resp.items.length; i++) {
            console.log("Event: " + i + ' '+ JSON.stringify( resp.items[i]));

          }
        }.bind(this));
      }.bind(this));
    } else  {
      console.log ("NOT  authenticated  " + authResult.error );
      console.log (authResult );
    }
  }




}
