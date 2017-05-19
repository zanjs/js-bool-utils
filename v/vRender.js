(function(e) {
    e.vRender || (e.vRender = {});
     function Render(element, datas, _config){
        var el=element;
        if(typeof(element)=="string"){
            el=document.getElementById(element);
        }
        _config||(_config={});
        if(_config.view){
            var elview=_config.view;
            if(typeof(elview)=="string"){
                elview=document.getElementById(elview);
            }
            el.__childNodes=undefined;
            el.innerHTML=elview.innerHTML;
            elview.parentNode.removeChild(elview);
        }
        if(_config.viewStr){
            el.__childNodes=undefined;
            el.innerHTML=_config.viewStr;
        }
        this.x=1;
        if(el){
        datas.__obel__||(datas.__obel__=[]);
        this.data=datas;
        this.config=_config;
        this.el=el;
        this.upRegKeys={};
        this.round={};
        _rendereEl.call(this,el);
        }
    }
    Render.prototype.__listen__={};

    Render.prototype.$watch=function(key,callback){
        var _key=key.replace(/\[/g,".").replace(/\]/g,"");
        var _keysp=_key.split(".");
        var _value=this.data;
        var l=_keysp.length;
        for(var i=0;i<l;i++){
            if(typeof(_value[_keysp[i]])!="object"){
                _value.__listen__||(_value.__listen__={});
                _value.__listen__[_keysp[i]]=callback;
            }else{
                _value=_value[_keysp[i]];
            }
        }
    };
    Render.prototype.$set=function(key,value){
        var _key=key.replace(/\[/g,".").replace(/\]/g,"");
        var _keysp=_key.split(".");
        var _value=this.data;
        _keysp.each(function(e){
            if(_value[e]==undefined){                       
                _value[e]=value;
            }else{
                if(typeof(_value[e])!="object"){
                    _value[e]=value;
                }else{
                    _value=_value[e];
                }
            }   
        });
    };
    function _vuRenderChild(el){
        if(el.nodeType===3){          
            _vrResultValue.call(this,el);
        }
        else if(el.nodeType===1){
            _rendereEl.call(this,el);
        }
        if(el.nextSibling){
            _vuRenderChild.call(this,el.nextSibling);
        }
    }
    function _rendereEl(el){
        var l=el.attributes.length;
        var bol=true;
        for(var i=0;i<l;i++){
            if(el.attributes[i].name=="v-for"){
                vrVfor.call(this,el,el.attributes[i].value);bol=false;
            }
            else if(el.attributes[i].name.indexOf("v-on:")>-1){
                var evName=el.attributes[i].name.replace("v-on:","");
                var evFunc=el.attributes[i].value;
                _bindEvent.call(this,el,evName,evFunc);                
            }        
            else if(el.attributes[i].name=="v-str"||el.attributes[i].name=="v-html") {
                if(!el.__defaultText){
                    el.__defaultText=el.innerHTML;
                }
                el.innerHTML=_angular.call(this, el.__defaultText || el.innerHTML, el.attributes[i]);
            }else if(el.attributes[i].name=="v-value"){
                if(el.src){
                    el.src=_angular.call(this, el.attributes[i].value, el.attributes[i]);
                }else if(el.attributes["value"]){
                    el.value=_angular.call(this, el.attributes[i].value, el.attributes[i]);
                }
                else{
                    el.innerHTML=_angular.call(this, el.attributes[i].value, el.attributes[i]);    
                }
            }
            else if(el.attributes[i].name=="v-model"){                
                if(el.nodeName==="TEXTAREA"||el.nodeName==="INPUT"){                    
                    var columnAr=_zsplits(columnPathReg.call(this,el.attributes[i].value));                                        
                    var kl=columnAr.length;
                    var value=this.data;
                    var vm;
                    for(var k=0;k<kl;k++){
                        if(typeof(value[columnAr[k]])!=="object"){                
                          vm=columnAr[k];              
                        }else{                
                            value=value[columnAr[k]];
                        }
                    }                    
                    el.onkeyup=function(event){
                        value[vm]=event.target.value;                        
                    }
                }
            }else{
            var _value=_angular.call(this,el.attributes[i].__defaultText||el.attributes[i].value,el.attributes[i]);
            if(_value!==el.attributes[i].value){
                if(el.attributes[i].name=="value"){
                    el.value=_value;
                }else{
                    el.attributes[i].value=_value;
                }
            }
            }
        }
        if(bol&&el.hasChildNodes()){
            _vuRenderChild.call(this,el.childNodes[0]);
        }                
    }
    function vInsertAfter(newChild,child,parentNode){
        parentNode.insertBefor(newChild,child.nextSibling);
    }
    function copyRound(obj){
        var nobj={};
        for(var avm in obj){
            nobj[avm]=obj[avm];
        }
        return nobj;
    }
    function vrVfor(el,attr){
        var childkey = attr.split(/\s+in\s+/);                
        el.__nKey = childkey[0];
        this.upRegKeys=copyRound(this.upRegKeys);
        this.round=copyRound(this.round);
        this.upRegKeys[childkey[0]]={value:childkey[1]};
        this.round[childkey[0]]={value:0};
        if (!el.__childNodes) {
            el.__childNodes = [];
            var k = el.childNodes.length;
            for (var j = 0; j < k; j++) {
                el.__childNodes.push(el.childNodes[j]);
            }
        }
        var columnAr=columnPathReg.call(this,childkey[1]);
        columnAr=_zsplits(columnAr);
        var _vmPath=columnAr.join(".");         
        this.data[columnAr[0]]||(this.data[columnAr[0]]=[]); 

        var columnAr=columnPathReg.call(this,childkey[1]);
        columnAr=_zsplits(columnAr);
        var _vmPath=columnAr.join(".");
        _vSaveDom.call(this,this.data, el, _vmPath);        
        if(columnAr.length==1){
            this.data[columnAr[0]].__ob__||(this.data[columnAr[0]]=_AryToObj.call(this, this.data[columnAr[0]],_vmPath,el));
            this.data.__ob__ || (this.data.__ob__ = {});
            this.data.__ob__[columnAr[0]] = this.data[columnAr[0]];      
            __defineProperty.call(this, this.data, columnAr[0], _vmPath, this.data, this.back);
        }else{
            var vm=columnAr[columnAr.length-1];
            columnAr.pop();

            var data=columnValueReg(this.data,columnAr.join("."));
            if(data[vm]===undefined){
                data[vm]="";
            }
            data[vm].__ob__||(data[vm]=_AryToObj.call(this, data[vm], _vmPath,el));
            data.__ob__ || (data.__ob__ = {});
            data.__ob__[vm] = data[vm];
            __defineProperty.call(this, data, vm, _vmPath, this.data, this.back);
        }
        vVforDom.call(this,el,columnValueReg(this.data,_vmPath),childkey[0]);
    }

    function vVforDom(el,data,nKey){
        var cN=el.__childNodes.length;
        var hasN=el.childNodes.length/cN;
        var dN=data.length;
        if(hasN>dN){
            delVfor(el,dN*cN,(hasN-dN)*cN);            
            revRender.call(this,el,0,data.length,cN,nKey);
        }else if(hasN==dN){
            revRender.call(this,el,0,hasN,cN,nKey);
        }else{
            revRender.call(this,el,0,hasN,cN,nKey);
            if(!hasN){this.round[nKey].value--;}
            el.appendChild(appVfor.call(this,el,data.length-hasN,1,nKey));
        }
    }
    function revRender(child,startN,endN,cN,nKey){
        for(var i=startN;i<endN;i++){
            if(i>startN){
                this.round=copyRound(this.round);
                this.round[nKey]={value:this.round[nKey].value+1};
            }
            for(var j=i*cN;j<i*cN+cN;j++){
                if(child.childNodes[j].nodeType===3){
                _vrResultValue.call(this,child.childNodes[j]);
                }else{
                _rendereEl.call(this,child.childNodes[j]);
                }
            }
        }
    }
    function delVfor(el,startN,endN){        
        while(endN){
            el.removeChild(el.childNodes[startN]);    
            endN--;
        }
    }
    function beforeVfor(el,cDF,startN){
        el.insertBefore(cDF,el.childNodes[startN]);
    }
    function afterVfor(el,cDF,startN){        
        if(startN==el.childNodes.length){
            el.appendChild(cDF);
        }else{
            el.insertBefore(cDF,el.childNodes[startN+1]);    
        }    
    }
    function appVfor(el,count,bol,nKey){
        var cDF=document.createDocumentFragment();  
        var child=el.__childNodes;
        var l=child.length;
        for(var i=0;i<count;i++){
            this.round=copyRound(this.round);
            this.round[nKey]={value:this.round[nKey].value+1};
        for(var n=0;n<l;n++){
            var _child = child[n].cloneNode();
            if (child[n].__defaultText) {
                _child.__defaultText = child[n].__defaultText;
            }
            if (child[n].__childNodes) {
                _child.__childNodes = child[n].__childNodes;
            }
            if(_child.nodeType!==3){
                xunhuanEls(child[n], _child,this.config);
                _copyEvent(child[n], _child,this.config);
                _copyAttri(child[n], _child);
            }
            if(bol){
                cDF.appendChild(_child);
            }else{
                cDF.insertBefore(_child,cDF.childNodes[0]);
            }
            _vuRenderChild.call(this, _child);
        }
        }
        return cDF;
    }

    function _vrResultValue(child){
        var _value=_angular.call(this,child.__defaultText||child.textContent,child);
        (_value!==child.textContent)&&(child.textContent=_value);        
    }
    Array.prototype.each = function(e) {
        var l = this.length;
        for (var i = 0; i < l; i++) {
            e(this[i])
        }
    };
   Object.clone=function(that){        
            var newe;
            if(that&&typeof(that)=="object"&&that.length!==undefined){
                newe=[];
                for(var i=0;i<that.length;i++){                    
                    newe.push(Object.clone(that[i]));
                }                
            }else{
                newe={};
                for(var a in that){
                if(a!="__ob__"&&a!="__obel__"){                     
                    if(typeof(that[a])=="object"){                            
                        newe[a]=Object.clone(that[a]);
                    }else{
                        newe[a]=that[a];
                    }
                }
            }                 
            }
            return newe;                
    };

    function clearNewArray(e){        
        if(e.__ob__){
            var newe={};
            for(var a in e.__ob__){
                newe[a]=clearNewArray(e.__ob__[a]);
            }
            return newe;        
        }else{
            return e;
        }
    }
    function jiuzheng(el,newObj,nwl,arg,anc,_vmPath){
        for(var i=nwl-1;i>arg-1;i--){
            newObj[i].__obel__[0].round[el.__nKey].value=newObj[i].__obel__[0].round[el.__nKey].value+anc;
        }
    }

    function vArrayEvent(vm,newObj,el,_vmPath){
        var that=copyRound(this);
        return function(){  
            var arg=[];
            var l=arguments.length;
            for(var i=0;i<l;i++){
                arg.push(clearNewArray(arguments[i]));
            }
            var obl=newObj.length;
            var obj=newObj.__ob__[vm].apply(newObj.__ob__,arg);
            var argl=arguments.length;
            var cs;
            if(el.__childNodes){
                var cN=el.__childNodes.length;
                switch(vm){
                case "concat":
                Array.isArray(arguments)&&Array.isArray(arguments[0])&&arguments[0][1]&&arguments[0][1].__ob__&&(arguments=arguments[0]);
                break;
                case "unshift":
                for(var i=newObj.length-1;i>obl-argl-1;i--){
                    newObj[i]=newObj.__ob__[i];
                }
                var newTath=copyRound(that);
                newTath.round=copyRound(newTath.round);
                newTath.round[el.__nKey]={value:-1};
                el.insertBefore(appVfor.call(newTath,el,argl,1,el.__nKey),el.childNodes[0]);
                jiuzheng(el,newObj,newObj.length,argl,argl,_vmPath);
                that.round[el.__nKey].value=newObj.length-argl;
                revRender.call(that,el,newObj.length-argl,newObj.length,cN,el.__nKey);
                break;
                case "push":
                for(var i=obl;i<newObj.length;i++){
                    newObj[i]=newObj.__ob__[i];
                }
                that.round[el.__nKey].value=newObj.length-argl-1;
                el.appendChild(appVfor.call(that,el,argl,-1,el.__nKey));
                break;
                case "shift":
                delVfor(el,0*cN,1*cN);
                jiuzheng(el,newObj,newObj.length,0,1*-1,_vmPath);
                that.round[el.__nKey]={value:newObj.length-1};
                revRender.call(that,el,newObj.length-1,newObj.length,cN,el.__nKey);
                break;
                case "pop":
                delVfor(el,newObj.length+1*cN,(newObj.length)*cN);
                break;
                case "splice":
                    var newArgN=arguments.length-2;//新参数数量；
                    var begN=arguments[0]+arguments[1];//影响到的最终位数
                    var chaH=arguments[1]-newArgN;
                    if(newArgN){
                        if(chaH>0){//新增数少于原数，需删除
                            that.round[el.__nKey].value=arguments[0];
                            revRender.call(that,el,arguments[0],arguments[0]+newArgN,cN,el.__nKey);
                            delVfor(el,(arguments[0]+newArgN)*cN,chaH*cN);
                            jiuzheng(el,newObj,newObj.length,arguments[0]+chaH,chaH*-1,_vmPath);
                            var newTath=copyRound(that);
                            newTath.round=copyRound(newTath.round);
                            newTath.round[el.__nKey]={value:newObj.length-chaH};
                            revRender.call(newTath,el,newObj.length-chaH,newObj.length,cN,el.__nKey);
                        }else if(chaH==0){
                            that.round[el.__nKey].value=arguments[0];
                            revRender.call(that,el,arguments[0],arguments[0]+newArgN,cN,el.__nKey);
                        }else{//新增数大于原数
                            var newObjl=newObj.length;
                            var addnum=newObj.length-obl;
                            var endNum=arguments[0]+addnum;
                            that.round[el.__nKey].value=arguments[0];
                            revRender.call(that,el,arguments[0],endNum,cN,el.__nKey);

                            for(var i=newObj.length-1;i>newObj.length-addnum-1;i--){
                                newObj[i]=newObj.__ob__[i];
                            }
                            var newTath=copyRound(that);
                            newTath.round=copyRound(newTath.round);
                            newTath.round[el.__nKey]={value:endNum-1};
                            afterVfor(el,appVfor.call(newTath,el,chaH*-1,-1,el.__nKey),endNum);
                            jiuzheng(el,newObj,newObj.length,endNum+1,addnum,_vmPath);
                            var that3=copyRound(that);
                            that3.round=copyRound(that3.round);
                            that3.round[el.__nKey]={value:newObj.length-addnum};
                            revRender.call(that3,el,newObj.length-addnum,newObj.length,cN,el.__nKey);
                        }
                    }else{
                        delVfor(el,arguments[0]*cN,arguments[1]*cN);
                        jiuzheng(el,newObj,newObj.length,arguments[0],arguments[1]*-1,_vmPath);
                        that.round[el.__nKey]={value:newObj.length-arguments[1]};
                        revRender.call(that,el,newObj.length-arguments[1],newObj.length,cN,el.__nKey);
                    }
                    break;
                }    
            }
            
            return obj;
        }
    }

    function _createpType(value, dataType, msg, columnValue) {                        
        if((/[^*+-\\/]+/g).test(dataType)){            
        if (dataType == "time") {
            value =format("yyyy/MM/dd hh:mm:ss",value);            
        }
        else if(dataType == "shortTime"){
            value =format("yyyy/MM/dd",value);
        }
        else {            
            if (dataType) {
            var _tbol = true;
            var that=this;
            var _evFunc=columnValue.split(/[()]/);
            if(!_evFunc[_evFunc.length-1]){
                _evFunc.pop();
            }
            var evArguments=[];
            if(_evFunc[0]){
                var evArg=_evFunc[0].split(",");
                evArg.each(function(arg){
                    evArguments.push(_createObjValue.call(that,arg));
                })
            }
            switch ("function") {
                case typeof(this.config[dataType]):                                     
                    value = this.config[dataType].apply({},evArguments);
                    _tbol = false;
                    break;
                    case typeof(window[dataType]):
                    value = window[dataType].apply({},evArguments);
                    _tbol = false;
                    break;
            }
            if (_tbol && /([yMdhms]+)/.test(dataType)) {
                value = format(dataType, value)
            }
            }
        }
        }        
        return value
    }
    var _rdkh = new RegExp("^[{(]|[)}]$", "g");

    function format(fmt, value) {
        if (_num.test(value)) {
            value = value * 1
        }
        var time = new Date(value);
        if (time != "Invalid Date") {
            var o = {
                "M+": time.getMonth() + 1,
                "d+": time.getDate(),
                "h+": time.getHours(),
                "m+": time.getMinutes(),
                "s+": time.getSeconds(),
                "q+": Math.floor((time.getMonth() + 3) / 3),
                "S": time.getMilliseconds()
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length))
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
                }
            }
            return fmt
        } else {
            return ""
        }
    }
    function _judge(columnValue) {
        var value;        
        if((/^['"]+/).test(columnValue)){            
            value=columnValue.substring(1,columnValue.length-1);
        }
        else if (columnValue == "this") {
            value = data
        } else {            
            if (_strReg.test(columnValue)) {
                value = columnValue.replace(_strRegV, "")
            } else {
                value=_createObjValue.apply(this,arguments);
            }
        }
        return value
    }
    function _zsplits(e){        
        var ar= e.split(/[.]|[\[\].]{2,3}|[\[]|[\]]/);
        if(!ar[ar.length-1]){
            ar.pop();
        }
        return ar;
    }
    function columnPathReg(columnValue){
        var columnAr=_zsplits(columnValue);
        if(this.upRegKeys&&this.upRegKeys[columnAr[0]]){
            var columnFirst=columnAr[0];
            columnFirst=columnPathReg.call(this,this.upRegKeys[columnAr[0]].value);
            if(this.round&&this.round[columnAr[0]]!==undefined){
                columnAr[0]=this.round[columnAr[0]].value;
            }
            columnAr.unshift(columnFirst);
        }
        return columnAr.join(".");
    }

    function columnValueReg(value,columnValue){
        var columnAr = _zsplits(columnValue);
        var l=columnAr.length;
        for(var i=0;i<l;i++){
            if(value!==undefined){
                if (typeof(value) == "string" && _num.test(columnAr[i])) {
                    columnAr[i] = columnAr[i] * 1;
                    if (columnAr[i] > 0 && value.length > columnAr[i]) {
                        value = value.substring(0, columnAr[i]) + "..."
                    } else {
                        if (columnAr[i] < 0 && value.length >= -1 * columnAr[i]) {
                            value = "*" + value.substring(-1 * columnAr[i], value.length)
                        }
                    }
                }else{
                    if(columnAr[i]=="$index"){
                        value=columnAr[i-1];
                    }else if(value[columnAr[i]] !== undefined){
                        value = value[columnAr[i]];
                    }else{
                        value="";
                        break;
                    }
                }
            }else{
                if(columnAr[i]=="$index"){
                    value=columnAr[i-1];
                }else{
                    value="";
                    break;
                }
            }
        }
        return value;
    }
    function _createObjValue(columnValue){
        if (columnValue.indexOf(".") > -1||columnValue.indexOf("[") > -1) {
            columnValue=columnPathReg.call(this,columnValue);             
            var columnAr = _zsplits(columnValue);
            value = this.data;            
            var oldChildKey=columnValueReg(value,columnValue);                       
            value=oldChildKey;
        }else {
            var value=this.data;
            columnValue=columnPathReg.call(this,columnValue);
            value=columnValueReg(value,columnValue);
        }        
        if(this.dom){
            __defineProperty2.call(this,columnValue);
        }
        return value
    }
    function _createValue(columnValue,status,dom) {
        var value = "",
            nodata = "",nodataStatu;       
            if(!dom.__defaultText){
                dom.__defaultText=dom.textContent;
            }
        this.dom=dom;
        var arg1 = columnValue.indexOf("?");            
        if((/[-*+\/]+/).test(columnValue)){                     
            var _columnValue=columnValue.replace(/\s+/g,"");
            var _values;
            var that=this;
            var _resvalue;            
            var _values=_columnValue.match(/[^+\-\*\/()]+/g);                
                _values.each(function(_v){     
                    if(!(/^-?[\d]+$/).test(_v)){
                        _resvalue=_createValue.call(that,_v,status,dom);
                        if(!(/-?[\d]+/).test(_resvalue)){
                            _resvalue=0;
                        }                        
                     _columnValue=_columnValue.replace(_v,_resvalue);       
                     }              
                });                                                                  
                _columnValue=_columnValue.replace(/[^.+\-\*\/()\d]+/g,"");                
                value =strToNumber(_columnValue);
        }
        else if (columnValue.indexOf("||") > -1) {
            nodataStatu=true;
            var columnsplit = columnValue.split("||");
            if((/^-?[\d]+$/).test(columnsplit[1])){
                nodata=columnsplit[1] * 1;
            }else{
                nodata=_judge.call(this,columnsplit[1]);
            }
            value = _judge.call(this,columnsplit[0]);
            columnValue = columnsplit[0]
        }
        else if (arg1 > -1) {
            var argV = columnValue.substring(arg1 + 1, columnValue.length);
            var _left = argV.match(/^'[^\n\\]+':|^"[^\n\\]+":|^[^\n\\]+:/)[0];
            var _right = argV.match(/:[^\n\\'"]+$|:'[^\n\\]+$|:"[^\n\\]+$/)[0];            
            if (_judge.call(this,columnValue.substring(0, arg1))) {             
                value = _judge.call(this,_left.substring(0, _left.length - 1))
            } else {
                value = _judge.call(this,_right.substring(1, _right.length))
            }
        } else {            
            value = _judge.call(this,columnValue);
        }

        if (status) {
            status = status[0];
            var p = status.replace(_rdkh, "").split(",");
            var l = p.length;
            for (var i = 0; i < l; i++) {
                var _pNm = p[i].split(":");
                if (_pNm[0] == value||(_pNm[0]===""&&value===undefined)) {
                    value = _pNm[1]
                }
            }
        }

        if(nodataStatu){
            return (value || value === 0) ? value : nodata;
        }
        else{
            return value;
        }
    }
    var _outType = ["{{", "}}"];
    var _strReg = new RegExp("^['\"]{1}[^\r]+['\"]{1}$");
    var _strRegV = new RegExp("^['\"]{1}|['\"]{1}$", "g");
    var _getText, _getList, _getType, _getTypeV, _getStatus, _getStatusV, _reText, _canRe, _getAll, _anNum2, _num, _fnum, _toReg;
    function createRegex() {
        _getText = "[^\\n(" + _outType[1] + ")(" + _outType[0] + ")]+";
        _getType = "(\\([^\\n(" + _outType[1] + ")(" + _outType[0] + ")]+\\)){0,1}";
        _getTypeV = "[^*+-\\/"+_outType[1] + _outType[0]+"]([^\\n" + _outType[1] + _outType[0] + "]*)";
        _getStatus = "({[^\\n{}]+}){0,1}";
        _getStatusV = "([^\\n{}]+[:,]+[^\\n{}]+){1}";
        _reText = new RegExp(_getStatus + "(" + _outType[0] + "|" + _outType[1] + ")|" + _getType, "g");
        _canRe = new RegExp(_outType[0] + "|" + _outType[1] + "|\\([^\\n]+\\)}}", "g");        
        _getAll = new RegExp(_outType[0] + "[^\\n{}]*({[^\\n{}]*})?[^\\n{}]*"+ _outType[1], "g");
        _anNum2 = new RegExp("[^\\(\\)]+"), _num = new RegExp("^-{0,1}\\d+$"), _fnum = new RegExp("^\\d{0,20}[.]{0,1}\\d{0,20}$");
        _toReg = new RegExp("(\\(|\\)|\\[|\\]|\\||\\?|\\$)", "g")
    }
    createRegex();
    function _getngValue(pstr,_str,dom){        
        var funcs="",vm=pstr.match(_getTypeV);                        
        if((/[^\*+-\\/]+\(/).test(pstr)){
            vm = vm[0].replace(/^[^(]+\(|\)$/g, "");            
            funcs= pstr.replace(_reText, "");            
        }else{                                    
            vm=vm[0];
        }                
        return _createpType.call(this,_createValue.call(this,vm,pstr.match(_getStatusV),dom,_str), funcs, this.data, vm);        
    }
    function _angular(_str,dom) {               
        var str=_str,pstr=str.match(_getAll);        
        if(pstr){ 
            var l=pstr.length;            
            for(var i=0;i<l;i++){
                var _pstr=pstr[i].substring(2,pstr[i].length-2);                                            
                str = str.replace(pstr[i],_getngValue.call(this,_pstr,_str,dom));
            }            
            return str;
        }else{return _str}
        
    }
    function _evFuncReg(evFunc){
        if(evFunc.indexOf("on")===-1){
            evFunc="on"+evFunc;
        }
        return evFunc;
    }    
    function _bindEvent(el,evName,evFunc){
        var that=this;
        var _evFunc=evFunc.split(/[()]/);
        if(!_evFunc[_evFunc.length-1]){
            _evFunc.pop();
        }
        var evArguments=[];
        evFunc=_evFunc[0];
        if(_evFunc[1]){
        var evArg=_evFunc[1].split(",");
        evArg.each(function(arg){
            var columnAr=_zsplits(columnPathReg.call(that,arg));
                var kl=columnAr.length;
                var value=that.data;
                var vm;
                for(var k=0;k<kl;k++){
                    if(typeof(value[columnAr[k]])!=="object"){
                        vm=columnAr[k];
                    }else{
                        value=value[columnAr[k]];
                    }
                }
                evArguments.push({value:value,vm:vm,kl:arg});
            })
        }
        el[_evFuncReg(evName)]=function (){
            var evArg=[];
            evArguments.each(function(evObj){
                if(evObj.vm=="$index"){
                    var evsp=evObj.kl.split(".");
                    evArg.push(evObj.value.__obel__[0].round[evsp[evsp.length-2]].value);
                }else{

                    evArg.push(evObj.vm?evObj.value[evObj.vm]:evObj.value);
                }
            });
            if(that.config[evFunc]&&typeof(that.config[evFunc])=="function"){
                that.config[evFunc].apply(el,evArg);
            }
            else if(window[evFunc]&&typeof(window[evFunc])=="function"){
                window[evFunc].apply(el,evArg);
            }
        }
    }
    function _vSaveDom(vDate,cElement,vm){
        vDate.__obel__||(vDate.__obel__=[]);
        vDate.__obel__.push({el:cElement,round:this.round,vm:vm});
    }
    function _AryToObj(res,_vmPath,el){                
        var newArg={__ob__:res,length:res.length};
        for(var a in newArg.__ob__){
            if(a!="each"&&a!="__ob__"){
                newArg[a]=newArg.__ob__[a];                
            }
        }
        __defineProperty.call(this, newArg, "length", _vmPath, this.data,this.back);
        var that=this;
        var ar=["splice","push","shift","unshift","concat","pop"];
        ar.each(function(e){
            newArg[e]=vArrayEvent.call(that,e,newArg,el,_vmPath);
        });
        return newArg;        
    }
    function __defineProperty2(vmPath){
        var columnAr = columnPathReg.call(this,vmPath);
        columnAr=_zsplits(columnAr);
        var value = this.data;
        var data=this.data;
        var cElement=this.dom;
        var defaultText=this.dom.__defaultText;        
        var _vmPath="";var back=this.back;
        var that=this;        
        if(columnAr.length>1){
            if(columnAr[0]){
                _vmPath=columnAr[0];
                value=value[_vmPath];
            }
            columnAr.shift();
        }           

        if(typeof(value)!="object"){
            that.data.__ob__ || (that.data.__ob__ = {});
            __defineProperty.call(that, that.data, _vmPath, _vmPath, data, back);
            _vSaveDom.call(that,data,cElement,_vmPath);
        }else{          
            columnAr.each(function(columnAri) {
                _vmPath+="."+columnAri;
                var vm = columnAri.replace(/\[[-\d]+\]/, "");
                if(Array.isArray(value)){
                    value=value[vm]
                }else{
                        if(Array.isArray(value[vm])) {
                            value[vm].__ob__||(value[vm] = _AryToObj.call(that, value[vm], _vmPath,cElement))
                        }
                        else{
                            value.__ob__ || (value.__ob__ = {});
                            __defineProperty.call(that, value, vm, _vmPath, data, back);                            
                            _vSaveDom.call(that,value,cElement,vm);
                            if(typeof(value[vm])!="object"){
                            
                            }else{
                                value=value[vm]
                            }
                        }
                }
            })
        }                
    }
    function __defineProperty(date, vm,_vmPath) {
        if(date[vm]===undefined){
            date[vm]="";
        }        
        date.__ob__[vm]=date[vm];
        var that=this;
        Object.defineProperty(date, vm, {
            set: function(e) {       
                if(Array.isArray(e)){
                    var l= e.length;
                    if(l&&e[l-1].__ob__){
                        var _e=e[l-1];
                        for(var i=0;i<l;i++){
                            e[i]=clearNewArray(e[i]);
                        }                        
                    }
                }
                this.__ob__[vm] = e;
                if(date.__listen__&&date.__listen__[vm]){
                    date.__listen__[vm].call(date,e);
                }
                date.__obel__.each(function(obel){                  
                    if(obel.vm==vm){
                        that.round=obel.round;
                        if(obel.el.nodeType==3){
                            obel.el.textContent=(_angular.call(that,obel.el.__defaultText,""));
                        }else if(obel.el.nodeType==2){
                            var value=(_angular.call(that,obel.el.__defaultText,""));
                            if(obel.el.name=="value"){
                                obel.el.ownerElement.value=value;
                            }else if(obel.el.name=="v-value"){
                                if(obel.el.ownerElement.src){
                                    obel.el.ownerElement.src=value;
                                }else if(obel.el.ownerElement.value!==undefined&&obel.el.ownerElement.value!=value){
                                    obel.el.ownerElement.value=value;
                                }
                                else{
                                    obel.el.ownerElement.innerHTML=value;
                                }
                            }else if(obel.el.name=="v-str"||obel.el.name=="v-html"){
                                obel.el.ownerElement.innerHTML=value;
                            }
                            else {
                                obel.el.value=value;
                            }
                        }else{
                            vVforDom.call(that,obel.el,columnValueReg(that.data,vm),obel.el.__nKey);
                        }
                    }
                })
            },
            get: function() {               
                return this.__ob__[vm]
            }
        })

    };

    e.vRender.render = function(el, data, _config) {
        return new Render(el,data,_config);
    };
    function _xunhuanWhil(child, newEl,config) {
        var _child = child.cloneNode();
        if(_child.nodeType!==3){
            xunhuanEls(child, _child,config);
            if(child.__childNodes){
                _child.__childNodes=child.__childNodes;
            }
            _copyEvent(child, _child,config);
            _copyAttri(child, _child);
        }
        if (child.__defaultText){
            _child.__defaultText = child.__defaultText;
        }
        newEl.appendChild(_child);
    }
    function xunhuanEls(e, newEl,config) {
        var child = e.childNodes[0];
        while (child) {
            _xunhuanWhil(child, newEl,config);
            child = child.nextSibling;
        }
    }
    var p=["onchange", "onclick","onerror", "onfocus","onkeydown","onkeyup", "onload"];
    function _copyEvent(ca,newEl,config){
        if(config.copyEvent){
            p.each(function(e){
                newEl[e]=ca[e];
            })
        }
    }
    function _copyAttri(ca,newEl){
        var l=ca.attributes.length;
        for(var i=0;i<l;i++){
            ca.attributes[i].__defaultText&&(newEl.attributes[i].__defaultText=ca.attributes[i].__defaultText);
        }
    }
    function strToNumberSuan(str){
    var p=str.match(/[\d\.]+\*[\d\.]+/);
    var values;
    if(p){
        values=p[0].split("*");
        values=values[0]*values[1];
        str=str.replace(p[0],values);    
    }else{
        p=str.match(/[\d\.]+\/[\d\.]+/);
        if(p){
            values=p[0].split("/");
            values=values[0]/values[1];
            str=str.replace(p[0],values);
        }else{
            p=str.match(/-?[\d\.]+\+-?[\d\.]+/);
            if(p){
                values=p[0].split("+");
                values=values[0]*1+values[1]*1;
                str=str.replace(p[0],values);
            }else{                
                p=str.match(/[\d\.]+?\.?\-[\d\.]+/);                
                if(p){
                    values=p[0].split("-");
                    values=values[0]*1-values[1]*1;
                    str=str.replace(p[0],values);
                }
            }
        }
    }                    
    str=str.replace(/\([\.0-9]+\)/g,values);    
    return str;
}

function strToNumber(str) { 
    var part;
    while(str.match(/\([\-*+\/0-9\.]+\)/)){
        part=str.match(/\([\-*+\/0-9\.]+\)/)[0];               
        str=str.replace(part,strToNumberSuan(part));         
    }    
    while((/-?[\d\.]?\.?[*\-+\/]+-?[\d\.]+/).test(str)&&!(/^-?[\d\.]+$/).test(str)){
        str=strToNumberSuan(str);
    }
    
    return (str*1).toFixed(6)*1;
}
})(window);
