const commander = require('commander');
const needle    = require('needle')   ;
const os        = require('os')       ;
const GetRoute  = require('./getRoute');
const readline  = require('readline')

const ask = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

class Main {
  main(url){
    console.log('\n         [ wpcon | made by : ibnusyawall | 407 Authentic Exploit ] \n                usage : node index --url http://site.com ');
    class Get {
      getIp(a, b){
        return `${os.platform()} ${os.hostname()} ${os.networkInterfaces()['wlp2s0'][a*0]['address']} : ${os.networkInterfaces()['wlp2s0'][0*b]['mac']} \n`;
      }
      rand(){
        let data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        return data[Math.floor(Math.random() * data.length)];
      }
    }
    const get = new Get();
//    console.log(`\n -- online : ` + get.getIp(get.rand(), get.rand()) );
    commander
      .name('wpcon')
      .version('0.0.1', '--version')
      .option('-url, --url [url]', 'url wordpress example : https://smkn1padaherang.sch.id')
    commander.on('--help', () => {
      console.log('\n  Usage : \n')
      console.log('    $ node index --url http://site.com \n')
    });
    commander.parse(process.argv);

    if (commander.url) {
          console.log(`\n [/] url : ${commander.url} \n`)
          needle.get(`${commander.url}/wp-json/wp/v2/users/`, (err, resp, body) => {
            let hasil = body;
            if (!err && resp.statusCode == 200){
              for (let i = 0; i < hasil.length; i++){
              console.log(` [${hasil[i].id}] ${hasil[i].name} : ${hasil[i].slug}`);
            }
            console.log('\n [+] Success Get User'); //process.exit(1);
            console.log('\n Headers : ');
            console.log('   [*] Server : ' + resp.headers.server)
            console.log('   [*] Method : ' + resp.headers.allow)
            console.log('   [*] Date   : ' + resp.headers.date)
            console.log('   [*] Status : ' + resp.statusCode)
            console.log('\n [~] Done:) ')
            //process.exit(1);
            ask.question(' [?] Get Routes ? [y/n] : ', (route) => {
              if (route == 'y' || route == 'Y') {
                const get = new GetRoute()
                return get.main(commander.url)
//                console.log('\n [÷] finished! ')
//                process.exit(1)
              } else {
                console.log('\n [÷] finished! ')
                process.exit(1)
              }
            })
           } else {
            console.log('\n [x] not found user in this site maybe not allow for get and views')
            console.log(' [*] stopped!'); process.exit(1);
          }
         })
    } else {
      return commander.help();
    }

  }
}

module.exports = Main;
