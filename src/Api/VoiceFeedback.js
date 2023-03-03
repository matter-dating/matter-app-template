import {getRealmApp} from '../getRealmApp';
import {voice_server_address} from '../Utils/EnvironmentVariables';
export default class VoiceFeedback {
  constructor() {
    this.server = voice_server_address;
    this.url = '/api/v1/voice_intro';
    this.headers = new Headers();
    this.headers.set('Accept', 'application/json');
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('X-API-KEY', '2f7924a9-e0e2-48c1-8b44-6410c4343323');
  }

  async reviewVoice() {
    return await fetch(this.server + this.url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        uid: getRealmApp().currentUser.id,
      }),
    });
  }
}
