/*
 * snailfwd-jswrap
 * http://fis.baidu.com/
 */

'use strict';
module.exports = function(content, file, conf){
    //console.log('jswrap file:'+file);
    var isInitFile=/init/g.test(file.filename);
    if(file.isComponents&&!isInitFile || file.isSpmModules&&!isInitFile || conf.wrapAll){
        //wrap
//        //默认文件名中有init的文件为非组件
//        if(/init/g.test(file.filename)){
//            file.isComponents=false;
//        }
        if(conf.template){
            content = String(conf.template)
                .split('${content}').join(content)
                .split('${id}').join(file.getId());
        } else if(conf.type === 'amd') {
            if(!/^\s*define\s*\(/.test(content)){
                content = 'define(\'' + file.id + '\', function(require, exports, module){ \r\n' + content + ' \r\n});';
            }
        } else {
            if(!/^\s*(?:[!(]\s*|void\s+)function\(/.test(content)){
                content = '!function(){try{ ' + content + ' }catch(e){}}();';
            }
        }
    }
    return content;
};