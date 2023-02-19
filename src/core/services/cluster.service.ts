import cluster from 'cluster';
import { cpus } from 'os';
import { INestApplication, Injectable, Logger, Scope } from '@nestjs/common';
type CallbackFunction = () => Promise<INestApplication>;
const numCPUs: number = cpus().length;
interface Msg {
  cmd: string;
}
@Injectable({ scope: Scope.DEFAULT })
export class AppClusterService {
  static readonly Logger = new Logger(AppClusterService.name);
  static async clusterize(callback: CallbackFunction): Promise<void> {
    if (cluster.isPrimary) {
      AppClusterService.Logger.log(`Number of CPUs is ${numCPUs}`);
      AppClusterService.Logger.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        AppClusterService.Logger.log(
          `Worker ${worker.process.pid} died. Restarting`,
          signal || code,
        );
        cluster.fork();
      });
    } else {
      AppClusterService.Logger.log(`Cluster server started on ${process.pid}`);
      const app = await callback();
      process.on('SIGINT', () => app.close());
      process.on('SIGTERM', () => app.close());
      process.on('SIGUSR2', async () => app.close());
      process.on('message', (msg) => {
        if (msg === 'shutdown') {
          app.close();
        }
      });
    }
  }

  private static trackOfhttpRequests() {
    let numReqs = 0;
    for (const id in cluster.workers) {
      cluster.workers[id].on('message', messageHandler);
    }
    setInterval(() => {
      AppClusterService.Logger.log(`numReqs = ${numReqs}`);
    }, 1000);
    function messageHandler(msg: Msg) {
      if (msg.cmd && msg.cmd === 'notifyRequest') {
        numReqs = numReqs + 1;
      }
    }
  }

  private static setTimeouts(worker: any) {
    let timeout: NodeJS.Timeout;
    worker.on('listening', (address) => {
      worker.send('shutdown');
      worker.disconnect();
      timeout = setTimeout(() => {
        worker.kill();
      }, 2000);
    });
    worker.on('disconnect', () => {
      clearTimeout(timeout);
    });
  }
}