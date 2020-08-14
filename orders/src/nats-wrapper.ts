import nats, { Stan } from 'node-nats-streaming';


class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string): Promise<void> {
    this._client = nats.connect(clusterId, clientId, { url });

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    })
    process.on('SIGINT', natsWrapper.client.close);
    process.on('SIGTERM', natsWrapper.client.close);

    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      });
    })
  }

}

export const natsWrapper = new NatsWrapper();