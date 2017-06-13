var list=[
        {"username":"null","score":0},
         {"username":"null","score":0},
		  {"username":"null","score":0},
		   {"username":"null","score":0},
		   {"username":"null","score":0},
		   {"username":"null","score":0},
		   {"username":"null","score":0},
		   {"username":"null","score":0},
		   {"username":"null","score":0},
		   {"username":"null","score":0},
		   {"username":"null","score":0},
		   {"username":"null","score":0},
		   {"username":"null","score":0},
		   {"username":"null","score":0},
		    {"username":"null","score":0}
    ];
function Persion(username,score){
            this.username=username;
            this.score=score;
            }

// ��Ϸ������
var Game = {
	
	// ��Ϸ����
	gamePanel : null,
	
	// ����
	score : 0,
	
	num : 0,
	
	// ʱ��
	time : 0,
	
	// ͼƬӳ���
	pieceMap : null,
	
	// ͼƬ�б�
	pieceList : [],
	
	// ͼƬ�б�����ͼƬ
	pieceImgList : [],
	
	// ͼƬ������б�
	randomList : [],
	
	// �켣�б�
	trackList : [],

	// ��Ϸ�Ƿ�ʼ
	isGameBigin : false,
	
	// ��Ϸ�Ƿ����
	isGameOver : false,
	
	// ��Ϸ�Ƿ�����
	isGameReset : false,
	
	// ͼƬԪ���Ƿ��һ�ε��
	isFirstClick : true,
	
	isLogin :false,
	isRegister :false,
	
	// ��ʼ��Ϸ
	start : function() {
	
		document.getElementById("start").disabled = true;
		document.getElementById("reset").disabled = false;
		document.getElementById("login").disabled = false;
		document.getElementById("rank").disabled = true;
		document.getElementById("register").disabled = false;
		document.getElementById("setData").disabled = false;
		document.getElementById("getData").disabled = false;
		if (this.isGameReset) {
			
			this.isGameOver = false;
			this.startTime();
			
			return;
		
		} else if (this.isGameBegin) {
		
			return;
			
		} else {
		
			this.init();
			
			return;
			
		}
	
	},
	
	reset : function() {
		
		document.getElementById("start").disabled = false;
		document.getElementById("reset").disabled = true;
		document.getElementById("login").disabled = true;
		document.getElementById("rank").disabled = true;
		document.getElementById("register").disabled = true;
		
		this.clear();
		this.initPieces();
		this.initImgPieces();
		this.time = 0;
		document.getElementById("time").innerHTML = 0;
		
		this.score = 0;
		document.getElementById("score").innerHTML = 0;
		
		this.isGameReset = true;
		this.isGameBegin = true;

	},
	register : function() {
		
		var userName = document.getElementById("username").value;
		 var password = document.getElementById("password").value;
		
        //this.setCookie("userName",userName);
        //this.setCookie("score",score1);
		//document.cookie="userName"+"="+encodeURI(userName);
		//document.cookie="password"+"="+encodeURI(password);
		document.cookie="userName"+"="+escape(userName);
		document.cookie="password"+"="+escape(password);
		alert("register success!");
		this.isRegister=true;
		//this.showCookie();
		
	},

	login : function (){
            var txt =  document.getElementById("txt_showCookie");
		
		
	
		this.time = 0;
		document.getElementById("time").innerHTML = 0;
		
		this.score = 0;
		document.getElementById("score").innerHTML = 0;
            //txt.value = "admin:"+this.getCookie("userName")+"\nscore:"+this.getCookie("password");
			if(this.isRegister!=true){
				txt.value="Please register first";
			}
			else{
			if(this.getCookie("userName")==document.getElementById("username").value&&this.getCookie("password")==document.getElementById("password").value)
			{	txt.value="login ok";
				this.isLogin=true;
				document.getElementById("start").disabled = false;
				document.getElementById("reset").disabled = true;
				document.getElementById("login").disabled = true;
				document.getElementById("rank").disabled = true;
				document.getElementById("register").disabled = true;
			}
			else
				txt.value="login fail"+"\nadmin:"+this.getCookie("userName")+"\nscore:"+this.getCookie("password");
			}
        },
	getCookie : function(cName){
        //var cookieString = decodeURI(document.cookie);
		var cookieString = unescape(document.cookie);
        var cookieArray = cookieString.split("; ");
        console.log(cookieArray.length);
		//if(cookieArray.length!=0)
		//	return cookieString;
        for(var i = 0; i < cookieArray.length; i++){
            var cookieNum = cookieArray[i].split("=");
            console.log(cookieNum.toString());
            var cookieName = cookieNum[0];
            var cookieValue = cookieNum[1];

            if(cookieName == cName){
                return cookieValue;
                }
            }
        return false;
        },
	// ��ʼ��
	init : function() {

		if (this.isGameBegin) {
		
			return;
		
		}
		
		this.pieceMap = new Map();
		
		var _this = this;
		
		this.time = 0;
		this.startTime();
		
		this.gamePanel = document.getElementById("pieces");

		this.initPieces();
		this.initImgPieces();

		this.isGameBegin = true;

	},
	
	// ��������ɵ�150��ͼƬ��ӽ�����
	initPieces : function() {
	
		var _this = this;
	
		this.initRandomList();
		
		// ��������б�����
		this.messRandomList();
			
		for (var i = 0; i < 204; i ++) {
		
			var piece = new Piece(this);
			this.pieceList.push(piece);
			
			var x = (i%17);
			var y = Math.floor(i/17);
			
			this.pieceMap.put(x+","+y, piece);
			
			piece.setPosition(x, y);
			this.gamePanel.appendChild(piece.dom);
			
			if (x == 0 || x == 16 || y == 0 || y == 11) {
				
				piece.track = document.createElement("div");
				piece.track.className = "track";
				piece.dom.appendChild(piece.track);
				piece.isTracked = true;
				
				continue;
			
			} else {
			
				if (x == 1 || x == 15 || y == 1 || y == 10) {
				
					piece.setAtEdge(true);
				
				}
				
				this.pieceImgList.push(piece);
								
			}
									
		}
	
	},
	
	// ��ʼ��ͼƬ
	initImgPieces : function() {

		for (var i = 0; i < this.pieceImgList.length; i ++) {
		
			this.pieceImgList[i].initImg();
			this.pieceImgList[i].img.src = "img/pieces/"+this.randomList[i]+".gif"
			this.pieceImgList[i].setImgSrc(this.pieceImgList[i].img.src);			
							
			// ִ��ͼƬ����¼�
			this.pieceImgList[i].onClick();

		}
		
	},
		
	// ��ʼ�������
	initRandomList : function() {

		// ��ȡ������У���˫����
		for (var i = 0; i < 75; i ++) {
		
			var random = parseInt(Math.random()*22*10000, 10);
			var number = random%23;
			this.randomList.push(number);
			this.randomList.push(number);
		
		}	
	
	},
	
	// ���������
	messRandomList : function() {
	
		for (var i = 0; i < this.randomList.length; i ++) {
		
			var random = parseInt(Math.random()*15*10000, 10);
			var number = random%150;

			var temp;
			temp = this.randomList[i];
			this.randomList[i] = this.randomList[number];
			this.randomList[number] = temp;
		
		}		
	
	},
	
	// ��ʼ��ʱ
	startTime : function() {
	
		var _this = this;
	
		if (this.isGameOver) {
		
			return;
		
		} else {
			
			this.time ++;
			document.getElementById("time").innerHTML = this.time;
			this.isGameBegin = true;
			setTimeout(function() {_this.startTime();}, 1000);
		
		}
	
	},
	
	// ���
	clear : function() {
	
		for (var i = 0; i < this.pieceList.length; i ++) {

			this.gamePanel.removeChild(this.pieceList[i].dom);		
		
		}
		
		this.pieceList = [];
		this.randomList = [];
		this.pieceImgList = [];
		
		this.isGameOver = true;
		this.isGameBegin = false;
		
	}
	
}

window.onload = function() {
	var getData = document.getElementById("getData");
    var setData = document.getElementById("setData");
	
		document.getElementById("start").disabled = true;
		document.getElementById("reset").disabled = true;
		document.getElementById("rank").disabled = true;
		document.getElementById("login").disabled = false;
		document.getElementById("register").disabled = false;
		document.getElementById("setData").disabled = true;
		document.getElementById("getData").disabled = true;
			
                        
		
	
	
}
setData.onclick = function()//��������
                        {		var msg = Game.score;
								var usr =document.getElementById("username").value;
								Game.num++;
								if(Game.num<=15){
                                if(msg)
                                {		
										//localStorage.setItem("userName", usr);
                                        //localStorage.setItem("score", msg);
										
										localStorage.setItem("userName"+Game.num, usr);
                                        localStorage.setItem("score"+Game.num, msg);
                                        alert("save finish!"+"username:"+usr+" score:"+msg);
										//
										
										
										
										
										
										//localStorage.clear();
                                }
                                else
                                {
                                        alert("msg is not empty");
                                }
								}else{
									alert("num to big!"+"clear rank!");
									localStorage.clear();
								}
                        }
                        
                       getData.onclick = function()//��ȡ����
                        {		var objectList = new Array();
								var str="";
								for(var i=1;i<=Game.num;i++){
									var k=0;
									//var p=0;
									var usr = localStorage.getItem("userName"+i);
									var msg = localStorage.getItem("score"+i);
									
									//str+="username:" +usr+" score:"+ msg+"\n";
									for(var j=0;j<list.length;j++){
										if(usr==list[j]["username"])
											if(msg>=list[j]["score"])
											{	list[j]["score"]=msg;
												//p++;
												//alert(p);
												break;
											}
											k++;
									}
									if(k==list.length){
										
										list[i-1]["username"]=usr;
										list[i-1]["score"]=msg;
									}
								}
                                if(msg)
                                {		
										for(var f=0;f<list.length;f++){
											if(list[f]["username"]!="null")
												objectList.push(new Persion(list[f]["username"],list[f]["score"]));
											//str+="username:" +list[f]["username"]+" score:"+list[f]["score"]+"\n";
										}
											objectList.sort(function(a,b){
											return b.score-a.score});
										for(var i=0;i<objectList.length;i++){
											str+="username:" +objectList[i].username+" score:"+objectList[i].score+"\n";
											//document.writeln('<br />age:'+objectList[i].age+' name:'+objectList[i].name);
											}
											alert(str);
											var inputElements = document.getElementsByTagName("input");
											inputElements[9].value=str;
											inputElements[10].value=str;
											inputElements[11].value=str;
                                        //alert("username:" +usr+" score:"+ msg);
                                }
                                else
                                {
                                        alert("data no value");
                                }
                        }
// ��Ϸ��ʼ���
function Start() {
	
	Game.start();

}

// ��Ϸ�������
function Reset() {

	Game.reset();
	
}
function Login() {

	Game.login();
	
	
}
function Rank() {

	Game.rank();
	
}
function Register() {

	Game.register();
	
}
document.getElementById("submit").onclick = handleButtonPress;
var httpRequest;
function handleButtonPress(e){
//�Ա����buttonԪ�ض��ԣ���Ĭ����Ϊ���ó���ķ�Ajax��ʽ�ύ�������ﲻ���������������Ե�����preventDefault����
e.preventDefault();
var form = document.getElementById("fruitform");
//�ռ�����ʽ������input��ֵ
var formData ="";
var inputElements = document.getElementsByTagName("input");
for (var i = 0; i < inputElements.length; i++){
formData += inputElements[i].name + "=" + inputElements[i].value +"&";
}
httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = handleResponse;
//���ݱ���ͨ��POST�������͸�������������ȡ��HTMLFormElement��action���Ի����������Ҫ���͵�URL
httpRequest.open("POST",form.action);
//��ӱ�ͷ�����߷�����׼�����ܵ����ݸ�ʽ
httpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
//����Ҫ���͸����������ַ�����Ϊ�������ݸ�send����
httpRequest.send(formData);
alert("save to serve success!"+"\ndata:"+"["+inputElements[9].value+"]");
//alert(formData);
}
function handleResponse(){
if(httpRequest.readyState == 4 && httpRequest.status == 200){
document.getElementById("results").innerHTML = httpRequest.responseText;
}
}