
const Eureka = require('eureka-js-client').Eureka;
const eurekaHost = (process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || '35.224.112.227');
const eurekaPort = process.env.PORT_ || 8761;
const hostName = (process.env.HOSTNAME || '35.224.112.227')
const ipAddr = '172.0.0.1';

exports.registerWithEureka = function(appName, PORT) {
    const client = new Eureka({
    instance: {
      app: appName,
      hostName: hostName,
      ipAddr: ipAddr,
      port: {
        '$': PORT,
        '@enabled': 'true',
      },
      vipAddress: appName,
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },

    eureka: {
      host: eurekaHost,
      port: eurekaPort,
      servicePath: '/eureka/apps/',
      maxRetries: 10,
      requestRetryDelay: 2000,
    },
  })

client.logger.level('debug')

client.start( error => {
    console.log(error || appName + " registered")
});



function exitHandler(options, exitCode) {
    if (options.cleanup) {
    }
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) {
        client.stop();
    }
}

client.on('deregistered', () => {
    process.exit();
    console.log('after deregistered');
})

client.on('started', () => {
  console.log("eureka host  " + eurekaHost);
})

process.on('SIGINT', exitHandler.bind(null, {exit:true}));
};
