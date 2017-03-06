/**
 * Created with Visual Studio Code
 * github: https://github.com/tianxiangbing/mock
 * homepage:http://www.lovewebgames.com/mock
 * User: 田想兵
 * Date: 2017-03-02
 * Time: 16:27:55
 * Contact: 55342775@qq.com
 * Desc: 主界面功能：开启http服务
 */

var $ = require('jquery');
var path = require('path');
var express = require('express');
var app = express();
const {shell} = require('electron');
var Index = {
    server: null,
    iWin:null,
    init: function () {
        $('#btn_start').click( ()=> {
            // alert($('#port').val());
            let port = $('#port').val();
            app.get('/', function (req, res) {
                res.send('服务已启动...');
            });
            this.server = app.listen(port, ()=> {
                var host = this.server.address().address;
                var port = this.server.address().port;
                this.showtip('服务已启动...');
                console.log('app listening at http://%s:%s', host, port);
                $('#btn_start').hide();
                $('#btn_stop').show();
            });
        });
        $('#btn_stop').click( ()=> {
            server.close( ()=> {
                console.log('close :(');
                this.server = null;
                showtip('服务已停止...');
                $('#btn_start').show();
                $('#btn_stop').hide();
            });
        });
        $('#btn_addimport').click(function () {
            const {BrowserWindow} = require('electron').remote
            iWin = new BrowserWindow({ width: 800, height: 600 });
            iWin.loadURL(path.join('file://', __dirname, 'src/addImport.html'));
        });
        $('#btn_browser').click(function () {
            if (server) {
                // window.open('http://localhost:'+$('#port').val())
                setTimeout(() => {
                    // opn('http://localhost:'+$('#port').val())
                    shell.openExternal('http://localhost:' + $('#port').val());
                }, 1000)
            } else {
                alert('服务没有启动!');
            }
        })
    },
    showtip: (text) => {
        $('#tips').html(text);
        setTimeout(() => {
            $('#tips').html('');
        }, 1000)
    }
}
Index.init();